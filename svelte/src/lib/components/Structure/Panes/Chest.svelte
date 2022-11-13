<script>
    export let flit

    import Positions from '$lib/Reference/Positions.js'
    import Receptacle from '$lib/components/Structure/Receptacle.svelte'
    
    import { chests } from '$lib/stores.js';
</script>

{#if chests}
    <Receptacle 
        {flit}
        items={$chests[0].backpack().slots}
        position={Positions.CHEST}
    />
{/if}