const performCheck = () => {
	return { passed: false, loot: [] };
};

export default class Trait {
	constructor(options) {
		this.description = options?.description ?? 'No description supplied to constructor';
		this.name = options?.name ?? 'No name supplied to constructor';
		this.performCheck = options?.performCheck ?? performCheck;
	}

	static cards() {
		return [
			Trait.personalityAgreeableness(),
			Trait.personalityConscientiousness(),
			Trait.personalityExtraversion(),
			Trait.personalityNeuroticism(),
			Trait.personalityOpenness(),
			Trait.physicalityAwareness(),
			Trait.physicalityBrawn(),
			Trait.physicalityCoordination(),
			Trait.physicalityEndurance(),
			Trait.physicalityMagnetism()
		];
	}

	static personalityAgreeableness() {
		return new Trait({
			description: 'Checks for threshold value of personalityAgreeableness score',
			name: 'personalityAgreeableness Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait personalityAgreeableness', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static personalityConscientiousness() {
		return new Trait({
			description: 'Checks for threshold value of personalityConscientiousness score',
			name: 'personalityConscientiousness Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait personalityConscientiousness', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static personalityExtraversion() {
		return new Trait({
			description: 'Checks for threshold value of personalityExtraversion score',
			name: 'personalityExtraversion Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait personalityExtraversion', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static personalityNeuroticism() {
		return new Trait({
			description: 'Checks for threshold value of personalityNeuroticism score',
			name: 'personalityNeuroticism Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait personalityNeuroticism', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static personalityOpenness() {
		return new Trait({
			description: 'Checks for threshold value personalityOpenness trait score',
			name: 'personalityOpenness Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait personalityOpenness', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static physicalityAwareness() {
		return new Trait({
			description: 'Checks for threshold value physicalityAwareness trait score',
			name: 'physicalityAwareness Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait physicalityAwareness', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static physicalityBrawn() {
		return new Trait({
			description: 'Checks for threshold physicalityBrawn of trait score',
			name: 'physicalityBrawn Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait physicalityBrawn', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static physicalityCoordination() {
		return new Trait({
			description: 'Checks for threshold value of physicalityCoordination score',
			name: 'physicalityCoordination Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait physicalityCoordination', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static physicalityEndurance() {
		return new Trait({
			description: 'Checks for threshold value physicalityEndurance trait score',
			name: 'physicalityEndurance Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait physicalityEndurance', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}

	static physicalityMagnetism() {
		return new Trait({
			description: 'Checks for threshold value physicalityMagnetism trait score',
			name: 'physicalityMagnetism Trait Check',
			performCheck: (thingToCheck, considerationsWhenChecking) => {
				let passed = false;
				let loot = [];

				console.log('trait physicalityMagnetism', thingToCheck, considerationsWhenChecking);
				if (considerationsWhenChecking?.property === thingToCheck?.property) {
					passed = true;
					loot = [];
				}

				return { passed, loot };
			}
		});
	}
}
