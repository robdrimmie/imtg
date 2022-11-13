<script>
	import Character from '$lib/Character.js'
	import CharacterDetails from '$lib/components/Content/CharacterDetails.svelte'
	import Log from '$lib/components/Content/Log.svelte'
	import Map from '$lib/components/Map/Map.svelte'
	import Navigation from '$lib/components/Structure/Navigation.svelte'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Positions from '$lib/Reference/Positions.js'
	import Receptacle from '$lib/components/Structure/Receptacle.svelte'
	import TileInformation from '$lib/components/Content/TileInformation.svelte'

	import Pane from '$lib/components/Structure/Pane.svelte'

	import screens from '$lib/components/Content/screens.json'

	import {characters, chests, started, selected, won } from '$lib/stores.js';

	// #region Trade screen behaviours
	const findArrayForTopTarget = (details) => {
		console.log('finding array for details', details)
		switch (details.position) {

			case Positions.BACKPACK: 
				return {
					array: $characters[$selected.character].backpack().slots,
					index: details.index
				}


			case Positions.PAPERDOLL_HEAD:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HEAD
				}
				
			case Positions.PAPERDOLL_TORSO:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_TORSO
				}

			case Positions.PAPERDOLL_LEGS:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_LEGS
				}

			case Positions.PAPERDOLL_HAND_LEFT:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_LEFT
				}

			case Positions.PAPERDOLL_HAND_RIGHT:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_RIGHT
				}

			case Positions.PAPERDOLL_BACK:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_BACK
				}

			case Positions.PAPERDOLL_WAIST:			
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_WAIST
				}

			default: 
				throw Error(`can't find position ${details.position}`)
		}
	}

	const findArrayForBottomTarget = (details, item) => {
		console.log("findArrayForChestTarget", details, item)
		let array = [],
			index = -1

		const retval = () => { 
			return {array, index}
		}
		
		// right now must be on trade screen for any of this to even be called,
		// when source is chest top must be either backpack or paperdoll,
		// so that's what we need to sort out
		if(topIndex == 0) {
			// paperdoll
			array = $characters[$selected.character].paperdoll.slots

			// rmd todo figure out item type and slot type and 
			// pick the appropriate paperdoll slot which must be empty right now
			// rmd todo swap items if paperdoll slot is filled

			console.log("find slot in array", array)
			index = Paperdoll.slotIndexForItem(item)
			if(index == Paperdoll.DOLL_SLOT_HAND_RIGHT) {
				// RMD TODO weapons into any empty hand eventually
			}

			console.log("index", index)
		} else {
			// backpack
			array = $characters[$selected.character].backpack().slots

			// rmd todo find first free slot, if any
			index = array.findIndex( (element) => element === null)
		}

		console.log("returning retval", retval())
		return retval()
	}

	const flit = (e, details) => {
		console.log("SwipeLayout - flit - e, details", e, details)

		let sourceArray, sourceIndex
		let targetArray, targetIndex

		if(details.isTop) {
			// target must be chest for now
			({array: sourceArray , index: sourceIndex} = findArrayForTopTarget(details))

			targetArray = $chests[selected.chest].backpack().slots
			targetIndex = targetArray.findIndex( (element) => element === null)
		} else {
			// source must be chest for now
			sourceArray = $chests[selected.chest].backpack().slots
			sourceIndex = details.index

			// RMD TODO revisit this destructuring syntax 
			// it is weird and without the semicolon it doesn't get parsed correctly
			;({array: targetArray , index: targetIndex} = findArrayForBottomTarget(
				details,
				sourceArray[sourceIndex]	
			))
		}
		console.log("sA sI tA tI", sourceArray, sourceIndex, targetArray, targetIndex)

		if(targetIndex === -1) {
			// rmd todo fancy this up by flashing the target element or something red 
			// especially like into the paperdoll, can't go into torso, flash torso red
			console.log("Could not flit, target receptacle does not have space")
			return
		}

		// remove the item from the source array
		const item = sourceArray.splice(sourceIndex, 1, null)[0];
		// console.log("removed", item, sourceArray, sourceArray.length, $characters)

		// add the item to the target array
		targetArray.splice(targetIndex, 1, item)

		//  update appropriate stores
		$characters = [...$characters]
		$chests = [...$chests]
	}
	// #endregion Trade screen behaviours

	// #region Screen, Pane and Navigation behaviours
	let bottomIndex = 1, 
		screenIndex = 0, 
		topIndex = 0
	
	const cycle= (idx, len, mod) => {
		let next = idx + mod
		if(next >= len) next = 0
		if(next < 0) next = len - 1
		
		return next
	}

	const navigate = (e, details) => {
		// console.log("swipe navigate - e, details", e, details)
		if(details.paneId === null && details.top === null) {
			// center click

			screenIndex = cycle(screenIndex, screens.length, details.modifier)
			topIndex = 0
			bottomIndex = 0
		} else {
			if(details.top) {
				topIndex = cycle(topIndex, screens[screenIndex].panes.top.length, details.modifier)
			} else {
				bottomIndex = cycle(bottomIndex, screens[screenIndex].panes.bottom.length, details.modifier)
			}
		}

		resetVisibles()
	}

	const resetVisibles = () => {
		setVisibleBottom(bottomIndex)
		setVisibleScreen(screenIndex)
		setVisibleTop(topIndex)
	}

	const setVisibleBottom = idx => bottomIndex = idx
	const setVisibleScreen = idx => screenIndex = idx
	const setVisibleTop = idx => topIndex = idx

	resetVisibles()
	// #endregion Screen, Pane and Navigation behaviours
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
			<Pane
				{flit}
				pane={screens[screenIndex].panes.top[topIndex]}
				isTop
			/>
			
			<Navigation 
				{bottomIndex}
				{navigate}
				screen={screens[screenIndex]}
				{topIndex}
			/>
			
			<Pane 
				{flit}
				pane={screens[screenIndex].panes.bottom[bottomIndex]}
			/>
		{/if}
	</div>

	<div class="right-filler"></div>
</div>

<style>
.swipe-layout {
	background-color: var(--background);

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

.left-filler {
	background-color:crimson;

	grid-area: left-filler;

	max-height: 0vh;
}

.right-filler {
	background-color: crimson;

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