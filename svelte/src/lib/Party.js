import Dice from '$lib/Dice';
import Hex from '$lib/Map/Hex';
import Move from '$lib/Move';
import Names from '$lib/Decks/Names';
import Tile from '$lib/Map/Tile';

export default class Party {
	static PARTY_ACTION_ADVENTURE = 'PARTY_ACTION_ADVENTURE';
	static PARTY_ACTION_REST = 'PARTY_ACTION_REST';
	static PARTY_ACTION_VEND = 'PARTY_ACTION_VEND';

	constructor(props) {
		// RMD TODO randomize colors or something for when there are multiple parties
		this.color = 'orange';
		this.id = props.id ? props.id : Dice.nextId();
		this.name = Names.party();
		this.members = props && props.members ? props.members : [];
	}

	// rmd todo used stil?
	// "hydrate" the characters who are members of this party, sort of
	// probably the wrong word; get the full character record for each id
	// whatever that is called
	membersInCharacters(characters) {
		return characters.filter(
			(character) => this.members.indexOf(character.id) !== -1
		);
	}

	progress(board, characters, chests, moves) {
		if (this.members.size === 0) {
			console.error('party has no members and should disband');
			return;
		}

		// First move. Set the party in Origin Town and done.
		if (!this.tile) {
			return this.setPartyInOriginTown(board, characters, chests, moves);
		}

		// Typical turn
		// Choose the action the party wants to perform
		const scoredActionsAndTiles = this.scoreActionsAndTiles(
			this.membersInCharacters(characters)
		);

		// Figure out the best tile for that action
		const { selectedAction, selectedTile } = this.chooseActionAndTile(scoredActionsAndTiles);

		// console.log("Party progress scoredActionsAndTiles, selectedAction, selectedTile", scoredActionsAndTiles, selectedAction, selectedTile)

		// If there already, do it!
		if (this.tile.id === selectedTile.id) {
			// RMD TODO This breaks increasing tile knowledge since moveintotile is only called if they move
			// so something something separate into increaseTileKnowledge method or something that does it all
			// I think different actions should expose different types of knowledge perhaps
			// there is Character.UpdateRelationshipWithTile, so that's something.
			this.updateMemberTileRelationship(
				selectedTile, 
				this.membersInCharacters(characters));

			return this.performAction(selectedAction, board, characters, chests, moves);
		}

		// Otherwise move closer
		return this.approachTile(selectedTile, board, characters, chests, moves);
	}

	// #region party initialization stuff
	setPartyInOriginTown(board, characters, chests, moves) {
		const progressedBoard = board
		const progressedCharacters = this.moveIntoTile(board, characters, Tile.origin())
		const progressedChests = chests
		const progressedMoves = moves
		progressedMoves.push(Move.other(`The party '${this.name}' arrived in OriginTown`))
		
		return {
			progressedBoard,
			progressedCharacters,
			progressedChests,
			progressedMoves,
		}
	}
	// #endregion party initialization stuff

	// #region Action and Tile Selection
	chooseActionAndTile(scoredActions) {
		// console.log("chooseActionAndTile - scoredActions", scoredActions)

		// Default action will always be adventure I guess
		let selectedAction = Party.PARTY_ACTION_ADVENTURE;
		let selectedTiles = scoredActions.adventure.tiles;

		if (
			scoredActions.rest.score > scoredActions.adventure.score &&
			scoredActions.rest.score > scoredActions.vend.score
		) {
			selectedAction = Party.PARTY_ACTION_REST;
			selectedTiles = scoredActions.rest.tiles;
		}

		if (
			scoredActions.vend.score > scoredActions.adventure.score &&
			scoredActions.vend.score > scoredActions.rest.score
		) {
			selectedAction = Party.PARTY_ACTION_VEND;
			selectedTiles = scoredActions.vend.tiles;
		}

		// count tiles and pick the one with the most occurances, or the very last one in the list.
		// I suppose I could shuffle selectedTiles first if it becomes a problem
		// below from https://stackoverflow.com/a/20762713, "mode" of array, most frequently occuring element.
		const selectedTile = selectedTiles
			.sort(
				(a, b) =>
					selectedTiles.filter((v) => v === a).length - selectedTiles.filter((v) => v === b).length
			)
			.pop();

		// console.log("chooseActionAndTile", selectedAction, selectedTile)

		return {
			selectedAction,
			selectedTile
		};
	}

