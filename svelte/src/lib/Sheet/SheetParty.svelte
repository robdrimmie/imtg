<script>
    export let party

    import SheetMember from '$lib/Sheet/SheetMember.svelte'
    import SheetSaat from '$lib/Sheet/SheetSaat.svelte'

    import { characters, moves } from '$lib/stores.js'

    $: members = party.membersInCharacters($characters)

    let visible = true

    const toggle = () => {
        visible = !visible
    }
</script>

<div>
    <h2  on:click={toggle}>{party.name}</h2>

    {#if visible}

        <div>
            <strong>current tile: {party.tile.id}</strong>
        </div>
        
        <SheetSaat {party} />

        {#each members as member}
            <SheetMember {member} />
        {/each}
    
    {/if}
</div>

<style>
    h2 {
        margin: 0px;
        padding: 0px;
    }
</style>