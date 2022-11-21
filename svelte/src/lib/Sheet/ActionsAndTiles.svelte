<script>
    export let member

    $: results = [...member.scoreActionsAndTiles()]

    let visible = true

    const toggle = () => {
        visible = !visible
    }
</script>

<div on:click={toggle}>
    <b>Actions and Tiles</b>
{#if visible}
    <div class="results">
        {#each results as result}
            <div>{result[0]}: {result[1].score} {result[1].tile.id}</div>
        {/each}
    </div>
{/if}
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
</style>