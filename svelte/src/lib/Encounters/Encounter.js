import Move from '$lib/Move'

const modifyCharacters = (memberCharacters) => {
	console.error('Default Encounter.modifyCharacters used')
	return memberCharacters
};

const runForParty = () => {
	console.error('Default Encounter.run used')
};

export default class Encounter {
	constructor(options) {
		this.description = options.description
		this.name = options.name
		this.modifyCharacters = options?.modifyCharacters ?? modifyCharacters

		this.runForParty = options?.runForParty ?? runForParty
	}

	static TestAttributes() {
		// RMD TODO start here
		return new Encounter({
			description: 'An encounter that tests the dominant attributes of this region',
			name: 'Attribute test',
			runForParty: (party) => {
				console.log("Running TestAttributes Encounter")

				// Generate mobs
				const mobs = party.tile.generateOpponents()
				// console.log("generated mobs", mobs)

				// while combat is active
				let isActive = true
				let loopBreaker = 0
			
				// console.log("Combat - runInitiative", characters, opponents)
			
				// the combat loop
				while (isActive && ++loopBreaker < 50) {
					//	each party member attacks the first living mob
					party.memberCharacters.forEach(member => {

					})

					//  each mob attacks the first living party member
					mobs.forEach(mob => {

					})

					//	if one side or the other is dead, combat deactivates
					if (false) {
						isActive = false
					}

					loopBreaker++ 
				}

				// Distribute loot

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
