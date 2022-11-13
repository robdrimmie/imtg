<script>
	/*
		RMD TODO DELETE OLD CLASSES
	*/
	export let character

	import { page } from '$app/stores'
	import { characters } from '$lib/stores';

	import CharacterDetails from '$lib/components/Content/CharacterDetails.svelte'
	import CharacterInventory from '$lib/components/Content/CharacterInventory.svelte'
	import Paperdoll from '$lib/components/Paperdoll.svelte'
	import Tools from '$lib/components/Content/Tools.svelte'
	import VendorInventory from '$lib/components/Content/VendorInventory.svelte'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const mapSelected = () => {
		dispatch('mapSelected')
	}

	const VIEW_DETAILS = 'VIEW_DETAILS'
	const VIEW_INVENTORY = 'VIEW_INVENTORY'

	let view = VIEW_INVENTORY

	const detailsSelected = () => {view = VIEW_DETAILS}
	const inventorySelected = () => {view = VIEW_INVENTORY}

	const characterIndex = $characters.find(element => element.id == character.id)

	// RMD TODO disperse gold to party 
	const addGoldToCharacter = (amount) => {
		character.currency += amount

		if(characterIndex) characters[characterIndex] = character
	}
</script>

<div class="sheet">
	{#if character}
			<div class="paperdoll">
				<Paperdoll characterId={character.id} paperdoll={character.paperdoll} />
			</div>
			<div class="characterInventory">
				<CharacterInventory {character} />
			</div>

			<div class="tools">
				<Tools 
					addGold={addGoldToCharacter}
				/>
			</div>

			<div class="information">			
				{#if view === VIEW_DETAILS}
					<CharacterDetails {character} />
				{:else}
					<VendorInventory />
				{/if}
			</div>
			<div class="tabs">
				<div on:click={detailsSelected}>Details</div>
				<div on:click={inventorySelected}>Inventory</div>
				<div on:click={mapSelected}>Return to Map View</div>
			</div>
	{:else}
		BAD CHARACTER PROVIDED
	{/if}
</div>

<style>
	/*
			+------------------------------+
			|  PAPER   |   |               |
			|   DOLL   | T | CHEST/SHEET   |
			|          | O |               |
			|----------| O |               |
			|  Char    | L |---------------+       
			|   Inv    | S |     TABS	   |
			+------------------------------+
	*/
	.sheet {
		height: 100%;
		display: grid;

		grid-template-areas:
			"doll      doll      tools information information"
			"doll      doll      tools information information"
			"doll      doll      tools information information"
			"inventory inventory tools information information"
			"inventory inventory tools tabs        tabs";

		grid-template-columns: 1fr 2fr;
		grid-template-rows: repeat(4, 2fr) 1fr;
	}

	div {
		overflow: scroll;
	}
	
	.paperdoll {
		grid-area: doll;

		display: grid;
	}

	.characterInventory {
		grid-area: inventory;
	}

	.tools {
		grid-area: tools;
	}

	.information {
		grid-area: information;
	}

	.tabs {
		grid-area: tabs;

		display: grid;
		grid-template-columns: repeat(3, 1fr)
	}
</style>