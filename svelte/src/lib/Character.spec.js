import Character from './Character';
import Dice from './Dice';

/*

Character {
  id: '2d119da4-e424-4b9b-8a93-0e1d521ee54a',
  job: Job { name: 'Ranged Buffs', multiplier: [Function: multiplier] },
  name: 'Predetermined Name',
  race: Race {
    name: 'The Intrinsically Magick',
    multiplier: [Function: multiplier]
  },
  resources: Map(3) {
    'ATTRIBUTE_RESOURCES_ENERGY' => Property {
      name: 'ATTRIBUTE_RESOURCES_ENERGY',
      base: 10,
      current: 10
    },
    'Attributes.RESOURCES_HEALTH' => Property {
      name: 'Attributes.RESOURCES_HEALTH',
      base: 10,
      current: 10
    },
    'ATTRIBUTE_RESOURCES_SATIETY' => Property {
      name: 'ATTRIBUTE_RESOURCES_SATIETY',
      base: 10,
      current: 10
    }
  },
  currency: 10,
  paperdoll: {},
  personality: Map(5) {
    'ATTRIBUTE_PERSONALITY_AGREEABLENESS' => Property {
      name: 'ATTRIBUTE_PERSONALITY_AGREEABLENESS',
      base: 11,
      current: 11
    },
    'ATTRIBUTE_PERSONALITY_CONSCIENTIOUSNESS' => Property {
      name: 'ATTRIBUTE_PERSONALITY_CONSCIENTIOUSNESS',
      base: 65,
      current: 65
    },
    'ATTRIBUTE_PERSONALITY_EXTRAVERSION' => Property {
      name: 'ATTRIBUTE_PERSONALITY_EXTRAVERSION',
      base: 14,
      current: 14
    },
    'ATTRIBUTE_PERSONALITY_NEUROTICISM' => Property {
      name: 'ATTRIBUTE_PERSONALITY_NEUROTICISM',
      base: 64,
      current: 64
    },
    'ATTRIBUTE_PERSONALITY_OPENNESS' => Property {
      name: 'ATTRIBUTE_PERSONALITY_OPENNESS',
      base: 90,
      current: 90
    }
  },
  physicality: Map(5) {
    'ATTRIBUTE_PHYSICALITY_AWARENESS' => Property {
      name: 'ATTRIBUTE_PHYSICALITY_AWARENESS',
      base: 85,
      current: 85
    },
    'ATTRIBUTE_PHYSICALITY_BRAWN' => Property {
      name: 'ATTRIBUTE_PHYSICALITY_BRAWN',
      base: 98,
      current: 98
    },
    'ATTRIBUTE_PHYSICALITY_COORDINATION' => Property {
      name: 'ATTRIBUTE_PHYSICALITY_COORDINATION',
      base: 65,
      current: 65
    },
    'ATTRIBUTE_PHYSICALITY_ENDURANCE' => Property {
      name: 'ATTRIBUTE_PHYSICALITY_ENDURANCE',
      base: 25,
      current: 25
    },
    'ATTRIBUTE_PHYSICALITY_MAGNETISM' => Property {
      name: 'ATTRIBUTE_PHYSICALITY_MAGNETISM',
      base: 57,
      current: 57
    }
  },
  currentTile: {},
  tileRelationships: Map(0) {}
}


*/

it('it works', async () => {
	Dice.primeWithSeed(20);

	const props = {};

	const character = new Character(props);
	// console.log("character", character)

	expect(character.name).toBe('R{rhp Iri Gbrtqpm Cmscft{{v');
});
