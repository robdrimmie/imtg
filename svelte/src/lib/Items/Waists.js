import Item from '$lib/Items/Item'
import ItemType from '$lib/Reference/ItemType.js'
import waist from '$lib/images/Waist.svelte'

export default class Waists extends Item{
    constructor(options) {
        super(options)
        this.icon = waist
        this.rehydrate = () => new Waists(this)
        this.setName('Waist')
        this.type = ItemType.WAISTS
    }
}