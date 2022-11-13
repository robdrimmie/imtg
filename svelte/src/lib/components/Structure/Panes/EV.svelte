<script>
	/* 
      I don't know why but if I name this file EquipablesVendor svelte craps out because of 
      a mime-type error, so EV it is. Maybe if I see this in the future and forget specifics 
   	  I can try renaming and the problem will have passed.
    */

    export let flit

	import Container from '$lib/components/Container.svelte'
	import Item from '$lib/Items/Item'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Positions from '$lib/Reference/Positions.js'
    import Receptacle from '$lib/components/Structure/Receptacle.svelte'

	import { equipablesVendors, selected } from '$lib/stores'

	$: paperdoll = $equipablesVendors[$selected.equipablesVendor].paperdoll
</script>

{#if paperdoll?.slots}
	<div class="doll">
		<div class="cell head">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_HEAD]]}
				position={Positions.PAPERDOLL_HEAD}
			/>
		</div>

		<div class="cell righthand">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT]]}
				position={Positions.PAPERDOLL_HAND_RIGHT}
			/>
		</div>

		<div class="cell torso">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_TORSO]]}
				position={Positions.PAPERDOLL_TORSO}
			/>
		</div>

		<div class="cell waist">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_WAIST]]}
				position={Positions.PAPERDOLL_WAIST}
			/>
		</div>

		<div class="cell legs">
			<Receptacle 
				{flit}
				items={[paperdoll.slots[Paperdoll.DOLL_SLOT_LEGS]]}
				position={Positions.PAPERDOLL_LEGS}
			/>
		</div>


		<div class="meta">
			<p>The equipment vendor will make new items as materials and slots are available</p>
			
			current level: tier 1
			mats: {$equipablesVendors[$selected.equipablesVendor].equipablesMaterials}
		</div>
	</div>
{/if}


<style>
	.doll {
		display: grid;

		grid-template-areas: 
			"slot	slot	slot	slot	slot"
			"meta	meta	meta	meta	meta"
		;
		grid-template-columns: repeat(5, 1fr);
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