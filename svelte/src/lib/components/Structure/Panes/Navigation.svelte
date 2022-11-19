<script>
    export let navigate
    export let screenIsAdventure
</script>

<div class="navigation" on:click={navigate}>
    Current screen mode:
    {#if screenIsAdventure}
        Adventure
    {:else}
        Trade
    {/if}
    <br />
    Click to toggle. Press any key to progress time. <a href="/sheet">sheet</a>
</div>

<style>
.navigation {
    height: 100%;
    width: 100%;

    text-align: center;
    vertical-align: middle;
    padding: 0;
    margin: 0;
}
</style>