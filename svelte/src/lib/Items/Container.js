import Dice from '../Dice'

import ICON_BACKPACK from '$lib/images/Backpack.svelte'
import ICON_DEFAULT from '$lib/images/Default.svelte'
import ItemType from '$lib/Reference/ItemType'

// rmd todo This maybe should go somewhere else since it doesn't extend Item - structure perhaps?
export default class Container {
	static generate() {
		return new Container({
			capacity: Dice.d12(),
			name: 'Randomly generated container',
			value: 1
		});
	}

	static Backpack(capacity, description, name, value) {
		return new Container({
			capacity,
			description,
			name,
			value,
			icon: ICON_BACKPACK
		});
	}

	static PaperdollForAdventurer() {
		const paperdoll = new Container({
			capacity: 7,
			description: 'Adventurer Paperdoll Description',
			name: 'Adventurer Paperdoll Name',
			value: 0
		});

		// paperdoll.slots[InventoryPath.DOLL_SLOT_BACK] = Backpack.ofTenSlots()

		return paperdoll;
	}

	static PaperdollForChest() {
		return new Container({
			capacity: 1,
			description: 'Chest Paperdoll Description',
			name: 'Chest Paperdoll Name',
			slots: [Container.Backpack(99, 'Chest Backpack Description', 'Chest Backpack Name', 0)],
			value: 0
		});
	}

	constructor(options) {
		if (!options) {
			console.log('MISSING OPTIONS FOR CONTAINER');
		}

		this.capacity = options.capacity ? options.capacity : 0
		this.description = options.description ?? 'No capacity and no value'
		this.health = options.health ? options.health : 1
		this.icon = options.icon ? options.icon: ICON_DEFAULT
		this.id = options.id ? options.id : Dice.nextId()
		this.type = ItemType.BACKPACKS
		this.name = options.name ? options.name : 'Container base'
		this.slots = options.slots ? options.slots : Array(this.capacity).fill(null)
		this.valid_types = options.valid_types ? options.valid_types : []
		this.value = options.value ? options.value : 0

		this.isContainer = true
	}

	availableCapacity() {
		return this.slots.reduce((acc, contents, idx, arr) => {
			return acc + (arr[idx] === null ? 1 : 0);
		}, 0);
	}

	contain(items) {
		items = Array.isArray(items) ? items : [items]

		items.forEach( item => {
			const emptyIx = this.slots.findIndex(
				ix => this.slotIsEmpty(ix)
			);

			// RMD TODO: figure out to to choose what to keep when containers are full
			if (emptyIx === -1) {
				console.error('container is too full figure out what to keep!');
				return false;
			}

			this.insert(item, emptyIx);
		})
	}

	insert(item, slotIndex) {
		// validate slot index

		if (this.slots.length < slotIndex) {
			return;
		}

		// validate there's something there
		if (!this.slotIsEmpty(this.slots[slotIndex])) {
			return;
		}

		const updatedSlots = [...this.slots];
		updatedSlots[slotIndex] = item;

		this.slots = [...updatedSlots];
	}

	loot() {
		const loot = this.slots.filter( (slotItem) => {
			if(slotItem) {
				return true
			}

			return false
		})

		this.slots = Array(this.capacity).fill(null)
		// let loot = [];

		// this.slots.forEach(slotItem => {
		// 	if (slotItem) {
		// 		loot.push(slotItem)
		// 		slotItem = null
		// 	}
		// });


		return loot;
	}

	removeFromSlot(slotIndex) {
		const item = this.slots[slotIndex];
		const updatedSlots = [...this.slots];

		updatedSlots[slotIndex] = null;

		this.slots = [...updatedSlots];

		return item;
	}

	// RMD TODO: Validation of what's coming in the slots
	// eg, Backpack.svelte calls this, sometimes with placeholder objects instead of null
	replaceSlots(newSlots) {
		this.slots = [...newSlots];
	}

	slotIndexOfItemById(itemId) {
		this.slots.indexOf((item) => (item.id = itemId));
	}

	slotIsEmpty(slot) {
		if (slot === null) {
			return true;
		}

		return false;
	}
}
