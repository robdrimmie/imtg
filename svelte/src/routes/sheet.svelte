<script>
import SheetParty from '$lib/Sheet/SheetParty.svelte'

import { characters, moves, parties, started } from '$lib/stores.js'
</script>
<a href="/">home</a>

{#if started}
    <div><strong>move:</strong> {$moves.length}</div>
    <div class="rows">
        {#each $parties as party}
            <SheetParty {party} />
        {/each}
    </div>
{:else}
press key to start
{/if}

<style>
.rows {
    display: flex;
    flex-direction: column;

    font-size: x-small;

    padding-bottom: 5vh;
    padding-left: 5vh;
}
</style>
