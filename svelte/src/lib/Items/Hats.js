import head from '$lib/images/Hat.svelte'
import Item from '$lib/Items/Item'
import ItemType from '$lib/Reference/ItemType.js'

export default class Hats extends Item {
	constructor(options) {
		super(options)
		this.icon = head
		this.rehydrate = () => new Hats(this)
        this.setName('Hat')
		this.type = ItemType.HATS
	}
}
