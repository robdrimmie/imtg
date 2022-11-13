<script>
	export let handleConsiderContainer
	export let handleFinalizerContainer
	export let reference
	export let items = []
	export let type
	export let width = 99

	// rmd todo unused?

	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, TRIGGERS } from 'svelte-dnd-action';

	import Item from '$lib/Items/Item'
	import Tile from './Tile.svelte'

	let dropFromOthersDisabled = false
	function handleConsider(e) {

		handleConsiderContainer(e)

		// console.log("square consider", e.detail, items, reference)
		// if (handleConsiderContainer(e)) {
			// console.log("do it I guess")
			// items = e.detail.items;
		// } else {
			// items = items
// e.preventDefault()
			// console.log("huuuuuuh?", e, items)
		// }
		
		// const { items: newItems, info: { id, trigger } } = e.detail;
		

		///
		////
		/*
						e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
        e.detail.items.splice(idx, 0, {...bankItems[idx], id: newId});
        bankItems = e.detail.items;
		*/

/* maybe a plan
			look at item name
			look at slot type - set this up I guess
			if they don't match then remove the item from e.details.items
			either way, assign e.details.items to items
*/
		// const {trigger, id} = e.detail.info
		// console.log("trigger", trigger)
		// if (trigger === TRIGGERS.DRAGGED_ENTERED) {
		// 	// all items are allowed in TYPE_ITEM Squares
		// 	console.log("type of square", type)
		// 	if(type !== Item.TYPE_ITEM) {
		// 		console.log("before items length", e.detail.items.length)
		// 		e.detail.items = e.detail.items.filter(item => {
		// 			console.log("item", item, type, item.type === type)
		// 			return item.type === type

		// 			// figure out how to highlight the target square red to indicate the item can't be dropped
		// 		})
		// 		console.log("after items length", e.detail.items.length)
		// 	}
		// }

		// items = e.detail.items
	}

	function handleFinalizer(e) {
		handleFinalizerContainer(e, reference);

		// console.log("handleFinalize - e", e)
	}

	$: options = {
		dropFromOthersDisabled: dropFromOthersDisabled,
		items,
		dropTargetStyle: {},
		flipDurationMs: 100,
	};

console.log("SQUARE options", options)

	const styleWidth = `width: ${width}%`
	const styles = ''//`flex: 1 ${width}%;`
</script>

<div
	class="square"
	style={
		items.find((tile) => tile[SHADOW_ITEM_MARKER_PROPERTY_NAME])
			? `${styles};background: rgba(255, 255, 255, 0.2)`
			: `${styles}`
	}
	use:dndzone={options}
	on:consider={handleConsider}
	on:finalize={handleFinalizer}
>
	{#each items as tile (tile.id)}
		<Tile 
			icon={tile.icon}
			name={tile.name}
		></Tile>
	{/each}
</div>

<style>
	.square {
		border: 2px solid #272727;
		background-color: #393939;

		display: grid;
	}
</style>
