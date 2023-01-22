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
		let drawnCards = []

		if(drawnCards.length <= numberOfCardsToDraw ) {
			// not enough cards so return the rest
			drawnCards = [...this.cards]
			this.cards = []
		} else {
			// pull out the requested number of cards, one at a time, randomly
			for (let cardsDrawn = 0; cardsDrawn < numberOfCardsToDraw; cardsDrawn++) {
				const cardIndex = Dice.roll(this.cards.length) - 1;
				const card = this.cards.splice(cardIndex, 1);
	
				drawnCards.push(card[0])
			}	
		}
		
		// console.log("deck.draw drew cards", drawnCards.length, numberOfCardsToDraw)
		
		return drawnCards;
	}

	drawOne() {
		const drawnCards = this.draw(1)
		
		return drawnCards.length > 0
			? this.draw(1)[0]
			: null
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

		return Deck.SIZE_UNLIMITED;
	}
}
