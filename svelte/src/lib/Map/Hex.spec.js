import Hex from './Hex';

// #region test static methods
it('it adds', async () => {
	const actual = Hex.add(Hex.ORIGIN, Hex.LEFT_WARDS);
	const expected = Hex.LEFT_WARDS;

	expect(actual.q).toEqual(expected.q);
	expect(actual.r).toEqual(expected.r);
	expect(actual.s).toEqual(expected.s);
});

it('it subtracts', async () => {
	const actual = Hex.add(Hex.ORIGIN, Hex.RIGHT_WARDS);
	const expected = Hex.RIGHT_WARDS;

	expect(actual.q).toEqual(expected.q);
	expect(actual.r).toEqual(expected.r);
	expect(actual.s).toEqual(expected.s);
});

it('it calculates distance', async () => {
	const actual = Hex.distance(Hex.ORIGIN, Hex.LEFT_WARDS);
	const expected = 1;

	expect(actual).toEqual(expected);
});

it('it calculates lengths', async () => {
	const actual = Hex.lengths(Hex.LEFT_UPWARDS);
	const expected = 1;

	expect(actual).toEqual(expected);
});

it('it returns all neighbours', async () => {
	const actual = Hex.neighboursOfCoordinate(Hex.ORIGIN);
	const expected = [
		Hex.LEFT_WARDS,
		Hex.LEFT_UPWARDS,
		Hex.RIGHT_UPWARDS,
		Hex.RIGHT_WARDS,
		Hex.RIGHT_DOWNWARDS,
		Hex.LEFT_DOWNWARDS
	];

	for (let index = 0; index < expected.length; index++) {
		expect(actual[index].q).toEqual(expected[index].q);
		expect(actual[index].r).toEqual(expected[index].r);
		expect(actual[index].s).toEqual(expected[index].s);
	}
});
// #endregion test static methods

// #region test constructor
it('validates during construction', async () => {
	expect(() => {
		new Hex(1, 2, 3);
	}).toThrow(Hex.INVALID_HEX_COORDINATES);
});
// #endregion test constructor

// #region test instance methods
it('it forks', async () => {
	const underTest = new Hex(Hex.LEFT_WARDS.q, Hex.LEFT_WARDS.r, Hex.LEFT_WARDS.s);

	const actual = underTest.forks();
	const expected = [Hex.LEFT_UPWARDS, Hex.LEFT_DOWNWARDS];

	for (let index = 0; index < expected.length; index++) {
		expect(actual[index].q).toEqual(expected[index].q);
		expect(actual[index].r).toEqual(expected[index].r);
	}
});

it('it identifies itself correctly', async () => {
	const underTest = Hex.ORIGIN;

	const actual = underTest.id();
	const expected = '000';

	expect(actual).toEqual(expected);
});

it('it knows when it is Origin', async () => {
	const underTest = Hex.ORIGIN;
	const actual = underTest.isOrigin();

	expect(actual).toBeTruthy();
});
// #endregion test instance methods
