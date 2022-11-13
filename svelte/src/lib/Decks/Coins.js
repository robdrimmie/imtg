import Dice from '../Dice';

export default class Coins {
	constructor(things) {
		this.description = things.description;
		this.name = things.name;
		this.multiplier = things.multiplier;
	}

	static cards() {
		return [Coins.smallPurse()];
	}

	static smallPurse() {
		return new Coins({
			description: 'Contains 1d10 units of currency',
			name: 'Purse with Currency',
			multiplier: (toModify, modificationConsiderations) => {
				let modifiedValue = toModify;

				if (modificationConsiderations?.currency) {
					modifiedValue = toModify + Dice.d10();
				}

				return modifiedValue;
			}
		});
	}
}
