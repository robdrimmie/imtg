import Dice from '$lib/Dice';
import ICON_DEFAULT from '$lib/images/Default.svelte'

export default class QuestItems {
	static WIN_CONDITION_ID = 'WIN_CONDITION_ID'

	constructor(things) {
		this.id = things.id ?? Dice.nextId();
		this.isWinConditionItem = things.isWinConditionItem ?? false
		this.description = things.description;
		this.name = things.name;
		this.icon = ICON_DEFAULT;
	}

	static cards() {
		return [QuestItems.winCondition()];
	}

	static winCondition() {
		return new QuestItems({
			description: "Win the game by transferring this item to the chest's inventory!",
			id: QuestItems.WIN_CONDITION_ID,
			isWinConditionItem: true,
			name: 'Win Condition',
		});
	}
}
