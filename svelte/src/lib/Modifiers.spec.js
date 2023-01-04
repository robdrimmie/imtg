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