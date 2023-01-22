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

		// console.log("cards length - A", this.cards.length, numberOfCardsToDraw)

		// console.log("draw", numberOfCardsToDraw, this.cards.length, this.cards)
		if(numberOfCardsToDraw >= this.cards.length ) {
			// console.log("cards length - B1", this.cards.length)
			// not enough cards so return the rest
			drawnCards = [...this.cards]

			// console.log("not enough, drawnCards", drawnCards, this.cards)
			this.cards = []
		} else {
			// console.log("cards length - B2", this.cards.length, numberOfCardsToDraw)
			// pull out the requested number of cards, one at a time, randomly


			while(drawnCards.length < numberOfCardsToDraw) {
				// console.log("cards length - C", this.cards.length, drawnCards.length, drawnCards.length < numberOfCardsToDraw)
				
				const cardIndex = Dice.roll(this.cards.length) - 1;
				// console.log("cards length - D", this.cards.length)

				const card = this.cards.splice(cardIndex, 1);
				// console.log("cards length - E", this.cards.length, card)
	
				drawnCards.push(card[0])	
				
				// console.log("drawncards length", drawnCards.length, drawnCards.length < numberOfCardsToDraw)
			}

			// for (let cardsDrawn = 0; cardsDrawn < numberOfCardsToDraw; cardsDrawn++) {

			// 	console.log("cards length - C", this.cards.length, cardsDrawn)
			// 	// console.log("loop", cardsDrawn, numberOfCardsToDraw, cardsDrawn < numberOfCardsToDraw)
				
			// 	const cardIndex = Dice.roll(this.cards.length) - 1;
			// 	console.log("cards length - D", this.cards.length)
			// 	// console.log("CAAARD len bef", this.cards.length)
			// 	const card = this.cards.splice(cardIndex, 1);
			// 	console.log("cards length - E", this.cards.length)
			// 	// console.log("CAAARD", card, this.cards.length)
	
			// 	drawnCards.push(card[0])
			// }	
		}
		// console.log("deck.draw drew cards", drawnCards.length, numberOfCardsToDraw)
		
		// console.log("cards length - Z", this.cards.length)
		return drawnCards;
	}

	drawOne() {
		const drawnCards = this.draw(1)
		// console.log("drawOne", drawnCards)

		return drawnCards.length > 0
			? drawnCards[0]
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
