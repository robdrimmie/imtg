import Dice from '$lib/Dice'
import Move from '$lib/Move'
import Paperdoll from '$lib/Items/Paperdoll'
import Torsos from '$lib/Items/Torsos'
import Weapons from '$lib/Items/Weapons'
import Modifiers from '$lib/Modifiers'

/*

To Hit: PHYSICALITY_COORDINATION
To Dodge: PHYSICALITY_COORDINATION


DAMAGE MODIFIERS
- melee buffs - 
- melee cc - 
- melee dps - PHYSICALITY_BRAWN
- ranged buffs - 
- ranged cc - 
- ranged dps - 

DEFENSE MODIFIERS
- melee buffs - PHYSICALITY_COORDINATION
- melee cc - 
- melee dps - PHYSICALITY_BRAWN
- ranged buffs - 
- ranged cc - 
- ranged dps - 

ATTRIBUTE TO BUFF
- melee buffs - 
- melee cc - 
- melee dps - 
- ranged buffs - 
- ranged cc - 
- ranged dps - 

*/

class Target {
	static TARGET_GROUP_ALLIES = 'TARGET_GROUP_ALLIES';
	static TARGET_GROUP_OPPONENTS = 'TARGET_GROUP_OPPONENTS';

	constructor(group, index) {
		this.group = group;
		this.index = index;
	}
}

const doesAttackHit = (actor, target) => {
	const attack = actor.rollHit()
	const dodge = target.rollDodge()

	console.log("doesAttackHit", attack, dodge, attack > dodge)
	return attack > dodge
}

class Job {
	constructor(props) {
		this.name = props.name
		this.multiplier = props.multiplier

		this.doesAttackHit = doesAttackHit

		this.tooltip = props.tooltip
	}

	combatAction(actor, partyMembers, opponentMembers) {
		console.log(
			"Jobs combatAction called with actor, partyMembers, opponentMembers", 
			actor, partyMembers, opponentMembers
		)

		const allies = [...partyMembers];
		const opponents = [...opponentMembers];

		// if the actor has no health no changes or moves can occur
		if (actor.getCurrentHealth() < 1) {
			return {
				allies,
				opponents,
				moves: [new Move(Move.TYPE_OTHER_MESSAGES, {}, `${actor.name} has 0 or less health and cannot act`)]
			};
		}

		let target
		const targetToPick = actor.pickTarget(actor, allies, opponents);
		
		// console.log("targetToPick", targetToPick)

		// if the target is self, it will still return the appropriate group and index
		switch (targetToPick.group) {
			case Target.TARGET_GROUP_OPPONENTS:
				target = opponents[targetToPick.index]
				break;

			case Target.TARGET_GROUP_ALLIES:
			default:
				target = allies[targetToPick.index]
		}

		var message = `${actor.name} targeted ${target.name}`;

		if (actor.job.doesAttackHit(actor, target)) {
			const hitResults = actor.resolveSuccessfulHit(target)
			message += hitResults.message

		
			switch (targetToPick.group) {
				case Target.TARGET_GROUP_ALLIES:
					allies[target.index] = hitResults.modifiedCharacter
					break
	
				case Target.TARGET_GROUP_OPPONENTS:
					opponents[target.index] = hitResults.modifiedCharacter
			}
	
			message += ` and ${hitResults.label} ${hitResults.attributeToModify} by ${hitResults.amountToModifyAttribute}`;
		} else {
			message += ` ATTACK DID NOT HIT`
		}

		const moves = [new Move(Move.TYPE_OTHER_MESSAGES, {}, message)];

		return {
			allies,
			opponents,
			moves
		};
	}

	
	// I guess some of this logic could have been simplified by just shuffling the array
	// and starting at 0 but that would need to return a meaningful index so it isn't 
	// clear to me that that would be better
	seekTargetWithHealth(targets) {
		// we are seeking through all the targets starting at a random one (Dice.roll)
		const originalIdx = Dice.roll(targets.length) - 1		
		let workingIdx = originalIdx

		do {
			// if the random one has health, that is our target and we are done
			if(targets[workingIdx].getCurrentHealth() > 0) {
				return workingIdx
			}

			// otherwise go to the next one in the list,
			// eg if 2 was rolled, if targets[2] has no health, check target[3] and so on
			workingIdx++
			
			// until the end of the list is passed, then loop to the start of it
			if(workingIdx >= targets.length) workingIdx = 0
		}

		// stop seeking if we get all the way back to the rolled target (eg 2)
		while(workingIdx != originalIdx)
		
		// if we have come this far, no targets have health so just return the rolled target
		return workingIdx
	}

