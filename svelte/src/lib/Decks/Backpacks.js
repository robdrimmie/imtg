import Container from '../Items/Container';

export default class Backpack {
	constructor(things) {
		this.description = things.description;
		this.name = things.name;
		this.multiplier = things.multiplier;
	}

	static cards() {
		return [Backpack.ofTenSlots(), Backpack.ofFifteenSlots()];
	}

	static ofXSlots(x) {
		return Container.Backpack(x, `Holds ${x} items`, `Backpack of ${x} Slots`, 0);
	}

	static ofTenSlots() {
		return Backpack.ofXSlots(10);
	}

	static ofFifteenSlots() {
		return Backpack.ofXSlots(15);
	}
}
