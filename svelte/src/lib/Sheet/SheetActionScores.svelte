<script>
    export let action
    export let header
    export let visible
</script>

<!-- <div class="scores" on:click={toggle}> -->
<div class="scores">
    <div >
    {header} overall: {
        action.overall
    }

    [{action.desire}]
    </div>
    
    {#if visible}
    <ul>
        <li>attribute: {action.attribute}</li>
        <li>capacity: {action.capacity}</li>
        <li>distance: {action.distance}</li>
        <li>energy: {action.energy}</li>
        <li>health: {action.health}</li>
        <li>satiety: {action.satiety}</li>
    </ul>
    {/if}
</div>


<style>

.scores {
    display: flex;
    flex-direction: column;
}

li {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>