	// RMD TODO Jobs should override this
	// - eg maybe someone looks for lowest health to heal (or to kill enemies faster?) or something like that
	pickTarget(actor, allies, opponents) {
		// console.log("pickTarget - start, actor, allies, opponents", actor, allies, opponents)
		// so 'bad guys' depends on who the actor is. If the actor is an allie, attack opponents,
		// otherwise attack the allies.
		const inAllies = allies.findIndex((character) => {
			// console.log("pickTarget calcInAllies - character, actor", character, actor, character.id === actor.id)
			return character.id === actor.id
		});

		var targetGroup = Target.TARGET_GROUP_OPPONENTS;
		var targetIndex = 0;

		if (inAllies > -1) {
			targetIndex = this.seekTargetWithHealth(opponents)
			targetGroup = Target.TARGET_GROUP_OPPONENTS;
		} else {
			targetIndex = this.seekTargetWithHealth(allies)
			targetGroup = Target.TARGET_GROUP_ALLIES;
		}

		// console.log("pickTarget - , inAllies, targetIndex, targetGroup", inAllies, targetIndex, targetGroup)

		// right now there is no way to target self, but if there is 
		// it needs to return the correct group and index

		return new Target(targetGroup, targetIndex);
	}

	// Jobs can override this, healers might want to do something different although 
	// it sort of seemed like it worked okay in a recent run through
	resolveSuccessfulHit(actor, target) {
		const actorWeapon = actor.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT];

		// console.log("resolveSuccessfulHit - actor, target, actorWeapon", actor, target, actorWeapon)
		// console.log("target currentHealth before: ", target.getCurrentHealth())

		const weaponName = actorWeapon
			? actorWeapon.name
			: "an empty left hand"
		const hitResults = actorWeapon 
			? actorWeapon.modifyCharacter(target, actor.getCurrentBrawn())
			: Weapons.Fist().modifyCharacter(target, actor.getCurrentBrawn())
		
		// console.log("resolveSuccesfulHit hitResults", hitResults)

		// console.log("target currentHealth after: ", target.getCurrentHealth())

		hitResults['message'] = `${target.name} with ${weaponName}`;

		return hitResults
	}

	// #region Starting Gear
	startingArmour() {
		return Torsos.ofIncreaseHealth()
	}

	startingCurrency() {
		return 10;
	}

	startingFood() {
		return 10;
	}

	startingWeapon() {
		return Weapons.ofDecreaseHealth();
	}
	// #endregion Starting Gear
}

export default class Jobs {
	static cards() {
		return [
			Jobs.meleeBuffs(),
			Jobs.meleeCc(),
			Jobs.meleeDps(),

			Jobs.rangedBuffs(),
			Jobs.rangedCc(),
			Jobs.rangedDps()
		];
	}

	static random() {
		const deck = Jobs.cards();
		const roll = Dice.range(0, deck.length - 1);

		return deck[roll];
	}

	static meleeBuffs() {
		return new Job({
			name: 'Melee Buffs',
			multiplier: (toModify, modificationConsiderations) => toModify,

			/*
				melee buffs wants to change the attributes of a character
				- boost allied characters
				- drain opposed characters

				only one action, so how to decide? 
				- how severe is the threat
				- high threat
					- strongest power first
				- low threat
					- kill them all fast
			*/
			pickTarget: (actor, allies, opponents) => {
				// melee buffs buffs picks a random ally
				return new Target(
					allies, 
					Dice.roll(allies.length, 1) - 1
				);
			},

			tooltip: 'Close combat; boost party members, drains opponents'

		});
	}

	static meleeCc() {
		return new Job({
			name: 'Melee Crowd Control',
			multiplier: (toModify, modificationConsiderations) => toModify,
			tooltip: 'Close combat; debuffs opponents'
		});
	}

	static meleeDps() {
		return new Job({
			name: 'Melee DPS',
			multiplier: (toModify, modificationConsiderations) => toModify,
			tooltip: 'Close combat; damages opponents'
		});
	}

	static rangedBuffs() {
		return new Job({
			name: 'Ranged Buffs',
			multiplier: (toModify, modificationConsiderations) => toModify,
			tooltip: 'Ranged combat; buffs party'
		});
	}

	static rangedCc() {
		return new Job({
			name: 'Ranged Crowd Control',
			multiplier: (toModify, modificationConsiderations) => toModify,
			tooltip: 'Ranged combat; debuffs opponents'
		});
	}

	static rangedDps() {
		const rangedDps = new Job({
			name: 'Ranged DPS',
			multiplier: (toModify, modificationConsiderations) => toModify,
			tooltip: 'Ranged combat; damages opponents'
		})

		// 20220904 1913 it feels like this isn't necessary right yet, just need to pick an enemy so 
		// default stuff should be fine. hanging onto this in case I am wrong or to remind me of how
		// to do it
		//
		//
		//
		// ranged dps just picks the first opponent for now
		// rangedDps.pickTarget = (actor, allies, opponents) => {
		// 	console.log("rangedDps.pickTarget", actor, allies, opponents)
		// 	return new Target(
		// 		Target.TARGET_GROUP_OPPONENTS, 
		// 		0
		// 	);
		// }

		return rangedDps
	}
}
