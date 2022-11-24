<script>
    export let member

    import ActionsAndTiles from '$lib/Sheet/ActionsAndTiles.svelte'
    import SheetMemberResources from '$lib/Sheet/SheetMemberResources.svelte'
    import TileRelationships from '$lib/Sheet/TileRelationships.svelte'

    let visible = true

    const toggle = () => {
        visible = !visible
    }
</script>

<div class="member">
    <div class="name" on:click={toggle}>
        {member.name}
    </div>

    {#if visible}
    <div><b>current tile</b> {member.currentTile.id}</div>

    <SheetMemberResources {member} />

    <div><b>best tiles</b></div>
    <div class="best">
        <div class="action">
            <div>adv</div>
            <div>score {member.tiles.adventure.score}</div>
            <div>tile {member.tiles.adventure.tile.id}</div>
        </div>
        <div class="action">
            <div>rest</div>
            <div>score {member.tiles.rest.score}</div>
            <div>tile {member.tiles.rest.tile.id}</div>                        
        </div>

        <div class="action">
            <div>vend</div>
            <div>score {member.tiles.vend.score}</div>
            <div>tile {member.tiles.vend.tile.id}</div>
        </div>

    </div>

    <ActionsAndTiles {member} />

    <TileRelationships {member} />
    {/if}
</div>

<style>
.name {
    font-size: medium;
    font-weight: 700;
}
.member {
    display: flex;
    flex-direction: column;
}

.action {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.relationships {
    display: flex;
    flex-direction: column;

    padding-left: 1vw;
}</style>