<script>
    export let member

    import SheetActionScores from '$lib/Sheet/SheetActionScores.svelte'
    import TileRelationship from '$lib/Sheet/TileRelationship.svelte'

    let visible = true

    const toggle = () => {
        visible = !visible
    }
    
    console.log("SHEET RELS" , member.tileRelationships)
</script>

<div on:click={toggle}><b>tile relationships</b></div>

{#if visible}
    <div class="relationships">
        {#each [...member.tileRelationships] as relationship}
            <TileRelationship {relationship} />
        {/each}
    </div>
{/if}