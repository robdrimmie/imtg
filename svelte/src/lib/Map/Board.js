import Deck from '$lib/Deck';
import Dice from '$lib/Dice';
import Encounter from '$lib/Encounters/Encounter';
import Environments from '$lib/Decks/Environments';
import Hex from '$lib/Map/Hex';
import Tile from '$lib/Map/Tile';

// clockwise from left/pink
const drawingOrder = [
	Hex.LEFT_WARDS,
	Hex.LEFT_UPWARDS,
	Hex.RIGHT_UPWARDS,
	Hex.RIGHT_WARDS,
	Hex.RIGHT_DOWNWARDS,
	Hex.LEFT_DOWNWARDS
];

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

export default class Board {
	static ERROR_NEEDS_PROPS = 'Look, Board really needs props';

	constructor(props) {
		if (!props) throw new Error(Board.ERROR_NEEDS_PROPS);

		const environmentsDeck = new Deck(Environments.cards());
		this.deckOfEnvironments = environmentsDeck.draw(props.regionsToDraw);

		this.tiles = props.tiles ? props.tiles : this.generateTiles(props.regionsToDraw);

		// Roll a dice with the number of tiles. Since dice don't return 0, and
		// Origin is always the 0th tile go roll to length -1
		this.winningTiles = [
			this.tiles[Dice.roll(this.tiles.length - 1)]
		]

		// rmd to do winning tiles array stuff
		// make this better when there are more win items
		this.winningTiles[0].decks.adventuring.cards.push(
			Encounter.ReturnWinCondition(this.winningTiles[0])
		);
	}

	allWinConditionsReturned() {
		return this.winningTiles.every(tile => {
			return tile.isStoringItem()
		})
	}

	// #region tile generation
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

	generateTiles(numberOfRegionsToDraw) {
		// start array with origin, add each of the tiles from all of the environments to it
		// this starts by making the stem which will stretch from origin to the point. at each
		// hex of the stem, it looks at the pattern and builds the number of hexes specified.
		// so it's kind of like feather shape? the arms point away from the stem
		// this pattern allows them to be constructed in a predictable order and so maybe there
		// is something about npc level or challenge level or whatever that increases with
		// each stem hex or something like that.

		let tiles = [Tile.origin()];

		const pattern = [1, 3, 5, 5, 3, 1];
		// const pattern = [1, 3]

		const regionsToDraw = regions.splice(0, numberOfRegionsToDraw);
		for (const [regionIndex, region] of regionsToDraw.entries()) {
			let previousStemHexHex = Hex.ORIGIN;

			for (const numberOfHexes of pattern) {
				const stemHex = Hex.add(previousStemHexHex, region.stemDirection);

				const environment = this.deckOfEnvironments[regionIndex];

				tiles.push(new Tile(environment, stemHex));

				const armCount = (numberOfHexes - 1) / 2;

				if (armCount > 0) {
					let upArm = this.generateArm(stemHex, region.upDirection, armCount, environment);

					let downArm = this.generateArm(stemHex, region.downDirection, armCount, environment);

					tiles = tiles.concat(upArm, downArm);
				}

				previousStemHexHex = stemHex;
			}
		}

		return tiles;
	}
	// #endregion tile generation

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
}
