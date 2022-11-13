import Item from '$lib/Items/Item'
import ItemType from '$lib/Reference/ItemType.js'
import torso from '$lib/images/Torso.svelte'

export default class Torsos extends Item {
    constructor(options) {
		super(options)
		this.icon = torso
		this.rehydrate = () => new Torsos(this)
        this.setName('Torso')
		this.type = ItemType.TORSOS
	}

	dodgeModifierForCharacter(character) {
		return  1 + (
			(character.getCurrentAwareness() / 100 )
			*
			(character.getCurrentCoordination() / 100)
		)
	}
}
