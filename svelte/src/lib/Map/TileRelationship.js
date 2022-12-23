import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Hex from '$lib/Map/Hex.js'
import Tile from '$lib/Map/Tile'

const INCREASE = 1.1
const DECREASE = 0.9

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

		// Scores are modifiers, so 1 is neutral
		this.scores = {
			capacity: 1,
			distance: 1,
			energy: 1,
			gear: 1,
			health: 1,
			satiety: 1,

			overall: 1
		}

		// Values are absolute, so 0 is a baseline
		this.values = {
			adventuring: 0,
			resting: 0,
			vending: 0
		}

		this.attributes = {
			personality: tile.personality,
			personalityThreshold: 0,
			physicality: tile.physicality,
			physicalityThreshold: 0
		}
	}

	progress(character) {
		this.backpack = character.backpack
		this.characterId = character.id
		this.currentTile = character.currentTile
		this.paperdoll = character.paperdoll
		this.personality = character.personality
		this.physicality = character.physicality
		this.resources = character.resources
		
		this.values.adventuring = this.calculateAdventuringValue()
		this.values.resting = this.calculateRestingValue()
		this.values.vending = this.calculateVendingValue()

		this.scores.capacity = this.calculateCapacityScore()
		this.scores.distance = this.calculateDistanceScore()
		this.scores.energy = this.calculateEnergyScore()
		this.scores.gear = this.calculateGearScore()
		this.scores.health = this.calculateHealthScore()
		this.scores.satiety = this.calculateSatietyScore()
		this.scores.overall = this.calculateOverallScore()
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
	calculateValue(knowledge) {
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
		if (knowledge.available) {
			value *= 1.25
		}

		return value
	}

	calculateAdventuringValue() {
		return this.calculateValue(
			this.tile.getKnowledgeForLevel(this.knowledgeLevel).adventuring
		)
	}

	calculateRestingValue() {
		return this.calculateValue(
			this.tile.getKnowledgeForLevel(this.knowledgeLevel).resting
		)
	}

	calculateVendingValue() {
		return this.calculateValue(
			this.tile.getKnowledgeForLevel(this.knowledgeLevel).vending
		)
	}
	// #endregion Calculate Tile Values

	// #region Calculate Action Scores
	// #endregion Calculate Action Scores

	// #region Calculate Motivator Scores
	calculateCapacityScore() {
		const percentAvailable = this.backpack().availableCapacity() / this.backpack().capacity
		const adventuringValue = this.values.adventuring
		const vendingValue = this.values.vending

		// rmd todo improved capacity calcuation
		// This is pretty heavy handed still, but basically, if I want to adventure just
		// use the adventuring value. If I want to vend, just use the vending value.

		const capacityScore = 2 * percentAvailable > 0.5 ? adventuringValue : vendingValue
		// console.log("capacityScore, percentAvailable, adventuringValue, vendingValue", capacityScore, percentAvailable, adventuringValue, vendingValue)

		return capacityScore
	}

	calculateDistanceScore() {
		const distance = Hex.distance(this.tile.hex, this.currentTile.hex)

		// rmd todo the tile the character on is always best from a distance perspective
		// maybe some character personality attributes alter that, but for now simple is good

		// simple fall off. 1/2, 1/3, 1/4 etc.
		// this might end up having too much of an impact but it should impact all decisions
		// in the same way so maybe that balances out? :shrug:
		return (distance === 0) ? 1 : 1 / (distance + 1)
	}

	calculateEnergyScore() {
		const tileToConsider = this.tile
		// console.log("calculateEnergyScore - tileToConsider, currentTile", tileToConsider, currentTile)

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
					multiplier *= INCREASE
				} else {
					multiplier *= DECREASE
				}
			} else {
				if (tileToConsider.hasRestingAvailable()) {
					multiplier *= INCREASE
				} else {
					multiplier *= DECREASE
				}
			}
		}

		const energyScore = multiplier * this.scores.distance

		// console.log("calculated [energy score] for [currenttile] with [multiplier] dampened by [distanceScore]",
		//   energyScore,
		//   tileToConsider,
		//   multiplier,
		//   distanceScore
		// )
		return energyScore
	}

	getBestAttributeOfTrait(trait) {
		let bestScore = 0
		let bestAttribute
console.log(trait)
		for (const [attribute, value] of trait) {
			console.log("att", attribute)
			if(value.apparent > bestScore) {
				bestScore = value.apparent
				bestAttribute = attribute
			}
		}
console.log("best", bestAttribute)
		return bestAttribute
	}
	
	getBestPersonality() {
		return this.getBestAttributeOfTrait(this.personality)
	}

	getBestPhysicality() {
		return this.getBestAttributeOfTrait(this.physicality)
	}

	calculateGearScore() {
		let gearScore = 1

		if (this.tile.isOrigin()) return gearScore

		// will be 0-6, right now is just distance from origin
		const tileDifficulty = this.tile.getDifficulty()
		
		// will be 0-7 I think, right now is just "how many items are equipped"
		const gearLevel = this.paperdoll.capacity - this.paperdoll.availableCapacity()
console.log("this", this)
		// if the character's attribute is higher than the relationship, then it is good.
		const characterPersonality = this.tile.region.personality 
			? this.personality.get((this.tile.region.personality).apparent)
			: this.getBestPersonality().apparent

		const characterPhysicality = this.tile.region.physicality
			? this.physicality.get((this.tile.region.physicality).apparent)
			: this.getBestPhysicality().apparent

		console.log("gear score character stats", characterPersonality, characterPhysicality, this.attributes.personalityThreshold, this.attributes.physicalityThreshold)
		// otherwise it is bad.

		// console.log("gear score:::     gearLevel, tileDifficulty", gearLevel, tileDifficulty)
		if (gearLevel === tileDifficulty) {
			gearScore = 1
		} else if (gearLevel > tileDifficulty) {
			gearScore = 1.25
		} else {
			gearScore = 0.9
		}

		// Items that are equipped can modify the score, so give each one a chance
		gearScore = this.paperdoll.slots.reduce(
			(accumulatedGearScore, itemInSlot /*, indexOfSlot*/) => {
				// if there is an item in the slot but it doesn't have a modifier method,
				// then just move on

				// rmd todo item quality should modify gear level - I suppose that could 
				// take place in its modifier though, hmm.

				if (!itemInSlot || !itemInSlot.multiplier) {
					return accumulatedGearScore
				}
				// Apply the modifier
				return accumulatedGearScore * itemInSlot.multiplier(this.tile)
			},
			gearScore
		)

		return gearScore
	}

	// RMD TODO improve calculate health score
	// can get a lot more nuanced here, get a bit of a curve that plateaus around 90 or something.
	// but anyway.
	calculateHealthScore() {
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
	calculateSatietyScore() {
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
					multiplier *= INCREASE
				} else {
					// no food so yuck!
					multiplier *= DECREASE
				}
			}

			// goose it further if we're below 10% satiety
			if (percentAvailable < 0.1) {
				if (tileToConsider.hasForagingAvailable()) {
					// I want to get food so score this tile higher
					multiplier *= INCREASE
				} else {
					// no food so yuck!
					multiplier *= DECREASE
				}
			}
		}

		const tileScore = 1 * percentAvailable * multiplier

		// console.log("calculated capacity [score] for [tile] with [multiplier]", tileScore, tileToConsider, multiplier)
		return tileScore
	}
	// #endregion Calculate Motivator Scores

	calculateOverallScore() {
		return 1 * 
			this.scores.capacity * 
			this.scores.energy * 
			this.scores.gear * 
			this.scores.health * 
			this.scores.satiety
	}
}
