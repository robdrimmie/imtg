import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Tile from '$lib/Map/Tile'

const INCREASE = 1.1;
const DECREASE = 0.9;

export default class TileRelationship {
	constructor(character, tile) {
		// Characters are big objects and store relationships, so only take the references I need
		this.characterId = character.id;
		this.backpack = character.backpack;
		this.paperdoll = character.paperdoll;
		this.currentTile = character.currentTile;

		this.tile = tile;

		this.knowledgeLevel = Tile.KNOWLEDGE_UNKNOWN;
	}

	score() {}

	// #region Calculate Tile Values
	calculateValue(knowledge) {
		let value = 1;

		if (knowledge.deckSize) {
			switch (knowledge.deckSize) {
				case Deck.SIZE_EMPTY:
					value = 0;
					break;

				case Deck.SIZE_SMALL:
					value *= 1.25;
					break;

				case Deck.SIZE_MEDIUM:
					value *= 1.5;
					break;

				case Deck.SIZE_LARGE:
					value *= 1.75;
					break;

				case Deck.SIZE_UNLIMITED:
					value *= 2;
					break;
			}

			// if there are no cards remaining then testing knowledge.cardsRemaining doesn't work because 0 is falsey
			// so explicitly test that the property exists
			if (knowledge.hasOwnProperty('cardsRemaining') && knowledge.cardsRemaining) {
				if (knowledge.cardsRemaining === 0) {
					value = 0;
				} else {
					// will default to 1/1 = 1, basically
					let denominator = knowledge.cardsRemaining; 

					value *= 2 * (knowledge.cardsRemaining / denominator);
				}
			}
		}

		if (knowledge.available) {
			value *= 1.25;
		}

		return value;
	}

	calculateAdventuringValue(tileKnowledge) {
		// console.log("CALCULATE ADVENTURING", tileKnowledge.adventuring)
		return this.calculateValue(tileKnowledge.adventuring);
	}

	calculateForagingValue(tileKnowledge) {
		// console.log("CALCULATE FORAGING")
		return this.calculateValue(tileKnowledge.foraging);
	}

	calculateRestingValue(tileKnowledge) {
		// console.log("TileRelationship - CALCULATE RESTING BEFORE, tileKnowledge.resting", tileKnowledge.resting)
		const retval = this.calculateValue(tileKnowledge.resting);
		// console.log("TileRelationship - CALCULATE RESTING AFTER, retval", retval)
		return retval;
	}

	calculateVendingValue(tileKnowledge) {
		// console.log("CALCULATE VENDING")
		return this.calculateValue(tileKnowledge.vending);
	}
	// #endregion Calculate Tile Values

	// #region Calculate Action Scores
	// #endregion Calculate Action Scores

	// #region Calculate Motivator Scores
	calculateCapacityScore() {
		const tileKnowledge = this.tile.getKnowledgeForLevel(this.knowledgeLevel);
		const percentAvailable = 0.7; // RMD TODO restore calculations this.backpack().availableCapacity() / this.backpack().capacity
		const adventuringValue = this.calculateAdventuringValue(tileKnowledge);
		const vendingValue = this.calculateVendingValue(tileKnowledge);

		// console.log("tile and knowledge", this.tile.id, this.knowledgeLevel, tileKnowledge)

		// This is pretty heavy handed still, but basically, if I want to adventure just
		// use the adventuring value. If I want to vend, just use the vending value.

		const capacityScore = 2 * percentAvailable > 0.5 ? adventuringValue : vendingValue;
		// console.log(
		//   "calculateCapacityScore values",
		//   tileKnowledge,
		//   percentAvailable,
		//   adventuringValue,
		//   vendingValue,
		//   capacityScore
		// )

		return capacityScore;
	}

	calculateEnergyScore() {
		const tileToConsider = this.tile;
		// console.log("calculateEnergyScore - tileToConsider, currentTile", tileToConsider, currentTile)

		const energy = {
			current: 7,
			base: 10
		}; // RMD TODO restore calculations this.character.resources.get(Attributes.RESOURCES_ENERGY)
		const percentAvailable = energy.current / energy.base;

		const characterIsEnergetic = percentAvailable > 0.4;

		let multiplier = 1;
		let distanceScore = 1; // RMD TODO HexUtils.distance(tileToConsider, currentTile)

		if (tileToConsider) {
			if (characterIsEnergetic) {
				if (tileToConsider.hasAdventuringAvailable()) {
					multiplier *= INCREASE;
				} else {
					multiplier *= DECREASE;
				}
			} else {
				if (tileToConsider.hasRestingAvailable()) {
					multiplier *= INCREASE;
				} else {
					multiplier *= DECREASE;
				}
			}

			// RMD TODO I'm hardcoding 6 because that's how many tiles there are in the stem but
			// is that progammaticably determined anywhere?
			const distanceFromCharacterToTile = 1; // rmd todo restore calculations this.character.currentTile.distanceFromTile(tileToConsider)
			distanceScore = 1 - distanceFromCharacterToTile / 6;

			if (distanceScore === 0) distanceScore = 0.1;
			// console.log("dFCTT", distanceFromCharacterToTile)
		}

		const energyScore = multiplier * distanceScore;

		// console.log("calculated [energy score] for [currenttile] with [multiplier] dampened by [distanceScore]",
		//   energyScore,
		//   tileToConsider,
		//   multiplier,
		//   distanceScore
		// )
		return energyScore;
	}

