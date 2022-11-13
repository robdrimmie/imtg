<script>
    export let flit
    export let items = [null, null, 'a']
    export let size = items.length
    export let position

    import Card from '$lib/components/Structure/Card.svelte'
    
    $: niches = Array(size).fill(null)
</script>

<div class="receptacle">
    {#each niches as niche, nicheIndex}
        <div class="niche">
            {#if items[nicheIndex]}
                <Card 
                    {flit}
                    index={nicheIndex}
                    item={items[nicheIndex]} 
                    {position}
                />
            {/if}
        </div>
    {/each}
</div>

<style>
.receptacle {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    justify-items:center;

    row-gap: .3em;
    padding-top: .3em;
    padding-bottom: .3em;

    min-height: 100%;
}    

.niche {
    background-color: var(--background-niche);

    display: grid;
    align-items: center;
    justify-items: center;

    --niche-size: .5em;
    width: calc(9 * var(--niche-size));
    height: calc(16 * var(--niche-size));
}
</style>