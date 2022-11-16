<script>
    export let flit

	import Container from '$lib/components/Container.svelte'
	import Item from '$lib/Items/Item'
	import Paperdoll from '$lib/Items/Paperdoll'
	import Positions from '$lib/Reference/Positions.js'
    import Receptacle from '$lib/components/Structure/Receptacle.svelte'

	import Transfer from '$lib/Utilities/Transfer.js'

	import { characters, selected } from '$lib/stores'

	$: mannequin = $characters[$selected.character].paperdoll
</script>

{#if mannequin?.slots}
	<div class="doll">
		<div class="cell topleftplaceholder">
		</div>

		<div class="cell head">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_HEAD]]}
				position={Positions.PAPERDOLL_HEAD}
			/>
		</div>

		<div class="cell backpack">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_BACK]]}
				position={Positions.PAPERDOLL_BACK}
			/>
		</div>

		<div class="cell righthand">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT]]}
				position={Positions.PAPERDOLL_HAND_RIGHT}
			/>
		</div>

		<div class="cell torso">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_TORSO]]}
				position={Positions.PAPERDOLL_TORSO}
			/>
		</div>

		<div class="cell lefthand">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_HAND_LEFT]]}
				position={Positions.PAPERDOLL_HAND_LEFT}
			/>
		</div>

		<div class="cell waist">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_WAIST]]}
				position={Positions.PAPERDOLL_WAIST}
			/>
		</div>

		<div class="cell legs">
			<Receptacle 
				{flit}
				items={[mannequin.slots[Paperdoll.DOLL_SLOT_LEGS]]}
				position={Positions.PAPERDOLL_LEGS}
			/>
		</div>

		<div class="cell bottomrightplaceholder">
		</div>
	</div>
{/if}


<style>
	.doll {
		display: grid;

		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}

	.cell {
		display: grid;

		background-color: var(--background-paperdoll);
	}
</style>