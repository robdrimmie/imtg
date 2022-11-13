<script>
    export let flit
    export let item
    export let index
    export let position

    import Backpack from '$lib/images/Backpack.svelte'
	import CardFrame from '$lib/components/Structure/CardFrame.svelte'
	import Default from '$lib/images/Default.svelte'
	import Food from '$lib/images/Food.svelte'
	import Hat from '$lib/images/Hat.svelte'
	import ItemType from '$lib/Reference/ItemType.js'
	import Legs from '$lib/images/Legs.svelte'
	import Potion from '$lib/images/Potion.svelte'
	import Torso from '$lib/images/Torso.svelte'
	import Waist from '$lib/images/Waist.svelte'
	import Weapon from '$lib/images/Weapon.svelte'

    const cardFlit = (e) => {
        // console.log("cardFlit - e", e)
        flit(e, {
            index,
            position
        })
    }
</script>

<div 
    class="card"
    on:click={cardFlit}
>
    <CardFrame {item}>
        {#if (item.type === ItemType.BACKPACKS) }
            <Backpack />
        {:else if (item.type === ItemType.BOOTS) }
            <Legs  />
        {:else if (item.type === ItemType.FOOD) }
            <Food />
        {:else if (item.type === ItemType.HATS) }
            <Hat />
        {:else if (item.type === ItemType.POTIONS) }
            <Potion />
        {:else if (item.type === ItemType.TORSOS) }
            <Torso />
        {:else if (item.type === ItemType.WAISTS) }
            <Waist />
        {:else if (item.type === ItemType.WEAPONS) }
            <Weapon />
        {:else}
            <Default />
        {/if}
    </CardFrame>

    <p class="name">{item.name}</p>
</div>

<style>

.card {
    background-color: cornsilk;

    text-align: center;
    vertical-align: middle;

    --card-size: .45em;
    width: calc(9 * var(--card-size));
    height: calc(16 * var(--card-size));
}

.name {
    font-size: .5em;

    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>

