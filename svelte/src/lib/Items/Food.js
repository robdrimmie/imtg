import Item from '$lib/Items/Item.js'
import ItemType from '$lib/Reference/ItemType.js'
import food from '$lib/images/Food.svelte'

// rmd todo MAKE ICON FOR FOOD
export default class Food extends Item  {
    constructor(options) {
		super(options)
		this.icon = food
		this.rehydrate = () => new Food(this)
        this.setName('Food')
		this.type = ItemType.FOOD
	}
}