	calculateGearScore(character) {
		if (this.tile.isOrigin()) return 1;

		let gearScore = 1;

		// will be 0-6, right now is just distance from origin
		const tileDifficulty = this.tile.getDifficulty();
		
		// will be 0-7 I think
		const gearLevel = character.paperdoll.capacity - character.paperdoll.availableCapacity();

		// console.log("gear score:::     gearLevel, tileDifficulty", gearLevel, tileDifficulty)
		if (gearLevel === tileDifficulty) {
			gearScore = 1;
		} else if (gearLevel > tileDifficulty) {
			gearScore = 1.25;
		} else {
			gearScore = 0.9;
		}

		// Items that are equipped can modify the score, so give each one a chance
		gearScore = character.paperdoll.slots.reduce(
			(accumulatedGearScore, itemInSlot /*, indexOfSlot*/) => {
				// if there is an item in the slot but it doesn't have a modifier method,
				// then just move on

				if (!itemInSlot || !itemInSlot.multiplier) {
					return accumulatedGearScore;
				}
				// Apply the modifier
				return accumulatedGearScore * itemInSlot.multiplier(this.tile);
			},
			gearScore
		);

		return gearScore;
	}

	// RMD TODO Refine
	// can get a lot more nuanced here, get a bit of a curve that plateaus around 90 or something.
	// but anyway
	calculateHealthScore(character) {
		const tileKnowledge = this.tile.getKnowledgeForLevel(this.knowledgeLevel);
		const characterHealth = character.resources.get(Attributes.RESOURCES_HEALTH);
		const percentAvailable = characterHealth.current / characterHealth.base;

		const adventuringValue = this.calculateAdventuringValue(tileKnowledge);
		const restingValue = this.calculateRestingValue(tileKnowledge);

		// This is pretty heavy handed still, but basically, if I have a lot of health available
		// adventure is good, otherwise resting is good.

		const healthScore = percentAvailable > 0.5 ? adventuringValue : restingValue;

		// console.log(
		//   "calculateCapacityScore values",
		//   tileKnowledge,
		//   percentAvailable,
		//   adventuringValue,
		//   vendingValue,
		//   operator,
		//   capacityScore
		// )

		return healthScore;
	}

	// This looks at satiety and if it is low then decides to camp.
	// this is probably wrong, probably most every turn a character will eat to satiety if they can
	// then satiety starts dropping and the character wants to get somewhere with food
	// so... tiles should have something to indicate that they contain food?
	calculateSatietyScore(character) {
		const tileToConsider = this.tile;

		let multiplier = 1;
		const satiety = character.resources.get(Attributes.RESOURCES_SATIETY);

		const percentAvailable = satiety.current / satiety.base;

		if (tileToConsider) {
			//// If satiety is low, bias in favour of finding a tile with food
			if (percentAvailable < 0.5) {
				// console.log('calculateSatietyScore - tileToConsider', tileToConsider);
				if (tileToConsider.hasForagingAvailable()) {
					// I want to get food so score this tile higher
					multiplier *= INCREASE;
				} else {
					// no food so yuck!
					multiplier *= DECREASE;
				}
			}

			// goose it further if we're below 10% satiety
			if (percentAvailable < 0.1) {
				if (tileToConsider.hasForagingAvailable()) {
					// I want to get food so score this tile higher
					multiplier *= INCREASE;
				} else {
					// no food so yuck!
					multiplier *= DECREASE;
				}
			}
		}

		const tileScore = 1 * percentAvailable * multiplier;

		// console.log("calculated capacity [score] for [tile] with [multiplier]", tileScore, tileToConsider, multiplier)
		return tileScore;
	}
	// #endregion Calculate Motivator Scores

	calculateTileRelationshipScore(character) {
		// console.log("calculateTileRelationshipScore", character)

		// const score = 1 *
		//   this.calculateCapacityScore() *
		//   this.calculateEnergyScore() *
		//   this.calculateGearScore() *
		//   this.calculateHealthScore() *
		//   this.calculateSatietyScore()

		const score =
			(this.calculateCapacityScore(character) +
				this.calculateEnergyScore(character) +
				this.calculateGearScore(character) +
				this.calculateHealthScore(character) +
				this.calculateSatietyScore(character)) /
			5;

		// console.log("calculateTileRelationshipScore - calculate method results",
		//   this.tile,
		//   this.calculateCapacityScore(character),
		//   this.calculateEnergyScore(character),
		//   this.calculateGearScore(character),
		//   this.calculateHealthScore(character),
		//   this.calculateSatietyScore(character),
		//   score
		// )

		return score;
	}
}
