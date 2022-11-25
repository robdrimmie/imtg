import Combat from '../Encounters/Combat';
import Deck from '../Deck';
import Rest from '../Encounters/Rest';
import Trap from '../Encounters/Trap';

export default class Environment {
	constructor() {
		this.name = 'Base Environment';
		this.color = 'black';
	}

	decksForTile(tile) {
		return this.startingDecks(tile);
	}

	flavourMob(mob) {
		mob.name += ` flavoured by ${this.name}`;

		return mob;
	}

	// Base environments starting decks just have every possible card type.
	// thin pickings for now really, but then derived environments can copy paste from the full inventory
	// OriginTown has an example of an override
	startingDecks(tile) {
		return {
			adventuring: new Deck([
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Combat.boilerplate(tile), 
				Trap.triggeredProjectile(tile),
			]),

			foraging: new Deck([
				// no foraging in the Medieval Lands yet
			]),

			resting: new Deck([
				Rest.onlyEnergy(tile),
				Rest.onlyHealth(tile),
				Rest.onlySatiety(tile),

				Rest.onlyEnergy(tile),
				Rest.onlyHealth(tile),
				Rest.onlySatiety(tile),

				Rest.onlyEnergy(tile),
				Rest.onlyHealth(tile),
				Rest.onlySatiety(tile),

				Rest.onlyEnergy(tile),
				Rest.onlyHealth(tile),
				Rest.onlySatiety(tile),

				Rest.onlyEnergy(tile),
				Rest.onlyHealth(tile),
				Rest.onlySatiety(tile),

				Rest.noEnergy(tile),
				Rest.noHealth(tile),
				Rest.noSatiety(tile),

				Rest.complete(tile)
			]),

			vending: new Deck([
				// no vending in the Medieval lands
			])
		};
	}
}
