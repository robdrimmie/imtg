<script>
    export let flit

    import Positions from '$lib/Reference/Positions.js'
    import Receptacle from '$lib/components/Structure/Receptacle.svelte'

    import { characters } from '$lib/stores.js'
</script>

<Receptacle 
    {flit}
    items={$characters[0].backpack().slots}
    position={Positions.BACKPACK}
/>