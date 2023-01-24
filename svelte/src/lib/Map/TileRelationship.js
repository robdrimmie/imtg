import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Hex from '$lib/Map/Hex.js'
import Tile from '$lib/Map/Tile'
import Modifiers from '$lib/Modifiers'

export default class TileRelationship {
	static CONTEXT_ADVENTURING = 'CONTEXT_ADVENTURING'
	static CONTEXT_RESTING = 'CONTEXT_RESTING'
	static CONTEXT_VENDING = 'CONTEXT_VENDING'

	constructor(character, tile) {
		// Characters are big objects and store relationships, so taking just the bits I need
		this.characterId = character.id
		this.backpack = character.backpack

		// character's current tile, used for distance calculations. not the best naming. 
		this.currentTile = character.currentTile

		// RMD TODO compare against mannequin in some cases, paperdoll in others
		this.paperdoll = character.paperdoll		
		this.personality = character.personality
		this.physicality = character.physicality
		this.resources = character.resources

		this.tile = tile

		this.knowledgeLevel = Tile.KNOWLEDGE_UNKNOWN

		// rmd todo make tile knowledge a data object, see refactor notes in project.md
		this.knowledge = {
			emptyDecks: {
				adventuring: false,
				resting: false,
				vending: false
			}
		}

		this.values = {
			adventuring: {			
				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
				knowledge: 1,
				satiety: 1,
				overall: 1
			},
			resting: {
				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
				knowledge: 1,
				satiety: 1,
				overall: 1
			},
			vending: {
				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
				knowledge: 1,
				satiety: 1,
				overall: 1
			}
		}

		// rmd todo revisit how a tile relationship's thresholds are set
		const personalityThreshold = (tile.region.personality === null)
			? character.getPersonalityAverage()
			: character.getAttribute(tile.region.personality).apparent
		const physicalityThreshold = (tile.region.physicality === null)
			? character.getPhysicalityAverage()
			: character.getAttribute(tile.region.physicality).apparent
		
		this.attributes = {
			personality: tile.region.personality,
			personalityThreshold,
			physicality: tile.region.physicality,
			physicalityThreshold
		}
	}

	progress(character) {
		// store all the required information
		this.backpack = character.backpack
		this.characterId = character.id
		this.currentTile = character.currentTile
		this.paperdoll = character.paperdoll
		this.personality = character.personality
		this.physicality = character.physicality
		this.resources = character.resources
		
		// Calculate how valuable this tile is for each action type
		const knowledge = this.tile.getKnowledgeForLevel(this.knowledgeLevel)

		this.values.adventuring = this.calculateAdventuringValue(knowledge)
		this.values.resting = this.calculateRestingValue(knowledge)
		this.values.vending = this.calculateVendingValue(knowledge)

		// console.log("Character@progress set tile values to", this.tile.id, this.values)
	}

	// #region Encounter results
	defeat() {

		this.attributes.personalityThreshold += 5
		this.attributes.physicalityThreshold += 5
	}

	emptyDeck(context) {
		if(context == TileRelationship.CONTEXT_ADVENTURING) {
			this.knowledge.emptyDecks.adventuring = true
		}

		if(context == TileRelationship.CONTEXT_ADVENTURING) {
			this.knowledge.emptyDecks.resting = true
		}

		if(context == TileRelationship.CONTEXT_ADVENTURING) {
			this.knowledge.emptyDecks.vending = true
		}
	}

	victory() {
		this.attributes.personalityThreshold -= 5
		this.attributes.physicalityThreshold -= 5
	}
	// #endregion Encounter results

	// #region Calculate Tile Values
	calculateActionValue(context, knowledgeForAction) {
		const knowledge = this.calculateKnowledgeScore(knowledgeForAction)
		
		const attribute = this.calculateAttributeScore(context)
		const capacity = this.calculateCapacityScore(context)
		const distance = this.calculateDistanceScore(context)
		const energy = this.calculateEnergyScore(context, distance)
		const health = this.calculateHealthScore(context)
		const satiety = this.calculateSatietyScore(context)

		const actionValue = {
			attribute,
			knowledge,
			capacity,
			distance,
			energy,
			health,
			satiety,
		}

		actionValue.overall = this.calculateOverallScore(actionValue)

		console.log("calculateActionValue returning", actionValue)

		return actionValue
	}

	calculateAdventuringValue(knowledge) {
		return this.calculateActionValue(TileRelationship.CONTEXT_ADVENTURING, knowledge.adventuring)
	}

