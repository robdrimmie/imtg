<script>
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

	import Tile from './Tile.svelte';

	$: items = [{ id: 'ID', letter: 'T' }];

	$: options = {
		dropFromOthersDisabled: false,
		items: items,
		dropTargetStyle: {},
		flipDurationMs: 100
	};

	const handleConsider = (event) => {
		console.log('SLOT consider', event);
	};

	const handleFinalize = (event) => {
		console.log(`Finalizing slot`, event);
	};
</script>

<div class="slot" use:dndzone={options} on:consider={handleConsider} on:finalize={handleFinalize}>
	{#if items.length > 0 && items[0].id}
		<Tile id={items[0].id} letter={items[0].letter} />
	{/if}
</div>

<style>
	.slot {
		border: 1px solid #272727;
		margin: 1px;
		display: inline-block;
		height: calc(2px + (1.4 * min(5vmin, 50px)));
		width: calc(2px + min(5vmin, 50px));
		border-radius: calc(min(5vmin, 50px) / 6.25);
		background-color: #4a4545;
	}
</style>
