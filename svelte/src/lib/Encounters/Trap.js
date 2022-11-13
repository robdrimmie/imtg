import Attributes from '$lib/Attributes'
import Dice from '$lib/Dice'
import Weapons from '$lib/Items/Weapons'
import Move from '$lib/Move'

export default class Trap {
	static DEFAULT_DESCRIPTION = 'No description supplied to constructor';
	static DEFAULT_NAME = 'No name supplied to constructor';
	static DEFAULT_MODIFY_CHARACTERS = () => {
		return { passed: false, loot: [] };
	};

	constructor(options) {
		this.description = options?.description ?? Trap.DEFAULT_DESCRIPTION;
		this.name = options?.name ?? Trap.DEFAULT_NAME;
		this.modifyCharacters = options?.modifyCharacters ?? Trap.DEFAULT_MODIFY_CHARACTERS;
	}

	static cards() {
		return [Trap.triggeredProjectile()];
	}

	static triggeredProjectile(tile) {
		// setup difficulty with tile.getDifficulty

		const description = 'If triggered, one or more projectiles are shot at the party!';
		const name = 'Triggered Projectile Trap';
		return new Trap({
			description,
			name,
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				const partyMembers = charactersToModify;

				const move = new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					`The party began a Trap - Triggered Projectile encounter`
				);

				let accidentallyTriggered = false;
				let disarmFailed = false;
				let spottedButTriggered = false;

				// is the trigger spotted?
				// modify with tile difficulty
				const difficultyToSpot = Dice.d100();
				// console.log("difficultyToSpot", difficultyToSpot)

				const spottedByIndex = partyMembers.findIndex((member) => {
					return (
						member.physicality.get(Attributes.PHYSICALITY_AWARENESS).current >
						difficultyToSpot
					);
				});

				if (spottedByIndex > -1) {
					move.moves = [
						...move.moves,
						new Move(
							Move.TYPE_OTHER_MESSAGES,
							{},
							`${partyMembers[spottedByIndex].name} spotted ${name}`
						)
					];

					/*
						- should an attempt to disarm the trigger be made?
						- the party member with the highest total concientiousness and coordination will attempt to disable
						- if that value exceeds some threshold. so reduce then test against threshold.
					*/
					const difficultyToDisarm = Dice.d100();
					// console.log("difficultyToDisarm", difficultyToDisarm)
					const bestChanceMember = partyMembers.filter((member) => {
						return (
							member.personality.get(Attributes.PERSONALITY_CONSCIENTIOUSNESS).current +
								member.physicality.get(Attributes.PHYSICALITY_AWARENESS).current >
							difficultyToDisarm
						);
					});
					// rmd todo this just pulls the first one that beat the threshold, not the highest sum

					if (bestChanceMember.length > 0) {
						move.moves = [
							...move.moves,
							new Move(
								Move.TYPE_OTHER_MESSAGES,
								{},
								`${bestChanceMember[0].name} tries to disarm the Trap`
							)
						];

						// this member shall attempt to disarm the trap with some advantage since it was spotted
						const roll = Dice.d100();
						// console.log("disarm modifier roll", roll)
						// rmd todo refactor
						// hardcoded as first element because I don't want to find the biggest yet
						const modifiedTrait =
							bestChanceMember[0].physicality.get(Attributes.PHYSICALITY_COORDINATION)
								.current + roll;

						// if the attempt was made, was the trap triggered?
						spottedButTriggered = modifiedTrait < 60;
					} else {
						// if the attempt was not made, is everyone able to get past the trigger without triggering it?
						// with some advantage since it was spotted
						const triggeredBy = partyMembers.find((member) => {
							const roll = Dice.d100();
							// console.log("dodge modifier roll", roll)
							const modifiedTrait =
								member.physicality.get(Attributes.PHYSICALITY_COORDINATION).current + roll;

							// console.log("spotted not disarmed - triggeredBy roll", roll, modifiedTrait)
							return modifiedTrait < 60;
						});
						// console.log("triggeredBy", triggeredBy)
						// if it isn't triggered by anyone (-1), it isn't triggered
						spottedButTriggered = triggeredBy ? true : false;
					}
					// console.log("spottedbutTriggered", spottedButTriggered)
					if (spottedButTriggered) {
						move.moves = [
							...move.moves,
							new Move(Move.TYPE_OTHER_MESSAGES, {}, `The trap was triggered!`)
						];
					} else {
						move.moves = [
							...move.moves,
							new Move(Move.TYPE_OTHER_MESSAGES, {}, `The trap was passed safelty!`)
						];
					}
				} else {
					const triggeredBy = partyMembers.find((member) => {
						const roll = Dice.d100();
						// console.log("not spotted triggered by roll", roll)

						const modifiedTrait =
							member.physicality.get(Attributes.PHYSICALITY_COORDINATION).current - roll;

						// console.log("not spotted triggered by modified trait", modifiedTrait)
						return modifiedTrait < 60;
					});

					if (triggeredBy && triggeredBy !== -1) {
						accidentallyTriggered = true;

						move.moves = [
							...move.moves,
							new Move(
								Move.TYPE_OTHER_MESSAGES,
								{},
								`${triggeredBy.name} accidentally triggered a ${name}`
							)
						];
					}
				}

				let characters = [...partyMembers];

				const triggered = accidentallyTriggered || disarmFailed || spottedButTriggered;
				if (triggered) {
					// if the trap is triggered it's just a straight up coordination check
					characters = partyMembers.map((member, memberIndex, allMembers) => {
						let modifiedMember;

						const projectileCount = Dice.d4();
						// console.log("projectile count d4 roll", projectileCount)

						const roll = Dice.d100();
						// console.log("projectile coordination roll", roll)
						if (
							member.physicality.get(Attributes.PHYSICALITY_COORDINATION).current < roll
						) {
							// member is hit 1-4 projectiles, each of which do 1-4 points of damage (lesser health reduction)
							let projectileIndex = 1;
							let totalHealthChange = 0;

							for (projectileIndex = 1; projectileIndex <= projectileCount; projectileIndex++) {
								const currentHealth = member.resources.get(
									Attributes.RESOURCES_HEALTH
								).current;

								modifiedMember =
									Weapons.ofDecreaseHealth().modifyCharacter(member).modifiedCharacter;
								const healthChange =
									currentHealth -
									modifiedMember.resources.get(Attributes.RESOURCES_HEALTH).current;

								totalHealthChange += healthChange;
							}

							move.moves = [
								...move.moves,
								new Move(
									Move.TYPE_OTHER_MESSAGES,
									{},
									`${member.name} was hit by ${projectileCount} projectiles changing health by -${totalHealthChange}`
								)
							];
						} else {
							// return the unchanged member
							modifiedMember = member;

							move.moves = [
								...move.moves,
								new Move(
									Move.TYPE_OTHER_MESSAGES,
									{},
									`${member.name} dodged all ${projectileCount} projectiles!`
								)
							];
						}

						return modifiedMember;
					});
				} else {
					move.moves = [
						...move.moves,
						new Move(Move.TYPE_OTHER_MESSAGES, {}, `The party did not trigger the trap.`)
					];
				}

				return {
					characters,
					move,
					chests
				};
			}
		});
	}
}