	calculateRestingValue(knowledge) {
		return this.calculateActionValue(TileRelationship.CONTEXT_RESTING, knowledge.resting)
		
	}

	calculateVendingValue(knowledge) {
		return this.calculateActionValue(TileRelationship.CONTEXT_VENDING, knowledge.vending)		
	}
	// #endregion Calculate Tile Values

	// #region Calculate Motivator Scores
	/*
		Scores the tile based on how well the character's Attributes exceed the threshold
		created by winning and losing encounters on this tile

		I do not believe context matters here, since attributes do not impact resting or vending
	*/
	calculateAttributeScore(context) {
		let attributeScore = 1

		if (this.tile.isOrigin()) return attributeScore

		const characterPersonality = (this.tile.region.personality === null)
			? this.personality.get(this.getBestPersonality()).apparent
			: this.personality.get(this.tile.region.personality).apparent
		
		attributeScore *= Modifiers.percentToScoreDiminishing(
			characterPersonality/100, 
			this.attributes.personalityThreshold/100
		)
		console.log("per", characterPersonality, attributeScore)

		const characterPhysicality = (this.tile.region.physicality === null)
			? this.physicality.get(this.getBestPhysicality()).apparent
			: this.physicality.get(this.tile.region.physicality).apparent
			
		attributeScore *= Modifiers.percentToScoreDiminishing(
			characterPhysicality/100, 
			this.attributes.physicalityThreshold/100
		)

		return attributeScore
	}

	calculateCapacityScore(context) {
		if(context == TileRelationship.CONTEXT_RESTING) {
			// capacity has no impact on desire to rest
			return 1
		}

		const higherIsBetter = (context == TileRelationship.CONTEXT_VENDING)
			? false				// want very full bags when vending so there is stuff to sell!
			: true				// want very empty bags when adventuring to hold all that loot!

		return Modifiers.percentToScore(
			this.backpack().availableCapacityAsPercent(), 
			higherIsBetter
		)
	}

	// I genuinely can't think of a context (of those that exist in the game) in which a tile 
	// that is far away from a character is better than one that is near to it.
	// to the extent that it does, it is a function of energy and therefore impacted by calculateEnergyScore
	calculateDistanceScore(context) {
		const distance = Hex.distance(this.tile.hex, this.currentTile.hex)

		// console.log("calculateDistanceScore", this.tile.hex, 
		//	this.currentTile.hex, distance, (distance === 0) ? 1 : 1 / (distance + 1)
		// )
		
		return (distance === 0) ? 1 : 1 / (distance + 1)
	}

	calculateEnergyScore(context, distance) {
		// expending no energy is the best!
		if (distance === 0) return 2
		
		const energy = this.resources.get(Attributes.RESOURCES_ENERGY)

		// console.log("calculateEnergyScore - a", distance, energy, energy.asPercent())
		// if I don't have enough energy to get there it is the worst
		if (distance > energy.current) return 0

		// rmd todo: these curves may be reusable. If so, they would make good constants in Modifiers
		// see: 20230121 1048 or thereabouts (not the first entry so not an exact match)
		// sharper curve for Resting because if I want to rest I do _not_ want to expend energy
		// andventuring and vending have the same curve at present but these are complete guesses anyway
		const curves = {
			CONTEXT_ADVENTURING: [
				{ x: 0.0,     y: 0.0 },
				{ x: 0.5,     y: 0.3 },
				{ x: 0.99999, y: 1.0 },
				{ x: 1.0,     y: 2.0 }
			],
			CONTEXT_RESTING:  [
				{ x: 0.0,     y: 2.0 },
				{ x: 0.5,     y: 0.5 },
				{ x: 0.99999, y: 0.1 },
				{ x: 1.0,     y: 0.0 }
			],
			CONTEXT_VENDING:  [
				{ x: 0.0,     y: 0.0 },
				{ x: 0.5,     y: 0.3 },
				{ x: 0.99999, y: 1.0 },
				{ x: 1.0,     y: 2.0 }
			],
		}

		// console.log("calculateEnergyScore - b", curves, context, curves[context])

		const score = Modifiers.percentToScoreBySetpoints(
			energy.asPercent(), 
			curves[context]
		)

		// console.log("calculateEnergyScore - c", score)

		return score
	}

