<script>
    export let party

    import SheetMember from '$lib/Sheet/SheetMember.svelte'
    import SheetSaat from '$lib/Sheet/SheetSaat.svelte'

    import { characters, moves } from '$lib/stores.js'

    const members = party.membersInCharacters($characters)
</script>

<div>
    {party.name} move: {$moves.length}
    
    <SheetSaat {party} />

    {#each members as member}
        <SheetMember {member} />
    {/each}
    
</div>