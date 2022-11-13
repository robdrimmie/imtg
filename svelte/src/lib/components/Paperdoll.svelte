<script>
	/*
		RMD TODO DELETE OLD CLASSES
	*/
	export let characterId;
	export let paperdoll;

	import Container from './Container.svelte';
	import Item from '$lib/Items/Item';
	import ItemType from '$lib/Reference/ItemType.js'
	import Paperdoll from '$lib/Items/Paperdoll';
	import Transfer from '$lib/Utilities/Transfer.js'

	import { characters, moves } from '$lib/stores';

	function handleConsiderTransfer(e) {
		items = e.detail.items;
	}

	function handleFinalizerTransfer(e, identifier, squareIndex) {
		console.log("paperdoll finalizer")

		const result = Transfer.handleFinalizer(
			$characters, 
			characterId,
			null, 
			null, // no chest id because it is the paperdoll?
			identifier,
			e.detail.items.length > 0 ? e.detail.items[0].rehydrate() : null,
			squareIndex
		)

		$characters = [...result.characters]
	}

	// rmd todo multiple characters
	const characterIndex = 0
</script>

{#if paperdoll.slots}
	<div class="doll">
		<div class="cell topleftplaceholder">
		</div>
		<div class="cell head">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_HEAD}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_HEAD]]}
				size={1}
				type={ItemType.HATS}
			/>
		</div>
		<div class="cell backpack">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_BACK}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_BACK]]}
				size={1}
				type={ItemType.BACKPACKS}
			/>
		</div>

		<div class="cell righthand">
			<Container
				{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_HAND_RIGHT}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT]]}
				size={1}
				type={ItemType.WEAPONS}
			/>
		</div>
		<div class="cell torso">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_TORSO}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_TORSO]]}
				size={1}
				type={ItemType.TORSOS}
			/>
		</div>
		<div class="cell lefthand">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_HAND_LEFT}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_LEFT]]}
				size={1}
				type={ItemType.WEAPONS}
			/>
		</div>

		<div class="cell waist">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_WAIST}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_WAIST]]}
				size={1}
				type={ItemType.WAISTS}
			/>
		</div>
		<div class="cell legs">
			<Container
			{handleConsiderTransfer}
				{handleFinalizerTransfer}
				identifier={`PAPERDOLL-${Paperdoll.DOLL_SLOT_LEGS}`}
				items={[$characters[characterIndex].paperdoll.slots[Paperdoll.DOLL_SLOT_LEGS]]}
				size={1}
				type={ItemType.BOOTS}
			/>
		</div>
		<div class="cell bottomrightplaceholder">

		</div>
	</div>
{/if}


<style>
	.doll {
		display: grid;

		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}

	.cell {
		display: grid;

		background-color: var(--background-paperdoll);
	}
</style>