	calculateHealthScore(context) {
		if(context == TileRelationship.CONTEXT_VENDING) {
			// health has no impact on desire to vend
			return 1
		}

		const characterHealth = this.resources.get(Attributes.RESOURCES_HEALTH)
		const percentAvailable = characterHealth.current / characterHealth.base

		const higherIsBetter = (context == TileRelationship.CONTEXT_ADVENTURING)
			? true				// high health means high desire to adventure, low to rest
			: false				// low health means high desire to rest, low to adventure

		return Modifiers.percentToScore(
			percentAvailable, 
			higherIsBetter
		)
	}

	calculateKnowledgeScore(knowledge) {
		// console.log("calculating value for knowledge and tile.id", knowledge, this.tile.id)
		let value = 1
console.log("calculateKnowledgeScore - a", knowledge)
		if (knowledge.deckSize) {
			switch (knowledge.deckSize) {
				case Deck.SIZE_EMPTY:
					value = 0
					break

				case Deck.SIZE_SMALL:
					// value *= 1.25
					value *= 1.1
					break

				case Deck.SIZE_MEDIUM:
					// value *= 1.5
					value *= 1.2
					break

				case Deck.SIZE_LARGE:
					// value *= 1.75
					value *= 1.3
					break

				case Deck.SIZE_UNLIMITED:
					// value *= 2
					value *= 1.4
					break
			}

			// if there are no cards remaining then testing knowledge.cardsRemaining doesn't work because 0 is falsey
			// so explicitly test that the property exists
			if (knowledge.hasOwnProperty('cardsRemaining') && knowledge.cardsRemaining) {
				if (knowledge.cardsRemaining === 0) {
					value = 0
				} else {
					// will default to 1/1 = 1, basically
					let denominator = knowledge.cardsRemaining

					value *= 2 * (knowledge.cardsRemaining / denominator)
				}
			}
		}

		// rmd todo I don't recall the reasoning behind this blanket increase
		// if I know about it I want to go but does this actually make a difference? experiment.
		if (knowledge.available) {
			value *= 1.25
		}

		return value
	}

	// This looks at satiety and if it is low then decides to camp.
	// this is probably wrong, probably most every turn a character will eat to satiety if they can
	// then satiety starts dropping and the character wants to get somewhere with food
	// so... tiles should have something to indicate that they contain food?
	calculateSatietyScore(context) {
		const tileToConsider = this.tile

		let multiplier = 1
		const satiety = this.resources.get(Attributes.RESOURCES_SATIETY)

		const percentAvailable = satiety.current / satiety.base


		// 20230121 using an older pattern with none of the Modifiers.percentAsScore-related logic.
		// this is intentional but only because it is unclear as I write this whether or not 
		// satiety adds value I'm interested in, or if it is just too similar to energy to really
		// have value
		if (tileToConsider) {
			//// If satiety is low, bias in favour of finding a tile with food
			if (percentAvailable < 0.5) {
				// console.log('calculateSatietyScore - tileToConsider', tileToConsider)
				if (tileToConsider.hasForagingAvailable()) {
					// I want to get food so score this tile higher
					multiplier *= Modifiers.INCREASE
				} else {
					// no food so yuck!
					multiplier *= Modifiers.DECREASE
				}
			}

			// goose it further if we're below 10% satiety
			if (percentAvailable < 0.1) {
				if (tileToConsider.hasForagingAvailable()) {
					// I want to get food so score this tile higher
					multiplier *= Modifiers.INCREASE
				} else {
					// no food so yuck!
					multiplier *= Modifiers.DECREASE
				}
			}
		}

		const tileScore = 1 * percentAvailable * multiplier

		// console.log("calculated capacity [score] for [tile] with [multiplier]", tileScore, tileToConsider, multiplier)
		return tileScore
	}

	calculateOverallScore(actionValue) {
		console.log("calculateOverallScore", actionValue)
		
		return 1 * 
			actionValue.attribute * 
			actionValue.capacity * 
			actionValue.distance *
			actionValue.energy * 
			actionValue.health * 
			actionValue.knowledge *
			actionValue.satiety

	}
	// #endregion Calculate Motivator Scores

	// #region getBestAttribute 
	getBestAttributeOfTrait(trait) {
		let bestScore = 0
		let bestAttribute

		for (const [attribute, value] of trait) {
			if(value.apparent > bestScore) {
				bestScore = value.apparent
				bestAttribute = attribute
			}
		}

		return bestAttribute
	}
	
	getBestPersonality() {
		return this.getBestAttributeOfTrait(this.personality)
	}

	getBestPhysicality() {
		return this.getBestAttributeOfTrait(this.physicality)
	}
	// #endregion getBestAttribute 
}