	// Get the scored actions and tiles from each party member
	scoreActionsAndTiles(partyMembers) {
		const partyMemberVotes = [];
		for (const [memberIndex, member] of partyMembers.entries()) {
			partyMemberVotes[memberIndex] = member.scoreActionsAndTiles();
		}

		// console.log("scoreActionsAndTiles partyMemberVotes", partyMemberVotes)

		const tally = {
			adventure: {
				score: 0,
				tiles: []
			},

			rest: {
				score: 0,
				tiles: []
			},

			vend: {
				score: 0,
				tiles: []
			}
		};

		// Get average score because char A picking .5 and char B picking .7 should be .6,
		// it should not be 0.35
		for (const thisMemberVote of partyMemberVotes) {
			const memberAdventure = thisMemberVote.get('adventure');
			tally.adventure.score += memberAdventure.score;

			if (
				memberAdventure.tile !== null &&
				memberAdventure.tile.decks.adventuring.cards.length > 0
			) {
				tally.adventure.tiles.push(memberAdventure.tile);
			}

			const memberRest = thisMemberVote.get('rest');
			tally.rest.score += memberRest.score;
			if (memberRest.tile !== null && memberRest.tile.decks.resting.cards.length > 0) {
				tally.rest.tiles.push(memberRest.tile);
			}
			tally.rest.tiles.push(memberRest.tile);

			const memberVend = thisMemberVote.get('vend');
			tally.vend.score += memberVend.score;
			if (memberVend.tile !== null && memberVend.tile.decks.vending.cards.length > 0) {
				tally.vend.tiles.push(memberVend.tile);
			}
		}

		tally.adventure.score /= partyMemberVotes.length;
		tally.rest.score /= partyMemberVotes.length;
		tally.vend.score /= partyMemberVotes.length;

		// console.log(
		// 	"tally preprune", 
		// 	tally, 
		//  	tally.adventure,
		//  	tally.adventure.tiles, 
		//  	tally.adventure.tiles[0], 
		//  	tally.adventure.tiles.length
		// )

		// If there are no tiles suitable for the action, we don't actually want to do it!
		if (tally.adventure.tiles.length === 0) {
			tally.adventure.score = 0;
		}

		if (tally.rest.tiles.length === 0) {
			tally.rest.score = 0;
		}

		if (tally.vend.tiles.length === 0) {
			tally.vend.score = 0;
		}

		return tally;
	}
	// #endregion Action and Tile Selection

