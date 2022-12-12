import Dice from '../Dice'
import Mobs from './Mobs';
import Paperdoll from '$lib/Items/Paperdoll'

Dice.primeWithSeed(20)

it('makes a mob', async () => {

	const resourceCalculator = () => 1
	const physicalityCalculator = () => 2
	const name = "test"

	const actual = Mobs.template(resourceCalculator, physicalityCalculator, name);

	expect(actual.name).toEqual(name);
	expect(actual.getCurrentEnergy()).toEqual(1)
	expect(actual.getCurrentBrawn()).toEqual(2)
});

it('creates loot for non-back slots', async () => {
	const actualHead = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_HEAD)
	const actualTorso = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_TORSO)
	const actualLegs = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_LEGS)
	const actualHandLeft = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_HAND_LEFT)
	const actualHandRight = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_HAND_RIGHT)
	const actualWaist = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_WAIST)

	expect(actualHead).toBeDefined()
	expect(actualTorso).toBeDefined()
	expect(actualLegs).toBeDefined()
	expect(actualHandLeft).toBeDefined()
	expect(actualHandRight).toBeDefined()
	expect(actualWaist).toBeDefined()
})

it('creates proper loot for back slot (real Dice)', async () => {
	const actualBack = Mobs.lootForSlot(Paperdoll.DOLL_SLOT_BACK)

	expect(actualBack.name).toBe('Food of Increased Endurance')
})