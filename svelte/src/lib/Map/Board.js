import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Encounter from '$lib/Encounters/Encounter'
import Environments from '$lib/Decks/Environments'
import Hex from '$lib/Map/Hex'
import Tile from '$lib/Map/Tile'

// If fewer or more regions are desired, change the contents of this array
const regions = [
	{
		color: 'pink',
		stemDirection: Hex.LEFT_WARDS,
		upDirection: Hex.LEFT_UPWARDS,
		downDirection: Hex.LEFT_DOWNWARDS
	},
	{
		color: 'blue',
		stemDirection: Hex.LEFT_UPWARDS,
		upDirection: Hex.RIGHT_UPWARDS,
		downDirection: Hex.LEFT_WARDS
	},
	{
		color: 'yellow',
		stemDirection: Hex.RIGHT_UPWARDS,
		upDirection: Hex.RIGHT_WARDS,
		downDirection: Hex.LEFT_UPWARDS
	},
	{
		color: 'red',
		stemDirection: Hex.RIGHT_WARDS,
		upDirection: Hex.RIGHT_DOWNWARDS,
		downDirection: Hex.RIGHT_UPWARDS
	},
	{
		color: 'green',
		stemDirection: Hex.RIGHT_DOWNWARDS,
		upDirection: Hex.LEFT_DOWNWARDS,
		downDirection: Hex.RIGHT_WARDS
	},
	{
		color: 'orange',
		stemDirection: Hex.LEFT_DOWNWARDS,
		upDirection: Hex.LEFT_WARDS,
		downDirection: Hex.RIGHT_DOWNWARDS
	}
];

const TILE_PATTERN = [1, 3, 5, 5, 3, 1];

export default class Board {

	constructor() {
		this.populateRegions()

		this.selectWinningTiles()
	}

	allWinConditionsReturned() {
		return this.winningTiles.every(tile => {
			return tile.isStoringItem()
		})
	}

	generateArm(stemHex, direction, armCount, environment) {
		// console.log(
		//   "generateArm", stemHex, direction, armCount, region, environment
		// )
		const armLocations = [];
		let armHex = stemHex;

		for (let armIndex = 0; armIndex < armCount; armIndex++) {
			const newTileHex = Hex.add(armHex, direction);

			armLocations.push(new Tile(environment, newTileHex));

			armHex = newTileHex;
		}

		return armLocations;
	}

	// RMD TODO Refactor
	// Big refactor, storing it here for now. It might be possible to make Board.tiles a Map,
	// keyed on the id. It might already be that, even! Anyway, if it is this lookup stuff
	// can probably be simplified.
	getNeighboursForTile(tile) {
		const neighbourTiles = [];
		const neighbourHexes = Hex.neighboursOfCoordinate(tile.hex);

		neighbourHexes.forEach((neighbourHex) => {
			const tile = Tile.findTileForHex(neighbourHex, this.tiles);

			if (tile) {
				neighbourTiles.push(tile);
			}
		});

		return neighbourTiles;
	}

	getTilesAsMap() {
		const tilesAsMap = new Map()
	
		this.tiles.forEach(tile => {
		//   console.log("tam", tile)
		  tilesAsMap.set(tile.id, tile)
		})
	
		return tilesAsMap
	}

	// rmd todo extract this? maybe into a Region class or something?
	allocateTilesToRegion(region) {
		let tiles = []
		let previousStemHexHex = Hex.ORIGIN;

		for (const numberOfHexes of TILE_PATTERN) {
			const stemHex = Hex.add(previousStemHexHex, region.stemDirection);

			tiles.push(new Tile(region.environment, stemHex));

			const armCount = (numberOfHexes - 1) / 2;

			if (armCount > 0) {
				let upArm = this.generateArm(stemHex, region.upDirection, armCount, region.environment);

				let downArm = this.generateArm(stemHex, region.downDirection, armCount, region.environment);

				tiles = tiles.concat(upArm, downArm);
			}

			previousStemHexHex = stemHex;
		}

		return tiles
	}

	populateRegions() {
		const environments = new Deck(Environments.cards())
		const personalities = new Deck([...Attributes.PERSONALITIES, null])
		const physicalities = new Deck([...Attributes.PHYSICALITIES, null])
		
		this.tiles = [Tile.origin()];
		regions.forEach(region => {
			// allocate environment
			region.environment = environments.drawOne()
			region.color = region.environment.color
			
			// assign attributes	
			region.personality = personalities.drawOne()
			region.physicality = physicalities.drawOne()

			// allocate tiles
			region.tiles = this.allocateTilesToRegion(region)
			this.tiles = [...this.tiles, ...region.tiles]
		})
	}

	selectWinningTiles() {
		this.winningTiles = []

		// OriginTown is always the first tile and cannot be a winning tile
		const candidates = new Deck(this.tiles.slice(1));

		while(this.winningTiles.length < 6) {
			const drawn = candidates.drawOne()	
			this.winningTiles.push(drawn)		
		}

		console.info("only one return win condition encounter is being generated")
		this.winningTiles[0].decks.adventuring.cards.push(
			Encounter.ReturnWinCondition(this.winningTiles[0])
		);
	}
}
