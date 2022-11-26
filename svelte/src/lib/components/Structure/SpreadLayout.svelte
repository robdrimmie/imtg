<script>
	import Character from '$lib/Character.js'
	import CharacterDetails from '$lib/components/Content/CharacterDetails.svelte'
	import ItemType from '$lib/Reference/ItemType.js'
	import Log from '$lib/components/Content/Log.svelte'
	import Map from '$lib/components/Map/Map.svelte'
	import Navigation from '$lib/components/Structure/Navigation.svelte'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Positions from '$lib/Reference/Positions.js'
	import Receptacle from '$lib/components/Structure/Receptacle.svelte'
	import TileInformation from '$lib/components/Content/TileInformation.svelte'

	import Pane from '$lib/components/Structure/Pane.svelte'

	import panes from '$lib/components/Content/panes.json'

	import {characters, chests, consumablesVendors, equipablesVendors, started, selected, won } from '$lib/stores.js';

	const SOURCE_BACKPACK = 'SOURCE_BACKPACK'
	const SOURCE_CHEST = 'SOURCE_CHEST'
	const SOURCE_MANNEQUIN = 'SOURCE_MANNEQUIN'
	const SOURCE_VENDOR_EQUIPABLES = 'SOURCE_VENDOR_EQUIPABLES'
	const SOURCE_VENDOR_CONSUMABLES = 'SOURCE_VENDOR_CONSUMABLES'

	// When screen is Adventure, map and things show. Vendors show otherwise.
	let screenIsAdventure = true

	const itemTypeIsEquippable = (itemType) => {
		switch(itemType) {
			case ItemType.POTIONS:
			case ItemType.FOOD:
				return false

			case ItemType.BOOTS:
			case ItemType.HATS:
			case ItemType.TORSOS:
			case ItemType.WAISTS:
			case ItemType.WEAPONS:
				return true
										
			case ItemType.BACKPACKS:
			case ItemType.ITEM:
			default:
				console.error(`itemTypeIsEquippable doesn't like itemType ${itemType}`)
				return false
		}
	}

	const sourceForDetails = (details) => {
		switch (details.position) {
			case Positions.BACKPACK: 
				console.log("Flit from SOURCE_BACKPACK I don't know what to do with this yet")
				return {
					array: $characters[$selected.character].backpack().slots,
					index: details.index,
					source: SOURCE_BACKPACK
				}

			case Positions.CHEST:
				return {
					array: $chests[$selected.chest].backpack().slots,
					index: details.index,
					source: SOURCE_CHEST
				}

			case Positions.PAPERDOLL_HEAD:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HEAD,
					source: SOURCE_MANNEQUIN
				}
				
			case Positions.PAPERDOLL_TORSO:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_TORSO,
					source: SOURCE_MANNEQUIN
				}

			case Positions.PAPERDOLL_LEGS:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_LEGS,
					source: SOURCE_MANNEQUIN
				}

			case Positions.PAPERDOLL_HAND_LEFT:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_LEFT,
					source: SOURCE_MANNEQUIN
				}

			case Positions.PAPERDOLL_HAND_RIGHT:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_RIGHT,
					source: SOURCE_MANNEQUIN
				}

			case Positions.PAPERDOLL_BACK:
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_BACK,
					source: SOURCE_MANNEQUIN
				}

			case Positions.PAPERDOLL_WAIST:			
				return {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_WAIST,
					source: SOURCE_MANNEQUIN
				}

			case Positions.VENDOR_EQUIPABLES_HEAD:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HEAD,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_TORSO:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_TORSO,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_LEGS:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_LEGS,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_HAND_LEFT:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_LEFT,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_HAND_RIGHT:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_HAND_RIGHT,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_BACK:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_BACK,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_EQUIPABLES_WAIST:			
				return {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.DOLL_SLOT_WAIST,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_CONSUMABLES_FOOD:			
				return {
					array: $consumablesVendors[$selected.consumablesVendor].paperdoll.slots,
					index: Paperdoll.PAPERDOLL_FOOD,
					source: SOURCE_VENDOR_CONSUMABLES
				}

			case Positions.VENDOR_CONSUMABLES_POTION:			
				return {
					array: $consumablesVendors[$selected.consumablesVendor].paperdoll.slots,
					index: Paperdoll.PAPERDOLL_POTION,
					source: SOURCE_VENDOR_CONSUMABLES
				}


			case Positions.VENDOR_EQUIPABLES: 
				return {
					array: [],
					index: details.index,
					source: SOURCE_VENDOR_EQUIPABLES
				}

			case Positions.VENDOR_CONSUMABLES: 
				return {
					array: [],
					index: details.index,
					source: SOURCE_VENDOR_CONSUMABLES
				}

			default: 
				throw Error(`can't find position ${details.position}`)
		}
	}

	const targetForChestAndItemType = (itemType) => {
		/*
			chest :
				- if screenIsAdventure
					- equippable items can go into paperdoll
					- resource items can go to backpack - somehow, not implemented
				- else
					- equippable items are sold to equipment vendor
					- resource items are sold to resource vendor
		*/

		if(itemTypeIsEquippable(itemType)) {
			// equipable items to mannequin or equipment vendor
			return screenIsAdventure
				? {
					array: $characters[$selected.character].paperdoll.slots,
					index: Paperdoll.slotIndexForItemType(itemType),
					target: 'mannequin slot of somesort'
				} : {
					array: $equipablesVendors[$selected.equipablesVendor].paperdoll.slots,
					index: Paperdoll.slotIndexForItemType(itemType),
					isVendor: true,
					target: 'equipment vendor slot of somesort',
				}
		} else {
			// resource items to backpack-staging-tool, which does not exist, or consumables vendor
			return screenIsAdventure
				? {
					array: [],
					index: 0,
					target: 'backspack stagingn tool is not valid?'
				} : {
					array: $consumablesVendors[$selected.consumablesVendor].paperdoll.slots,
					index: Paperdoll.slotIndexForItemType(itemType),
					isVendor: true,
					target: 'consumables vendor slot of somesort',
				}
		}
	}

	const targetForVendorAndItemType = (itemType) => {
		console.log("targetForVendorAndItemType", itemType)

		return {
			array: $chests[$selected.chest].backpack().slots,
			index: $chests[$selected.chest].backpack().slots.findIndex( (element) => element === null),
			target: 'character backpack'
		}
	}

	const targetForSourceAndItemType = (source, itemType) => {
		/*
		from
			mannequin:
  				- items can go into chest
			chest :
				- if screenIsAdventure
					- equippable items can go into paperdoll
					- resource items can go to backpack - somehow, not implemented
				- else
					- equippable items are sold to equipment vendor
					- resource items are sold to resource vendor
			equipment vendor:
				- equippable items can go into mannequin for comparison? 
				- eqiupping an item adds an overlay where user gets to select from:
					- cancel sale
					- send item to mannequin
						- if an item is equipped, send it to chest
						- if the chest is full cancel everything and display message
					- send item to chest
						- if the chest is full cancel everything and display message
			resource vendor:
				- clicking an item previews it in the character's backpack
					- that has no impact on gameplay so I'm not sure why we care? 
					- is there a way to communicate the effect it will have when used? maybe
				- clicking an item adds an overlay where the user gets to select from:
					- cancel sale
					- send item to backpack
						- if backpack is full cancel everything and display message
					- send item to chest
						- if chest is full cancel everything and display message
		*/

		switch(source) {
			case SOURCE_CHEST: 
				return targetForChestAndItemType(itemType)

			case SOURCE_MANNEQUIN: 
				// items from the mannequin always go into the chest
				return {
					array: $chests[$selected.chest].backpack().slots,
					index: $chests[$selected.chest].backpack().slots.findIndex( (element) => element === null),
					target: 'source_whatever is not valid?'
				}

			case SOURCE_VENDOR_EQUIPABLES: 
				return targetForVendorAndItemType(itemType)
				
			case SOURCE_VENDOR_CONSUMABLES: 
				return targetForVendorAndItemType(itemType)

			case SOURCE_BACKPACK: 
			default:
				console.error("I don't know how to (or if I even should!) target character backpack")
				return {
					array: [],
					index: 0,
					target: 'source_whatever is not valid?'
				}
		}
	}

	const flit = (e, details) => {
		// console.log("SpreadLayout - flit - e, details", e, details)

		const source = sourceForDetails(details)

		// console.log("flit found source", source)
		
		const item = source.array[source.index]
		// console.log("flit found item", item)

		const target = targetForSourceAndItemType(source.source, item.type)
		// console.log("flit found target", target)

		// is target empty
		if(target.index < 0) {
			// target is full 
			// rmd todo briefly flash the target container red in some fashion
			console.log("flit - target is full")
			return 
		} 

		if(target.isVendor) {
			// remove the item from the source
			source.array.splice(source.index, 1, null)

			// increase currency by the item's value
			$characters[$selected.character].currency += item.value

			// Vendors need to get mats
			if(itemTypeIsEquippable(item.type)) {
				$equipablesVendors[$selected.equipablesVendor].equipablesMaterials += ItemType.matsForType(item.type)
			} else {
				$consumablesVendors[$selected.consumablesVendor].consumablesMaterials += ItemType.matsForType(item.type)
			}
		} else {
			// going into a container of some sort 
			// replace the item in the target array at the index with the item from the source array

			const itemFromTarget = target.array.splice(target.index, 1, item)[0]
			// console.log("flit removed itemFromTarget and replaced with item", itemFromTarget, item)

			// put the item from the target into the empty spot in the source source to complete the swap
			source.array.splice(source.index, 1, itemFromTarget)

			// decrease currency by the item's value
			$characters[$selected.character].currency -= item.value
		}

		// Update character with new item's effects
		$characters[$selected.character].progress()

		//  update appropriate stores
		$characters = [...$characters]
		$chests = [...$chests]
		$equipablesVendors = [...$equipablesVendors]
		$consumablesVendors = [...$consumablesVendors]
	}

	const navigate = (e, details) => {
		screenIsAdventure = !screenIsAdventure
	}

	const selectEntity = (e) => {
		if(e.detail.character) {
			let character = $characters.findIndex(char => {
				return char.id === e.detail.character
			})
			
			$selected.character = character > -1 ? character : $selected.character		
		}
	}

	const topHeight = "60vh"
	const navHeight = "7vh"
	const botHeight = "33vh"
