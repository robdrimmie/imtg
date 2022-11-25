import Move from '$lib/Move';

const modifyCharacters = ({}) => {
	return { passed: false, loot: [] };
};

const distributeLoot = (charactersToModify, lootToDistribute, moveToModify) => {
	let characters = [...charactersToModify]
	let loot = [...lootToDistribute]
	let move = Object.assign({}, moveToModify)

	// RMD TODO refactor allocate loot
	// this logic should live with Party probably
	// loop through allies, allocating loot
	let modCharIndex = 0;

	// need to make sure if no one can carry we just move on
	// so whenever a character is at capacity, add their id to this array.
	// there are cleaner ways to do this I'm sure but it works okay for now.
	let capacityCharacterIds = [];
	while (
		loot.length > 0 
		&& capacityCharacterIds.length < characters.length 
	) {

		// console.log(
		// 	"modified and index and length", 
		// 	characters, 
		// 	modCharIndex
		// 	, characters.length
		// )


		if (characters[modCharIndex].backpack().capacity > 0) {
			const looted = loot.pop();

			characters[modCharIndex].backpack().contain(looted);

			move.moves = [
				...move.moves,
				new Move(
					Move.TYPE_OTHER_MESSAGES,
					{},
					`${characters[modCharIndex].name} has looted ${looted.name}`
				)
			];
		} else {
			capacityCharacterIds[characters[modCharIndex].id] = true;
		}

		modCharIndex++;
		if (modCharIndex >= characters.length) {
			modCharIndex = 0;
		}
	}

	return {characters, move}
}

// Add characters to an array keyed by their initiative roll
// If duplicate initiative rolls occur the two characters reroll
// and the winner is moved up in the array. This repeats until all characters fit.
// Characters is an array of arrays and normally will contain allies and opponents
// but maybe there will be more, multiple parties and such.
// RMD TODO bonus initiative slots for characters, based on coordination maybe? like attacks per round basically.
const initiativeForParties = (parties = []) => {
	const initiativeOrder = [];
// console.log("ifp parties", parties)
	parties.forEach((partyMembers) => {
		// console.log("partyMembers", partyMembers)
		partyMembers.forEach((character) => {
			// console.log("combat - intiativeForParties - character, parties", character, parties)

			let seeker = character;
			let initiative = seeker.rollInitiative();

			let loopBreaker = 0;

			// while this initiativeOrder slot is occupied by a different character, roll off and resolve
			while (initiativeOrder[initiative] && initiativeOrder[initiative].id !== seeker.id) {
				const holder = initiativeOrder[initiative];

				let holderRoll = holder.rollInitiative();
				let seekerRoll = seeker.rollInitiative();

				// console.log(`Holder rolled ${holderRoll}, seeker rolled ${seekerRoll}`);
				// the higher roll goes earlier in intiative, so..

				// if there is a tie don't change initiative, just do the loop again
				// so the roll off happens for the same slot
				if (holderRoll === seekerRoll) {
					// console.log('holder and seeker tied', holder.id, seeker.id);
					// this could lead to an infinite loop. newcomer gets the slot in this case
					if (loopBreaker === 100) {
						// console.log('breaking loop?');
						holderRoll = seekerRoll + 1;
					} else {
						loopBreaker++;
						continue;
					}
				} else if (holderRoll > seekerRoll) {
					// if the holder wins the roll, the seeker goes in this spot, and the
					// holder becomes the seeker. standard swap
					// console.log('holder loses, doing swap holderId, seekerId', holder.id, seeker.id);

					const tempCharacter = initiativeOrder[initiative];
// console.log("tempCharacter and seeker names", tempCharacter, seeker, initiative)
					initiativeOrder[initiative] = seeker;

					seeker = tempCharacter;
// console.log("tempCharacter and seeker names", tempCharacter, seeker, initiative)
				} else {
					// if the seeker wins the roll, nothing has to happen, the seeker will
					// try the next initiative slot
					// console.log('holder wins, doing swap holderId, seekerId', holder.id, seeker.id);
				}

				initiative++;
			}
			// console.log('assigning character to initiative', character.name, initiative, seeker.name);

			initiativeOrder[initiative] = seeker;

			// console.log("assigned char to iO with init val", initiativeOrder, initiative, character.name)
			// console.log("name of initiativeOrder[8]", initiativeOrder[8].name)
		});
	});

	// console.log("returning iO", initiativeOrder)
	return initiativeOrder;
};

const lootOpponents = (opponents) => {
	let loot = []

	opponents.forEach((opponent) => {
		loot = [...loot, ...opponent.loot()];
	});

	return loot
}

