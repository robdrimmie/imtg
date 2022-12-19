import Attributes from '$lib/Attributes'
import Deck from '$lib/Deck'
import Environments from '$lib/Decks/Environments'
import Hex from '$lib/Map/Hex'
import Tile from '$lib/Map/Tile'

const TILE_PATTERN = [1, 3, 5, 5, 3, 1];

// rmd todo awkward init. a map might be better
const baseRegions = []
baseRegions[Hex.LEFT_WARDS.id()] = {
    color: 'pink',
    stemDirection: Hex.LEFT_WARDS,
    upDirection: Hex.LEFT_UPWARDS,
    downDirection: Hex.LEFT_DOWNWARDS,
    opposite: Hex.RIGHT_WARDS
}

baseRegions[Hex.LEFT_UPWARDS.id()] = {
    color: 'blue',
    stemDirection: Hex.LEFT_UPWARDS,
    upDirection: Hex.RIGHT_UPWARDS,
    downDirection: Hex.LEFT_WARDS,
    opposite: Hex.RIGHT_DOWNWARDS
}

baseRegions[Hex.RIGHT_UPWARDS.id()] = {
    color: 'yellow',
    stemDirection: Hex.RIGHT_UPWARDS,
    upDirection: Hex.RIGHT_WARDS,
    downDirection: Hex.LEFT_UPWARDS,
    opposite: Hex.LEFT_DOWNWARDS
}

baseRegions[Hex.RIGHT_WARDS.id()] = {
    color: 'red',
    stemDirection: Hex.RIGHT_WARDS,
    upDirection: Hex.RIGHT_DOWNWARDS,
    downDirection: Hex.RIGHT_UPWARDS,
    opposite: Hex.LEFT_WARDS
}

baseRegions[Hex.RIGHT_DOWNWARDS.id()] = {
    color: 'green',
    stemDirection: Hex.RIGHT_DOWNWARDS,
    upDirection: Hex.LEFT_DOWNWARDS,
    downDirection: Hex.RIGHT_WARDS,
    opposite: Hex.LEFT_UPWARDS
}

baseRegions[Hex.LEFT_DOWNWARDS.id()] = {
    color: 'orange',
    stemDirection: Hex.LEFT_DOWNWARDS,
    upDirection: Hex.LEFT_WARDS,
    downDirection: Hex.RIGHT_DOWNWARDS,
    opposite: Hex.RIGHT_UPWARDS
}

export default class Regions {
    constructor() {
        const environments = new Deck(Environments.cards())
		const personalities = new Deck([...Attributes.PERSONALITIES, null])
		const physicalities = new Deck([...Attributes.PHYSICALITIES, null])
		
		this.tiles = [Tile.origin()];

        this.regions = Object.assign(baseRegions)

        const regionIds = [
            Hex.LEFT_WARDS.id(),
            Hex.LEFT_DOWNWARDS.id(),
            Hex.LEFT_UPWARDS.id(),
            Hex.RIGHT_WARDS.id(),
            Hex.RIGHT_DOWNWARDS.id(),
            Hex.RIGHT_UPWARDS.id(),
        ]
        
        regionIds.forEach(regionId => {
			// allocate environment
			this.regions[regionId].environment = environments.drawOne()
			this.regions[regionId].color = this.regions[regionId].environment.color
			
			// assign attributes	
			this.regions[regionId].personality = personalities.drawOne()
			this.regions[regionId].physicality = physicalities.drawOne()

			// allocate tiles
			this.regions[regionId].tiles = this.allocateTilesToRegion(this.regions[regionId])
// console.log("new tiles", this.regions[regionId].tiles)

            // add tiles to list of all tiles
			this.tiles = [...this.tiles, ...this.regions[regionId].tiles]
            
		})

        // after all regions have their personality and physicality set, the modifiers can be determined
        regionIds.forEach(regionId => {
            this.setupAttributeModifiersForRegion(this.regions[regionId])
        })
    }

	
	allocateTilesToRegion(region) {
		let tiles = []
		let previousStemHexHex = Hex.ORIGIN;

		for (const numberOfHexes of TILE_PATTERN) {
			const stemHex = Hex.add(previousStemHexHex, region.stemDirection);

			tiles.push(new Tile(region, stemHex));

			const armCount = (numberOfHexes - 1) / 2;

			if (armCount > 0) {
				let upArm = this.generateArm(stemHex, region.upDirection, armCount, region);

				let downArm = this.generateArm(stemHex, region.downDirection, armCount, region);
// console.log("upArm", upArm)
				tiles = tiles.concat(upArm, downArm);
			}

			previousStemHexHex = stemHex;
		}

		return tiles
	}

	generateArm(stemHex, direction, armCount, region) {
		// console.log("generateArm", stemHex, direction, armCount, region, region)
		const armLocations = [];
		let armHex = stemHex;

		for (let armIndex = 0; armIndex < armCount; armIndex++) {
			const newTileHex = Hex.add(armHex, direction);

			armLocations.push(new Tile(region, newTileHex));

			armHex = newTileHex;
		}

		return armLocations;
	}

    getTiles() {
        // console.log("getTiles", this.tiles)
        return this.tiles
    }

    modifyAttribute(attribute, value) {
        return value * this.modifiers(attribute)
    }

    setupAttributeModifiersForRegion(region) {
        region.modifiers = {}

        const opposite = baseRegions[region.opposite.id()]

        // this tile doubles
        region.modifiers[region.personality] = 2
        region.modifiers[region.physicality] = 2

        // neighbour tiles increase
        region.modifiers[this.regions[region.upDirection.id()].personality] = 1.5
        region.modifiers[this.regions[region.downDirection.id()].personality] = 1.5

        region.modifiers[this.regions[region.upDirection.id()].physicality] = 1.5
        region.modifiers[this.regions[region.downDirection.id()].physicality] = 1.5
        
        // opposite tile's neighbours decrease
        region.modifiers[this.regions[opposite.downDirection.id()].personality] = .75
        region.modifiers[this.regions[opposite.upDirection.id()].personality] = .75

        region.modifiers[this.regions[opposite.downDirection.id()].physicality] = .75
        region.modifiers[this.regions[opposite.upDirection.id()].physicality] = .75
        
        // opposite tile halves
        region.modifiers[opposite.personality] = .5
        region.modifiers[opposite.physicality] = .5
        
        return region
    }
}