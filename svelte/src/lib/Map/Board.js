import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Encounter from '$lib/Encounters/Encounter'
import Environments from '$lib/Decks/Environments'
import Hex from '$lib/Map/Hex'
import Tile from '$lib/Map/Tile'
import Regions from '$lib/Map/Regions'

export default class Board {

	constructor() {
		this.regions = new Regions()

		this.tiles = this.regions.getTiles()

		this.selectWinningTiles()
	}

	allWinConditionsReturned() {
		return this.winningTiles.every(tile => {
			return tile.isStoringItem()
		})
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

	// populateRegions() {
	// 	const environments = new Deck(Environments.cards())
	// 	const personalities = new Deck([...Attributes.PERSONALITIES, null])
	// 	const physicalities = new Deck([...Attributes.PHYSICALITIES, null])
		
	// 	this.tiles = [Tile.origin()];
	// 	Regions.regions.forEach(region => {
	// 		// allocate environment
	// 		region.environment = environments.drawOne()
	// 		region.color = region.environment.color
			
	// 		// assign attributes	
	// 		region.personality = personalities.drawOne()
	// 		region.physicality = physicalities.drawOne()

	// 		// allocate tiles
	// 		region.tiles = this.allocateTilesToRegion(region)
	// 		this.tiles = [...this.tiles, ...region.tiles]
	// 	})
	// }

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
