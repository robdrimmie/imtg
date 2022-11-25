export default class ItemType {
	static BACKPACKS = "ITEM_TYPE_BACKPACKS"
	static BOOTS = "ITEM_TYPE_BOOTS"
	static FOOD = "ITEM_TYPE_FOOD"
	static HATS = "ITEM_TYPE_HATS"
	static ITEM = "ITEM_TYPE_ITEM"
	static POTIONS = "ITEM_TYPE_POTIONS"
	static TORSOS = "ITEM_TYPE_TORSOS"
	static WAISTS = "ITEM_TYPE_WAISTS"
	static WEAPONS = "ITEM_TYPE_WEAPONS"

	static matsForType(itemType) {
		switch (itemType) {
			case ItemType.BACKPACKS: 
				return 0
			case ItemType.BOOTS: 
				return 3
			case ItemType.FOOD: 
				return 1
			case ItemType.HATS: 
				return 2
			case ItemType.ITEM: 
				return 0
			case ItemType.POTIONS: 
				return 1
			case ItemType.TORSOS: 
				return 5
			case ItemType.WAISTS: 
				return 1
			case ItemType.WEAPONS: 
				return 4
		}
	}
}