import Dice from '$lib/Dice';
import Hex from './Hex';
import Mobs from '$lib/Encounters/Mobs'
import Modifiers from '$lib/Modifiers'
import OriginTown from '$lib/Environments/OriginTown';

class DeckKnowledge {
	constructor() {
		this.available = null;
		this.cardsRemaining = null;
		this.deckSize = null;
	}
}

export default class Tile {
	static KNOWLEDGE_UNKNOWN = 0;
	static KNOWLEDGE_TOMBSTONE = 10;
	static KNOWLEDGE_OBITUARY = 25;
	static KNOWLEDGE_MEMOIR = 50;
	static KNOWLEDGE_EXPERIENCED = 85;

	static findTileForHex(hex, allTiles) {
		return allTiles.find((tile) => {
			return hex.q === tile.hex.q && hex.r === tile.hex.r && hex.s === tile.hex.s;
		});
	}

	static origin() {
		// RMD TODO maybe better homed in Regions but I am not convinced
		const OriginRegion = {
			color: 'orange',
			environment: new OriginTown(),
			stemDirection: null,
			upDirection: null,
			downDirection: null,
			opposite: null,
			tiles: [
				Hex.OriginTown
			]
		}

		return new Tile(OriginRegion, Hex.origin());
	}

	// RMD TODO  Tile Encounters
	// 20211014 1635 Tile should populate its copies of the move, camp, etc decks from the environment's
	// and then maybe make specific modifications.
	// maybe static methods for Capital and such that setup their decks? I'm not sure. There's a
	// piece missing here that I will need to get to when I decide to implement this
	constructor(region, hex) {
		// console.log(
		//   "Tile constructed with",
		//   region,
		//   hex
		// )

		this.region = region
		this.environment = this.region.environment;

		this.color = this.region.color;

		this.hex = hex;
		this.id = this.hex.id();

		// Needs to be the last thing so the environment knows as much as possible about the tile
		this.decks = this.environment.decksForTile(this);
	}

	directionsTowardsTile(tileToConsider) {
		const source = this.hex;
		const destination = tileToConsider.hex;

		if (!source || !destination) {
			console.error('invalid source or destination for DirectionsTowardsTile', source, destination);
			return [];
		}

		// the destination is leftupwards and leftwards of the source (a "diagonal")
		// (0, 0) (-1, -1)
		if (source.q > destination.q && source.r > destination.r) {
			// console.log("left diagonals")
			return [Hex.LEFT_WARDS, Hex.LEFT_UPWARDS];
		}

		// destination is straight leftwards of source
		// (0, 0) (-1, 0)
		if (source.q > destination.q && source.r === destination.r) {
			// console.log("left wards", Hex.LEFT_WARDS)
			return [Hex.LEFT_WARDS];
		}
		// destination is leftdownwards of source
		// (0, 0) (-1, 1)
		if (source.q > destination.q && source.r < destination.r) {
			// console.log("left downwards")
			return [Hex.LEFT_DOWNWARDS];
		}
		// destination is leftupwards of source
		// (0, 0) (0, -1)
		if (source.q === destination.q && source.r > destination.r) {
			// console.log("left updwards")
			return [Hex.LEFT_UPWARDS];
		}
		// destination is nowards of source (the same tile)
		// (0, 0) (0, 0)
		if (source.q === destination.q && source.r === destination.r) {
			console.log; //("nowards")
			return [Hex.Nowards];
		}
		// destination is rightdownwards of source
		// (0, 0) (0, 1)
		if (source.q === destination.q && source.r < destination.r) {
			// console.log("right downwards")
			return [Hex.RIGHT_DOWNWARDS];
		}
		// destination is rightupwards of source
		// (0, 0) (1, -1)
		if (source.q < destination.q && source.r > destination.r) {
			// console.log("right upwards")
			return [Hex.RIGHT_UPWARDS];
		}
		// destination is straight rightwards of source
		// (0, 0) (1, 0)
		if (source.q < destination.q && source.r === destination.r) {
			// console.log("right wards")
			return [Hex.RIGHT_WARDS];
		}

		console.log(
			'diagonal',
			source.q,
			destination.q,
			source.q < destination.q,
			source.r,
			destination.r,
			source.r < destination.r,
			source.s,
			destination.s
		);

		// the destination is rightdownwards and rightwards of the source (a "diagonal")
		// (0, 0) (1, 1)
		if (source.q < destination.q && source.r < destination.r) {
			return [Hex.RIGHT_DOWNWARDS, Hex.RIGHT_WARDS];
		}

		return [];
	}

	distanceFromTile(distantTile) {
		// console.log("distanceFromTile", distantTile)
		return Hex.distance(this.hex, distantTile.hex);
	}

	distanceFromOrigin() {
		// console.log("Tile - distanceFromOrigin")
		return this.distanceFromTile({
			hex: Hex.ORIGIN
		});
	}

	findSelfInHaystack(haystack) {
		// console.log("haystack", haystack)
		return haystack.find((tile) => {
			return tile.hex.q === this.hex.q && tile.hex.r === this.hex.r && tile.hex.s === this.hex.s;
		});
	}

	// RMD TODO For now just a passthrough but maybe some tiles will do something special with this
	flavourMob(mob) {
		return this.environment.flavourMob(mob);
	}

	calculateOpponentBudget() {
		return this.getDifficulty() * Modifiers.OPPONENT_DIFFICULT_MODIFIER
	}

