<script>
    export let relationship

    import SheetActionScores from '$lib/Sheet/SheetActionScores.svelte'

    $: visible = false

    const toggle = () => {
        console.log("toglin")
        visible = !visible
    }
</script>

<div class="ship">
    <div on:click={toggle}>
        tileid: {relationship[0]}      
    </div>

    <div>
        knowledge level: {relationship[1].knowledgeLevel}
    </div>

    <SheetActionScores 
        action={relationship[1].values.adventuring} 
        header="Adventuring"
        {visible}
    />

    <SheetActionScores 
        action={relationship[1].values.resting} 
        header="Resting"
        {visible}
    />

    <SheetActionScores 
        action={relationship[1].values.vending} 
        header="Vending"
        {visible}
    />
</div>

<style>
    .ship {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

    }
</style>