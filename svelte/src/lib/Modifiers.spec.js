import Modifiers from '$lib/Modifiers.js'

it('percentToScore does higherIsBetter correctly', async () => {
	expect(Modifiers.percentToScore(.5)).toBe(1)
	expect(Modifiers.percentToScore(.25)).toBe(0.5)
	expect(Modifiers.percentToScore(.75)).toBe(1.5)
	expect(Modifiers.percentToScore(1)).toBe(2)
});

it('percentToScore does lowerIsBetter correctly', async () => {
	expect(Modifiers.percentToScore(0.00, false)).toBe(2)
	expect(Modifiers.percentToScore(0.25, false)).toBe(1.5)
	expect(Modifiers.percentToScore(0.50, false)).toBe(1)
	expect(Modifiers.percentToScore(0.75, false)).toBe(0.5)
	expect(Modifiers.percentToScore(1.00, false)).toBe(0)
});

it('defaultSetPoints default behaviour', async () => {
	const basic = Modifiers.defaultSetPoints()
	expect(basic[0].x).toBe(0)
	expect(basic[1].y).toBe(2)

	const withInsert = Modifiers.defaultSetPoints([{x:.5,y:1}])
	expect(withInsert[0].x).toBe(0)
	expect(withInsert[1].x).toBe(.5)
	expect(withInsert[2].y).toBe(2)
})

// rmd todo refactor - Jest has expect().toThrow() but I couldn't figure out what I was doing wrong
it('percentToScoreBySetpoints validates setpoints', async () => {	
	try {
		Modifiers.percentToScoreBySetpoints(
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

const TWO_X_EQUALS_Y = Modifiers.defaultSetPoints([
	{x: .25, y: .5},
	{x: .5, y: 1},
	{x: .75, y: 1.5},
])

it('indexOfHighBoundary expected behaviour', async () => {
	expect(Modifiers.indexOfHighBoundary(TWO_X_EQUALS_Y, .3)).toBe(2)
	expect(Modifiers.indexOfHighBoundary(TWO_X_EQUALS_Y, .9)).toBe(4)
})

const linearHigherBetter = Modifiers.defaultSetPoints()

const linearLowerBetter = [ { x: 0, y: 2 }, { x: 1, y: 0 } ]

const twoSegmentHigherBetter = Modifiers.defaultSetPoints([
	{x: .9, y: 1},
])

const threeSegmentHigherBetter = Modifiers.defaultSetPoints([
	{x: .3, y: 0.4},
	{x: .9, y: 1.4}
])

const threeSegmentLowerBetter = [
	{ x: 0, y: 2 },
	{ x: 0.3, y: 1.4 },
	{ x: 0.9, y: 0.4 },
	{ x: 1, y: 0 }
  ]

const fourSegmentZigZag = [
	{x: 0, y: .8}, 
	{x: .2, y: 1.4}, 
	{x: .3, y: 0}, 
	{x: .9, y: 1.9}, 
	{x: 1, y: 2}
]

it('percentToScoreBySetpoints works', async () => {
	expect(Modifiers.percentToScoreBySetpoints(.3, linearHigherBetter)).toBeCloseTo(.6)

	expect(Modifiers.percentToScoreBySetpoints(.3, linearLowerBetter)).toBeCloseTo(1.4)
	
	expect(Modifiers.percentToScoreBySetpoints(0, twoSegmentHigherBetter)).toBeCloseTo(0)
	expect(Modifiers.percentToScoreBySetpoints(.1, twoSegmentHigherBetter)).toBeCloseTo(0.11111111111111112)
	expect(Modifiers.percentToScoreBySetpoints(.82, twoSegmentHigherBetter)).toBeCloseTo(0.911111111111111)
	expect(Modifiers.percentToScoreBySetpoints(.9, twoSegmentHigherBetter)).toBeCloseTo(1)
	expect(Modifiers.percentToScoreBySetpoints(.91, twoSegmentHigherBetter)).toBeCloseTo(1.1)
	expect(Modifiers.percentToScoreBySetpoints(1, twoSegmentHigherBetter)).toBeCloseTo(2)
	
	expect(Modifiers.percentToScoreBySetpoints(0, threeSegmentHigherBetter)).toBeCloseTo(0)
	expect(Modifiers.percentToScoreBySetpoints(.4, threeSegmentHigherBetter)).toBeCloseTo(.566666)
	expect(Modifiers.percentToScoreBySetpoints(.9, threeSegmentHigherBetter)).toBeCloseTo(1.4)
	expect(Modifiers.percentToScoreBySetpoints(1, threeSegmentHigherBetter)).toBeCloseTo(2)

	expect(Modifiers.percentToScoreBySetpoints(0, threeSegmentLowerBetter)).toBeCloseTo(2)
	expect(Modifiers.percentToScoreBySetpoints(.4, threeSegmentLowerBetter)).toBeCloseTo(1.23333)
	expect(Modifiers.percentToScoreBySetpoints(.9, threeSegmentLowerBetter)).toBeCloseTo(0.39999)
	expect(Modifiers.percentToScoreBySetpoints(1, threeSegmentLowerBetter)).toBeCloseTo(0)
	
	expect(Modifiers.percentToScoreBySetpoints(0, fourSegmentZigZag)).toBeCloseTo(.8)
	expect(Modifiers.percentToScoreBySetpoints(.1, fourSegmentZigZag)).toBeCloseTo(1.1)
	expect(Modifiers.percentToScoreBySetpoints(.21, fourSegmentZigZag)).toBeCloseTo(1.26)
	expect(Modifiers.percentToScoreBySetpoints(.66, fourSegmentZigZag)).toBeCloseTo(1.14)
	expect(Modifiers.percentToScoreBySetpoints(.97, fourSegmentZigZag)).toBeCloseTo(1.97)
	expect(Modifiers.percentToScoreBySetpoints(1, fourSegmentZigZag)).toBeCloseTo(2)
})

it('percentToScoreDiminishing works', async() => {
	// percentToScoreDiminishing(percentToConvert, threshold, higherIsBetter = true) {

	expect(Modifiers.percentToScoreDiminishing(0, .1, true)).toBeCloseTo(0)
	expect(Modifiers.percentToScoreDiminishing(.1, .1, true)).toBeCloseTo(1)
	expect(Modifiers.percentToScoreDiminishing(.5, .1, true)).toBeCloseTo(1.8888888)
	expect(Modifiers.percentToScoreDiminishing(.6, .1, true)).toBeCloseTo(1.77777)
	expect(Modifiers.percentToScoreDiminishing(1, .1, true)).toBeCloseTo(0)


	expect(Modifiers.percentToScoreDiminishing(0, .1, false)).toBeCloseTo(2)
	expect(Modifiers.percentToScoreDiminishing(.1, .1, false)).toBeCloseTo(1)
	expect(Modifiers.percentToScoreDiminishing(.5, .1, false)).toBeCloseTo(0.1111111111111)
	expect(Modifiers.percentToScoreDiminishing(.6, .1, false)).toBeCloseTo(0.22222222)
	expect(Modifiers.percentToScoreDiminishing(1, .1, false)).toBeCloseTo(2)
})

it('validateSetPoints enforces 0.0 <= x <= 1.0', async() => {
	expect(
		Modifiers.validateSetPoints([{x: -0.1, y: 1.0}])
	).toBe(false)

	expect(
		Modifiers.validateSetPoints([{x: 1.01, y: 1.0}])
	).toBe(false)
})

it('validateSetPoints enforces 0.0 <= y <= 2.0', async() => {
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