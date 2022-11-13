<script>
	/*
		RMD TODO DELETE OLD CLASSES
	*/
	export let character;

	import Container from '$lib/components/Container.svelte';
	import Transfer from '$lib/Utilities/Transfer.js'

	import { characters, chests } from '$lib/stores';

	function handleFinalizerTransfer(e, identifier, squareIndex) {
		const result = Transfer.handleFinalizer(
			$characters, 
			character.id,
			null, 
			null, // no chest info because it is the character
			identifier,
			e.detail.items.length > 0 ? e.detail.items[0].rehydrate() : null,
			squareIndex
		)

		$characters = [...result.characters]
	}

	// rmd todo multiple characters
	const characterIndex = 0
	// console.log("CI char", character, character.backpack().slots)
	// RMD TODO for now this assumes backpack, eventually will want to be able to look at different containers.
</script>

{#if character}
	<Container
		{handleFinalizerTransfer}
		identifier="CHARACTER-{character.id}"
		items={$characters[characterIndex].backpack().slots}
		size={$characters[characterIndex].backpack().slots.length}
		cols=5
	/>
{/if}

<style></style>
