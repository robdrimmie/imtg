import Boots from '$lib/Items/Boots.js'
import Dice from '$lib/Dice.js'
import Hats from '$lib/Items/Hats.js'
import ItemType from '$lib/Reference/ItemType.js'
import Torsos from '$lib/Items/Torsos.js'
import Waists from '$lib/Items/Waists.js'
import Weapons from '$lib/Items/Weapons.js'

import Paperdoll from '$lib/Items/Paperdoll'
import Logger from '$lib/Logger'

export default class EquipablesVendor {
    constructor(options) {
        options = options ? options : {}

        this.id = options.id ? options.id : Dice.nextId()

        this.paperdoll = options.paperdoll ? options.paperdoll : Paperdoll.forEquipablesVendor();

        this.equipablesMaterials = 3
    }

    /*
    - [2] waist
    - [3] hat
    - [4] boots
    - [5] right hand (weapon) ------ not doing: - [5] left hand (weapon)
    - [6] torso 
    */
    slotForMatCount(matCount) {
        // most expensive thing we can build
        // probably should include whether or not the slot is empty in the test
        if(matCount >= 6) return Paperdoll.DOLL_SLOT_TORSO
        if(matCount >= 5) return Paperdoll.DOLL_SLOT_HAND_RIGHT
        if(matCount >= 4) return Paperdoll.DOLL_SLOT_LEGS
        if(matCount >= 3) return Paperdoll.DOLL_SLOT_HEAD
        if(matCount >= 2) return Paperdoll.DOLL_SLOT_WAIST

        return null
    }

    itemForMatCount(matCount) {
        if(matCount >= 6) return Torsos.ofRandomEffect()
        if(matCount >= 5) return Weapons.ofRandomEffect()
        if(matCount >= 4) return Boots.ofRandomEffect()
        if(matCount >= 3) return Hats.ofRandomEffect()
        if(matCount >= 2) return Waists.ofRandomEffect()

        return null
    }

    progress() {
        // console.log("equipables vendor progressing")
        // what slot can hold the most expensive thing we can build
        const slotIndex = this.slotForMatCount(this.equipablesMaterials)

        // there isn't enough mats to build a thing
        if(slotIndex === null) return this

        // there isn't space to build a thing for the slot we picked
        if(this.paperdoll.slots[slotIndex] !== null) return this
        
        // build a thing for the slot we picked
        let item = this.itemForMatCount(this.equipablesMaterials)

        // this probably shouldn't happen? but it might and if does, don't break just exit.
        if(item === null) return this

        item.value = ItemType.matsForType(item.type)
        this.equipablesMaterials -= item.value

        // add the thing to the vendor's inventory
        this.paperdoll.slots[slotIndex] = item

        Logger.info(`The Equipables Vendor crafted a new ${item.name} worth ${item.value} currency.`)
        return this
    }
}