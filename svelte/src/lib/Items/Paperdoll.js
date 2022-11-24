import Backpack from '$lib/Decks/Backpacks.js'
import Container from '$lib/Items/Container.js'
import Deck from '$lib/Deck.js'
import ItemType from '$lib/Reference/ItemType.js'

// This should maybe go somewhere else since it doesn't extend Item
export default class Paperdoll {
	static DOLL_SLOT_HEAD = 0
	static DOLL_SLOT_TORSO = 1
	static DOLL_SLOT_LEGS = 2
	static DOLL_SLOT_HAND_LEFT = 3
	static DOLL_SLOT_HAND_RIGHT = 4
	static DOLL_SLOT_BACK = 5
	static DOLL_SLOT_WAIST = 6
	static DOLL_SLOT_FOOD = 1001
	static DOLL_SLOT_POTION = 1002

	static LABELS = ['Head', 'Torso', 'Legs', 'Left Hand', 'Right Hand', 'Back', 'Waist'];

	static SLOTS = [
		Paperdoll.DOLL_SLOT_HEAD,
		Paperdoll.DOLL_SLOT_TORSO,
		Paperdoll.DOLL_SLOT_LEGS,
		Paperdoll.DOLL_SLOT_HAND_LEFT,
		Paperdoll.DOLL_SLOT_HAND_RIGHT,
		Paperdoll.DOLL_SLOT_BACK,
		Paperdoll.DOLL_SLOT_WAIST
	];

	static CHEST_HUBTOWN_NODE = 0;

	static forCharacter() {
		const paperdoll = new Container({
			capacity: 7,
			description: 'Character Paperdoll Description',
			name: 'Character Paperdoll Name',
			value: 0
		});

		// rmd todo backpack should probably be created via Job.startingBackpack or somesuch
		paperdoll.slots[Paperdoll.DOLL_SLOT_BACK] = Backpack.ofTenSlots();

		return paperdoll;
	}

	static forChest() {
		return new Container({
			capacity: 1,
			description: 'Chest Paperdoll Description',
			name: 'Chest Paperdoll Name',
			slots: [Container.Backpack(99, 'Chest Backpack Description', 'Chest Backpack Name', 0)],
			value: 0
		});
	}

	static forConsumablesVendor() {
		return new Container({
			capacity: 2,
			description: 'Consumables Vendor Paperdoll',
			name: 'Consumables Vendor Name',
			value: 0
		});
	}

	static forEquipablesVendor() {
		return new Container({
			capacity: 5,
			description: 'Equipment Vendor Paperdoll',
			name: 'Equipment Vendor Name',
			value: 0
		});
	}

	static forMob() {
		const paperdoll = new Container({
			capacity: 7,
			description: 'Mob Paperdoll Description',
			name: 'Mob Paperdoll Name',
			value: 0
		});

		paperdoll.slots[Paperdoll.DOLL_SLOT_BACK] = Backpack.ofXSlots(1);

		return paperdoll;
	}

	static randomSlot() {
		const slotDeck = new Deck(Paperdoll.SLOTS)
		return slotDeck.draw()[0]
	}

	static slotIndexForItem(item) {
		return slotIndexForItemType(item.type)
	}

	static slotIndexForItemType(itemType) {
		switch (itemType) {
			case ItemType.BACKPACKS:
				return this.DOLL_SLOT_BACK
			case ItemType.BOOTS:
				return this.DOLL_SLOT_LEGS
			case ItemType.FOOD:
				return this.DOLL_SLOT_FOOD
			case ItemType.HATS:
				return this.DOLL_SLOT_HEAD
			case ItemType.ITEM:
				return -1
			case ItemType.POTIONS:
				return this.DOLL_SLOT_POTION
			case ItemType.TORSOS:
				return this.DOLL_SLOT_TORSO
			case ItemType.WAISTS:
				return this.DOLL_SLOT_WAIST
			case ItemType.WEAPONS:
				return this.DOLL_SLOT_HAND_RIGHT
			
			default: 
				console.error(
					"default item type hit", 
					itemType, 
					itemType == "ITEM_TYPE_HATS", 
					itemType == ItemType.HATS
				)
				return -1
		}
	}
}
