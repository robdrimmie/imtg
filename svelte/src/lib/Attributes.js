import Deck from '$lib/Deck'
import Modifiers from '$lib/Modifiers'

export default class Attributes {
	// #region attributes
	/*
		Personality attributes are more about mind than body
	*/
	static TRAIT_PERSONALITY = 'TRAIT_PERSONALITY';
	/*
		Phsyicality attributes are more about body than mind
	*/
	static TRAIT_PHYSICALITY = 'TRAIT_PHYSICALITY';
	/*
		Resources are attributes that are consumed by various actions by the player or other entities in the game
	*/
	static TRAIT_RESOURCES = 'TRAIT_RESOURCES';

	/*
		" kind, sympathetic, cooperative, warm, and considerate"
		https://en.wikipedia.org/wiki/Agreeableness
	*/
	static PERSONALITY_AGREEABLENESS = 'PERSONALITY_AGREEABLENESS';
	/*
		"being careful, or diligent.
		https://en.wikipedia.org/wiki/Conscientiousness	
	*/
	static PERSONALITY_CONSCIENTIOUSNESS = 'PERSONALITY_CONSCIENTIOUSNESS';
	/*
		"Extraversion tends to be manifested in outgoing, talkative, energetic behavior, whereas introversion is manifested in more reflective and reserved behavior.[2]"
		https://en.wikipedia.org/wiki/Extraversion_and_introversion	
	*/
	static PERSONALITY_EXTRAVERSION = 'PERSONALITY_EXTRAVERSION';
	/*
		"more likely than average to be moody and to experience such feelings as anxiety, worry, fear, anger, frustration, envy, jealousy, guilt, depressed mood, and loneliness.["
		https://en.wikipedia.org/wiki/Neuroticism
	*/
	static PERSONALITY_NEUROTICISM = 'PERSONALITY_NEUROTICISM';
	/*
		> active imagination (fantasy), aesthetic sensitivity, attentiveness to inner feelings, preference for variety (adventurousness), intellectual curiosity, and challenging authority (psychological liberalism).
		- https://en.wikipedia.org/wiki/Openness_to_experience
	*/
	static PERSONALITY_OPENNESS = 'PERSONALITY_OPENNESS';

	static PERSONALITIES = [
		Attributes.PERSONALITY_AGREEABLENESS,
		Attributes.PERSONALITY_CONSCIENTIOUSNESS,
		Attributes.PERSONALITY_EXTRAVERSION,
		Attributes.PERSONALITY_NEUROTICISM,
		Attributes.PERSONALITY_OPENNESS
	]

	/*
		> knowledge or perception of a situation or fact.
		- define: @ google
	*/
	static PHYSICALITY_AWARENESS = 'PHYSICALITY_AWARENESS';
	/*
		> physical strength in contrast to intelligence.
		- define: @ google
	*/
	static PHYSICALITY_BRAWN = 'PHYSICALITY_BRAWN';
	/*
		> the ability to use different parts of the body together smoothly and efficiently.
		- define: @ google
	*/
	static PHYSICALITY_COORDINATION = 'PHYSICALITY_COORDINATION';
	/*
		> the fact or power of enduring an unpleasant or difficult process or situation without giving way.
		- define: @ google
	*/
	static PHYSICALITY_ENDURANCE = 'PHYSICALITY_ENDURANCE';
	/*
		> the ability to attract and charm people
		- define: @ google
	*/
	static PHYSICALITY_MAGNETISM = 'PHYSICALITY_MAGNETISM';

	static PHYSICALITIES = [
		Attributes.PHYSICALITY_AWARENESS,
		Attributes.PHYSICALITY_BRAWN,
		Attributes.PHYSICALITY_COORDINATION,
		Attributes.PHYSICALITY_ENDURANCE,
		Attributes.PHYSICALITY_MAGNETISM
	]

	static RESOURCES_ENERGY = 'RESOURCES_ENERGY';
	static RESOURCES_HEALTH = 'RESOURCES_HEALTH';
	static RESOURCES_SATIETY = 'RESOURCES_SATIETY';
	// #endregion attributes

	// #region labels
	static TRAIT_PERSONALITY_LABEL = 'Personality';
	static TRAIT_PHYSICALITY_LABEL = 'Physicality';
	static TRAIT_RESOURCES_LABEL = 'Resources';

