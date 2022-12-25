import Food from '$lib/Items/Food'
import Potions from '$lib/Items/Potions'
import Modifiers from '$lib/Modifiers'
import Move from '$lib/Move'

/*

 POSSIBLE CARD IDEAS

 - telling stories around the fire. One character picks a tile to tell stories about, other characters can have their tile knowledge for it increased


 - cards should forage different resource quantities or different resource-modifying things
 - maybe indicate good or bad sleep for restoring energy and health and what not but that's mostly flavour text, its the varying resource stuff that is best
*/

const run = (characters) => {
	console.error('No run method provided to Rest')
}

export default class Rest {
	constructor(options) {
		this.description = options.description
		this.name = options.name
		this.run = options?.run ?? run
	}

	static cards() {
		return [
			Rest.complete(),
			Rest.noEnergy(),
			Rest.noHealth(),
			Rest.noSatiety(),
			Rest.onlyEnergy(),
			Rest.onlyHealth(),
			Rest.onlySatiety()
		]
	}

	static complete() {
		return new Rest({
			description: 'The party has a complete rest',
			name: 'Complete Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					'The party enjoyed a complete rest. All resources were increased.'
				)

				let results
				characters.forEach((partyMember) => {
					const healthIncreaser = Potions.ofIncreaseHealth(Modifiers.EFFECTIVENESS_VERY_HIGH)
					results = healthIncreaser.modifyCharacter(partyMember)
					partyMember = results.modifiedCharacter

					const energyIncreaser = Potions.ofIncreaseEnergy(Modifiers.EFFECTIVENESS_VERY_HIGH)
					results = energyIncreaser.modifyCharacter(partyMember)
					partyMember = results.modifiedCharacter

					const satietyIncreaser = Food.ofIncreaseSatiety(Modifiers.EFFECTIVENESS_VERY_HIGH)
					results = results.modifiedCharacter
					partyMember = satietyIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static noEnergy() {
		return new Rest({
			description: 'The party has a noEnergy rest',
			name: 'No Energy Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = Move.other(
					'The party enjoyed a no energy rest. They recovered much health and satiety but did not sleep well so lost energy.'
				)

				characters.forEach((partyMember) => {
					const healthIncreaser = Potions.ofIncreaseHealth(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = healthIncreaser.modifyCharacter(partyMember)

					const energyReducer = Potions.ofDecreaseEnergy(Modifiers.EFFECTIVENESS_VERY_LOW)
					partyMember = energyReducer.modifyCharacter(partyMember)

					const foodIncreaser = Food.ofIncreaseSatiety(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = foodIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static noHealth() {
		return new Rest({
			description: 'The party has a no health rest',
			name: 'No Health Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					'The party enjoyed a no health rest. They recovered energy and satiety, but lost health.'
				)

				characters.forEach((partyMember) => {
					const healthReducer = Potions.ofDecreaseHealth(Modifiers.EFFECTIVENESS_VERY_LOW)
					partyMember = healthReducer.modifyCharacter(partyMember)

					const energyIncreaser = Potions.ofIncreaseEnergy(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = energyIncreaser.modifyCharacter(partyMember)

					const foodIncreaser = Food.ofIncreaseSatiety(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = foodIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static noSatiety() {
		return new Rest({
			description: 'The party has a no satiety rest',
			name: 'No Satiety Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					'The party enjoyed a no satiety rest. They recovered health and energy, but no satiety.'
				)

				characters.forEach((partyMember) => {
					const healthIncreaser = Potions.ofIncreaseHealth(Modifiers.EFFECTIVENESS_VERY_HIGH)
					console.log('rest healthIncreaser', healthIncreaser)
					partyMember = healthIncreaser.modifyCharacter(partyMember)

					const energyIncreaser = Potions.ofIncreaseEnergy(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = energyIncreaser.modifyCharacter(partyMember)

					const foodReducer = Food.ofDecreaseSatiety(Modifiers.EFFECTIVENESS_VERY_LOW)
					partyMember = foodReducer.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static onlyEnergy() {
		return new Rest({
			description: 'The party had an only energy rest',
			name: 'Only Energy Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(Move.TYPE_OTHER_MESSAGES, {}, 'The party recovered energy.')

				characters.forEach((partyMember) => {
					const energyIncreaser = Potions.ofIncreaseEnergy(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = energyIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static onlyHealth() {
		return new Rest({
			description: 'The party had an only helath rest',
			name: 'Only Health Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(Move.TYPE_OTHER_MESSAGES, {}, 'The party recovered health.')

				// pick the monster (eventually)
				characters.forEach((partyMember) => {
					const healthIncreaser = Potions.ofIncreaseHealth(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = healthIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}

	static onlySatiety() {
		return new Rest({
			description: 'The party had an only satiety rest',
			name: 'Only Satiety Rest',
			run: (params) => {
				const {characters, chests} = params
				
				let move = new Move(Move.TYPE_OTHER_MESSAGES, {}, 'The party recovered satiety.')

				characters.forEach((partyMember) => {
					const foodIncreaser = Food.ofIncreaseSatiety(Modifiers.EFFECTIVENESS_VERY_HIGH)
					partyMember = foodIncreaser.modifyCharacter(partyMember)
				})

				return {
					characters,
					move,
					chests
				}
			}
		})
	}
}
