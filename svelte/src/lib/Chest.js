
import Dice from './Dice';
import Paperdoll from './Items/Paperdoll';

import Food from '$lib/Items/Food'
import Potions from '$lib/Items/Potions'
import Boots from '$lib/Items/Boots'
import Hats from '$lib/Items/Hats'
import Torsos from '$lib/Items/Torsos'
import Waists from '$lib/Items/Waists'
import Weapons from '$lib/Items/Weapons'

export default class Chest {
	constructor() {
		this.paperdoll = Paperdoll.forChest();

		// uncomment following line to fill chest with random items
		// this.fill()
	}

	backpack() {
		return this.paperdoll.slots[Paperdoll.CHEST_HUBTOWN_NODE];
	}

	setBackpack(container) {
		this.paperdoll.slots[Paperdoll.CHEST_HUBTOWN_NODE] = container;
	}

	fill() {
		for(let slotIndex = 0; slotIndex < this.backpack().slots.length; slotIndex++) {
			let item 

			
			switch(Dice.roll(7)) {
				case 7:
					item = Food.ofRandomEffect()
					break;
										
				case 6:
					item = Potions.ofRandomEffect()
					break;

				case 5:
					item = Boots.ofRandomEffect()
					break;
					
				case 4:
					item = Hats.ofRandomEffect()
					break;
					
				case 3:
					item = Torsos.ofRandomEffect()
					break;
					
				case 2:
					item = Waists.ofRandomEffect()
					break;
					
				case 1:
					item = Weapons.ofRandomEffect()
					break;
					
				default:
			}

			this.backpack().slots[slotIndex] = item
		}
	}
}
