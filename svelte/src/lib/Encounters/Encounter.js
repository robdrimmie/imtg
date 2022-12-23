import Dice from '$lib/Dice'
import Move from '$lib/Move'

const modifyCharacters = (memberCharacters) => {
	console.error('Default Encounter.modifyCharacters used')
	return memberCharacters
};

const runForCharacters = () => {
	console.error('Default Encounter.run used')
};

export default class Encounter {
	constructor(options) {
		this.description = options.description
		this.name = options.name
		this.modifyCharacters = options?.modifyCharacters ?? modifyCharacters

		this.runForCharacters = options?.runForCharacters ?? runForCharacters
	}

	static TestAttributes() {
		// RMD TODO start here
		return new Encounter({
			description: 'An encounter that tests the dominant attributes of this region',
			name: 'Attribute test',
			runForCharacters: (characters) => {
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

				console.log("charactersEncounterScore", charactersEncounterScore)

				// Generate mobs and their encounter score
				const opponents = currentTile.generateOpponents()
				const mobsEncounterScore = opponents.reduce(encounterScore, Dice.d100())

				console.log("mobsEncounterScore", mobsEncounterScore)
			
				if(charactersEncounterScore >= mobsEncounterScore) {
					// characters win
					
					// update each character's tile relationship with victory details
					// also build list of characters with space
					const charactersWithCapacity = []
					characters.forEach(character => {
						if(character.getCapacity() > 0) {
							charactersWithCapacity.push(character) 
						}

						character.victoryOnTile(currentTile)
					})

					// acquire and distribute loot
					let loot = []
					opponents.forEach(opponent => {
						loot = [...loot, opponent.loot]
					})

					while(loot.length > 0) {
						// pick a character with backpack space
						// pick a piece of loot
						// add piece of loot to picked character's backpack
					}
					
				} else {
					// characters lose. impact?
					// tile relationship updated to indicate the character cannot handle the tile
					// characters/party get moved one tile closer to hub
					//		this one might be weird because the party will have to have its tile updated
					characters.forEach(character => {
						character.defeatOnTile(currentTile)
					})
				}

				

				console.log("Finished TestAttributes Encounter")
			},
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				let move = Move.other(this.description);
				let characters = [...charactersToModify];

				return {
					characters,
					move,
					chests
				};
			}
		})
	}

	static NothingHappens() {
		return new Encounter({
			description: 'Nothing happened',
			name: 'Nothing happened',
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				let move = Move.other(this.description);
				let characters = [...charactersToModify];

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

			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				let move = Move.other("The Win Condition's rightful place has been found")
				let characters = [...charactersToModify]

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
