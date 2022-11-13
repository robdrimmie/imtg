<script>
    export let topCategories = []
    export let bottomCategories = [] 
    export let screens
    export let setVisibleScreen

    // #region center cell/screen navigation
    let visibleScreenIndex = screens.findIndex(screen => screen.visible)
    let hiddenScreens, visibleScreen

    const determineScreens = () => {
        hiddenScreens = [...screens].splice(visibleScreenIndex, 1)
        visibleScreen = screens[visibleScreenIndex]
    }

    const centerClick = e => {
        visibleScreenIndex++
        if(visibleScreenIndex >= screens.length) {
            visibleScreenIndex = 0
        }

        determineScreens()
        setVisibleScreen(visibleScreenIndex)
        // console.log(
        //     "visibleScreenIndex, hiddenScreens, visibleScreen, screens", 
        //      visibleScreenIndex, hiddenScreens, visibleScreen, screens ,
        // )
    }
    // #region center cell/screen navigation

    // #region corner cell navigation
    const determineCategories = () => {
        hiddenTopCategories = [...topCategories]
        hiddenTopCategories.splice(topCategoryIndex, 1)
        hiddenTopCategories = [...hiddenTopCategories]
        visibleTopCategory = topCategories[topCategoryIndex]
        
        hiddenBottomCategories = [...bottomCategories]
        hiddenBottomCategories.splice(bottomCategoryIndex, 1)
        hiddenBottomCategories = [...hiddenBottomCategories]
        visibleBottomCategory = bottomCategories[bottomCategoryIndex]
    }

    const topLeftClick = e => {
        topCategoryIndex--;
        if(topCategoryIndex < 0) {
            topCategoryIndex = topCategories.length - 1            
        }

        determineCategories()
    }

    const topRightClick = e => {
        console.log(topCategoryIndex)

        topCategoryIndex++;
        
        console.log(topCategoryIndex, topCategories.length)

        if(topCategoryIndex >= topCategories.length) {
            console.log("zoop to start")
            topCategoryIndex = 0            
        }

        determineCategories()
    }

    const bottomLeftClick = e => {
        bottomCategoryIndex--;
        if(bottomCategoryIndex < 0) {
            bottomCategoryIndex = bottomCategories.length - 1            
        }

        determineCategories()
    }

    const bottomRightClick = e => {
        bottomCategoryIndex++;
        if(bottomCategoryIndex >= bottomCategories.length) {
            bottomCategoryIndex = 0            
        }

        determineCategories()
    }

    const tabClasses = [
        "nearest",
        "near",
        "far",
        "farthest"
    ]

    let topCategoryIndex = topCategories.findIndex(el => el.visible)
    let bottomCategoryIndex = bottomCategories.findIndex(el => el.visible)

    let visibleTopCategory, hiddenTopCategories
    let visibleBottomCategory, hiddenBottomCategories  

    determineCategories()
    determineScreens()
    // #endregion corner cell navigation
</script>

<div class="navigation">
    <div class="top left categories" on:click={topLeftClick}>
        {#each [...hiddenTopCategories] as cat, classIndex}
            <div class="{tabClasses[classIndex]}">{cat.icon}</div>
        {/each}
    </div>
    <div class="top right categories" on:click={topRightClick}>
        <div class="visible">{visibleTopCategory.icon} {visibleTopCategory.label}</div>
    </div>

    <div class="center" on:click={centerClick}>
        {visibleScreen.label}
    </div>

    <div class="bot left categories" on:click={bottomLeftClick}>
        <div class="visible">{visibleBottomCategory.icon} {visibleBottomCategory.label}</div>
    </div>
    <div class="bot right categories" on:click={bottomRightClick}>
        {#each [...hiddenBottomCategories].reverse() as cat, classIndex}
            <div class="{tabClasses[classIndex]}">{cat.icon}</div>
        {/each}
    </div>
</div>

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

.categories {
    overflow: hidden;
}

.categories > div {
    text-align: center;
    overflow: hidden;
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

.visible {
    background-color: transparent;
}
</style>