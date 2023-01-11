import Dice from '$lib/Dice.js'

export default class Modifiers {
	static EFFECTIVENESS_VERY_LOW = 0.1
	static EFFECTIVENESS_LOW = 0.3
	static EFFECTIVENESS_MIDDLE = 0.5
	static EFFECTIVENESS_HIGH = 0.7
	static EFFECTIVENESS_VERY_HIGH = 0.9

	static EFFECTIVENESS_VERY_LOW_ICON = '1️⃣'
	static EFFECTIVENESS_LOW_ICON = '2️⃣'
	static EFFECTIVENESS_MIDDLE_ICON = '3️⃣'
	static EFFECTIVENESS_HIGH_ICON = '4️⃣'
	static EFFECTIVENESS_VERY_HIGH_ICON = '5️⃣'

	// static EFFECTIVENESS_VERY_LOW_ICON = '⬇️ '
	// static EFFECTIVENESS_LOW_ICON = '↘️'
	// static EFFECTIVENESS_MIDDLE_ICON = '➡️'
	// static EFFECTIVENESS_HIGH_ICON = '↗️'
	// static EFFECTIVENESS_VERY_HIGH_ICON = '⬆️'

	static INCREASE = 1.1
	static DECREASE = 0.9

	static INCREASE_ICON = '✖️'
	static DECREASE_ICON = '➗'

	static OPPONENT_DIFFICULT_MODIFIER = 1;

	// Basic linear version
	static percentToScore(percentToConvert, higherIsBetter = true) {
		const setPoints = higherIsBetter
			? [
				{ x: 0, y: 0 },
				{ x: 1, y: 2 }
			]
			: [
				{ x: 0, y: 2 },
				{ x: 1, y: 0 }
			]
				
		return Modifiers.percentToScoreBySetpoints(percentToConvert, setPoints)
	}

	static defaultSetPoints = (midPoints = []) => [
		{x: 0, y: 0}
		, ...midPoints
		, {x: 1, y: 2}
	]

	/*
		only valid if:
			- the first x value must be 0.0
			- the last x value must be 1.0
			- 0.0 <= x <= 1.0
			- 0.0 <= y <= 2.0
			- it is ordered, which is validated via:
				- each x value must be larger than the one previous
				- each x value must be small than the one next
	*/
	static validateSetPoints(setPoints) {
		// rmd here
		console.log("vSP", setPoints)
		console.log('zero', setPoints[0])
		// console.log('zero x', setPoints[0].x)
		const foo = setPoints[0]
		console.log('foo', foo)
		console.log('foo x', foo.x)

		// - the first x value must be 0.0
		if(setPoints[0].x !== 0.0) return false	
		
		// - the last x value must be 1.0
		if(setPoints[setPoints.length - 1].x !== 1.0) return false

		return setPoints.every( (point, index, points) => {
			// - 0.0 <= x <= 1.0
			if(point.x < 0) return false
			if(point.x > 1) return false
			
			// - 0.0 <= y <= 2.0
			if(point.y < 0) return false
			if(point.y > 2) return false

			// - each x value must be larger than the one previous
			if(index > 0 && point.x <= points[index-1].x) return false

			return true
		})
	}

	static indexOfHighBoundary(points, value) {
		return points.findIndex(point => point.x > value)
	}

	static percentToScoreBySetpoints(
		percentageToConvert, 
		setPoints = Modifiers.defaultSetPoints()
	) {
		// sort points by x
		const orderedPoints = setPoints.slice().sort((a,b) => a.x - b.x)

		if(!Modifiers.validateSetPoints(orderedPoints)) {
			throw new Error("Invalid setpoints!")
		}

		// rules of valid setpoints state that last point must always have x of 1
		if(percentageToConvert === 1) return setPoints[setPoints.length - 1].y

		// figure out which line segment percentageToConvert is on
		const indexOfHighBoundary = Modifiers.indexOfHighBoundary(
			orderedPoints
			, percentageToConvert
		)

		const indexOfLowBoundary = indexOfHighBoundary === 0
			? 0
			: indexOfHighBoundary - 1

		console.log("working-a", percentageToConvert, setPoints, indexOfHighBoundary, indexOfHighBoundary)

		// use slope intercept stuff to get the y value
		// y = mx + b
		// y1 = m(x1) + b
		// m = (y2 - y1) / (x2 - x1)
		// y1 = (((y2 - y1) / (x2 - x1)) * x1) + b
		// y1 = ((m) * x1) + b
		// b = y1 - m(x1)
		const x1 = setPoints[indexOfLowBoundary].x
		const y1 = setPoints[indexOfLowBoundary].y

		const x2 = setPoints[indexOfHighBoundary].x
		const y2 = setPoints[indexOfHighBoundary].y

		const m = (y2 - y1) / (x2 - x1)
		const b = y1 - (m * x1)

		const x = percentageToConvert
		const y = m * x + b
		
		console.log("working-b", x1, y1, x2, y2, m, b, x, y)
		return y
	}

	static labelForModifer(modifier) {
		switch (modifier) {
			case Modifiers.EFFECTIVENESS_VERY_LOW:
				return "very low"
				
			case Modifiers.EFFECTIVENESS_LOW:
				return "low"
				
			case Modifiers.EFFECTIVENESS_MIDDLE:
				return "middle"
				
			case Modifiers.EFFECTIVENESS_HIGH:
				return "high"
				
			case Modifiers.EFFECTIVENESS_VERY_HIGH:
				return "very high"
				
			case Modifiers.INCREASE:
				return "increase"
				
			case Modifiers.DECREASE:
				return "decrease"
				
			case Modifiers.OPPONENT_DIFFICULT_MODIFIER:
				return "OPPONENT_DIFFICULT_MODIFIER"
				
		}
		
		return "Unknown Modifier"
	}

	// rmd todo some things randomize using Dice.deck maybe this should too
	static randomEffectiveness(roll = Dice.roll(5)) {
		switch (roll) {
			case 5:
				return this.EFFECTIVENESS_VERY_HIGH

			case 4:
				return this.EFFECTIVENESS_HIGH

			case 3:
				return this.EFFECTIVENESS_MIDDLE

			case 2:
				return this.EFFECTIVENESS_LOW

			case 1:
			default:
				return this.EFFECTIVENESS_VERY_LOW
		}
	}
}
