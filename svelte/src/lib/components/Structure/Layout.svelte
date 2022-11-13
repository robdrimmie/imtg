<script>
	import CharacterSheet from '$lib/components/Content/CharacterSheet.svelte'
	import Log from '$lib/components/Content/Log.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Parties from '$lib/components/Parties.svelte';

	// import { board, characters, chests, moves, parties, started, won } from '$lib/stores.js';
	import {characters, started, won } from '$lib/stores.js';

	const VIEW_MAP = 'VIEW_MAP'
	const VIEW_CHARACTER = 'VIEW_CHARACTER'

	var selectedCharacter
	var view = VIEW_MAP

	const characterSelected = message => {
		selectedCharacter = $characters.find(
			character => message.detail.id === character.id
		);

		view = VIEW_CHARACTER
	}

	const mapSelected = message => {
		selectedCharacter = null
		view = VIEW_MAP
	}
</script>

<div class="container">
	<div class="detail">
		{#if !$started}
			<p>Press any key to start</p>
		{/if}

		{#if $won}
			<p>The game has been won</p>
		{/if}

		{#if $started && !$won}
			{#if view === VIEW_CHARACTER && selectedCharacter}
				<CharacterSheet 
					character={selectedCharacter}
					on:mapSelected={mapSelected}
				/>
			{:else}
				<Map />
			{/if}
		{/if}
	</div>
	<div class="log">
		<Log />
	</div>
	<div class="parties">
		<Parties 
			on:characterSelected={characterSelected}
		/>
	</div>
</div>

<style>
.container {
	display: grid;
	grid-template-areas:
      "detail detail"
      "log parties";

	grid-template-columns: 2fr 1fr;
  	grid-template-rows: 2fr 1fr;

	height: 100vh;
	width: 100vw;
}

.container > div {
	overflow: scroll;
}

.detail {
	grid-area: detail;
}

.log {
	grid-area: log;
}

.parties {
	grid-area: parties;
}

</style>