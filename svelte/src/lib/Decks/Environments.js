// actual environments probably won't use a modifier function for anything in the way that jobs do,
// but I'm leaving the stubs in place for an example if I do need a function or more properties or whatever

// environment ideas to maybe do something with
/*
- underwater realm
- desert realm
- 
*/
import OriginTown from '../Environments/OriginTown';

import TheAncientMountains from '../Environments/TheAncientMountains';
import TheForbiddenForest from '../Environments/TheForbiddenForest';
import TheMagicalForest from '../Environments/TheMagicalForest';
import TheMedievalLands from '../Environments/TheMedievalLands';
import TheOceanShores from '../Environments/TheOceanShores';
import TheRiverLands from '../Environments/TheRiverLands';
import TheSwampyMarshes from '../Environments/TheSwampyMarshes';

export default class Environments {
	constructor(things) {
		this.name = things.name;
		this.multiplier = things.multiplier;
	}

	static cards() {
		return [
			new TheMedievalLands(),
			new TheAncientMountains(),
			new TheForbiddenForest(),
			new TheMagicalForest(),
			new TheOceanShores(),
			new TheRiverLands(),
			new TheSwampyMarshes()
		];
	}

	static deal(numberOfCards) {
		console.error("Environment.deal was called and I don't know what it is supposed to do");
		// const deck = Jobs.cards()
		// return deck[Dice.range(0, deck.length - 1)]
	}

	static originTown() {
		return new OriginTown();
	}
}
