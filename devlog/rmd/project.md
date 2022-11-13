# 000 - current target
✅🟠🚩 = status
* = current task

## big tasks (not prioritized, but a little bit preference-ized)
- 🟠 improve item generation
  - flitting from vendors to characters should work
  - ✅ vendors should craft their shit
  - ✅ icon changes color or something based on attribute modified, as well as increase or decrease? 
  - images need to exist for all item types
    - 🟠 missing Win Condition and Food
- 🟠 improve inventory management interface
  - all panes should have a purpose and content
    - 🟠 Currency has no purpose. Party has content
    - ✅ Navigation pane should be more interesting
- when win condition is flitted from chest to mannequin, something breaks
  - is there a better way to store the win condition? There must be. it is weird to take up the boot slot
  - backpack too  
- then try 6 party members?
- rebalance combat rewards when entire party is in place
- pretty sure traps are misbehaving now, result of item modifiers?
- then try with 6 win condition items and 6 destination tiles?
  - no longer convinced this is a priority for launch

### scope creep - this are future current targets
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
- once the party discovers the rightful place for a win condition, they should _really_ want to go there if they have it equipped. Like, beeline win the game woot! so like, some tile knowledge stuff here.
- devopsy things
  - these days it's a pretty simple scp pattern which I should be able to script up pretty easily if and when I want to get around to it
  - or like, release when I push up a tag that's kind of the ideal. boom I'm versioning, blah blah.
  - something that publishes an rss feed or updates a changelog or something with the contents of the devlog?
- testish things
  - jest tests are in place, some classes have specs. The many many dice roles in the game make mocking really difficult and I'll have to check out some test strategies that do well with this sort of randomness. chaos monkey is a test strategy that embraces randomness so perhaps there
- extract various class constants into References 
- another type of container, potion bags
- persistence - I shouldn't entirely lose state on reload
- character death

### far future - there's a better spot for this but I don't have one
- it would be nifty if adventurers had like, personal quests. [[20210704 1011]]
- characters form, join and leave parties according to how strongly they want to travel in certain directions and perhaps other factors
- notes on characters, parties and tiles (player notes "this is what I want to do there" "this char needs poison resist" etc)
- review berlin interpretation - do I want to do any of that?
- go deeper on crafting
  - Items are composed of some number of Resource of Modify Attribute.
  - like, 10 Resource of Modify [Attribute] can be combined into 1 Torso of Modify [Attribute] by 1 (increase or decrease)
  - and then 1 Torso of Modify [Attribute] by 1 (increase or decrease) decomposes into, say, 9 Resources of Modify [Attribute]. Some cost to crafting/destroying should exist.
  - see [[20220724 1106]] in bucket for slightly more thoughts but not really all that many

## What 1.0 Might Require
- 6 regions with 16 tiles
- one party with 6 characters
- a functional if basic inventory management interface
- 6 win condition items with target tiles for each

### Probably should not require
- item stacking
- crafting
- win conditions being discovered "in the wild"

### known issues that are okay to launch with
- no persistance
- moving backpack and win condition breaks a lot of things

## epics sort of I guess?
### RPG Setting Mode
- display - a full index of all regions, creatures, etc. stats, blah blah blah. the sort of thing that can be saved as a pdf
- customization form that lets all the tier 1 mob for region a be named. a mad libs thing to skin the world
 - this might be worth creating to help me flesh out my own content anyway, although a json file is kind of easy enough. I guess the who thing could be a json config file basically, people can put one in or see the one generated for whatever seed


### make contributing easier
#### structure
- make more use of svelte's EventDispatcher, especially for flit and things that bubble up to SpreadLayout
#### tests
architecture for testing: if every method that needs a dice roll was provided that dice roll, testing would be a lot easier. I'm not sure how well that actually works but it sort of might. something that defaults to random maybe like 

```
function foo (roll1 = Dice.d100(), roll2 = Dice.d2(), etc etc)
```

that is interesting.


## notes and such (reverse chrono)
As work in the secions above gets completed, I archive it down here. This is not a _good_ system, but it is _a_ system. Eventually this should all be migrated into issues or the project tooling or whatever. 