import Attributes from '$lib/Attributes'
import Dice from '$lib/Dice'
import ItemType from '$lib/Reference/ItemType.js'
import Modifiers from '$lib/Modifiers'
import ICON_DEFAULT from '$lib/images/Default.svelte'

/**
 * 20220514 today I think this is important:
All items have a value, which can be positive or negative.
Some items modify character attributes positively or negatively.
Some items can be combined with other items.

20220810 2030 One possible way for items to modify multiple attributes:
We get attribute, increase and effectiveness for every item. Those three properties become properties of an object 
`Modifications` or something. 

the three are replaced with a `modifications` property, which is an array of Modifications. that collection can be 
scanned when calculating the modified value of each attribute or something.
 */


/*
	
*/
export default class Item {



	static cards() {
		// base class has no cards
		return [];
	}

	static ofNoValue() {
		return new this({
			description: "An item of no value. The existance of this suggests a bug.",
			id: Dice.nextId(),
			isWinConditionItem: false,
			modifyCharacter: (params) => {

				return {
					characters: params.characters,
					move: Move.other(
						'An item of no value was discovered. Very curious.'
					),
					chests: params.chests
				}
			},
			name: 'Item of No Value',
			scoreTile: (a) => 1,
			value: 0,
		})
	}

	// #region Personality (Agreeableness, Conscientiousness, Extraversion, Neuroticism, Openness)
	// #region Personality Agreeableness
	static ofDecreaseAgreeableness(effectiveness) {
		return this.ofModifyAgreeableness(false, effectiveness);
	}

	static ofIncreaseAgreeableness(effectiveness) {
		return this.ofModifyAgreeableness(true, effectiveness);
	}

	static ofModifyAgreeableness(increase, effectiveness) {
		return new this({
			attribute: Attributes.PERSONALITY_AGREEABLENESS,
			increase,
			effectiveness
		})
	}
	// #endregion Personality Agreeableness

	// #region Personality Conscientiousness
	static ofDecreaseConscientiousness(effectiveness) {
		return this.ofModifyConscientiousness(false, effectiveness);
	}

	static ofIncreaseConscientiousness(effectiveness) {
		return this.ofModifyConscientiousness(true, effectiveness);
	}

	static ofModifyConscientiousness(increase, effectiveness) {
		return new this({
			attribute: Attributes.PERSONALITY_CONSCIENTIOUSNESS,
			increase,
			effectiveness
		});
	}
	// #endregion Personality Conscientiousness

	// #region Personality Extraversion
	static ofDecreaseExtraversion(effectiveness) {
		return this.ofModifyExtraversion(false, effectiveness);
	}

	static ofIncreaseExtraversion(effectiveness) {
		return this.ofModifyExtraversion(true, effectiveness);
	}

	static ofModifyExtraversion(increase, effectiveness) {
		return new this({
			attribute: Attributes.PERSONALITY_EXTRAVERSION,
			increase,
			effectiveness
		});
	}
	// #endregion Personality Extraversion

	// #region Personality Neuroticism
	static ofDecreaseNeuroticism(effectiveness) {
		return this.ofModifyNeuroticism(false, effectiveness);
	}

	static ofIncreaseNeuroticism(effectiveness) {
		return this.ofModifyNeuroticism(true, effectiveness);
	}

	static ofModifyNeuroticism(increase, effectiveness) {
		return new this({
			attribute: Attributes.PERSONALITY_NEUROTICISM,
			increase,
			effectiveness
		});
	}
	// #endregion Personality Neuroticism

	// #region Personality Openness
	static ofDecreaseOpenness(effectiveness) {
		return this.ofModifyOpenness(false, effectiveness);
	}

	static ofIncreaseOpenness(effectiveness) {
		return this.ofModifyOpenness(true, effectiveness);
	}

	static ofModifyOpenness(increase, effectiveness) {
		return new this({
			attribute: Attributes.ATTRIBUTE_PERSONALITY_MAGNETISM,
			increase,
			effectiveness
		});
	}
	// #endregion Personality Openness
	// #endregion Personality (Agreeableness, Conscientiousness, Extraversion, Neuroticism, Openness)

	// #region Physicality (Awareness, Brawn, Coordination, Endurance, Magnetism)
	// #region Physicality Awareness
	static ofDecreaseAwareness(effectiveness) {
		return this.ofModifyAwareness(false, effectiveness);
	}

