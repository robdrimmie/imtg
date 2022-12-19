import Attributes from '$lib/Attributes'
import Character from '$lib/Character'
import Dice from '$lib/Dice'

import Jobs from '$lib/Decks/Jobs'
import Modifiers from '$lib/Modifiers'
import Names from '$lib/Decks/Names'
import Paperdoll from '$lib/Items/Paperdoll'

import Food from '$lib/Items/Food'
import Potions from '$lib/Items/Potions'
import Boots from '$lib/Items/Boots'
import Hats from '$lib/Items/Hats'
import Torsos from '$lib/Items/Torsos'
import Waists from '$lib/Items/Waists'
import Weapons from '$lib/Items/Weapons'

export default class Mobs {
	static template(calcResource, calcPersonality, calcPhysicality, mobName) {
		const startingResources = []
		startingResources[Attributes.RESOURCES_ENERGY] = calcResource()
		startingResources[Attributes.RESOURCES_HEALTH] = calcResource()
		startingResources[Attributes.RESOURCES_SATIETY] = calcResource()

		const startingPersonality = []
		startingPersonality[Attributes.PERSONALITY_AGREEABLENESS] = calcPersonality()
		startingPersonality[Attributes.PERSONALITY_CONSCIENTIOUSNESS] = calcPersonality()
		startingPersonality[Attributes.PERSONALITY_EXTRAVERSION] = calcPersonality()
		startingPersonality[Attributes.PERSONALITY_NEUROTICISM] = calcPersonality()
		startingPersonality[Attributes.PERSONALITY_OPENNESS] = calcPersonality()

		const startingPhysicality = []
		startingPhysicality[Attributes.PHYSICALITY_AWARENESS] = calcPhysicality()
		startingPhysicality[Attributes.PHYSICALITY_BRAWN] = calcPhysicality()
		startingPhysicality[Attributes.PHYSICALITY_COORDINATION] = calcPhysicality()
		startingPhysicality[Attributes.PHYSICALITY_ENDURANCE] = calcPhysicality()
		startingPhysicality[Attributes.PHYSICALITY_MAGNETISM] = calcPhysicality()

		const name = mobName ? mobName : Names.character()
		const mob = new Character({
			job: Jobs.random(),
			name,
			resources: Character.generateResources(startingResources),
			currency: Dice.d2(),
			paperdoll: Paperdoll.forMob(),
			personality: Character.generatePersonality(startingPersonality),
			physicality: Character.generatePhysicality(startingPhysicality)
		})
	
		return mob
	}

	static lootForBackpack() {
		return Dice.d2() ? Food.ofRandomEffect() : Potions.ofRandomEffect()
	}

	static lootForSlot(slot, effectiveness = Modifiers.EFFECTIVENESS_VERY_LOW) {
		// 80%-ish chance the loot will increase the stat
		let increase = Dice.d100() < 80
		let thing;
		switch(slot) {
			case Paperdoll.DOLL_SLOT_HEAD:
				thing = Hats.ofRandomEffect(increase, effectiveness)
				break;
				
			case Paperdoll.DOLL_SLOT_BACK:
				thing = Mobs.lootForBackpack(effectiveness)
				break;

			case Paperdoll.DOLL_SLOT_TORSO:
				thing = Torsos.ofRandomEffect(increase, effectiveness)
				break;

			case Paperdoll.DOLL_SLOT_HAND_LEFT:
				thing =  Weapons.ofRandomEffect(increase, effectiveness)
				break;

			case Paperdoll.DOLL_SLOT_HAND_RIGHT:
				thing =  Weapons.ofRandomEffect(increase, effectiveness)
				break;

				case Paperdoll.DOLL_SLOT_WAIST:
					thing =  Waists.ofRandomEffect(increase, effectiveness)
					break;

			case Paperdoll.DOLL_SLOT_LEGS:
				thing = Boots.ofRandomEffect(increase, effectiveness)
				break;

			default:
				// Don't want to import and use Item because I'm trying to break a loop so give em nothing
				// thing = Item.ofNoValue()
				thing = null
		}

		return thing
	}



	static tier1(region) {
		const mob = Mobs.template(
			() => Dice.d4(),
			() => 10 + Dice.d10(),
			() => 10 + Dice.d10(),
			'Tier 1 Mob'
		)

		mob.applyRegionModifiers(region.modifiers)

		// 60% chance of loot drop
		if(Dice.d100() < 61) {
			// which slot should the loot be for?
			const slot = Paperdoll.randomSlot()
			const loot = this.lootForSlot(slot, Modifiers.EFFECTIVENESS_VERY_LOW)

			mob.paperdoll.slots[slot] = loot;
		}

		// 50% chance of some extra currency
		if(Dice.d100() < 50) {
			mob.currency += Dice.d4()
		}

		return mob
	}

	static tier2(region) {
		const mob = Mobs.template(
			() => Dice.d4(2),
			() => 20 + Dice.d10(),
			() => 20 + Dice.d10(),
			'Tier 2 Mob',
			region
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = new Weapons({
			effectiveness: Modifiers.EFFECTIVENESS_LOW
		});

		return mob
	}

	static tier3(region) {
		const mob = Mobs.template(
			() => Dice.d8(2),
			() => 35 + Dice.d10(),
			() => 35 + Dice.d10(),
			'Tier 3 Mob',
			region
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_MEDIUM
		);

		return mob
	}

	static tier4(region) {
		const mob = Mobs.template(
			() => Dice.d10(2),
			() => 55 + Dice.d20(),
			() => 55 + Dice.d20(),
			'Tier 4 Mob',
			region
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_MEDIUM
		);

		return mob
	}

	static tier5(region) {
		const mob = Mobs.template(
			() => Dice.d10(3),
			() => 75 + Dice.d20(),
			() => 75 + Dice.d20(),
			'Tier 5 Mob',
			region
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_HIGH
		);

		return mob
	}

	static tier6(region) {
		const mob = Mobs.template(
			() => Dice.d20(3),
			() => 95 + Dice.d4(),
			() => 95 + Dice.d4(),
			'Tier 6 Mob',
			region
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_VERY_HIGH
		);

		return mob
	}
}
