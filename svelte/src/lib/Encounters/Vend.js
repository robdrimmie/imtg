import Encounter from '$lib/Encounters/Encounter';
import Move from '$lib/Move';

export default class Vend extends Encounter {
    static unloadBackpacks() {
        const description = 'The party unloads their backpacks'
        const name = 'Unload Backpacks'

		return new Vend({
			description,
			name,
			run: (params) => {
				const {characters, chests} = params
								
				let move = Move.other(description);

                // loop through the party
                characters.forEach( partyMember => {
                // send the full contents of a character's backpack into the chest
                    const items = partyMember.backpack().loot()
                    chests[0].backpack().contain(items)

                })                        

				return {
					characters,
					move,
					chests
				};
			}
		});
    }
}
