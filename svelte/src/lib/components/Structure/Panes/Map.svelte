<script>
    import { onMount } from 'svelte';
    
    import { board, parties, started, won } from '$lib/stores.js';
    
    import Hexagon from '$lib/components/Map/Hexagon.svelte';
    
    onMount(() => {
        // Can center on Origin Town if I get id "000"        
        const focus = document.getElementById("party_0")

        focus.scrollIntoView({
            behaviour: "smooth",
            block: "center", 
            inline: "center"
        })
    });
</script>
    <svg id="map" class="map" viewBox="-20 -20 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
            {#each $board.tiles as tile}
                
                <Hexagon hex={tile.hex} fill={tile.color} />
            {/each}
    
            {#each $parties as party, partyIndex}
                <Hexagon {partyIndex} hex={party.tile.hex} fill={party.color} />
            {/each}
        </g>
    </svg>

<style>
    svg.map {
        background-color: wheat;

        /* Can change the "zoom" level of the map by changing the height value here */
        /* height: 300%;
        width: 300%; */
    }
</style>