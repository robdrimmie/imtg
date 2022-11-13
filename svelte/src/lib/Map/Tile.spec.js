import Dice from '../Dice'
import Hex from './Hex';
import Tile from './Tile';
import TheRiverLands from '../Environments/TheRiverLands';

it('it can generate opponents', async () => {

});


// #region test static methods
it('it can find a tile in a haystack given a hex instance', async () => {
	const needle = Hex.ORIGIN;

	const haystack = [
		new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS),
		new Tile(new TheRiverLands(), Hex.NOWARDS),
		new Tile(new TheRiverLands(), Hex.RIGHT_UPWARDS)
	];

	const actual = Tile.findTileForHex(needle, haystack);
	expect(actual).toBeTruthy();
});



it('it does not find a tile if it is not in the haystack', async () => {
	const needle = Hex.ORIGIN;
	const haystack = [
		new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS),
		new Tile(new TheRiverLands(), Hex.RIGHT_UPWARDS)
	];

	const actual = Tile.findTileForHex(needle, haystack);
	expect(actual).toBeUndefined();
});

// #endregion test static methods

// #region test instance methods
it('it can find itself in a haystack', async () => {
	const needle = Tile.origin();

	const haystack = [
		new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS),
		new Tile(new TheRiverLands(), Hex.NOWARDS),
		new Tile(new TheRiverLands(), Hex.RIGHT_UPWARDS)
	];

	// Hex.NOWARDS and Tile.origin() have the same coordinates
	const actual = needle.findSelfInHaystack(haystack);
	expect(actual).toBeTruthy();
});

it('it does not find itself if not a haystack', async () => {
	const needle = Tile.origin();
	const haystack = [
		new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS),
		new Tile(new TheRiverLands(), Hex.RIGHT_UPWARDS)
	];

	const actual = needle.findSelfInHaystack(haystack);
	expect(actual).toBeUndefined();
});

it('can generate opponents with the quality strategy', async () => {
	Dice.primeWithSeed(20)
	const tile = new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS)

	let actual
	
	actual = tile.qualityStrategy(1);
	expect(actual.length).toEqual(1);

	actual = tile.qualityStrategy(6);
	expect(actual.length).toEqual(3);

	actual = tile.qualityStrategy(36);
	expect(actual.length).toEqual(1);
});

it('can generate opponents with the quantity strategy', async () => {
	Dice.primeWithSeed(20)
	const tile = new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS)

	let actual
	
	actual = tile.quantityStrategy(1);
	expect(actual.length).toEqual(1);

	actual = tile.quantityStrategy(6);
	expect(actual.length).toEqual(6);

	actual = tile.quantityStrategy(36);
	expect(actual.length).toEqual(36);
});

// This test won't be super awesome because I'm going to hardcode the value
// If it breaks it is probably because the order and/or number of dice rolls changed
// it is not awesome but I also don't want to mock a dozen dice rolls for it
it('calculates opponent budget correctly', async () => {
	Dice.primeWithSeed(20)

	const tileLeftDown = new Tile(new TheRiverLands(), Hex.LEFT_DOWNWARDS)
	const actualLeftDown = tileLeftDown.calculateOpponentBudget();
	expect(actualLeftDown).toEqual(6);

	const tileLeftestDownest = new Tile(
		new TheRiverLands(), 
		new Hex(6, -6, 0)	
	)
	const actualLeftestDownest = tileLeftestDownest.calculateOpponentBudget();
	expect(actualLeftestDownest).toEqual(36)
});
// #endregion test instance methods
