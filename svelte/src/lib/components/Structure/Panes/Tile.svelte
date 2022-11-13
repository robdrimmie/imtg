<script>
	import {board, characters, selected } from '$lib/stores.js';

console.log("Board", $board)
console.log("selchar" , $characters[$selected.character])

// console.log("tiles", $board.getTilesAsMap())

$: tileKey = $characters[$selected.character].currentTile.id
$: tiles = $board.getTilesAsMap() 
$: tile = tiles.get(tileKey)

// console.log("tile stuff", tileKey, tiles, tile)

// console.log("found tile", tile)

$: character = $characters[$selected.character]
$: relationship = character.tileRelationships.get(tileKey)
// console.log("relationship", relationship)

$: knowledge = tile.getKnowledgeForLevel(relationship.knowledgeLevel)
// console.log("knowledge", knowledge)
</script>
<!-- {#if $selected.character}
    <div>no character no tile</div> -->
<!-- {:else} -->
    <div>
        {knowledge.id}
        <br />
        {knowledge.environment.name}
        <div>
            adventuring deck size: {knowledge.adventuring.deckSize}
            <br />
            foraging deck size: {knowledge.foraging.deckSize}
            <br />
            resting deck size: {knowledge.resting.deckSize}
            <br />
            vending deck size: {knowledge.vending.deckSize}
        </div>

        gear score: {character.getGearScore()}
    </div>
<!-- {/if} -->

<style>

</style>