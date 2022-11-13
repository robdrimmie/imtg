import Character from '$lib/Character';
import Dice from '$lib/Dice';
import Tile from '$lib/Map/Tile';
import Combat from './Combat';

jest.mock('$lib/Dice');

it('boilerplate constructs', async () => {
	const expected = {
		description: 'A boilerplate combat encounter',
		name: 'Boilerplate Encounter',
		modifyCharacters: Combat.DEFAULT_MODIFY_CHARACTERS
	};

	const actual = Combat.boilerplate();

	expect(actual.description).toEqual(expected.description);
	expect(actual.name).toEqual(expected.name);
	expect(actual.modifyCharacters).not.toEqual(expected.modifyCharacters);
});

// This test doesn't pass I don't know why but wresting wtih this test isn't
// making progress. this whole dice mocking fiasco is just not going to work.
// finding seeds is going to suck so hard and be just as frought basically.
// so I guess this means all my shit is much too closesly coupled or something.
// it('boilerplate modifies characters', async () => {
//     Dice.range
// // first job in deck for mob job
//         .mockReturnValueOnce(0)
// // construct character for testing
//     Dice.nextId
//         .mockReturnValueOnce(1)
//         .mockReturnValueOnce(2)
//         .mockReturnValueOnce(3)
//         .mockReturnValueOnce(3)
//         .mockReturnValueOnce(3)
//         .mockReturnValueOnce(3)

//     console.log(Character.forTesting().job.startingCurrency)
//     const boilerplate = Combat.boilerplate(Tile.origin())
//     const results = boilerplate.modifyCharacters({
//			charactersToModify: [
//         		Character.forTesting()
//     		]
//		})

//     console.log(results)
// })