	// #region Move into tile
	approachTile(tileToApproach, board, characters, chests, moves) {
		// console.log("approachTile - tileToApproach", board, tileToApproach, this.tile)

		const startingTile = this.tile;

		let directions = this.tile.directionsTowardsTile(tileToApproach);

		let chosenDirectionIndex = Dice.roll(directions.length) - 1;
		let chosenDirection = directions[chosenDirectionIndex];

		let destinationTile = Tile.findTileForHex(Hex.add(chosenDirection, this.tile.hex), board.tiles);

		// RMD TODO - navigating around the non-tiles between regions is yucky
		// if the destination tile doesn't exist, work out an alternative
		while (!destinationTile) {
			if (directions.length > 1) {
				// preferred direction is blocked but destination is diagonal so there is an alternative so use it
				// xor with 1 to toggle: https://stackoverflow.com/questions/2411023/most-elegant-way-to-change-0-to-1-and-vice-versa
				chosenDirectionIndex ^= 1;
				chosenDirection = directions[chosenDirectionIndex];
				console.log('using other direction');
			} else {
				// only one preferred direction was discovered but it is blocked
				// try going to one of the neighbours in basically the same direction
				directions = chosenDirection.forks();
				console.log('found forks directions', directions);

				// pick one of the forks
				chosenDirectionIndex = Dice.roll(directions.length) - 1;
				chosenDirection = directions[chosenDirectionIndex];

				// set it as the direction. in theory, if it is blocked the loop should flip over to the other one
				// if that one is blocked too I'm fucked I guess.
			}

			destinationTile = Tile.findTileForHex(Hex.add(chosenDirection, this.tile.hex), board.tiles);

			console.log(directions, destinationTile);
		}

		const move = new Move(
			Move.TYPE_OTHER_MESSAGES,
			{
				startingTile,
				tileToApproach,
				destinationTile,
			},
			`${this.name} moved to tile ${destinationTile.id}`
		);

		const progressedBoard = board
		const progressedCharacters = this.moveIntoTile(board, characters, destinationTile)
		const progressedChests = chests
		const progressedMoves = [
			...moves, 
			...[move]
		]

		return {
			progressedBoard,
			progressedCharacters,
			progressedChests,
			progressedMoves,
		}
	}

	moveIntoTile(board, characters, tile) {
		const neighbours = board.getNeighboursForTile(tile);

		// Move the party into the tile
		this.tile = tile;

		const progressedCharacters = characters.map((char) => {
			char.movedIntoTile(tile, neighbours);

			return char
		})

		return progressedCharacters;
	}
	// #endregion Move into tile

	performAction(actionToPerform, board, characters, chests, moves) {
		// console.log('performAction actionToPerform', actionToPerform);

		switch (actionToPerform) {
			case Party.PARTY_ACTION_ADVENTURE:
				return this.adventure(board, characters, chests, moves);

			case Party.PARTY_ACTION_REST:
				return this.rest(board, characters, chests, moves);

			case Party.PARTY_ACTION_VEND:
				return this.vend(board, characters, chests, moves);
		}

		console.error('Party.performAction NO ACTION WAS TAKEN!');
	}

	// #region Party Actions
	action(moveMessage, deck, board, characters, chests, moves) {
		// console.log("Party.action moveMessage, deck, board, characters, chests, moves", moveMessage, deck, board, characters, chests, moves)

		const move = new Move(Move.TYPE_OTHER_MESSAGES, {}, moveMessage);

		const card = deck.draw()[0];
		const results = card.modifyCharacters({
			charactersToModify: this.membersInCharacters(characters),
			chests
		});

		// console.log(`action drew card ${card.name} card results`, card, results);

		move.moves = [];

		const progressedBoard = board
		// RMD TODO This only works when there's only one party
		const progressedCharacters = results.characters
		const progressedChests = results.chests
		const progressedMoves = [
			...moves, 
			results.move
		]

		return {
			progressedBoard,
			progressedCharacters,
			progressedChests,
			progressedMoves,
		}
	}

	adventure(board, characters, chests, moves) {
		// console.log("adventure", this.tile)
		return this.action(
			`${this.name} is adventuring!`,
			this.tile.decks.adventuring,
			board, characters, chests, moves
		);
	}

	rest(board, characters, chests, moves) {
		// console.log("rest", this.tile)
		
		return this.action(
			`${this.name} is resting!`, 
			this.tile.decks.resting,
			board, characters, chests, moves	
		);
	}

	vend(board, characters, chests, moves) {
		// console.log("vend", this.tile)
		
		return this.action(
			`${this.name} is vending!`, 
			this.tile.decks.vending,
			board, characters, chests, moves
		);
	}
	// #endregion Party Actions

	updateMemberTileRelationship(tile, allMembers) {
		allMembers.forEach((member) => {
			member.updateRelationshipWithTile(tile);
		});
	}
}
