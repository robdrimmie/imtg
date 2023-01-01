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

	/*
	  convert from a percentage/average type thing to a 0.0 - 2.0+ score modifier type thing

	  if set point is .5 then 50% becomes 1.0 0% becomes 0.0. 100% becomes 2.0. etc along the scale.

	  that's the standard so defaults support it but the setpoint can be changes so that for example
	  90% becomes 1.0. 91 - 100 then are [1.1, 1.2, .., 1.9, 2.0] and 1 - 89 are spread across 0.0 - 1.0,
	  so themselves a percent because I apparently like to go circular and confuse myself
	*/
	static convertPercentageToScore(percentageToConvert, setPoint = .5, base = 1.0) {
		if(percentageToConvert > setPoint) {
		  // top half so ([input - set point] / [100 - set point]) (92-90) / (100-90) + 1 = 1.2
		  return 1 + ((percentageToConvert - setPoint) / (base - setPoint))
		}
	  
		// bottom half, so input / set point
		return percentageToConvert / setPoint
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
