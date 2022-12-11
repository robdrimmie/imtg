import Board from './Board.js'
import Dice from '../Dice.js'

Dice.primeWithSeed(20)
// #region test static methods

// #endregion test static methods

// #region test constructor
it('it constructs', async () => {
	new Board()
})
// #endregion test constructor

// #region test instance methods

// it('it knows when it is Origin', async () => {
//   const underTest = Hex.ORIGIN
//   const actual = underTest.isOrigin()

//   expect(actual).toBeTruthy()
// })
// #endregion test instance methods