</script>

<div class="spread-layout">
		{#if !$started}
		<!-- <div>Press any key to start (restore full screen at some point)</div> -->
		<Pane
			pane={panes[0]}
		/>
		{/if}

		{#if $won}
			<p>The game has been won</p>
		{/if}

		{#if $started && !$won}

			<!-- top row content -->
			<div class="chest">
				<Pane
					{flit}
					height={topHeight}
					pane={panes[4]}
				/>
			</div>

			<div class="detail">
				<Pane
					{flit}
					height={topHeight}
					pane={panes[3]}
				/>
			</div>

			{#if screenIsAdventure}
				<div class="mannequin">
					<Pane
						{flit}
						height={topHeight}
						pane={panes[8]}
					/>
				</div>
			{:else}
			<div class="currency">
				<Pane
					{flit}
					height={topHeight}
					pane={panes[6]}
				/>
			</div>
			{/if}

			<!-- middle row content -->
			<div class="navigation">
				<Pane
					{flit}
					height={navHeight}
					{navigate}
					pane={panes[10]}
					{screenIsAdventure}
				/>
			</div>


			<!-- bottom row content -->
			{#if screenIsAdventure}
				<div class="partycharacter">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[13]}
						on:selectEntity={selectEntity}
					/>
				</div>

				<div class="map">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[9]}
					/>
				</div>

				<div class="log">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[7]}
					/>
				</div>
			{:else}
				<div class="partycharacter">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[13]}
						on:selectEntity={selectEntity}
					/>
				</div>

				<div class="equipablesVendor">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[2]}
					/>
				</div>

				<div class="consumablesVendor">
					<Pane
						{flit}
						height={botHeight}
						pane={panes[5]}
					/>
				</div>
			{/if}
		{/if}


