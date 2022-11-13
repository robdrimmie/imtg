<script>
	import CharacterHighlights from '$lib/components/Content/CharacterHighlights.svelte';

	import { characters, parties, moves } from '$lib/stores.js';

	import { createEventDispatcher } from 'svelte';
</script>

{#if $parties.length > 0}
	<ul>
		{#each $parties as party}
			<li>
				{party.name}, ({party.tile.id})
				<ul>
					{#each party.members as memberId}
						{memberId}
						<li>
							<CharacterHighlights
								character={$characters.find((character) => character.id === memberId)}
								on:characterSelected
							/>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
{/if}

<style>
	a {
		color: black;
	}
</style>
