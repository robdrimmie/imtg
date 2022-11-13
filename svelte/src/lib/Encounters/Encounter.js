import Move from '$lib/Move';

const modifyCharacters = (memberCharacters) => {
	console.error('Default Encounter.modifyCharacters used');
	return memberCharacters;
};

export default class Encounter {
	constructor(options) {
		this.description = options.description;
		this.name = options.name;
		this.modifyCharacters = options?.modifyCharacters ?? modifyCharacters;
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
