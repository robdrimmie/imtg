// 20221210 2039 Traps seem like they are no longer necessary and the 
// randomizing changed so instead of updating all the rolls and stuff
// I'm just commenting it out with the expectation that this gets 
// deleted. 

// import Character from '$lib/Character';
// import Dice from '$lib/Dice';
// import Tile from '$lib/Map/Tile';
import Trap from './Trap';

// jest.mock('$lib/Dice');

// // #region test static methods
it('it constructs with defaults correctly', async () => {
	// console.log("running test 1")
	const expected = {
		description: Trap.DEFAULT_DESCRIPTION,
		name: Trap.DEFAULT_NAME,
		modifyCharacters: Trap.DEFAULT_MODIFY_CHARACTERS
	};

	const actual = new Trap();

	expect(actual.description).toEqual(expected.description);
	expect(actual.name).toEqual(expected.name);
	expect(actual.modifyCharacters().passed).toEqual(expected.modifyCharacters().passed);
});

// it('The trap was not spotted and not triggered', async () => {
// 	// console.log("running test 2")
// 	Dice.d100
// 		// roll high for difficulty forces party to miss trigger
// 		.mockReturnValueOnce(100)
// 		// roll value is subtracted from coordination modifer, so negative number makes it 
// 		// subtract a negative number, which makes the character's attribute really big
// 		.mockReturnValueOnce(-100);

// 	const actual = Trap.triggeredProjectile(Tile.origin()).modifyCharacters({
// 		charactersToModify: [Character.forTesting()]
// 	});

// 	expect(actual.move.moves[0].message).toMatch('The party did not trigger the trap.');
// });

// it('The trap was spotted and triggered while disarming and no characters were hit by any projectiles', async () => {
// 	// console.log("running test 3")
// 	Dice.d100
// 		// the trap was spotted
// 		.mockReturnValueOnce(0)
// 		// and easy enough for a best character to be found
// 		.mockReturnValueOnce(-100)
// 		// and triggered while disarming
// 		.mockReturnValueOnce(-100)
// 		// projectile coordination roll
// 		.mockReturnValueOnce(-100);

// 	Dice.d4
// 		// one or more projectiles
// 		.mockReturnValueOnce(2);

// 	const triggeredProjectile = Trap.triggeredProjectile(Tile.origin());

// 	const actual = triggeredProjectile.modifyCharacters({
// 		charactersToModify:[Character.forTesting()],
// 		chests:[]
// 	});

// 	expect(actual.move.moves[0].message).toMatch('Test Name spotted Triggered Projectile Trap');
// 	expect(actual.move.moves[1].message).toMatch('Test Name tries to disarm the Trap');
// 	expect(actual.move.moves[2].message).toMatch('The trap was triggered!');
// 	expect(actual.move.moves[3].message).toMatch('Test Name dodged all 2 projectiles!');
// });

// it('The trap was spotted but not triggered while disarming', async () => {
// 	// console.log("running test 4")
// 	Dice.d100
// 		// the trap was spotted
// 		.mockReturnValueOnce(0)
// 		// a best character was found
// 		.mockReturnValueOnce(-100)
// 		// but not triggered while disarming
// 		.mockReturnValueOnce(100);

// 	const triggeredProjectile = Trap.triggeredProjectile(Tile.origin());

// 	const actual = triggeredProjectile.modifyCharacters({
// 		charactersToModify:[Character.forTesting()],
// 		chests:[]
// 	});

// 	expect(actual.move.moves[0].message).toMatch('Test Name spotted Triggered Projectile Trap');
// 	expect(actual.move.moves[1].message).toMatch('Test Name tries to disarm the Trap');
// 	expect(actual.move.moves[2].message).toMatch('The trap was passed safelty!');
// 	expect(actual.move.moves[3].message).toMatch('The party did not trigger the trap.');
// });

// it('The trap was spotted but no one could disarm and was triggered and one or more characters were hit by one or more projectiles', async () => {
// 	// console.log("running test 5")
// 	Dice.nextId.mockReturnValueOnce(1);

// 	Dice.d100
// 		// the trap was spotted
// 		.mockReturnValueOnce(0)
// 		// but no one could disarm
// 		.mockReturnValueOnce(95)
// 		// and triggered while disarming
// 		.mockReturnValueOnce(-100)
// 		// characters were hit
// 		.mockReturnValueOnce(98)

// 	Dice.d4
// 		// 2 projectiles
// 		.mockReturnValueOnce(2);

// 	const triggeredProjectile = Trap.triggeredProjectile(Tile.origin());

// 	const actual = triggeredProjectile.modifyCharacters({
// 		charactersToModify:[Character.forTesting()],
// 		chests:[]
// 	});

// 	expect(actual.move.moves[0].message).toMatch('Test Name spotted Triggered Projectile Trap');
// 	expect(actual.move.moves[1].message).toMatch('Test Name tries to disarm the Trap');
// 	expect(actual.move.moves[2].message).toMatch('The trap was triggered!');
// 	expect(actual.move.moves[3].message).toMatch(
// 		'Test Name was hit by 2 projectiles changing health by -2'
// 	);
// });

// it('The trap was spotted but no one could disarm but not triggered by any of the characters in the party', async () => {
// 	// console.log("running test 6")
// 	Dice.d100
// 		// the trap was spotted
// 		.mockReturnValueOnce(0)
// 		// but no one could disarm
// 		.mockReturnValueOnce(98)
// 		// but not triggered while disarming
// 		.mockReturnValueOnce(97)


// 	const triggeredProjectile = Trap.triggeredProjectile(Tile.origin());

// 	const actual = triggeredProjectile.modifyCharacters({
// 		charactersToModify:[Character.forTesting()],
// 		chests:[]
// 	});

// 	expect(actual.move.moves[0].message).toMatch('Test Name spotted Triggered Projectile Trap');
// 	expect(actual.move.moves[1].message).toMatch('Test Name tries to disarm the Trap');
// 	expect(actual.move.moves[2].message).toMatch('The trap was passed safelty!');
// 	expect(actual.move.moves[3].message).toMatch('The party did not trigger the trap.');
// });

// it('The trap was not spotted and triggered by a character in the party and one or more characters were hit by one or more projectiles', async () => {
// 	// console.log("running test 7")
// 	Dice.nextId.mockReturnValueOnce(2);

// 	Dice.d100
// 		// the trap was not spotted
// 		.mockReturnValueOnce(100)
// 		// and triggered by a character
// 		.mockReturnValueOnce(100)
// 		// one or more characters were hit
// 		.mockReturnValueOnce(100)
// 		// item damage roll
// 		.mockReturnValueOnce(100)
// 		.mockReturnValueOnce(100);

// 	Dice.d4
// 		// one or more projectiles
// 		.mockReturnValueOnce(2);

// 	const actual = Trap.triggeredProjectile(Tile.origin()).modifyCharacters({
// 		charactersToModify:[Character.forTesting()],
// 		chests:[]
// 	});
	
// 	expect(actual.move.moves[0].message).toMatch(
// 		'Test Name accidentally triggered a Triggered Projectile Trap'
// 	);
// 	expect(actual.move.moves[1].message).toMatch(
// 		'Test Name was hit by 2 projectiles changing health by -2'
// 	);
// });
