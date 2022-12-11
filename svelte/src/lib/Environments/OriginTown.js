import Deck from '../Deck';
import Encounters from '../Decks/Encounters';
import Environment from './Environment';
import Rest from '../Encounters/Rest';
import Vend from '$lib/Encounters/Vend'

export default class OriginTown extends Environment {
	constructor() {
		super();

		this.name = 'Origin Town';
		this.color = 'chocolate';
	}

	startingDecks() {
		return {
			adventuring: new Deck([
				// No adventuring in Origin Town!
			]),

			foraging: new Deck(
				[Encounters.Nothing()]
			),

			resting: new Deck(
				Array(999).fill(Rest.complete())
			),

			vending: new Deck(
				Array(999).fill(Vend.unloadBackpacks())
			)
		};
	}
}