const runInitiative = (
	initiativeOrder,
	charactersToModify,
	opponentsToModify,
	moveToModify	
) => {

	let characters = [...charactersToModify]
	let opponents = [...opponentsToModify]
	let move = Object.assign({}, moveToModify)

	let loopBreaker = 0;
	let inInitiative = true;

	// console.log("Combat - runInitiative", characters, opponents)

	// the combat loop
	while (inInitiative && ++loopBreaker < 50) {
		
		// Array.prototype.reverse() reverses the array in place. slice() makes a copy first
		// initiativeOrder is an array 1..100, reversed so highest number goes first
		initiativeOrder.slice().reverse().forEach((combatant) => {
			// dead (or unconcious?) characters get no actions, maybe they should some day
			if(combatant.getCurrentHealth() > 0) {
				const results = combatant.combatAction(characters, opponents);

				characters = [...results.allies];
				opponents = [...results.opponents];
				move.moves = [...move.moves, ...results.moves];
			}
		});
		
		// console.log("iO before", initiativeOrder)

		// remove dead characters from initiative
		initiativeOrder = initiativeOrder.filter((character) => {
		
			// console.log("char dead?", character.getCurrentHealth(), character.getCurrentHealth() <= 0)

			if (character.getCurrentHealth() <= 0) {
				// console.log("a")
				move.moves = [
					...move.moves,
					new Move(Move.TYPE_OTHER_MESSAGES, {}, `${character.name} has died!`)
				];

				// console.log("not less or eq 0")
				return false;
			}

			// console.log("less or eq 0", character.getCurrentHealth(), character.getCurrentHealth() <= 0)
			return true;
		});
// console.log("iO after", initiativeOrder)
		// so how should combat end?

		// if initiativeorder is either All Allies or All Opponents, combat should end. One side or the other won.

		// console.log("chars has chars, opps has chars", 
		// 	characterArrayHasCharacters(initiativeOrder, characters),
		// 	characterArrayHasCharacters(initiativeOrder, opponents)
		// )

		if(characterArrayHasCharacters(initiativeOrder, characters) 
			&& characterArrayHasCharacters(initiativeOrder, opponents)
		) {
			// continue
		} else {
			inInitiative = false;
		}
	
	}

	if(loopBreaker >= 50) {
		console.error( "BOILERPLATE COMBAT LOOPBREAKER TRIGGERED")
	}

	return { 
		characters,
		opponents,
		move
	}
}

const characterArrayHasCharacters = (haystack, needles) => {
	for(let hayIdx = 0; hayIdx < haystack.length; hayIdx++) {
		for(let needleIdx = 0; needleIdx < needles.length; needleIdx++) {
			if(haystack[hayIdx].id === needles[needleIdx].id) return true
		}
	}

	// none were found
	return false
}

export default class Combat {
	static DEFAULT_DESCRIPTION = 'No description supplied to constructor';
	static DEFAULT_NAME = 'No name supplied to constructor';
	static DEFAULT_MODIFY_CHARACTERS = () => {
		return { passed: false, loot: [] };
	};

	constructor(options) {
		// console.log("combat constructing with options", options)
		this.description = options.description;
		this.name = options.name;
		this.modifyCharacters = options?.modifyCharacters ?? modifyCharacters;
	}

	static cards(tile) {
		console.log('Combat cards tile', tile);
		return [Combat.boilerplate(tile)];
	}

	/*
      A boilerplate combat encounter is straight-forward. Two groups of beings meet and 
      perform their normal combat actions in initiative order. 
    */
	static boilerplate(tile) {
		const tileOpponents = () => {
			return tile.generateOpponents()
		};

		// flavour comes from the tile so I need that, and difficulty is tricky too
		// it's possible Boilerplate should just be its own class that conforms to an interface
		// I guess that's sort of what I'm doing? I can like... wrap the Combat in uhhhhhh stuff

		return new Combat({
			description: 'A boilerplate combat encounter',
			name: 'Boilerplate Encounter',
			modifyCharacters: (params) => {
				const {charactersToModify, chests} = params
				
				let characters = [...charactersToModify];
				let opponents = tileOpponents();
				let move = Move.other(
					`The party began a boilerplate combat encounter against ${opponents.length} opponents!`
				);

				var initiativeOrder = initiativeForParties([characters, opponents]);

				({ 
					characters,
					opponents,
					move
				} = runInitiative(
					initiativeOrder,
					characters,
					opponents,
					move
				)) 

				const livingCharacters = characters.filter( char => 
					char.getCurrentHealth() > 0
				)

				// RMD TODO Loot distribution strategies
				// If there are any living characters alive, loot is ditributed amongst all of them
				if(livingCharacters.length < 1) {
					// RMD TODO - something if all the characters are dead
					console.error("NO LIVING CHARACTERS TO LOOT")
				} else {
					({characters, move} = distributeLoot(
						characters, 
						lootOpponents(opponents), 
						move
					))
				}

				// console.log("combat.boilerplatereturning", {
				// 	characters,
				// 	move,
				// 	chests
				// })

				return {
					characters,
					move,
					chests
				};
			}
		});
	}

	static partyGetsTheJump(tile, difficulty) {}

	static partyGetsAmbushed(tile, difficult) {}

	static sniper(tile, difficult) {}
}
