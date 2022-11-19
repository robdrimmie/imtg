<script>
import { characters, parties, started } from '$lib/stores.js'


$: partyScoreActionsAndTiles = $parties.map( party => {
    return party.scoreActionsAndTiles(
        party.membersInCharacters($characters)
    )
})

console.log("here", partyScoreActionsAndTiles)
</script>
{#if started}
    <div class="rows">
        {#each $parties as party}
            {party.name}
        {/each}

        {#each partyScoreActionsAndTiles as sAAT}
            adv score: {sAAT.adventure.score}
            adv tiles: 
                {#each sAAT.adventure.tiles as tile}
                    <div>{tile.id}</div>
                {/each}
            {console.log("saat a", sAAT.adventure)}
        {/each}


        {#each $characters as character}
            <div class="character">
                <h3 class="name">
                    {character.name}
                    {console.log(character.bestTilesForActions())}
                </h3>

                <div><b>best tiles</b></div>
                <div class="best">
                    <div class="action">
                        <div>adv</div>
                        <div>score {character.bestTilesForActions().adventure.score}</div>
                        <div>tile {character.bestTilesForActions().adventure.tile.id}</div>
                    </div>
                    <div class="action">
                        <div>rest</div>
                        <div>score {character.bestTilesForActions().rest.score}</div>
                        <div>tile {character.bestTilesForActions().rest.tile.id}</div>                        
                    </div>

                    <div class="action">
                        <div>vend</div>
                        <div>score {character.bestTilesForActions().vend.score}</div>
                        <div>tile {character.bestTilesForActions().vend.tile.id}</div>
                    </div>

                </div>

                <div><b>tile relationships</b></div>
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

    font-size: x-small;
}

.character {
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
}

.ship {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

}
</style>
