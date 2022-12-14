import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Hex from '$lib/Map/Hex.js'
import Tile from '$lib/Map/Tile'
import Modifiers from '$lib/Modifiers'


const CONTEXT_ADVENTURING = 'CONTEXT_ADVENTURING'
const CONTEXT_RESTING = 'CONTEXT_RESTING'
const CONTEXT_VENDING = 'CONTEXT_VENDING'

export default class TileRelationship {
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

		this.values = {
			adventuring: {
				// desires are absolute, so 0 is a baseline
				desire: 0,

				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
				satiety: 1,
				overall: 1
			},
			resting: {
				// desires are absolute, so 0 is a baseline
				desire: 0,

				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
				satiety: 1,
				overall: 1
			},
			vending: {
				// desires are absolute, so 0 is a baseline
				desire: 0,

				// Scores are modifiers, so 1 is neutral
				attribute: 1,
				capacity: 1,
				distance: 1,
				energy: 1,
				health: 1,
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

		// console.log("tile values", this.tile.id, this.values)
	}

	// #region Encounter results
	defeat() {

		this.attributes.personalityThreshold += 5
		this.attributes.physicalityThreshold += 5
	}

	victory() {
		this.attributes.personalityThreshold -= 5
		this.attributes.physicalityThreshold -= 5
	}
	// #endregion Encounter results

	// #region Calculate Tile Values
	calculateDesire(knowledge) {
		// console.log("calculating value for knowledge and tile.id", knowledge, this.tile.id)
		let value = 1

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

	calculateActionValue(context, knowledgeForAction, value) {
		const desire = this.calculateDesire(knowledgeForAction)
		
		const attribute = this.calculateAttributeScore(context)
		const capacity = this.calculateCapacityScore(context)
		const distance = this.calculateDistanceScore(context)
		const energy = this.calculateEnergyScore(context, distance)
		const health = this.calculateHealthScore(context)
		const satiety = this.calculateSatietyScore(context)

		const overall = this.calculateOverallScore(value)		

		const retval = {
			attribute,
			desire,
			capacity,
			distance,
			energy,
			health,
			satiety,
			overall,
		}

		console.log("calculateActionValue returning", retval)

		return retval
	}

	calculateAdventuringValue(knowledge) {
		return this.calculateActionValue(CONTEXT_ADVENTURING, knowledge.adventuring, this.values.adventuring)
	}

	calculateRestingValue(knowledge) {
		return this.calculateActionValue(CONTEXT_RESTING, knowledge.resting, this.values.resting)
		
	}

	calculateVendingValue(knowledge) {
		return this.calculateActionValue(CONTEXT_VENDING, knowledge.vending, this.values.vending)		
	}
	// #endregion Calculate Tile Values


	// #region Calculate Motivator Scores
	/*
		Scores the tile based on how well the character's Attributes exceed the threshold
		created by winning and losing encounters on this tile
	*/
	calculateAttributeScore(context) {
		let attributeScore = 1

		if (this.tile.isOrigin()) return attributeScore

		const characterPersonality = (this.tile.region.personality === null)
			? this.personality.get(this.getBestPersonality()).apparent
			: this.personality.get(this.tile.region.personality).apparent
		
		// if the character's attribute is higher than the relationship, then it is good.
		if (characterPersonality >= this.attributes.personalityThreshold) {
			attributeScore *= Modifiers.INCREASE
		} else {
			attributeScore *= Modifiers.DECREASE
		}

		const characterPhysicality = (this.tile.region.physicality === null)
			? this.physicality.get(this.getBestPhysicality()).apparent
			: this.physicality.get(this.tile.region.physicality).apparent
			
		if (characterPhysicality >= this.attributes.physicalityThreshold) {
			attributeScore *= Modifiers.INCREASE
		} else {
			attributeScore *= Modifiers.DECREASE
		}

		return attributeScore
	}

	calculateCapacityScore(context) {
		const percentAvailable = this.backpack().availableCapacity() / this.backpack().capacity

		// for adventuring, we want a high score if we have a lot of capacity and a low score otherwise
		if(context == CONTEXT_ADVENTURING) {
			return percentAvailable
		} else if(context == CONTEXT_VENDING) {
			return 1 - percentAvailable
		} 

		// capacity doesn't really matter when resting
		return 1
	}

	calculateDistanceScore(context) {
		const distance = Hex.distance(this.tile.hex, this.currentTile.hex)

		// rmd todo the tile the character on is always best from a distance perspective
		// maybe some character personality attributes alter that, but for now simple is good

		// simple fall off. 1/2, 1/3, 1/4 etc.
		// this might end up having too much of an impact but it should impact all decisions
		// in the same way so maybe that balances out? :shrug:

		const retval = (distance === 0) ? 1 : 1 / (distance + 1)

		console.log("distance", this.tile.hex, this.currentTile.hex, distance, retval)

		// console.log("calculateDistanceScore", this.tile.hex, this.currentTile.hex, distance, retval)

		return retval
	}

	calculateEnergyScore(context, distance) {
		const tileToConsider = this.tile
		// console.log("calculateEnergyScore - tileToConsider, distance", tileToConsider,distance)

		const energy = this.resources.get(Attributes.RESOURCES_ENERGY)
		const percentAvailable = energy.current / energy.base

		// rmd todo energetic threshold should be modified by stats. not sure which ones 
		// endurance has a direct impact. 
		// highly neurotic people might have less energy because they burn a lot thinking.
		// more? 
		const characterIsEnergetic = percentAvailable > 0.4

		let multiplier = 1
		if (tileToConsider) {
			if (characterIsEnergetic) {
				if (tileToConsider.hasAdventuringAvailable()) {
					multiplier *= Modifiers.INCREASE
				} else {
					multiplier *= Modifiers.DECREASE
				}
			} else {
				if (tileToConsider.hasRestingAvailable()) {
					multiplier *= Modifiers.INCREASE
				} else {
					multiplier *= Modifiers.DECREASE
				}
			}
		}

		const energyScore = multiplier * distance

		// console.log("calculated [energy score] for [currenttile] with [multiplier] dampened by [distanceScore]",
		//   energyScore,
		//   tileToConsider,
		//   multiplier,
		//   distanceScore
		// )
		return energyScore
	}



	// RMD TODO improve calculate health score
	// can get a lot more nuanced here, get a bit of a curve that plateaus around 90 or something.
	// but anyway.
	calculateHealthScore(context) {
		const characterHealth = this.resources.get(Attributes.RESOURCES_HEALTH)
		const percentAvailable = characterHealth.current / characterHealth.base

		const adventuringValue = this.values.adventuring
		const restingValue = this.values.resting

		// This is pretty heavy handed still, but basically, if I have a lot of health available
		// then do whatever (neutral multiplier), otherwise rest.

		const healthScore = percentAvailable > 0.5 ? 1 : restingValue

		// console.log(
		//   "calculateCapacityScore values",
		//   tileKnowledge,
		//   percentAvailable,
		//   adventuringValue,
		//   vendingValue,
		//   operator,
		//   capacityScore
		// )

		return healthScore
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

	calculateOverallScore(value) {
		console.log("calculateOverallScore", value)
		
		return 1 * 
			value.attribute * 
			value.capacity * 
			value.energy * 
			value.health * 
			value.satiety
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
