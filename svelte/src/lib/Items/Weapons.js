import Attributes from '$lib/Attributes'
import Item from '$lib/Items/Item'
import ItemType from '$lib/Reference/ItemType.js'
import Modifiers from '$lib/Modifiers'

import weapon from '$lib/images/Weapon.svelte'

export default class Weapons extends Item {
    // RMD TODO maybe should have any kind of attribute changing but for now fists are only hurtful
    static Fist() {
        const fist = Weapons.ofDecreaseHealth(Modifiers.EFFECTIVENESS_VERY_LOW)

        return fist
    }

    constructor(options) {
        // console.log("weapon constructor given options", options)
        
        options = options ? options : {}
        super(options)

        // Weapons only ever decrease health
        this.attribute = Attributes.RESOURCES_HEALTH
        this.icon = weapon
        this.rehydrate = () => new Weapons(this)
        this.setIncrease(false)
        this.setName('Weapon')
        this.type = ItemType.WEAPONS

        // console.log("weapon created with id", this.id, this)
    }

    toHitModifierForCharacter(character) {
		return  1 + (
			(character.getCurrentAwareness() / 100 )
			*
			(character.getCurrentCoordination() / 100)
		)
	}
}