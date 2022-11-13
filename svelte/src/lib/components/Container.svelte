<script>
	export let handleConsiderTransfer = () => { console.log("hi"); return true }
	export let handleFinalizerTransfer
	export let identifier
	export let items = []
	export let size = items.length
	export let type = "ITEM_TYPE_ITEM" // ItemType.ITEM hardcoded as default because imports don't work for this type of thing
	export let cols

	import Square from './Square.svelte'

	if (!cols) cols = size

	const squareWidth = Math.ceil((100 - cols) / cols) 

	const rows = Math.ceil(size / cols)

	function handleConsiderContainer(e, squareIndex) {
		console.log("container consider")
		handleConsiderTransfer(e, identifier, squareIndex)
	}

	function handleFinalizerContainer(e, squareIndex) {
		console.log("container finalizer")
		handleFinalizerTransfer(e, identifier, squareIndex)
	}

	const squares = Array.from({ length: size }, (_, index) =>
		{
			return {
				index,
				reference: `SQUARE-${index}`
			}
		}
	)

</script>

<div class="container" style="--cols:{cols};--rows:{rows}">
	{#each squares as square}
		<Square
			{handleConsiderContainer}
			{handleFinalizerContainer}
			reference={square.reference}
			items={items[square.index] ? [items[square.index]] : []}
			type={type}
			width={squareWidth}
		/>
	{/each}
</div>

<style>
	.container {
		background-color: aliceblue;

		display: grid;
		grid-template-columns: repeat(var(--cols, 5), 1fr);
		grid-template-rows: repeat(var(--rows, 2), 1fr);

		height: 100%;
	}
</style>