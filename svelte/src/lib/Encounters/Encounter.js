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

	static TestAttributes() {
		return new Encounter({
			description: 'An encounter that tests the dominant attributes of this region',
			name: 'Attribute Test',
			run: (params) => {
				console.log("Encounter running with params", params)
				const {characters, chests} = params

				const currentTile = characters[0].currentTile

				const encounterScore = (score, character)  => {
					console.log("escore", score, character)

					const personalityScore = currentTile.region.personality === null 
						? character.getPersonalityAverage()
						: character.getAttribute(currentTile.region.personality).apparent

					const physicalityScore = currentTile.region.physicality === null 
						? character.getPhysicalityAverage()
						: character.getAttribute(currentTile.region.physicality).apparent

					return Math.ceil((score
						+ personalityScore
						+ physicalityScore
					) / 3)
				}

				const charactersEncounterScore = characters.reduce(encounterScore, Dice.d100())

				// Generate mobs and their encounter score
				const opponents = currentTile.generateOpponents()
				const mobsEncounterScore = opponents.reduce(encounterScore, Dice.d100())
			
				let description = "An Encounter!"
				let lootCurrency = 0
				let lootItems = []

				// characters win
				if(charactersEncounterScore >= mobsEncounterScore) {
					// update each character's tile relationship with victory details
					// also build list of characters with space
					let charactersWithCapacity = []
					characters.forEach(character => {
						if(character.getCapacity() > 0) {
							charactersWithCapacity.push(character) 
						}

						character.victoryOnTile(currentTile)
					})

					// acquire and distribute loot
					opponents.forEach(opponent => {
						lootCurrency += opponent.currency
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

						// ensure only those with capacity remain eligible
						charactersWithCapacity = []
						characters.forEach(character => {
							if(character.getCapacity() > 0) {
								charactersWithCapacity.push(character) 
							}

							character.victoryOnTile(currentTile)
						})
					}

					description += " The party is victorious!"
				} else {
					console.error("chars lose whomp whomp STILL NEED TO HANDLE")
					// characters lose. impact?
					// tile relationship updated to indicate the character cannot handle the tile
					// characters/party get moved one tile closer to hub
					//		this one might be weird because the party will have to have its tile updated
					characters.forEach(character => {
						character.defeatOnTile(currentTile)
					})

					description += " The party is defeated!"
				}

				const lootShare = Math.floor(lootCurrency / characters.length)
				const lootRemainder = lootCurrency % characters.length

				characters.forEach(character => {
					character.currency += lootShare
				})

				// todo it's not fair that the first character gets the remainder but that's what happens here
				characters[0].currency += lootRemainder

				return {
					characters,
					move: Move.other(description),
					chests
				}
			}
		})
	}
}
