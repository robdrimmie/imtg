# Entities

"Concepts" might be a better name? Anyway, big pieces. 

- Board
- Character
- Environment
- Party
- Region
- Tile
- TileRelationship (what Character thinks of each Tile)

## Board
- a large hexagon, flat side up. 
- divided into equally sized hexagon tiles
- currently, each side of the board is comprised of 7 tiles
- currently, there are 13 tiles from the leftmost tile to the rightmost tile
- split into 6 equally sized Regions
- has null spots in some of the region boundaries to more clearly demark regions

## Character


## Environment
- "skin" for a region
- eventually will add flavour text, modify things

## Party


## Region
- OriginTown is the centermost tile and is a special region
- 

## Tile
- pointy side up hexagon
- 6 directions, starting from left going clockwise: 
    - left
    - leftwards
    - leftupwards
    - rightupwards
    - right
    - right downwards
    - leftdownwards

## TileRelationship
- what a specific Character thinks of a specific tile 
- 