</div>

<style>
.spread-layout {
	background-color: var(--background);

	/* grid-template-rows: 1fr 0fr 0fr; */
	display: grid;

	/* vertical column of info by default */
	/* grid-template-columns: 1fr 2fr 3fr
	; */

	grid-template-areas:
		"topLeft      topLeft      topCenter    topCenter    topCenter    topRight   "
		"navigation   navigation   navigation   navigation   navigation   navigation "
		"bottomLeft   bottomLeft   bottomCenter bottomCenter bottomRight  bottomRight"
	;
	grid-template-columns: repeat(6, 1fr);
	/* grid-template-rows: 6fr 1fr 3fr; */

	/* height: 100vh;
	width: 100vw; */

	/* --top-height: 60vh
	--nav-height: 10vh
	--bot-height: 30vh */
}

div {
	/* border: 2px solid orange; */
	padding: 0px;
	margin: 0px;
}

.detail {
	grid-area: topCenter;
	/* max-height: var(--top-height); */
}

.equipablesVendor {
	grid-area: bottomLeft;
}

.consumablesVendor {
	grid-area: bottomCenter;
}

.log {
	grid-area: bottomLeft;
}

.mannequin {
	grid-area: topRight;
	max-height: var(--top-height);
}

.map {
	grid-area: bottomCenter;
	/* height: var(--bot-height); */
}

.partycharacter {
	grid-area: bottomRight;
	/* height: var(--bot-height); */
}

.chest {
	grid-area: topLeft;
	max-height: var(--top-height);
}

.navigation {
	grid-area: navigation;
	/* height: var(--nav-height); */
}


</style>