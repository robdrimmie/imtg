<script>
	export let character;

	import { moves } from '$lib/stores';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const characterSelected = () => {
		console.error("probably nothing listening to this dispatch")
		dispatch('characterSelected', {
			id: character.id
		});
	}
</script>

{#if character}
	<div class="card" on:click={characterSelected}>
		<div class="name">{character.name}</div>
		<div class="resources">
			<div class="energy">E: {character.getEnergy().current}</div>
			<div class="health">H: {character.getHealth().current}</div>
			<div class="satiety">S: {character.getSatiety().current}</div>
		</div>
		<div class="inventory">
			{character.backpack().availableCapacity()} of {character.backpack().capacity}
			inventory slots available
		</div>
		
	</div>
{:else}
	BAD CHARACTER PROVIDED
{/if}

<style>
.card {
	display: flex;
	flex-direction: column;
	padding-left: 1vw;

	border-bottom: 1px solid orange;
}

.resources {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 1vw;
}

.inventory {
	padding-left: 1vw;
}
</style>
