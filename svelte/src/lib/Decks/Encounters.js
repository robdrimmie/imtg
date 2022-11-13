import Combat from '../Encounters/Combat';
import Gear from '../Encounters/Gear';
import Move from '$lib/Move';
import Rest from '../Encounters/Rest';
import Trait from '../Encounters/Trait';
import Trap from '../Encounters/Trap';
import QuestItems from '$lib/Decks/QuestItems';

export default class Encounters {
	static get ALL() {
		return [Combat, Gear, Rest, Trait, Trap];
	}

	static get ADVENTURE() {
		return [Combat, Gear, Trait, Trap];
	}

	static get REST() {
		return [Rest];
	}

	static get VENDOR() {
		return [
			// Potions,
			// Weapons, etc
		];
	}

	constructor(things) {
		this.description = things.description;
		this.name = things.name;
		this.modifyCharacters = things.modifyCharacters;
	}

	// Encounter iteself doesn't have any cards of its own,
	// but will return the cards for the passed subsets
	static cards(decks = []) {
		let cards = [];
		decks.forEach((deck) => {
			// console.log("cards in deck", deck, deck.cards())
			cards = cards.concat(deck.cards());
		});

		return cards;
	}

	// The existance of this method betrays the lie in the comment for cards but I'm
	// not entirely convinced this is in the right spot so perhaps in time it will change
	static Nothing() {
		const description = 'Time passes with no incident';
		return {
			description,
			name: 'Nothing Happens',
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				const move = new Move(Move.TYPE_OTHER_MESSAGES, {}, description);

				const characters = Array.from(charactersToModify);
				return {
					characters,
					move,
					chests
				};
			}
		};
	}

	static WinCondition() {
		return new Encounters({
			description: 'The Win Condition is Acquired!',
			name: 'Win Condition Encounter',
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params

				let characters = [...charactersToModify];

				const move = new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					`The party discovered the win condition item!`
				);

				// need to make sure if no one can carry we just move on
				// so whenever a character is at capacity, add their id to this array.
				// there are cleaner ways to do this I'm sure but it works okay for now.
				let modCharIndex = 0;
				let capacityCharacterIds = [];
				while (
					modCharIndex < characters.length &&
					capacityCharacterIds.length < characters.length
				) {
					if (characters[modCharIndex].backpack().capacity > 0) {
						characters[modCharIndex].backpack().contain(QuestItems.winCondition());

						move.moves = [
							...move.moves,
							new Move(
								Move.TYPE_OTHER_MESSAGES,
								{},
								`${characters[modCharIndex].name} has acquired the Win Condition item!`
							)
						];
					} else {
						move.moves = [
							...move.moves,
							new Move(
								Move.TYPE_OTHER_MESSAGES,
								{},
								`${characters[modCharIndex].name} can't carry the Win Condition item!`
							)
						];

						console.error("the party can't carry the win condition item");
					}

					modCharIndex++;
					if (modCharIndex > characters.length) {
						modCharIndex = 0;
					}
				}

				return {
					characters,
					move,
					chests
				};
			}
		});
	}
}
