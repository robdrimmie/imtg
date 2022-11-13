<script>
	import Container from '$lib/components/Container.svelte';
	import Transfer from '$lib/Utilities/Transfer.js'

	import { characters, chests } from '$lib/stores';

	function handleFinalizerTransfer(e, identifier, squareIndex) {
		// console.log("VendorInventory.svelte - handleFinalizerTransfer - e, identifier, squareIndex", e, identifier, squareIndex)

		const result = Transfer.handleFinalizer(
			null, 
			null,
			$chests, 
			$chests[0].paperdoll.id,  // RMD TODO more than one chest, someday
			identifier,
			e.detail.items.length > 0 ? e.detail.items[0].rehydrate() : null,
			squareIndex
		)

		$chests = [...result.chests]
	}
</script>

{#if $chests[0]}
	<Container
		{handleFinalizerTransfer}
		identifier="CHEST-0"
		items={$chests[0].backpack().slots}
		size={$chests[0].backpack().slots.length}
		cols=10
	/>
{/if}

<style></style>
