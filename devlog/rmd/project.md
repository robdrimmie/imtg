# 000 - current target
✅🟠🚩 = status
* = current task

*NOTE:* This list is not a commitment to you, it is a reference for me. There is no guarantee that any of these items will be implemented.

## big tasks (not prioritized, but a little bit preference-ized)
- ✅ 20230119, 1951 entry. it was not the first timestamp for that date so that full string won't get a hit
  - ✅ implement the progress character workflow described there.
    - ✅ this.progressActionScores()
    - ✅ this.progressTileScores()
- make capacity a resource - calculate it when all the attributes are updated probably
- ✅ audit character progress workflow
 - ✅ reorder and revisit flow
 - ✅ get progressTileScores using the new Modifier percentToScore methods
- ✅ party gets stuck going back and forth between -101 and -202
     - ✅ in TileRelationship calculate?????Score methods need to be updated
      - ✅ calculateAttributeScore
      - ✅ calculateCapacityScore
      - ✅ calculateDistanceScore
      - ✅ calculateEnergyScore
      - ✅ calculateHealthScore
      - ✅ calculateSatietyScore - leaving as is for reasons documented in comments
- ✅ should I use context in the calculateWhateverScore methods?
      - ✅ calculateAttributeScore - doesn't need it
      - ✅ calculateCapacityScore - uses it
      - ✅ calculateDistanceScore - doesn't need it
      - ✅ calculateEnergyScore - uses it
      - ✅ calculateHealthScore - uses it
      - ✅ calculateSatietyScore - uses it - leaving as is for reasons documented in comments
- ✅ finally figure out the math to convert percentages to scores consistently
  - ✅ figure out the actual math
  - ✅ make methods that make use of the math
  - ✅ make a method that scores with diminishing returns (line goes up then up slowly then down then down quickly)
  - ✅ use this stuff a bunch when scoring to feel confident it works
- * party should be able to adventure (or vend or rest) on a tile with no cards without crashing everything
  - tile deck knowledge gets updated once the deck is definitely updated so it's sort of a lost turn but knowledge is gained and then the character never picks that tile for that purpose again.
- region attributes should impact loot generation
- interface
  - images need to exist for all item types
    - 🟠 missing Win Condition and Food
  - the thing that matters is character inventories and the impact of equipped items. So that should be emphasized
    - Also I think I want eventually to have something that plots these setPoint arrays and the character's current value on them or something, it seems like that is interesting information to have perhaps? I don't know for sure. 
    - But any game that these systems contain has to be around the tradeoffs of the different pieces of gear so swapping around all of it is the most important part of things. 
    - Maybe I do need to make a bunch of data tables visible at some point. Selecting a tile and seeing the Character's relationship with it and how that changes given different pieces of gear. 
    - Something that is a big list of all the possible values and attributes but then only shows the ones where a piece of gear has an impact maybe. 
- flitting
  - flitting from vendors to characters should work
  - when win condition is flitted from chest to mannequin, something breaks
- convert win condition to equippable item
  - make it impossible to sell to vendor
  - add hint to log about needing to restore the item
  - update character to desire going to the region the win condition tile is in
- character jobs should probably be removed entirely but I'm keeping that particular darling on life support
- 🟠 Combat needs to be replaced with a generic encounter type that tests the strongest attributes or something based on 
  - handle party loss
  - ✅ tile relationships updated with loss and victory changes

### scope creep - this are future current targets
- revisit `calculateXScore` functions in TileRelationships - can they be extracted and made functional?
  - eg if health is passed to calculateHealthScore it has no need to get anything from the class it is in so it can be extracted, placed under test and then just used by this class. but I don't know where to put them all for that purpose yet. 
- figure out how to derive resources from attributes and how to differentiate resources, revisit how to deplete and renew them, etc. see entry 20221231 timestamp 0912 for some vague thoughts
- maybe switch to HEXACO https://en.wikipedia.org/wiki/HEXACO_model_of_personality_structure
  - add a 6th physicality, maybe speed
- add more encounters
- figure out consequences of character death
- style-focused commit. get rid of semi-colons, indent 2 spaces, etc. 
- something that consumes rations when resting and replenishes satiety and health and energy
  - more rest cards for this
- currency 
- 🟠 interact with vendors
  - ✅ sell items to vendors
  - buy items from vendors
- it probably makes sense to cache the scores then mark tilerelationships as dirty when knowledge updates and only recalc when dirty. or just recalc scores every time the relationship is updated, that probably makes good sense.
- dungeons
- make item effects an array so an item can like, be a sword that does damage and increases intelligence or whatever
- add mannequin behaviour
  - paperdoll becomes read only, is actually what character has equipped
  - ✅ add mannequin pane - existing paperdoll behaviour
  - when party is in town, characters equip any item equipped in the mannequin
  - maybe mannequin "ghosts" paperdoll, showing what the character has equipped in a shadow and definitely shows modifiers of what things would be like post-replace, so including equipped/ghost - just transparent and unflittable I guess really. 


### near future - I need to do this stuff but am putting it off because it's less fun
- tile knowledge refactor. I wanted to store all tile knowledge in the tile itself then it just
  gives that to anyone who asks but the discreet levels like that doesn't work nicely with empty
  deck knowledge, etc. There perhaps should be a defined TileKnowledge data object-like thing that 
  lives in the TileRelationship instance and is part of all that.
- ensure that all uses of Modifiers.INCREASE and DECREASE are replaced with score calculations
- once the party discovers the rightful place for a win condition, they should _really_ want to go there if they have it equipped. Like, beeline win the game woot! so like, some tile knowledge stuff here.
- devopsy things
  - these days it's a pretty simple scp pattern which I should be able to script up pretty easily if and when I want to get around to it
  - or like, release when I push up a tag that's kind of the ideal. boom I'm versioning, blah blah.
  - something that publishes an rss feed or updates a changelog or something with the contents of the devlog?
  - `current` and `stable` releases. in ci/cd sense, current is updated with every push, stable requires a tag.
