import Dice from '$lib/Dice'
import Move from '$lib/Move'

const run = () => {
	console.error('Default Encounter.run used')
};

export default class Encounter {
	constructor(options) {
		this.description = options.description
		this.name = options.name

		this.run = options?.run ?? run
	}

	static TestAttributes() {
		// RMD TODO start here
		return new Encounter({
			description: 'An encounter that tests the dominant attributes of this region',
			name: 'Attribute test',
			run: (params) => {
				const {characters, chests} = params

				console.log("Running TestAttributes Encounter for characters", characters)

				const currentTile = characters[0].currentTile

				const encounterScore = (score, character)  => {
					console.log("a loop with character", character, currentTile, score, currentTile.region.personality,
					
						character.getAttribute(currentTile.region.personality)
					)
					return Math.ceil((score
						+ character.getAttribute(currentTile.region.personality).apparent
						+ character.getAttribute(currentTile.region.physicality).apparent
					) / 3)
				}

				const charactersEncounterScore = characters.reduce(encounterScore, Dice.d100())

				// Generate mobs and their encounter score
				const opponents = currentTile.generateOpponents()
				const mobsEncounterScore = opponents.reduce(encounterScore, Dice.d100())
			
				let description = "An Encounter!"
				if(charactersEncounterScore >= mobsEncounterScore) {
					// characters win
					console.log("chars win")

					// update each character's tile relationship with victory details
					// also build list of characters with space
					const charactersWithCapacity = []
					characters.forEach(character => {
						if(character.getCapacity() > 0) {
							charactersWithCapacity.push(character) 
						}

						character.victoryOnTile(currentTile)
					})

					console.log("cwithcap", charactersWithCapacity)

					// acquire and distribute loot
					let lootCurrency = 0
					let lootItems = []
					opponents.forEach(opponent => {
						lootCurrency += opponent.loot.currency
						lootItems = [...lootItems, opponent.loot().items]
					})

					// allocate items
					while(lootItems.length > 0) {
						// pick a piece of loot
						const lootIndex = Dice.roll(lootItems.length - 1)
						const item = lootItems.splice(lootIndex, 1)[0]

						// pick a character with backpack space
						const characterIndex = Dice.roll(charactersWithCapacity.length - 1)
						
						// add piece of loot to picked character's backpack
						charactersWithCapacity[characterIndex].backpack().contain(item)
					}

					// divvy up currency
					console.log("DIVVY UP CURRENCY", characters, lootCurrency)

					description += " The party is victorious!"
					
				} else {
					console.log("chars lose whomp whomp")
					// characters lose. impact?
					// tile relationship updated to indicate the character cannot handle the tile
					// characters/party get moved one tile closer to hub
					//		this one might be weird because the party will have to have its tile updated
					characters.forEach(character => {
						character.defeatOnTile(currentTile)
					})

					description += " The party is defeated!"
				}

				console.log("Finished TestAttributes Encounter", description)

				return {
					characters,
					move: Move.other(description),
					chests
				}
			}
		})
	}

	static NothingHappens() {
		return new Encounter({
			description: 'Nothing happened',
			name: 'Nothing happened',
			run: (params) => {
				const {characters, chests} = params
				
				let move = Move.other(this.description);

				return {
					characters,
					move,
					chests
				};
			}
		});
	}

	static ReturnWinCondition(tile) {

		const storeItemInTile = (item) => {
			tile.storeItem(item)
		}

		return new Encounter({
			description: 'The Win Condition is returned to its rightful place',
			name: 'The Win Condition is Returned!',

			run: (params) => {
				const {characters, chests} = params
				
				let move = Move.other("The Win Condition's rightful place has been found")

				// if any of the characters has the win condition
				// remove it from them
				// somehow indicating that the game has been won? 
				characters.forEach(character => {
					const item = character.lootWinConditionItem()

					if (item) {
						storeItemInTile(item)
					}
				});

				return {
					characters,
					move,
					chests
				}
			}
		})
	}
}
