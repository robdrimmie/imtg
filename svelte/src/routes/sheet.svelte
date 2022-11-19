<script>
import { characters, moves, parties, started } from '$lib/stores.js'


$: partyScoreActionsAndTiles = $parties.map( party => {
    return party.scoreActionsAndTiles(
        party.membersInCharacters($characters)
    )
})
</script>
<a href="/">home</a>

{#if started}
    <div class="rows">
        {#each $parties as party}
            {party.name} move: {$moves.length}
        {/each}

        <div class="saat">
            <style>
                .saat {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                }
            </style>
            {#each partyScoreActionsAndTiles as sAAT}
                <div class="saatadv">
                    Adventure: {sAAT.adventure.score}
                    <ul>
                        {#each sAAT.adventure.tiles as tile}
                        <li>{tile.id}</li>
                    {/each}
                    </ul>
                </div>

                <div class="saatrest">
                    Rest: {sAAT.rest.score}
                    <ul>
                        {#each sAAT.rest.tiles as tile}
                        <li>{tile.id}</li>
                    {/each}
                    </ul>
                </div>

                <div class="saatvend">
                    Vend: {sAAT.vend.score}
                    <ul>
                        {#each sAAT.vend.tiles as tile}
                        <li>{tile.id}</li>
                    {/each}
                    </ul>
                </div>

            {/each}
        </div>

        {#each $characters as character}
            <div class="character">
                <h3 class="name">
                    {character.name}
                    {console.log(character.bestTilesForActions())}
                </h3>

                <div><b>current tile</b> {character.currentTile.id}</div>
                <div><b>resources</b></div>
                <div> RMD TODO this next</div>

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
                    <style>
                        .ship {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);

                        }
                    </style>
                    <div class="ship">
                        <div>
                            tileid: {relationship[0]}

                            <div>
                                <ul>
                                    <li>cap: {relationship[1].calculateCapacityScore(character)}</li>
                                    <li>nrg: {relationship[1].calculateEnergyScore(character)}</li>
                                    <li>ger: {relationship[1].calculateGearScore(character)}</li>
                                    <li>hth: {relationship[1].calculateHealthScore(character)}</li>
                                    <li>sat: {relationship[1].calculateSatietyScore(character)}</li>
                                </ul>
                            </div>



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
</style>