	static PERSONALITY_AGREEABLENESS_LABEL = 'Agreeableness';
	static PERSONALITY_CONSCIENTIOUSNESS_LABEL = 'Conscientiousness';
	static PERSONALITY_EXTRAVERSION_LABEL = 'Extraversion';
	static PERSONALITY_NEUROTICISM_LABEL = 'Neuroticism';
	static PERSONALITY_OPENNESS_LABEL = 'Openness';

	static PHYSICALITY_AWARENESS_LABEL = 'Awareness';
	static PHYSICALITY_BRAWN_LABEL = 'Brawn';
	static PHYSICALITY_COORDINATION_LABEL = 'Coordinatin';
	static PHYSICALITY_ENDURANCE_LABEL = 'Endurance';
	static PHYSICALITY_MAGNETISM_LABEL = 'Magnetism';

	static RESOURCES_ENERGY_LABEL = 'Energy';
	static RESOURCES_HEALTH_LABEL = 'Health';
	static RESOURCES_SATIETY_LABEL = 'Satiety';

	static labels = {
		TRAIT_PERSONALITY : this.TRAIT_PERSONALITY_LABEL,
		TRAIT_PHYSICALITY : this.TRAIT_PHYSICALITY_LABEL,
		TRAIT_RESOURCES : this.TRAIT_RESOURCES_LABEL,
		PERSONALITY_AGREEABLENESS : this.PERSONALITY_AGREEABLENESS_LABEL,
		PERSONALITY_CONSCIENTIOUSNESS : this.PERSONALITY_CONSCIENTIOUSNESS_LABEL,
		PERSONALITY_EXTRAVERSION : this.PERSONALITY_EXTRAVERSION_LABEL,
		PERSONALITY_NEUROTICISM : this.PERSONALITY_NEUROTICISM_LABEL,
		PERSONALITY_OPENNESS : this.PERSONALITY_OPENNESS_LABEL,
		PHYSICALITY_AWARENESS : this.PHYSICALITY_AWARENESS_LABEL,
		PHYSICALITY_BRAWN : this.PHYSICALITY_BRAWN_LABEL,
		PHYSICALITY_COORDINATION : this.PHYSICALITY_COORDINATION_LABEL,
		PHYSICALITY_ENDURANCE : this.PHYSICALITY_ENDURANCE_LABEL,
		PHYSICALITY_MAGNETISM : this.PHYSICALITY_MAGNETISM_LABEL,
		RESOURCES_ENERGY : this.RESOURCES_ENERGY_LABEL,
		RESOURCES_HEALTH : this.RESOURCES_HEALTH_LABEL,
		RESOURCES_SATIETY : this.RESOURCES_SATIETY_LABEL,
	}
	// #endregion labels

	// #region icons
	static TRAIT_PERSONALITY_ICON = '🧠';
	static TRAIT_PHYSICALITY_ICON = '🧍';
	static TRAIT_RESOURCES_ICON = '📋';
	
	static PERSONALITY_AGREEABLENESS_ICON = '🤝';
	static PERSONALITY_CONSCIENTIOUSNESS_ICON = '';
	static PERSONALITY_EXTRAVERSION_ICON = '🗣';
	static PERSONALITY_NEUROTICISM_ICON = '😰';
	static PERSONALITY_OPENNESS_ICON = '🧑‍🎓';
	static PHYSICALITY_AWARENESS_ICON = '👁';
	static PHYSICALITY_BRAWN_ICON = '💪';
	static PHYSICALITY_COORDINATION_ICON = '🤸';
	static PHYSICALITY_ENDURANCE_ICON = '🏃';
	static PHYSICALITY_MAGNETISM_ICON = '🧲';
	static RESOURCES_ENERGY_ICON = '🔋';
	static RESOURCES_HEALTH_ICON = '🩸';
	static RESOURCES_SATIETY_ICON = '🍽';

