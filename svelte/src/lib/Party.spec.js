import Dice from './Dice'
import Party from './Party'

it('it works', async () => {
	Dice.primeWithSeed(20)

	const props = {}

	const party = new Party(props)
	
    // console.log("party", party)

	expect(party.name).toBe('Group of Friends to All')
});

// rmd todo: a collection of tests to validate chooseActionAndTile
