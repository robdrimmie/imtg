<script>
    export let action
    export let header
    export let visible

    const formatScore = score => {

        // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(score));


        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(score)
    }
</script>

<!-- <div class="scores" on:click={toggle}> -->
<div class="scores">
    <div >
    {header} overall: {
        formatScore(action.overall)
    }
    </div>
    
    {#if visible}
    <ul>
        <li>attribute: {formatScore(action.attribute)}</li>
        <li>capacity: {formatScore(action.capacity)}</li>
        <li>distance: {formatScore(action.distance)}</li>
        <li>energy: {formatScore(action.energy)}</li>
        <li>health: {formatScore(action.health)}</li>
        <li>knowledge: {formatScore(action.knowledge)}</li>
        <li>satiety: {formatScore(action.satiety)}</li>
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