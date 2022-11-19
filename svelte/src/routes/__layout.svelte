<script>
	import { 
		board, 
		characters, chests, 
		consumablesVendors, equipablesVendors, 
		moves, 
		parties, 
		started, won 
	} from '$lib/stores.js';

	import '../app.css';

	import Log from '$lib/components/Content/Log.svelte';
	import Layout from '$lib/components/Structure/Layout.svelte'
	import Parties from '$lib/components/Parties.svelte';

	import Board from '$lib/Map/Board'
	import Character from '$lib/Character'
	import Chest from '$lib/Chest'
	import ConsumablesVendor from '$lib/Entities/ConsumablesVendor.js'
	import Dice from '$lib/Dice'
	import EquipablesVendor from '$lib/Entities/EquipablesVendor.js'
	import Move from '$lib/Move'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Party from '$lib/Party'
	import QuestItems from '$lib/Decks/QuestItems'

	// rmd todo get this from an environment variable or config file or something
	const isDev = true

	// setup initial game state.
	function start(key, seed) {
		Dice.primeWithSeed(seed);

		// Create the board
		$board = new Board({
			regionsToDraw: 6
		});

		// Create starting characters
		$characters = [
			new Character({ startingGear: true }),
			new Character({ startingGear: true }),
			new Character({ startingGear: true }),
		];

		// Allocate Win Condition Items
		// just one for now
		$characters[0].paperdoll.slots[Paperdoll.DOLL_SLOT_LEGS] = QuestItems.winCondition()

		// Create starting chest
		$chests = [new Chest()];

		// Create equipment vendor
		$equipablesVendors = [new EquipablesVendor()]
		// Create resource vendor
		$consumablesVendors = [new ConsumablesVendor()]

		// Assemble starting party
		let members = [];
		$characters.forEach((value) => {
			members = [...members, value.id];
		});

		$parties = [new Party({ members })];

		// Start the log
		const firstMove = new Move(
			Move.TYPE_START_GAME,
			{
				key: key,
				seed: seed
			},
			`A new game was started with seed ${seed}`
		);

		$moves = [firstMove];

		$won = false;

		// The game has begun!
		$started = true;

		// console.log(
		//   '__layout.start(): board, characters, chests, moves, parties, started, won',
		//   $board,
		//   $characters,
		//   $chests,
		//   $moves,
		//   $parties,
		//   $started,
		//   $won
		// )
	}

	function handleKeydown(event) {
		// on keypress filter meta keys and such.
		// progress game for all others

		const ignore = ['Alt', 'Control', 'Meta', 'Shift'];

		return ignore.find((element) => element === event.key) ?? progress(event.key);
	}

	function progress(key) {
		if (!$started) {
			// #region start game
			
			// fixed seed for debugging, milliseconds since epoch for prod, since easy.
			const seed = isDev ? 20 : Date.now();
			start(key, seed);
			
			let turn = 0;
			// autopilot setting here
			// CHANGE THIS VALUE TO AUTOPLAY
			// > 220 - 230ish - game is won
			const autoplayToTurn = 0;
			while (turn < autoplayToTurn) {
				console.log(`autoplay turn ${turn}`);
				turn++;
				progress(key);
			}
			
			// #endregion start game
		}

		// #region progress parties
		let updatedCharacters = [];
		const updatedParties = [];
		
		$parties.forEach((party, index) => {
			const {
				progressedBoard,
				progressedCharacters,
				progressedChests,
				progressedMoves,
			} = party.progress(
				$board,
				$characters,
				$chests,
				$moves
				)
				
				$board = progressedBoard
				$characters = progressedCharacters
				$chests = progressedChests
				$moves = progressedMoves
				
				$parties[index] = party
		});
		// #endregion progress parties

		// #region progress vendors
		$equipablesVendors.forEach( (ev, idx) => {
			$equipablesVendors[idx] = ev.progress()
		})
		
		$consumablesVendors.forEach( (cv, idx) => {
			$consumablesVendors[idx] = cv.progress()
		})
		
		$equipablesVendors = [...$equipablesVendors]
		$consumablesVendors = [...$consumablesVendors]
		// #endregion progress vendors

		if ($board.allWinConditionsReturned() ) {
			console.error("GAME HAS BEEN WON")
			$won = true;
		}

		console.log(
			'__layout.progress(): board, characters, chests, moves, parties, started, won, equipablesVendors, consumablesVendors',
			$board,
			$characters,
			$chests,
			$moves,
			$parties,
			$started,
			$won, 
			$equipablesVendors, 
			$consumablesVendors
		);
	}

</script>

<svelte:head>
	<title>Inventory Management: The Game</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div>
	<slot />
</div>

<style>

</style>