	// this is more simplistic than I expected it to be when I thought it up
	// not very interesting at all really but here anyway.
	quantityStrategy(budget) {
		const opponents = []

		while(budget > 0) {
			opponents.push(Mobs.tier1(this.region))
			budget--
		}

		return opponents
	}

	qualityStrategy(budget) {
		const opponents = []

		const TIER_1_COST = 1
		const TIER_2_COST = 4
		const TIER_3_COST = 9
		const TIER_4_COST = 16
		const TIER_5_COST = 25
		const TIER_6_COST = 36

		while( budget >= TIER_6_COST) {
			opponents.push(Mobs.tier6(this.region))
			budget -= TIER_6_COST
		}

		while( budget >= TIER_5_COST) {
			opponents.push(Mobs.tier5(this.region))
			budget -= TIER_5_COST
		}

		while( budget >= TIER_4_COST) {
			opponents.push(Mobs.tier4(this.region))
			budget -= TIER_4_COST
		}

		while( budget >= TIER_3_COST) {
			opponents.push(Mobs.tier3(this.region))
			budget -= TIER_3_COST
		}

		while( budget >= TIER_2_COST) {
			opponents.push(Mobs.tier2(this.region))
			budget -= TIER_2_COST
		}

		while( budget >= TIER_1_COST) {
			console.log("making mob", this.region)
			opponents.push(Mobs.tier1(this.region))
			budget -= TIER_1_COST
		}

		return opponents
	}

	generateOpponents() {
		// I am leaving this an an explicit call so maybe child classes can do different things?
		const budget = this.calculateOpponentBudget()

		let opponents = []
		// Do quantity 1% of the time just for giggles
		if(Dice.d100() === 50) {
			opponents = this.quantityStrategy(budget)
		} else {
			opponents = this.qualityStrategy(budget)
		}

		return opponents
	}

	// RMD TODO complexify or otherwise nuancicate
	getDifficulty() {
		return this.distanceFromOrigin();
	}

	getKnowledgeForLevel(knowledgeLevel = Tile.KNOWLEDGE_UNKNOWN) {
		/// maybe check how many moves since it has been updated and then dial down some info?
		// hrm no. maybe check number of moves and then drop down the knowledge if it has been
		// a lot? but that only works if I get this knowledge a lot, I think that as characters
		// are scanning their tile relatinoships it could change in a cycle/pass before the one that gets this knowledge I don't know

		// console.log("getKnowledgeForLevel", this, knowledgeLevel)

		const tileKnowledge = {
			id: null,

			adventuring: new DeckKnowledge(),
			foraging: new DeckKnowledge(),
			resting: new DeckKnowledge(),
			vending: new DeckKnowledge(),

			region: null,
			environment: null
		};

		if (knowledgeLevel >= Tile.KNOWLEDGE_UNKNOWN) {
			tileKnowledge.hex = this.hex;
			tileKnowledge.id = this.id;
		}

		if (knowledgeLevel >= Tile.KNOWLEDGE_TOMBSTONE) {
			tileKnowledge.region = this.region;
		}

		if (knowledgeLevel >= Tile.KNOWLEDGE_OBITUARY) {
			tileKnowledge.environment = this.environment;

			tileKnowledge.adventuring.available = this.hasAdventuringAvailable();
			tileKnowledge.foraging.available = this.hasForagingAvailable();
			tileKnowledge.resting.available = this.hasRestingAvailable();
			tileKnowledge.vending.available = this.hasVendingAvailable();
		}

		if (knowledgeLevel >= Tile.KNOWLEDGE_MEMOIR) {
			tileKnowledge.adventuring.deckSize = this.decks.adventuring.size();
			tileKnowledge.foraging.deckSize = this.decks.foraging.size();
			tileKnowledge.resting.deckSize = this.decks.resting.size();
			tileKnowledge.vending.deckSize = this.decks.vending.size();
		}

		if (knowledgeLevel >= Tile.KNOWLEDGE_EXPERIENCED) {
			tileKnowledge.adventuring.cardsRemaining = this.decks.adventuring.length();
			tileKnowledge.foraging.cardsRemaining = this.decks.foraging.length();
			tileKnowledge.resting.cardsRemaining = this.decks.resting.length();
			tileKnowledge.vending.cardsRemaining = this.decks.vending.length();
		}

		/// oh and there should be some kind of moves-since-updated or like, last-updated-on-move value
		/// so that the recency of information might matter in some fashion
		// blurgh. passing the game state down to this point to get move count is going to be a pain,
		// so I'm going to leave it to future Rob who wants to make use of this information to deal with it
		// console.log("getKnowledgeForLevel Returning", tileKnowledge)
		return tileKnowledge;
	}

	hasAdventuringAvailable() {
		return this.decks.adventuring.length() > 0;
	}

	// RMD TODO More interesting food tiles
	// for now only Hubtown has food, nice and basic
	hasForagingAvailable() {
		return this.decks.foraging.length() > 0;
	}

	hasRestingAvailable() {
		return this.decks.resting.length() > 0;
	}

	hasVendingAvailable() {
		return this.decks.vending.length() > 0;
	}

	isStoringItem() {
		return this.slot && this.slot != null
	}

	isOrigin() {
		return this.hex.isOrigin();
	}

	storeItem(item) {
		this.slot = item
	}
}
