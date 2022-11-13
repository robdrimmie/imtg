// rmd todo pretty sure this is unusued
export default class Transfer {
    static handleFinalizer(
        characters, 
        characterId, 
        chests, 
        chestId, 
        identifier, 
        item, 
        squareIndex
    ) {
        let targetContainer
        // 'SQUARE-' is 7 characters
        let slotIndex = parseInt(squareIndex.substring(7))
		
		const characterIndex = (characters && characterId)
            ? characters.findIndex(
                    (character) => parseInt(character.id) === parseInt(characterId)
                )
            : null 

        const chestIndex = (chests && chestId)
            ? chests.findIndex(
                    (chest) => parseInt(chest.paperdoll.id) === parseInt(chestId)
                )
            : null


		if (identifier.includes('PAPERDOLL')) {
            // 'PAPERDOLL-' is 10 letters
			slotIndex = parseInt(identifier.substring(10));
            targetContainer = characters[characterIndex].paperdoll
		} 

        if (identifier.includes('CHARACTER')) {
            targetContainer = characters[characterIndex].backpack()
        }

        if (identifier.includes('CHEST')) {
            targetContainer = chests[chestIndex].backpack()
        } 

        let value = 0
        // RMD TODO should probably have separate functions here for SELL and for everything else
        if (identifier.includes('SELL')) {
            value = item.value
        } else {
            if (item) {
                targetContainer.insert(
                    item.rehydrate(), 
                    slotIndex
                );
            } else {
                targetContainer.removeFromSlot(slotIndex);
            }
        }

        return {
            characters,
            chests,
            value
        }
	}
}