	static ofIncreaseAwareness(effectiveness) {
		return this.ofModifyAwareness(true, effectiveness);
	}

	static ofModifyAwareness(increase, effectiveness) {
		return new this({
			attribute: Attributes.PHYSICALITY_AWARENESS,
			increase,
			effectiveness
		});
	}
	// #endregion Physicality Awareness

	// #region Physicality Brawn
	static ofDecreaseBrawn(effectiveness) {
		return this.ofModifyBrawn(false, effectiveness);
	}

	static ofIncreaseBrawn(effectiveness) {
		return this.ofModifyBrawn(true, effectiveness);
	}

	static ofModifyBrawn(increase, effectiveness) {
		return new this({
			attribute: Attributes.PHYSICALITY_BRAWN,
			increase,
			effectiveness
		});
	}
	// #endregion Physicality Brawn

	// #region Physicality Coordination
	static ofDecreaseCoordination(effectiveness) {
		return this.ofModifyCoordination(false, effectiveness);
	}

	static ofIncreaseCoordination(effectiveness) {
		return this.ofModifyCoordination(true, effectiveness);
	}

	static ofModifyCoordination(increase, effectiveness) {
		return new this({
			attribute: Attributes.PHYSICALITY_COORDINATION,
			increase,
			effectiveness
		});
	}
	// #endregion Physicality Coordination

	// #region Physicality Endurance
	static ofDecreaseEndurance(effectiveness) {
		return this.ofModifyEndurance(false, effectiveness);
	}

	static ofIncreaseEndurance(effectiveness) {
		return this.ofModifyEndurance(true, effectiveness);
	}

	static ofModifyEndurance(increase, effectiveness) {
		return new this({
			attribute: Attributes.PHYSICALITY_ENDURANCE,
			increase,
			effectiveness
		});
	}

	static ofRandomEffect(
		increase, 
		effectiveness
	) {
		if(increase === undefined) {
			increase = Dice.d2() === 1
		}

		if(effectiveness === undefined) {
			effectiveness = Modifiers.randomEffectiveness()
		}

		return new this({increase, effectiveness})
	}
	// #endregion Physicality Endurance

	// #region Physicality Magnetism
	static ofDecreaseMagnetism(effectiveness) {
		return this.ofModifyMagnetism(false, effectiveness);
	}

	static ofIncreaseMagnetism(effectiveness) {
		return this.ofModifyMagnetism(true, effectiveness);
	}

	static ofModifyMagnetism(increase, effectiveness) {
		return new this({
			attribute: Attributes.PHYSICALITY_MAGNETISM,
			increase,
			effectiveness
		});
	}
	// #endregion Physicality Magnetism
	// #endregion Physicality (Awareness, Brawn, Coordination, Endurance, Magnetism)

	// #region Resources (Health, Energy, Satiety)
	// #region Resource Health
	static ofDecreaseHealth(effectiveness) {
		return this.ofModifyHealth(false, effectiveness);
	}

	static ofIncreaseHealth(effectiveness) {
		return this.ofModifyHealth(true, effectiveness);
	}

	static ofModifyHealth(increase, effectiveness) {
		return new this({
			attribute: Attributes.RESOURCES_HEALTH,
			increase,
			effectiveness
		});
	}
	// #endregion Resource Health

	// #region Resource Energy
	static ofDecreaseEnergy(effectiveness) {
		return this.ofModifyEnergy(false, effectiveness);
	}

	static ofIncreaseEnergy(effectiveness) {
		return this.ofModifyEnergy(true, effectiveness);
	}

	static ofModifyEnergy(increase, effectiveness) {
		return new this({
			attribute: Attributes.RESOURCES_ENERGY,
			increase,
			effectiveness
		});
	}
	// #endregion Resource Energy

	// #region Resource Satiety
	static ofDecreaseSatiety(effectiveness) {
		return this.ofModifySatiety(false, effectiveness);
	}

	static ofIncreaseSatiety(effectiveness) {
		return this.ofModifySatiety(true, effectiveness);
	}

	static ofModifySatiety(increase, effectiveness) {
		return new this({
			attribute: Attributes.RESOURCES_SATIETY,
			increase,
			effectiveness
		});
	}
	// #endregion Resource Satiety

