<script>
    /* 
    I don't know why but if I name this file ConsumablesVendor svelte craps out because of 
    a mime-type error, so CV it is. Maybe if I see this in the future and forget specifics 
    I can try renaming and the problem will have passed.
    */

    export let flit

	import Container from '$lib/components/Container.svelte'
	import Item from '$lib/Items/Item'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Positions from '$lib/Reference/Positions.js'
    import Receptacle from '$lib/components/Structure/Receptacle.svelte'

	import { consumablesVendors, selected } from '$lib/stores'

	$: paperdoll = $consumablesVendors[$selected.consumablesVendor].paperdoll
</script>

{#if paperdoll?.slots}
	<div class="doll">
		<div class="cell potion">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_POTION]]}
				position={Positions.PAPERDOLL_POTION}
			/>
		</div>

		<div class="cell food">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_FOOD]]}
                position={Positions.PAPERDOLL_FOOD}
			/>
		</div>

		<div class="meta">
			<p>The consumables vendor will make new items as materials and slots are available</p>
			
			current level: tier 1
			mats: {$consumablesVendors[$selected.consumablesVendor].consumablesMaterials}
		</div>
	</div>
{/if}


<style>
	.doll {
		display: grid;

		grid-template-areas: 
			"slot	slot"
			"meta	meta"
		;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}

	.cell {
		display: grid;

		background-color: var(--background-paperdoll);
	}

	.meta {
		grid-area: meta;
	}
</style>