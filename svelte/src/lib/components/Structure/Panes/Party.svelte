<script>
    import {characters, parties, started } from '$lib/stores.js';

    import CharacterHighlights from '$lib/components/Content/CharacterHighlights.svelte'
console.log($parties)
console.log($characters)

    const found = {}
    const characterForId = (id) => {
        if(found[id] === undefined) {
            found[id] = $characters.find( character => character.id === id)
        } 

        return found[id]
    }
</script>

<div class="parties">
    {#each $parties as party}
        <div>
            {party.name}

            {#each party.members as memberId}
                <div>
                    <CharacterHighlights
                        character={characterForId(memberId)}
                    />
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
.parties {
    display: grid;
    grid-template-rows: auto;
}

</style>