- testish things
  - jest tests are in place, some classes have specs. The many many dice roles in the game make mocking really difficult and I'll have to check out some test strategies that do well with this sort of randomness. chaos monkey is a test strategy that embraces randomness so perhaps there
- extract various class constants into References 
- another type of container, potion bags
- persistence - I shouldn't entirely lose state on reload
- character death
- clear out dead darlings and unused things

### far future - there's a better spot for this but I don't have one
- settings - expose interface to change setpoints and other magic values
  - eg TileRelationship calculate* methods have "curves" variables. These should be editable eventually for easier 
- it would be nifty if adventurers had like, personal quests. [[20210704 1011]]
- characters form, join and leave parties according to how strongly they want to travel in certain directions and perhaps other factors
- notes on characters, parties and tiles (player notes "this is what I want to do there" "this char needs poison resist" etc)
- review berlin interpretation - do I want to do any of that?
- item stacking
- go deeper on crafting
  - Items are composed of some number of Resource of Modify Attribute.
  - like, 10 Resource of Modify [Attribute] can be combined into 1 Torso of Modify [Attribute] by 1 (increase or decrease)
  - and then 1 Torso of Modify [Attribute] by 1 (increase or decrease) decomposes into, say, 9 Resources of Modify [Attribute]. Some cost to crafting/destroying should exist.
  - see [[20220724 1106]] in bucket for slightly more thoughts but not really all that many
- maybe capacity should impact how much energy travelling costs? would impact rest
- rewrite the engine in Rust? Good way to get into it and systems programming. Ideally the engine will be small and portable and stateless and then like, persistance and interface etc are bolted on as appropriate for wherever.
  - step 1 here is figuring out how to write something in rust and have it compiled into a node module. seems very doable.
  - then small new areas could be written there, or anything that would be part of a significant refactor anyway could be migrated
- something to render an array of SetPoints as a graph and then pieces to futz with it
  - could be a decent rust wasm project? 

## epics sort of I guess?
### RPG Setting Mode
- display - a full index of all regions, creatures, etc. stats, blah blah blah. the sort of thing that can be saved as a pdf
- customization form that lets all the tier 1 mob for region a be named. a mad libs thing to skin the world
 - this might be worth creating to help me flesh out my own content anyway, although a json file is kind of easy enough. I guess the who thing could be a json config file basically, people can put one in or see the one generated for whatever seed

### make contributing easier
#### functional
- start with classes like Modifiers and probably Dice (except for the singleton aspect but maybe that isn't necessary? I guess if I persist the seed anyway, you figure it out that's why I'm writing it down) but others too
- ditch the class and just export functions. learn more about module stuff to do that
#### structure
- make more use of svelte's EventDispatcher, especially for flit and things that bubble up to SpreadLayout
#### tests
architecture for testing: if every method that needs a dice roll was provided that dice roll, testing would be a lot easier. I'm not sure how well that actually works but it sort of might. something that defaults to random maybe like 

```
function foo (roll1 = Dice.d100(), roll2 = Dice.d2(), etc etc)
```

that is interesting.


## notes and such (reverse chrono)
As work in the sections above gets completed, I archive it down here. This is not a _good_ system, but it is _a_ system. Eventually this should all be migrated into issues or the project tooling or whatever. 

### 20230119 - figuring out a core mechanic led to brand new destabilization
- ✅ party gets stuck on tile down-leftwards
- ✅ associate regions with attributes
  - 20221210 entries hold detail
  - ✅ deal attributes to regions
  - ✅ impact mob generation 
- ✅ associate region attributes with tile relationships
  - 20221210 entries touch on it but no specific implementation is described
- ✅ pretty sure traps are misbehaving now, result of item modifiers?
  - removing the Traps class really made that better
- ✅ probably need to remove everything about the vendor action
  - this was wrong. the vendor action gets characters into OriginTown and eventually other vend locations
- ✅ give player something to do (perhaps something that is fun?)
 - ✅ single character starts with no gear
 - ✅ early fights acquire gear but can only ~equip or hold in hands~ put in 1-slot sack
 - ✅ when ~hands~ 1-slot sack full, unload in town
 - ✅ the above should happen pretty quickly
 - ✅ working towards a good loop of adventure a few rounds, manage items, adventure a few rounds, manage items
 - ✅ probably need a lot more encounter cards in early tiles to make it of interest. 

### 20221125 - new repo and stabilization
0942
- taking out a big chunk of work that is largely done or no longer really necessary due to changes in direction
- got the new repo setup and source of truth

- ✅ improve item generation
  - flitting from vendors to characters should work
  - ✅ vendors should craft their shit
  - ✅ icon changes color or something based on attribute modified, as well as increase or decrease? 
  - images need to exist for all item types
    - 🟠 missing Win Condition and Food
- ✅ rebalance combat rewards when entire party is in place
  - rebalanced for one character
- ✅ [NOT DOING] then try with 6 win condition items and 6 destination tiles?
  - no longer convinced this is a priority for launch
  - I don't know how the win condition stuff will work with multiple party members, but at this time this won't be necessary because I'm starting with one character
- ✅ improve inventory management interface
  - almost all panes have a purpose and content
    - 🟠 Currency has no purpose or content
    - ✅ Navigation pane should be more interesting
- ✅ then try 6 party members?
  - mechanically works fine but the game is likely to be more fun starting with just one
- ✅ spreadsheet-type view at /sheet to help understand the variables in play
- ✅ cache attribute and other values affected by gear