import Dice from './Dice';

export default class Deck {
	static SIZE_EMPTY = 'SIZE_EMPTY';
	static SIZE_SMALL = 'SIZE_SMALL';
	static SIZE_MEDIUM = 'SIZE_MEDIUM';
	static SIZE_LARGE = 'SIZE_LARGE';
	static SIZE_UNLIMITED = 'SIZE_UNLIMITED';

	// given an array, pick one element randomly
	static pickOneCard(cards) {
		const deck = new Deck(cards) 
		return deck.drawOne()
	}

	constructor(cards) {
		// console.log("Deck constructing with cards", cards)
		this.cards = [...cards] ?? [];
	}

	draw(numberOfCardsToDraw = 1) {
		if (this.cards.length < numberOfCardsToDraw) {
			// RMD TODO Investigate
			// I'm not sure what the behaviour should be if more cards are in the deck.
			// Probably it should return as many as it can and then anythign that cares about
			// how many actually get drawn needs to be concerned but I want an actual use case
			// for this before making this sort of conclusion
			console.error('Deck - draw - trying to pull more cards than are in the deck');
			return false;
		}

		let drawnCards = [];
		for (let cardsDrawn = 0; cardsDrawn < numberOfCardsToDraw; cardsDrawn++) {
			const cardIndex = Dice.roll(this.cards.length) - 1;
			const card = this.cards.splice(cardIndex, 1);

			drawnCards = [...drawnCards, card[0]];
		}
		console.log("deck.draw drew cards", drawnCards, numberOfCardsToDraw)
		return drawnCards;
	}

	drawOne(numberOfCardsToDraw = 1) {
		return this.draw(numberOfCardsToDraw)[0]
	}

	length() {
		return this.cards.length;
	}

	size() {
		if (this.length() < 1) {
			return Deck.SIZE_EMPTY;
		}

		if (this.length() < 20) {
			return Deck.SIZE_SMALL;
		}

		if (this.length() < 80) {
			return Deck.SIZE_MEDIUM;
		}

		if (this.length() < 100) {
			return Deck.SIZE_LARGE;
		}

		console.error('RETURNING UNLIMITED DECK SIZE IS THAT ON PURPOSE?');
		return Deck.SIZE_UNLIMITED;
	}
}
