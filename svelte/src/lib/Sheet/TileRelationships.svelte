<script>
    export let member

    let visible = true

    const toggle = () => {
        visible = !visible
    }
</script>

<div on:click={toggle}><b>tile relationships</b></div>

<div class="relationships">
    {#each [...member.tileRelationships] as relationship}
    <style>
        .ship {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

        }
    </style>
    <div class="ship">
        <div>
            tileid: {relationship[0]}
            {#if visible}
            <div>
                <ul>
                    <li><div>capacity</div> <div>{relationship[1].scores.capacity}</div></li>
                    <li><div>distance</div> <div>{relationship[1].scores.distance}</div></li>
                    <li><div>nrg</div> <div>{relationship[1].scores.energy}</div></li>
                    <li><div>ger</div> <div>{relationship[1].scores.gear}</div></li>
                    <li><div>hth</div> <div>{relationship[1].scores.health}</div></li>
                    <li><div>sat</div> <div>{relationship[1].scores.satiety}</div></li>
                </ul>
            </div>
            {/if}
        </div>

        <div>
            knowledge level: {relationship[1].knowledgeLevel}
        </div>

        <div>
            adv val: {
                relationship[1].calculateAdventuringValue(
                    member.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
                )
            }
        </div>

        <div>
            rest val: {
                relationship[1].calculateRestingValue(
                    member.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
                )
            }
        </div>

        <div>
            vend val: {
                relationship[1].calculateVendingValue(
                    member.currentTile.getKnowledgeForLevel(relationship[1].knowledgeLevel)
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

<style>

li {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>