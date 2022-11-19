<script>
import { characters, started } from '$lib/stores.js'

</script>
{#if started}


    <div class="rows">
        {#each $characters as character}
            <div class="character">
                <div class="name">
                    {character.name}
                </div>

                <div class="relationships">
                    {#each [...character.tileRelationships] as relationship}
                    <div class="ship">
                        <div>
                            tileid: {relationship[0]}
                        </div>


                        <div>
                            knowledge level: {relationship[1].knowledgeLevel}
                        </div>


                        <div>
                            adv val: {
                                relationship[1].calculateAdventuringValue(
                                    character.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
                                )
                            }
                        </div>


                        <div>
                            rest val: {
                                relationship[1].calculateRestingValue(
                                    character.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
                                )
                            }
                        </div>


                        <div>
                            vend val: {
                                relationship[1].calculateVendingValue(
                                    character.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
                                )
                            }
                        </div>


                        <div>

                        </div>


                        <div>

                        </div>
                    </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
{:else}
press key to start
{/if}

<style>
.rows {
    display: flex;
    flex-direction: column;
}

.character {
    display: flex;
    flex-direction: column;
}

.relationships {
    display: flex;
    flex-direction: column;

    padding-left: 1vw;
}

.ship {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

}
</style>
