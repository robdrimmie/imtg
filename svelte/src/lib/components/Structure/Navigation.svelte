<script>
    export let bottomIndex
    export let navigate
    export let screen
    export let topIndex

    const topLeftClick = e => {
        navigate(e, {
            modifier: -1,
            paneId: screen.panes.top[topIndex].id,
            top: true
        })
    }

    const topRightClick = e => {
        navigate(e, {
            modifier: 1,
            paneId: screen.panes.top[topIndex].id,
            top: true
        })
    }

    const bottomLeftClick = e => {
        navigate(e, {
            modifier: 1,
            paneId: screen.panes.bottom[bottomIndex].id,
            top: false
        })
    }

    const bottomRightClick = e => {
        navigate(e, {
            modifier: -1,
            paneId: screen.panes.bottom[bottomIndex].id,
            top: false
        })
    }

    const centerClick = e => {
        navigate(e, {
            modifier: 1,
            paneId: null,
            top: null
        })
    }

    const remainders = (arr, idx) => {
        let remains = []//arr.slice(idx, 1)
        
        for(let step = 1, nextIndex = idx; step < arr.length; step++) {
            nextIndex++
            if (nextIndex >= arr.length) nextIndex = 0
            if (nextIndex < 0) nextIndex = arr.length - 1
             
            remains.push(arr[nextIndex])
        }
        
        return remains
    }

    const tabClasses = [
        "nearest",
        "near",
        "far",
        "farthest"
    ]

</script>
{#if screen.panes.top && screen.panes.bottom}
<div class="navigation">
    <div class="top left panes" on:click={topLeftClick}>
        {#each remainders(screen.panes.top, topIndex) as pane, paneIndex}
            <div class="{tabClasses[paneIndex]}">{pane.icon}</div>    
        {/each}
    </div>
    <div class="top right panes visible" on:click={topRightClick}>
        {screen.panes.top[topIndex].icon} {screen.panes.top[topIndex].label}
    </div>

    <div class="center" on:click={centerClick}>
        {screen.label}
    </div>

    <div class="bot left panes visible" on:click={bottomLeftClick}>
        {screen.panes.bottom[bottomIndex].icon} {screen.panes.bottom[bottomIndex].label}
    </div>
    <div class="bot right panes" on:click={bottomRightClick}>
        {#each remainders(screen.panes.bottom, bottomIndex) as pane, paneIndex}
            <div class="{([...tabClasses].reverse())[paneIndex]}">{pane.icon}</div>    
        {/each}
    </div>
</div>
{/if}

<style>
.navigation {
	display: grid;
    
    grid-template-areas: 
        "top-left top-left center top-right top-right"
        "bot-left bot-left center bot-right bot-right"
    ;
    
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.left {
    text-align: left;
}

.center {
    text-align: center;

    border: 1px solid black;
    grid-area: center;
}

.right {
    text-align: right;
}

.top.left {
    grid-area: top-left;

    display: grid;
    grid-template-areas: 
        "a b c c c d d d d d"
    ;
}

.top.right {
    grid-area: top-right;
}

.bot.left {
    grid-area: bot-left;
}

.bot.right {
    grid-area: bot-right;

    display: grid;
    grid-template-areas: 
        "a a a a a b b b c d"
    ;
}

.panes {
    overflow: hidden;
}

.panes > div {
    text-align: center;
    overflow: hidden;
}

.visible {
    background-color: transparent;
}

.farthest {
    grid-area: a;
}

.far {
    grid-area: b;
}

.near {
    grid-area: c;
}

.nearest {
    grid-area: d;
}
</style>