<script>
    export let addGold
    
    import Container from '$lib/components/Container.svelte';
    import Transfer from '$lib/Utilities/Transfer.js'

    let foo = []
    $: items = foo
    function handleFinalizerTransfer(e, identifier, squareIndex) {
        // console.log("TOOLS FINALIZER", e)

        const result = Transfer.handleFinalizer(
            null, 
            null,
            null, 
            null, // no chest id because it is the paperdoll?
            identifier,
            e.detail.items.length > 0 ? e.detail.items[0].rehydrate() : null,
            squareIndex
        )

        addGold(result.value)

        foo = []
    }
</script>



<div class="tools">
    <div class="cell"></div>
    <div class="cell">
        Sell
        <Container
            {handleFinalizerTransfer}
            identifier={`SELL`}
            items={items}
            size={1}
        />
    </div>
    <div class="cell"></div>
</div>

<style>
    .tools {
        display: grid;
        
        grid-template-rows: repeat(3, 1fr);

        height: 100%;
        width: 5em;
    }

    .cell {
		background-color: #bbb;
	}
</style>