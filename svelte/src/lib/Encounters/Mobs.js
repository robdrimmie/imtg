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
	static template(calcResource, calcPhysicality, mobName) {
		const startingResources = [];
		startingResources[Attributes.RESOURCES_ENERGY] = calcResource();
		startingResources[Attributes.RESOURCES_HEALTH] = calcResource();
		startingResources[Attributes.RESOURCES_SATIETY] = calcResource();

		const startingPhysicality = [];
		startingPhysicality[Attributes.PHYSICALITY_AWARENESS] = calcPhysicality();
		startingPhysicality[Attributes.PHYSICALITY_BRAWN] = calcPhysicality();
		startingPhysicality[Attributes.PHYSICALITY_COORDINATION] = calcPhysicality();
		startingPhysicality[Attributes.PHYSICALITY_ENDURANCE] = calcPhysicality();
		startingPhysicality[Attributes.PHYSICALITY_MAGNETISM] = calcPhysicality();

		const name = mobName ? mobName : Names.character()
		return new Character({
			job: Jobs.random(),
			name,
			resources: Character.generateResources(startingResources),
			currency: Dice.d2(),
			paperdoll: Paperdoll.forMob(),
			physicality: Character.generatePhysicality(startingPhysicality)
		});		
	}

	static lootForBackpack() {
		return Dice.d2() ? Food.ofRandomEffect() : Potions.ofRandomEffect()
	}

	static lootForSlot(slot) {
		let thing;
		switch(slot) {
			case Paperdoll.DOLL_SLOT_HEAD:
				thing = Hats.ofRandomEffect()
				break;
				
			case Paperdoll.DOLL_SLOT_BACK:
				thing = Mobs.lootForBackpack()
				break;

			case Paperdoll.DOLL_SLOT_TORSO:
				thing = Torsos.ofRandomEffect()
				break;

			case Paperdoll.DOLL_SLOT_HAND_LEFT:

				thing =  Weapons.ofRandomEffect()
				break;

			case Paperdoll.DOLL_SLOT_HAND_RIGHT:
				thing =  Weapons.ofRandomEffect()
				break;

				case Paperdoll.DOLL_SLOT_WAIST:
					thing =  Waists.ofRandomEffect()
					break;

			case Paperdoll.DOLL_SLOT_LEGS:
				thing = Boots.ofRandomEffect()
				break;

			default:
				// Don't want to import and use Item because I'm trying to break a loop so give em nothing
				// thing = Item.ofNoValue()
				thing = null
		}

		return thing
	}

	static tier1() {
		const mob = Mobs.template(
			() => Dice.d4(),
			() => 10 + Dice.d10(),
			'Tier 1 Mob'
		)

		// 10% chance of loot drop
		if(Dice.d100() < 11) {
			// which slot should the loot be for?
			const slot = Paperdoll.randomSlot()
			const loot = this.lootForSlot(slot)

			mob.paperdoll.slots[slot] = loot;
		}

		// 50% chance of some currency
		if(Dice.d100() < 50) {
			mob.currency = Dice.d4()
		}

		return mob
	}

	static tier2() {
		const mob = Mobs.template(
			() => Dice.d4(2),
			() => 20 + Dice.d10(),
			'Tier 2 Mob'
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = new Weapons({
			effectiveness: Modifiers.EFFECTIVENESS_LOW
		});

		return mob
	}

	static tier3() {
		const mob = Mobs.template(
			() => Dice.d8(2),
			() => 35 + Dice.d10(),
			'Tier 3 Mob'
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_MEDIUM
		);

		return mob
	}

	static tier4() {
		const mob = Mobs.template(
			() => Dice.d10(2),
			() => 55 + Dice.d20(),
			'Tier 4 Mob'
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_MEDIUM
		);

		return mob
	}

	static tier5() {
		const mob = Mobs.template(
			() => Dice.d10(3),
			() => 75 + Dice.d20(),
			'Tier 5 Mob'
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_HIGH
		);

		return mob
	}

	static tier6() {
		const mob = Mobs.template(
			() => Dice.d20(3),
			() => 95 + Dice.d4(),
			'Tier 6 Mob'
		)

		mob.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT] = Weapons.ofDecreaseHealth(
			Modifiers.EFFECTIVENESS_VERY_HIGH
		);

		return mob
	}
}