	static icons = {
		TRAIT_PERSONALITY : this.TRAIT_PERSONALITY_ICON,
		TRAIT_PHYSICALITY : this.TRAIT_PHYSICALITY_ICON,
		TRAIT_RESOURCES : this.TRAIT_RESOURCES_ICON,
		PERSONALITY_AGREEABLENESS : this.PERSONALITY_AGREEABLENESS_ICON,
		PERSONALITY_CONSCIENTIOUSNESS : this.PERSONALITY_CONSCIENTIOUSNESS_ICON,
		PERSONALITY_EXTRAVERSION : this.PERSONALITY_EXTRAVERSION_ICON,
		PERSONALITY_NEUROTICISM : this.PERSONALITY_NEUROTICISM_ICON,
		PERSONALITY_OPENNESS : this.PERSONALITY_OPENNESS_ICON,
		PHYSICALITY_AWARENESS : this.PHYSICALITY_AWARENESS_ICON,
		PHYSICALITY_BRAWN : this.PHYSICALITY_BRAWN_ICON,
		PHYSICALITY_COORDINATION : this.PHYSICALITY_COORDINATION_ICON,
		PHYSICALITY_ENDURANCE : this.PHYSICALITY_ENDURANCE_ICON,
		PHYSICALITY_MAGNETISM : this.PHYSICALITY_MAGNETISM_ICON,
		RESOURCES_ENERGY : this.RESOURCES_ENERGY_ICON,
		RESOURCES_HEALTH : this.RESOURCES_HEALTH_ICON,
		RESOURCES_SATIETY : this.RESOURCES_SATIETY_LAICON	
	}
	// #endregion icons

	static getTraitConstantForAttribute(attribute) {
		switch (attribute) {
			case Attributes.PERSONALITY_AGREEABLENESS:
			case Attributes.PERSONALITY_CONSCIENTIOUSNESS:
			case Attributes.PERSONALITY_EXTRAVERSION:
			case Attributes.PERSONALITY_NEUROTICISM:
			case Attributes.PERSONALITY_OPENNESS:
				return Attributes.TRAIT_PERSONALITY;

			case Attributes.PHYSICALITY_AWARENESS:
			case Attributes.PHYSICALITY_BRAWN:
			case Attributes.PHYSICALITY_COORDINATION:
			case Attributes.PHYSICALITY_ENDURANCE:
			case Attributes.PHYSICALITY_MAGNETISM:
				return Attributes.TRAIT_PHYSICALITY;

			case Attributes.RESOURCES_ENERGY:
			case Attributes.RESOURCES_HEALTH:
			case Attributes.RESOURCES_SATIETY:
			default:
				return Attributes.TRAIT_RESOURCES;
		}
	}

	static for(attribute, scores) {
		return Attributes.forAttribute(attribute, scores)
	}
	
	static forAttribute(attribute, scores) {
		return new Attributes(
			attribute,
			scores[attribute],
			this.labels[attribute],
			this.icons[attribute]
		)
	}

	static random() {
		const deck = new Deck([
			Attributes.PERSONALITY_AGREEABLENESS,
			Attributes.PERSONALITY_CONSCIENTIOUSNESS,
			Attributes.PERSONALITY_EXTRAVERSION,
			Attributes.PERSONALITY_NEUROTICISM,
			Attributes.PERSONALITY_OPENNESS,
			Attributes.PHYSICALITY_AWARENESS,
			Attributes.PHYSICALITY_BRAWN,
			Attributes.PHYSICALITY_COORDINATION,
			Attributes.PHYSICALITY_ENDURANCE,
			Attributes.PHYSICALITY_MAGNETISM,
			Attributes.RESOURCES_ENERGY,
			Attributes.RESOURCES_HEALTH,
			Attributes.RESOURCES_SATIETY,
		])

		return deck.drawOne()
	}

    constructor(name, base, label) {
		this.name = name

		this.base = base
		this.current = base
		this.apparent = this.current

		this.label = label

		this.wounds = []
	}

	asScore(higherIsBetter = true, setPoint = .5) {
		return higherIsBetter
			? Modifiers.convertPercentageToScore(this.current / this.base, setPoint)
			: Modifiers.convertPercentageToScoreLowerIsBetter(this.current / this.base, setPoint)
	}

	modified() {
		return this.current;
	}

	addWound(wound) {
		this.wounds.push(wound)
	}
}

// rmd todo refactor
// I just keep bolting things on with this weird lookup table style and it has to fall down 
// at some point. maybe it should just be a block of json with all the properties and shit
const attrs = [
	{
		id: Attributes.PERSONALITY_AGREEABLENESS,
		icon: '🤝',
		label: 'Agreeableness',
		tooltip: '"kind, sympathetic, cooperative, warm, and considerate" - https://en.wikipedia.org/wiki/Agreeableness'
	}
]