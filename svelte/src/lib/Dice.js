// https://npm.io/package/prando
import Prando from 'prando';

/*
the Dice class is where all randomization stuff must take place 
because this is where the seeded instance of randoma is, so that 
way everything that needs randomization must be supported
*/

let _instance;

export default class Dice {
	constructor(seed) {
		seed = seed ? seed : 20;
		this.rng = new Prando(seed);

		// RMD TODO should this be in Dice?
		// I mean, no. But it is convenient since Dice is already in a lot of places. So for now, yes.
		this.nextId = 1;
	}

	getNextId() {
		return this.nextId++;
	}

	range(min, max) {
		return this.rng.nextInt(min, max);
	}

	roll(sides, count = 1) {
		// console.log(`rolling ${count} d${sides}(s)`)

		var countIndex = 0,
			total = 0;
		for (countIndex = 0; countIndex < count; countIndex++) {
			total += Math.floor(this.range(1, sides), Math.floor(sides));
		}

		return total;
	}

	static instance() {
		if (!_instance) {
			console.error('DICE MUST BE PRIMED WITH A SEED!!!!!');
			return;
		}

		return _instance;
	}

	static primeWithSeed(seed) {
		_instance = new Dice(seed);
	}

	static range(min, max) {
		return Dice.instance().range(min, max);
	}

	static roll(sides, count = 1) {
		return Dice.instance().roll(sides, count);
	}

	static d2(count = 1) {
		return Dice.roll(2, count);
	}

	static d4(count = 1) {
		return Dice.roll(4, count);
	}

	static d6(count = 1) {
		return Dice.roll(6, count);
	}

	static d8(count = 1) {
		return Dice.roll(8, count);
	}

	static d10(count = 1) {
		return Dice.roll(10, count);
	}

	static d12(count = 1) {
		return Dice.roll(12, count);
	}

	static d20(count = 1) {
		return Dice.roll(20, count);
	}

	static d100(count = 1) {
		return Dice.roll(100, count);
	}

	static nextId() {
		return Dice.instance().getNextId();
	}
}
