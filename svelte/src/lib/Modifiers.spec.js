import Modifiers from '$lib/Modifiers.js'

it('higher is better works as expected', async () => {
	expect(Modifiers.convertPercentageToScore(.5)).toBe(1)
	expect(Modifiers.convertPercentageToScore(.25)).toBe(0.5)
	expect(Modifiers.convertPercentageToScore(.75)).toBe(1.5)
	expect(Modifiers.convertPercentageToScore(1)).toBe(2)

	expect(Modifiers.convertPercentageToScore(.9, .9)).toBe(1)
	expect(Modifiers.convertPercentageToScore(.1, .9)).toBe(0.11111111111111112)
	expect(Modifiers.convertPercentageToScore(.82, .9)).toBe(0.911111111111111)
	expect(Modifiers.convertPercentageToScore(.91, .9)).toBe(1.1)
	expect(Modifiers.convertPercentageToScore(1, .9)).toBe(2)
});

it('lower is better works as expected', async () => {
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.00)).toBe(2)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.25)).toBe(1.5)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.50)).toBe(1)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.75)).toBe(0.5)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(1.00)).toBe(0)
	
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.00, .1)).toBe(2)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.01, .1)).toBe(1.9)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.09, .1)).toBe(1.1)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.11, .1)).toBe(0.9888888888888889)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.99, .1)).toBe(0.011111111111111072)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(0.10, .1)).toBe(1)
	expect(Modifiers.convertPercentageToScoreLowerIsBetter(1.00, .1)).toBe(0)
});

it('defaultSetPoints default behaviour', async () => {
	const actual = Modifiers.defaultSetPoints()
	expect(actual[0].x).toBe(0)
	expect(actual[1].y).toBe(2)
})

// rmd todo refactor - Jest has expect().toThrow() but I couldn't figure out what I was doing wrong
it('working validates setpoints', async () => {	
	try {
		Modifiers.working(
			.2, 
			[
				{x: .75, y: 1.5},
				{x: .25, y: .5},
				{x: .5, y: 1},
			]
		)
	} catch (e) {
		expect(e.message).toBe("Invalid setpoints!")
		return
	}

	expect(false).toBe(true)
})

it('validateSetPoints enforces 0.0 <= x <= 1.0', async() => {
	expect(
		Modifiers.validateSetPoints([{x: -0.1, y: 1.0}])
	).toBe(false)

	expect(
		Modifiers.validateSetPoints([{x: 1.01, y: 1.0}])
	).toBe(false)
})

it('validateSetPoints enforce 0.0 <= y <= 2.0', async() => {
	expect(
		Modifiers.validateSetPoints([{x: 0.0, y: -0.1}])
	).toBe(false)

	expect(
		Modifiers.validateSetPoints([{x: 0.0, y: 2.01}])
	).toBe(false)
})

it('validateSetPoints enforces point[0].x === 0.0', async() => {
	expect(
		Modifiers.validateSetPoints([{x: .5, y: 1.0}])
	).toBe(false)
})

it('validateSetPoints enforces point[point.length -1].x === 1.0', async() => {
	expect(
		Modifiers.validateSetPoints([{x: .5, y: 1.0}])
	).toBe(false)
})

it('validateSetPoints enforces current.x > previous.x', async() => {
	expect(
		Modifiers.validateSetPoints([
			{x: 0.0, y: 1.0},
			{x: .75, y: 1.0},
			{x: .25, y: 1.0},
			{x: 1.0, y: 1.0},
		])
	).toBe(false)
})

it('validateSetPoints enforces current.x < next.x', async() => {
	const actual = Modifiers.validateSetPoints([
			{x: 0.00, y: 1.0},
			{x: 0.75, y: 1.0},
			{x: 0.50, y: 1.0},
			{x: 1.00, y: 1.0},
	])

	expect(actual).toBe(false)
})

it('validateSetPoints enforces no duplicate x', async() => {
	const actual = Modifiers.validateSetPoints([
			{x: 0.00, y: 1.0},
			{x: 0.75, y: 1.0},
			{x: 0.75, y: 1.0},
			{x: 1.00, y: 1.0},
	])

	expect(actual).toBe(false)
})

it('validateSetPoints approves valid arrays', async() => {
	expect(
		Modifiers.validateSetPoints([
			{x: 0.0, y: 0.0},
			{x: 1.0, y: 2.0},
		])
	).toBe(true)

	// always going up
	expect(
		Modifiers.validateSetPoints([
			{x: 0.0, y: 0.0},
			{x: .18, y: 0.3},
			{x: .75, y: 0.9},
			{x: 1.0, y: 1.0},
		])
	).toBe(true)

	// up down up down
	expect(
		Modifiers.validateSetPoints([
			{x: 0.0, y: 0.0},
			{x: .18, y: 0.9},
			{x: .75, y: 0.3},
			{x: 1.0, y: 1.0},
		])
	).toBe(true)

	// always going down
	expect(
		Modifiers.validateSetPoints([
			{x: 0.0, y: 1.0},
			{x: .18, y: 0.9},
			{x: .75, y: 0.3},
			{x: 1.0, y: 0.0},
		])
	).toBe(true)
})