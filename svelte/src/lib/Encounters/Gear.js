export default class Gear {
	constructor(options) {
		this.description = options.description;
		this.name = options.name;
		this.multiplier = options.multiplier;
	}

	static cards() {
		return [Gear.gearCheck()];
	}

	static gearCheck() {
		return new Gear({
			description: 'Checks for presence of specific gear',
			name: 'Gear Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}
}
