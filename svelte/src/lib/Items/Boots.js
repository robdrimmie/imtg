import Item from '$lib/Items/Item.js'
import ItemType from '$lib/Reference/ItemType.js'
import boot from '$lib/images/Legs.svelte'

export default class Boots extends Item {
    constructor(options) {
		super(options)
		this.icon = boot
		this.rehydrate = () => new Boots(this)
        this.setName('Boots')
		this.type = ItemType.BOOTS
	}
}
