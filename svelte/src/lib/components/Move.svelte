<script>
	export let move;

	import Move from '$lib/components/Move.svelte';
</script>

<div class="moveContainer">
	{move.message}
	{#if move.moves.length > 0}
		<ol>
			{#each move.moves as subMove}
				<li>
					<Move move={subMove} />
				</li>
			{/each}
		</ol>
	{/if}
</div>

<style>
	.moveContainer {
		background: blanchedalmond;

		padding: 0;
		margin: 0;

		padding-left: 1vw;
	}

	ol {
		padding: 0;
		margin: 0;
	}

	li {
		font-size: small;
		padding-left: 1vw;
	}
</style>
