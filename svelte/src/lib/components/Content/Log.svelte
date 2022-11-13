<script>
	import { moves } from '$lib/stores.js';

	import Move from '$lib/components/Move.svelte';

	$: first = $moves.slice(-1)[0];
</script>

<div class="logContainer">
	{#if $moves.length > 0}
		<ol>
			<li class="first"><Move move={first} /></li>

			{#each [...$moves].slice(0, -1).reverse() as move}
				<li><Move {move} /></li>
			{/each}
		</ol>
	{/if}
</div>

<style>
	.logContainer {
		background: blanchedalmond;

		padding: 0;
		margin: 0;
	}

	ol {
		padding: 0;
		margin: 0;
	}

	li.first {
		font-size: medium;
		padding-top: 0.25vw;
	}

	li {
		font-size: small;
		padding-left: 1vw;
	}
</style>
