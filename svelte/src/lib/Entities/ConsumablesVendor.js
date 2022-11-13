import Dice from '$lib/Dice';
import Paperdoll from '$lib/Items/Paperdoll';

export default class ConsumablesVendor {
    constructor(options) {
        options = options ? options : {}

        this.id = options.id ? options.id : Dice.nextId()

        this.paperdoll = options.paperdoll ? options.paperdoll : Paperdoll.forConsumablesVendor();

        this.consumablesMaterials = 0
    }

    progress() {
        console.log("consumables vendor progressing")
        return this
    }
}