	// #endregion Resources (Health, Energy, Satiety)

	constructor (specifics) {
		// RMD TODO the way I test specifics here is gross, should just make it an empty 
		// object if it is null or undefined or whatever but I don't want to right now

		// console.log("Item constructed with specifics", specifics)

		this.attribute = specifics && specifics.attribute 
			? specifics.attribute 
			: Attributes.random()

		this.setIncrease(specifics && specifics.increase )

		this.effectiveness = specifics && specifics.effectiveness 
			? specifics.effectiveness 
			: Modifiers.EFFECTIVENESS_VERY_LOW

			
		this.icon = ICON_DEFAULT
		this.id = (specifics && specifics.id) ? specifics.id : Dice.nextId();
		this.isWinConditionItem = false
		this.name = this.setName('Item')
		this.type = ItemType.ITEM
		this.value = Math.ceil(20 * this.effectiveness)
	}

	setIncrease(increase) {
		this.increase = increase

		this.label = this.increase ? 'Increased' : 'Decreased'
		this.description = `Modifies ${this.attribute.label} by ${Modifiers.labelForModifer(this.effectiveness)}%`
	}

	setName(type) {
		this.name = `${type} of ${this.label} ${Attributes.forAttribute(this.attribute, []).label}`;
	}


	// For crafting. At this time assuming ingredients will be an array but I don't really know 
	// how recipes and such will work so this might be naive. 
	combineWith(ingredients) {
		return this
	}

	getCharacterTraitForAttribute(characterToModify, attributeToModify) {
		switch (Attributes.getTraitConstantForAttribute(attributeToModify)) {
			case Attributes.TRAIT_PERSONALITY:
				return characterToModify.personality;

			case Attributes.TRAIT_PHYSICALITY:
				return characterToModify.physicality;

			case Attributes.TRAIT_RESOURCES:
				return characterToModify.resources;

			default:
				return;
		}
	}

	passiveModifier() {	
		return this.increase
			? 1.0 + this.effectiveness
			: 1.0 - this.effectiveness
	}

	activeModifier() {	
		return this.effectiveness
	}

	// Increasingly convinced this needs to be elsewhere 
	modifyCharacter(characterToModify) {
		// console.log("Item modifyCharacter called with characterToModify", characterToModify)

		// shallow clone to modify
		// const modifiedCharacter = new Character(characterToModify);
		const modifiedCharacter = characterToModify;

		// set which trait to modify
		const characterTrait = this.getCharacterTraitForAttribute(
			characterToModify,
			this.attribute
		);

		// console.log("characterTrait", characterTrait)

		if (!characterTrait) {
			return modifiedCharacter;
		}

		// get the attribute to be modified
		const characterAttribute = characterTrait.get(this.attribute)
		
		// modify it appropriately
		let amountToModifyAttribute = Math.ceil(this.activeModifier() * characterAttribute.base)

		if (!this.increase) {
			amountToModifyAttribute = 0 - amountToModifyAttribute
		}

		// console.log("Item modifyCharacter - amountToModifyAttribute, this.activeModifier(), characterAttribute.base", amountToModifyAttribute, this.activeModifier(), characterAttribute.base)
		
		// console.log("about to set - characterTrait, this.attribute, characterAttribute", characterTrait, this.attribute, characterAttribute)
		
		// apply the modification
		modifiedCharacter.setAttribute(this.attribute, amountToModifyAttribute)

		// console.log("after set", 
		// 	characterTrait.get(this.attribute)
		// )

		const results = {
			amountToModifyAttribute,
			attributeToModify: this.attribute,
			label: this.label,
			modifiedCharacter
		}

		// console.log("Item modifyCharacter returning results ", results, modifiedCharacter)

		return results;
	}

	// A method to impact decision making based on some attribute or another.
	// this is kind of legacy stuff but this is like how poison resistance boots impact decision making
	/*
	if (modificationConsiderations?.region?.color === 'green') {
		return 1.5;
	}
	*/
	multiplier(toModify, modificationConsiderations) {
		console.log('Region attributes/elements resistance is not gatekeeping/restricting character movement')

		return 1
	}

	scoreTile(tileToScore) {
		const tileScore = 1;

		return tileScore;
	}
}
