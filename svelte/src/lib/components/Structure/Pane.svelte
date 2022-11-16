<script>
    export let flit = () => {}
    export let height = "50vh"
    export let navigate = () => {}
    export let pane
    export let screenIsAdventure = false

    import About from '$lib/components/Structure/Panes/About.svelte'
    import Backpack from '$lib/components/Structure/Panes/Backpack.svelte'
    import Character from '$lib/components/Structure/Panes/Character.svelte'
    import Chest from '$lib/components/Structure/Panes/Chest.svelte'
    import ConsumablesVendor from '$lib/components/Structure/Panes/CV.svelte'
    import Eee from '$lib/components/Structure/Panes/Eee.svelte'
    import EquipablesVendor from '$lib/components/Structure/Panes/EV.svelte'
    import Currency from '$lib/components/Structure/Panes/Currency.svelte'
    import Log from '$lib/components/Structure/Panes/Log.svelte'
    // import Log from '$lib/components/Content/Log.svelte'
    import Mannequin from '$lib/components/Structure/Panes/Mannequin.svelte'
    import Navigation from '$lib/components/Structure/Panes/Navigation.svelte'
    // import Map from '$lib/components/Map/Map.svelte'
    import Map from '$lib/components/Structure/Panes/Map.svelte'
    import Options from '$lib/components/Structure/Panes/Options.svelte'
    import Paperdoll from '$lib/components/Structure/Panes/Paperdoll.svelte'
    import Party from '$lib/components/Structure/Panes/Party.svelte'
    import ReturnToMain from '$lib/components/Structure/Panes/ReturnToMain.svelte'
    import Tile from '$lib/components/Structure/Panes/Tile.svelte'

    // console.log("Pane", pane) // I'm gonna live forever
</script>

<div style="--paneHeight: {height}">
{#if pane.label === "About"}
    <About />
{/if}

{#if pane.label ==="Backpack"}
    <Backpack 
        {flit}
    />
{/if}

{#if pane.label ==="Character"}
    <Character />
{/if}

{#if pane.label ==="Chest"}
    <Chest  
        {flit}
    />
{/if}

{#if pane.label ==="Consumables Vendor"}
    <ConsumablesVendor 
        {flit}
    />
{/if}

{#if pane.label ==="Eee"}
    <Eee />
{/if}

{#if pane.label ==="Equipment Vendor"}
    <EquipablesVendor 
        {flit}
    />
{/if}

{#if pane.label ==="Currency"}
    <Currency />
{/if}

{#if pane.label ==="Log"}
    <Log />
{/if}

{#if pane.label ==="Mannequin"}
    <Mannequin 
        {flit} 
    />
{/if}

{#if pane.label ==="Map"}
    <Map />
{/if}

{#if pane.label ==="Navigation"}
    <Navigation 
        {navigate}
        {screenIsAdventure}
    />
{/if}

{#if pane.label ==="Options"}
    <Options />
{/if}

{#if pane.label ==="Paperdoll"}
    <Paperdoll 
        {flit}
    />
{/if}

{#if pane.label ==="Party"}
    <Party 
        on:selectEntity
    />
{/if}

{#if pane.label ==="Return to Main"}
    <ReturnToMain />
{/if}

{#if pane.label ==="Tile"}
    <Tile />
{/if}
 
</div>

<style>
div {
	background-color: var(--background-pane);  

    height: var(--paneHeight);
	overflow: scroll;
}
</style>