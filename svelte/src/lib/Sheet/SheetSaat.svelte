<script>
    export let party

    import { characters } from '$lib/stores.js'

    $: sAAT = party.scoreActionsAndTiles(
        party.membersInCharacters($characters)
    )
</script>

<div class="saat">

    <div class="saatadv">
        Adventure: {sAAT.adventure.score}
        <ul>
            {#each sAAT.adventure.tiles as tile}
            <li>{tile.id}</li>
        {/each}
        </ul>
    </div>

    <div class="saatrest">
        Rest: {sAAT.rest.score}
        <ul>
            {#each sAAT.rest.tiles as tile}
            <li>{tile.id}</li>
        {/each}
        </ul>
    </div>

    <div class="saatvend">
        Vend: {sAAT.vend.score}
        <ul>
            {#each sAAT.vend.tiles as tile}
            <li>{tile.id}</li>
        {/each}
        </ul>
    </div>

</div>

<style>
    .saat {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
</style>
