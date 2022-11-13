import Dice from '../Dice';

export default class Names {
	static character() {
		const namePieces = [];
		const namePiecesToMake = Dice.roll(3);

		// A name piece is like a first name, last name, middle name, yadda yadda
		for (let pieceIndex = 0; pieceIndex <= namePiecesToMake; pieceIndex++) {
			let namePiece = '';
			const syllablesToMake = Dice.roll(2);

			for (let syllableIndex = 0; syllableIndex <= syllablesToMake; syllableIndex++) {
				let syllable = '';
				// There will be apostrophes
				if (Dice.d100() < 5) {
					syllable = "'";
				} else {
					const lettersInSyllable = Dice.d4();
					for (let letterIndex = 0; letterIndex < lettersInSyllable; letterIndex++) {
						syllable += String.fromCharCode(Dice.roll(26) + 97); // start at lower case "a" ASCII value
					}
				}

				namePiece += syllable;
			}

			// bit of a hacky UCFirst
			namePieces.push(namePiece.charAt(0).toUpperCase() + namePiece.slice(1));
		}

		const fullName = namePieces.join(' ');
		return fullName;
	}

	static party() {
		const possibleCollectives = ['Band', 'Club', 'Group', 'Guild'];

		const possibleNouns = ['Adventurers', 'Merry Folk', 'Friends to All'];

		// like madlibs. all need to take the same params
		const possibleNames = [
			(collective, noun) => `${collective} of ${noun}`,
			(collective, noun) => `The ${noun} ${collective}`
		];

		// Pick the things for the blank words in the madlib
		const collectiveIdx = Dice.range(0, possibleCollectives.length - 1);
		const collective = possibleCollectives[collectiveIdx];

		const nounIdx = Dice.range(0, possibleNouns.length - 1);
		const noun = possibleNouns[nounIdx];

		// run the madlib function with the selected words
		const nameIdx = Dice.range(0, possibleNames.length - 1);
		const nameFunction = possibleNames[nameIdx];
		const result = nameFunction(collective, noun);

		return result;
	}
}
