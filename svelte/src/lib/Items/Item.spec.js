import Character from '$lib/Character';
import Dice from '$lib/Dice';
import Item from '$lib/Items/Item';
import Modifiers from '$lib/Modifiers';

// jest.mock('$lib/Dice');

it('it foo bar', async () => {
})

// // #region test static methods
// it('it decreases health', async () => {
// 	Dice.d100
// 		// will be rounded up to 2 hp to remove
// 		.mockReturnValueOnce(12)

// 	const effectiveness = Modifiers.EFFECTIVENESS_VERY_LOW;

// 	const item = Item.ofDecreaseHealth(effectiveness);

// 	const actual = item.modifyCharacter(Character.forTesting());

// 	// console.log(actual)
// 	expect(actual.modifiedCharacter.getCurrentHealth()).toEqual(8);
// });
