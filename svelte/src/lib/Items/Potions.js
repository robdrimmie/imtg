import Item from '$lib/Items/Item'
import ItemType from '$lib/Reference/ItemType.js'
import potion from '$lib/images/Potion.svelte'

export default class Potions extends Item {
    constructor(options) {
		super(options)
		this.icon = potion
		this.rehydrate = () => new Potions(this)
        this.setName('Potion')
		this.type = ItemType.POTIONS
	}
}