import Board from './Board';

// #region test static methods

// #endregion test static methods

// #region test constructor
it('it requires props to construct', async () => {
	expect(() => {
		new Board();
	}).toThrow(Board.ERROR_NEEDS_PROPS);
});
// #endregion test constructor

// #region test instance methods

// it('it knows when it is Origin', async () => {
//   const underTest = Hex.ORIGIN
//   const actual = underTest.isOrigin()

//   expect(actual).toBeTruthy()
// })
// #endregion test instance methods
