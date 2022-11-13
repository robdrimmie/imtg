<script>
	import CharacterDetails from '$lib/components/Content/CharacterDetails.svelte'
	import Log from '$lib/components/Content/Log.svelte'
	import Map from '$lib/components/Map/Map.svelte'
	import Navigation from '$lib/components/Structure/Navigation.svelte'
	import Receptacle from '$lib/components/Structure/Receptacle.svelte'
	import TileInformation from '$lib/components/Content/TileInformation.svelte'

	import screens from '$lib/components/Content/screens.json'

	// import { board, characters, chests, moves, parties, started, won } from '$lib/stores.js';
	import {characters, chests, started, won } from '$lib/stores.js';

	const setVisibleScreen = visibleIndex => {
		screens.forEach( (screen, screenIndex) => {	
			if(screenIndex === visibleIndex) {
				screen.visible = true
			} else {
				screen.visible = false
			}
		})

		screens = [...screens]

		bottomPanes = [...screens[visibleIndex].panes.bottom]
		topPanes = [...screens[visibleIndex].panes.top]

		console.log(screens, bottomPanes, topPanes)
	}

	let bottomPanes, topPanes
	let topItems, bottomItems
	let topContainer = {}
	let bottomContainer = {}

	let selectedCharacter = 0
	let selectedChest = 0

	$: if ($started) {
		topContainer = $characters[selectedCharacter].backpack()
		bottomContainer = $chests[selectedChest].backpack()

		topItems = $characters[selectedCharacter].backpack().slots
		bottomItems = $chests[selectedChest].backpack().slots
	}

	const flit = (e, details) => {
		console.log("SwipeLayout - flit - e, details", e, details)

		let sourceArray = details.sourceIsTop ? topItems : bottomItems
		let targetArray = details.sourceIsTop ? bottomItems : topItems 

		// find the first empty niche in the targetArray. If no niche is found, flit cannot happen
		const targetIndex = targetArray.findIndex( (element) => element === null)

		if(targetIndex === -1) {
			console.log("Could not flit, target receptacle does not have space")
		}

		// remove the item from the source array
		const item = sourceArray.splice(details.index, 1, null)[0];

		// add the item to the target array
		targetArray.splice(targetIndex, 1, item)

		topItems = details.sourceIsTop ? sourceArray : targetArray		
		bottomItems = details.sourceIsTop ? targetArray : sourceArray

		//  update appropriate stores
	}
</script>

<div class="swipe-layout">
	
	<div class="left-filler"></div>
	
	<div class="content">
		{#if !$started}
			<p>Press any key to start</p>
		{/if}

		{#if $won}
			<p>The game has been won</p>
		{/if}

		{#if $started && !$won}
			<div class="half">
				{#if screens[0].visible}
					<Map />
				{:else if screens[1].visible}
					<CharacterDetails
						character={$characters[selectedCharacter]}
					/>
				{:else if screens[2].visible}
					<Receptacle 
						{flit}
						items={topItems}
						sourceIsTop
					/>
				{/if}
			</div>
		
			<Navigation 
				{topPanes}
				{bottomPanes}
				{screens}
				{setVisibleScreen}
			/>
		
			<div class="half">
				{#if screens[0].visible}
					<Log />
				{:else if screens[1].visible}
					<TileInformation 
						character={$characters[selectedCharacter]}
					/>
				{:else if screens[2].visible}
					<Receptacle 
						{flit}
						items={bottomItems}
					/>
				{/if}
			</div>
		{/if}
	</div>

	<div class="right-filler"></div>
</div>

<style>
.swipe-layout {
	background-color: burlywood;

	grid-template-rows: 1fr 0fr 0fr;
	display: grid;

	/* vertical column of info by default */
	grid-template-areas:
		"content"
		"left-filler"
		"right-filler"
	;

	height: 100vh;
	width: 100vw;
}

div {
	border: 0px;
	padding: 0px;
	margin: 0px;
}

.content {
	display: flex;
	flex-direction: column;

	grid-area: content;

	/* same width as media query below */
	min-width: 30em;
	max-width: 30em;
}

.half {
	background-color: forestgreen;  
	
	display: grid;

	height: 45vh;
	max-height: 45vh;
	overflow: scroll;
}

.left-filler {
	background-color:crimson;

	grid-area: left-filler;

	max-height: 0vh;
}

.right-filler {
	background-color: chocolate;

	grid-area: right-filler;

	max-height: 0vh;
}

/* same with as .content class above */
@media (min-width: 30em) {
  .swipe-layout {
    grid-template-columns: 2fr 3fr 2fr;

	/* horizontal with fillers on the sides if wide enough */
    grid-template-areas:
		"left-filler content right-filler"
  } 
}


</style>