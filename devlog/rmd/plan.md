# Development Log - Rob Drimmie

## Log
20221113 1033 I am being prideful. I am setting this up as though someday this will be of interest to some community that exists. No such community exists, which is far more glum than the first hopeful entry into a development log should be.

1035 This is a style of logging that I follow when working on a personal project, and this is quite probably the most elaborate personal project I've worked on to date. 

So this is a game I'm working on where the player manages the equipment of several characters who are exploring a realm and doing basic adventurer-type tasks like killing things and taking all the stuff from the things. I have a variety of thoughts about that which are relevant to this game but that will be for some other time. 

1037 Right now my goal is to make a stable fresh start. I have some extremely unlikely aspirations that amount to a community building up around this game which allows me to make more games while supporting myself and my family. I don't expect any of that to happen, maybe someone will buy me a beer some day, but that's the conceit under which I write this log and the audience to whom I write it.

1039 The project started quite some time ago and has gone through several different rough forms to get to where it is today, which is a moderately stable (by no means bug free, just consistent in its behaviours intentional and otherwise) system. 

1040 This repository is a fresh start for it. I'm going to be migrating the logic over, hopefully in large chunks, but also taking opportunities here and there to tidy up and refactor and lose the cruft of a poorly planned iteratively designed project. 

1041 So the first part of that effort will be to get the basic project file structure in place. This is a javascript project that has a core plain javascript engine and an interface built using (svelte.js)[https://svelte.js]. 

1044 So the first question I am faced with is do I want a svelte app or a sveltekit app? I am pretty sure I made this as a sveltekit app when I started in on it but I don't know enough about what the difference is. At this point, this is a purely javascript, in-browser, not even storing things in localstorage sort of application.

1047 a very small amount of reading suggests that I may as well just go with svelte. If this is entirely the wrong direction, so be it. 

1052 it uses a tool called Vite, which I don't know. I might end up stripping that out eventually. I have some okay tooling already.

1054 oh except it's basically all sveltekit tooling. Okay, fine. I don't really want typescript though. I just prefer classic flavour is all. So I'll work on stripping that sort of stuff out as I see it.

1104 mostly what I want to be doing is migrating stuff in. I want this repo to be the one gettingn deployed so I don't want to get to indulgent with cleaning things up. It will be as gross as it is now and then get better over time.

1217 I do not like this. I have been afk but so the problem I am having is that there isn't a `$lib` alias for imports to get me to like a base directory without having to do relative filesystem style imports (`../../../../`). There is a jsconfig.json file to which I have added 

```
    "baseUrl": ".",
    "paths": {
        "$lib": ["src/lib"],
        "$lib/*": ["src/lib/*"]
    }
```

which is how it was done in the last project but that is not having any affect. 

1220 barl. I might just throw this away and straight up copy the old directory over. I mean fuck it right? 

1223 ok, boom it works. Cruft and all. Just need to dig through a bit and make sure there's nothing actually embarrasing. 

1235 there's a lot of context lost by losing the commit history of all the files. I'm looking through them for anything that I don't want to make public and some of this stuff was written in 2020 and it is fine solid and working but just seems oooold to me. But this levelsets all of that, in theory. Now they all have claim to existing in the Before Times, not like you future new classes and uh, things.

1245 there is going to be a lot to talk about every time I get into a new section of the app to iterate on it. good excuse to go trawling through the old stuff too. I haven't said it here yet but the devlog in the previousu repo is over 15,000 lines so there's quite a bit of thought (no claims about quality, just quantity) that's gone into much of this. There isn't a lot of vision just hacking through things and seeing what comes but that's part of why I do this project, I can just bang on it and see what comes out. time for dishes soon

1252 there is just so much in here to talk about!

1257 I'll have to start populating the wiki with some stuff too, and issues, and there's good tooling to help out with.

1258 I'm going to rename this file to plan.md and then migrate over the 'current targets' doc as 'project.md'. Because I can.

1307 okay, just pushed up the source for the first time. momentous! but not really. I suppose I could put instructions on how to build and run it locally eventually but anyway, the first step is to get back into the flow of developing, make some history. Git history.

dishes first though.

20221115 1001 So basically right now the goal is to get something fun happening. I think there is stuff of interest happening but almost none of that is exposed yet. If I think about playing the game from the start, the absolute thrashing that happens to every party on turn 3 or 4 or thereabouts is .. probably detrimental?

Oh and probably parties should be able to flee from combat, or at least try. Eventually.

1007 But so like that suggests that what I perhaps should do is up the number of characters. Try with three, perhaps? That should find all the many, many flaws in how this is all being done. 

1010 I am very confused right now. I am making changes and they are not being reflected.

1019 okay, I think that was the wrong terminal window or something. anyway, killed them all and now I am back and my changes are being reflected.

and three characters are visible in the party pane so that's good.

1020 trap projectiles all seem to reduce health by -0 which is not enough.

1020 okay the party won the first fight with 9/9/5 health and they got like three or four items including a torso. that's like, way too much and not nearly enough damage done to them.

So more enemy or less starting health? 10 hitpoints does seem like a lot. 

1023 it's locked to 10 for all three. Could make them functions of endurance? 

health: endurance and brawn and conscentiousness?
energy: also a physical resource. hmm. conscientousness and endurance and neuroticism? high neuroticism is a form of high energy?

satiety doesn't really come from anything, it is just an economy thing basically. a sink for currency if players need to buy lots of food or whatever. 

1026 going to start with making them 10% of brawn and endurance for now. 

20221116 1135 this version of the interface is so much better than previous attempts but it is still deeply flawed. I'm hopeful that sorting out what interactions I want will help me get closer. It's very clunky, flipping and toggling between views but it is in the right general neighbourhood in terms of updating the character's gear. 

I didn't do much yesterday, I'm off work yesterday and today with a cold and likely will not do much today. but when I flip over to the tab to think about it, that's something that comes to mind fast. 

Being pragmatic, the work to do is really about getting different characters working and so the next task should be to update selected character.

So I want to put a method onto SpreadLayout probably and learn how to do dispatched stuff again, that's a lot better than passing things down through layers of components. Javascript events bubble up and this feels much more like that. 

1141 I'm not entirely certain that event dispatching works how I think/hope it does but I guess I shall find out. 

1204 okay so it still necessary to mark the event so it can be bubbled up, but bubbling it up to SpreadLayout works. Character Detail changes, paperdoll does not.

Probably just need to find `$characters[0]` to do clean up
1204 5 results including that on, not bad. Mannequin and Paperdoll both do it. 

1308 looks okay with initial behaviours. oh I haven't tried moving a lot of items between characters.

20221119 0813 I still have not tried that. I guess try that. 
0814 works fine. 

caught up still on the not-there-yet-ness of the interface. but it is enough for now. 

0815 so think first play experience some more, that's the path to un-clunk the interface. The first combat scenario is not engaging. Is it the way the log is presented? No not really.

there's also no point to the party doing anything right now. there's no goal in the game, how does the player know what the party is trying to do to make sure things are in line and see their impact? that is info that should go in the party pane but I don't know how to represent that. 

I guess when the party makes decisions about their goals they can be shown there. it may or may not be of interest? is there a way to make visible the notion of equipping a pair of resist poison boots makes tiles with poison more attractive? probably! 

0818 but for now I want to think about that first combat. 

In the ideal case a party of characters with basic starting equipment - a weapon and a piece of armour - should _just_ win the fight. So close that in some number of scenarios they should lose. a very small number, like 5%? something like that. That level of detail of balancing will need to come sometime later when there's a lot more implemented systems so for now I just want to make it hard.

The early stages of the game probably should include some amount of fiddliness, shouldn't it? I'm not super sure. 

I want relatively quickly for the player to be able to buy something from a vendor and equip it. or even just find stuff. but it means they have to come back to town relatively quickly so the inventory can be managed. 

I like that the contents of the bags are opaque until they get unloaded. That is kind of neat. 

So the party should win the first fight and want to go back to town fast. The party should also empty their bags every time they get into town (and eventually equip what is in the mannequins but there's still no distinction there mechanically, so that can wait a bit probably but I'm kind of talking myself into doing it this shouldn't be a parenthetical anymore)

0823 I do want to do that but not quite yet. Soon probably but first get them doing the fight and going back to town. 

So let's walk through the process and decision making flow of the first few turns.

move to tile -101
move to tile 0-11
move to tile 000
move to tile -101
rest - recover satiety
rest - recover energy
adventure - trap! everything is dodged
adventure - combat! 60 actions for 3 characters and 3 mobs. 
 - health: 0 1 0 so two chars die

Okay so that's a solid point to start from. There's that weird loop at the top. Ideally party will go to a tile and adventure there. So why don't they?

0829 okay so oddity right away, `scoredActionsAndTiles` is an important object in this process which I suppose is worth writing out in like the wiki or something? I'm feeling reluctant to bind myself to github but for this to be a community project some amount of adoption of a toolset is necessary.

pills time

0855 so where was I? oh yes, the scores make sense - >1 adv, <1 rest, <1 vend. the tiles though, there's a duplicate

```
Party progress - scoredActionsAndTiles 
Object { adventure: {…}, rest: {…}, vend: {…} }
​
adventure: Object { score: 1.3310000000000004, tiles: (2) […] }
​​
score: 1.3310000000000004
​​
tiles: Array [ {…}, {…} ]
​​​
0: Object { environment: {…}, color: "green", id: "-101", … }
​​​
1: Object { environment: {…}, color: "green", id: "-101", … }
​​​
length: 2
​​​
<prototype>: Array []
​​
<prototype>: Object { … }
​
rest: Object { score: 0.7290000000000001, tiles: (6) […] }
​
vend: Object { score: 0.4000000000000001, tiles: (3) […] }
​
<prototype>: Object { … }
Party.js:47:11
```

so the tile gets duplicated. so that's something to look into. also maybe now that the tests seem stable (there's was a cyclical reference bug in them for a long time) I can wrap some around these bits of logic. 

0859 as I setup the party spec I realize that the notion of passing rolls won't work as I hoped probably. Well, not as broadly. Because creating a party triggers a lot of roles that can't be primed.

BUT I am realizing that the test for creation doesn't really need to care about rolls, either just in general or because I can pass in specific props so that's all fine. 

and like, creation gets validated in other ways as well, this is largely a redundant test - at least once there are other tests it will be.

0910 keeping on, then.

`member.scoreActionsAndTiles()` appears to be behaving as expected. It brings back an array of Maps and each character gives a score for each action, and their preferred tile for that action. So the duplicate likely happens when they're being smooshed together?

0905 so is it supposed to be duplicated? Does that like.. weigh it more heavily? But then shouldn't there be three instances of it since that's what each character chose for adventure? I think?

`tally.adventure.tiles.push(memberAdventure.tile);`

0905 yep, each adventure tile is -101 so why is there exactly 2? it should either be 1 because it is deduped, or 3 because it gets pushed for each.

0912 so it is the latter. It _should_ be three. Each character voted for that tile, it is a collection of votes, not the selection. 

0913 so, things are fine so far, logic wise. I don't know what's up with the count becoming 2 but for now I'm okay with it I guess.

0915 so the party chooses to adventure, the tile they each vote to adventure to is -101, so they move there. 

0916 this is a pretty nasty chain of dependent functions all returning the same kind of object. some day I'll have an idea for how to clean this up.

0918 and then they figure out the next tile to move into to go. 

so that all works pretty much as expected. Now that they are in -101 though, why do they choose to move rather than explore? 

they all vote for 0-11, so what's up with that process then?

that's in Character.scoreActionsAndTiles and now we're getting into tile relationship shit. 

desire to adventure is 1.3, others are .72 so that decision seems right. now how do they select the tile to go to, because this untapped tile should be more compelling than moving so why isn't it? 

0922 `bestTilesForActions`

0926 all tiles are getting the same scores for adventuring and resting. distance not impacting? 

```
Biajqhrf Qqlopyb Bp Zupcijnr considering -101 Character.js:665:9
Region attributes/elements resistance is not gatekeeping/restricting character movement 2 Item.js:441:11
distanceDampener 1 1.1333333333333333 Character.js:673:9
tileScoreForAdventuring, tileScoreForResting, tileScoreForVending 1.4166666666666665 1.4166666666666665 1.1333333333333333 Character.js:684:9
Biajqhrf Qqlopyb Bp Zupcijnr considering 0-11 Character.js:665:9
Region attributes/elements resistance is not gatekeeping/restricting character movement 2 Item.js:441:11
distanceDampener 0.9 1.1325 Character.js:673:9
tileScoreForAdventuring, tileScoreForResting, tileScoreForVending 1.76953125 1.76953125 0
```

so the dampener and tileRelationshipScore are right, but then the score for adventuring goes _higher_ for 0-11 and it should be lower. So what's up there!

0932 decksize knowledge of -101 is null, but of 0-11 is is SIZE_SMALL so that extra knowledge boosts it.

Then I bet if I advance a turn, decksize knowledge for 0-11 becomes null? it gets written badly when they move into the tile perhaps?

0934 no it looks like everything goes SIZE_SMALL 

0935 and everyone's energy is low at this point so rest wins and they go back to origin town.

that's really good actually I think, a couple of moves and then a rest makes a ton of sense.

oh but no that's not what happens either, sheesh. they go through 000 to -101 and rest there. so... not a ton of sense. 

this is some pretty convoluted decision-making alright. hrm hrm. 

so. so so so so so. I'd like to have these decision-making numbers visible for myself now for development purposes and then maybe with that I can figure out how to expose this info to players as well. so I need to make like a spreadsheet layout with a bunch of this data then. alrighty then, new layout time again. 

0938 I'm probably stopping around 10 for a while at least but I need to expose this. maybe a different route? 

how does that work again - just make a file in that folder. handy sveltekit!

1145 showing lots, still working on showing more. I'm not sure yet I'm showing anything especially helpful?

1153 so why does rest have 6 tiles

1204 alright, working on getting resources onto the screen. I am going to have to componentize this soon, there's definitely a big clutter of information going on. 

1249 at game start everyone's ranking -101 pretty high for vend but there are no vendors there? 

it's scoring all the origin neighbors 1.25 for rest as well. I guess that's sort of okay-ish? There are rest cards on all of them. 

1250 so what's the party voting about

1251 maybe it is time to draw the flow. does github markdown support mermaid?

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

1252 it does!

though, this document looks real bad on github lol, this is not a good way to keep up with goings on, really. this is not blog, friend. I guess I knew that, there's a note somewhere - probably old repo - about a commit action that pulls content out and into a blog for github pages or something similar but that's not really going to happen either. Probably I will never do anything about that.

1254 so I'm trying to visualize how the party makes decisions, which eventually will require some things. uhhh I don't know. 

So, hmm, maybe something can be written down. a docs folder for now. 

1256 I made a thing but I don't want to noodle around in it just yet? I called it `game flow.md` that's not very good. 

trying to think of how to break it down into documents.

```
game starts
  v
dice is seeded
  v
the board is made
  v
starting characters are made
  v
win item is allocated
  v
starting chest is made
  v
vendors are made
  v
a party is made with the starting characters
  v
the moves store is created
  v
started store is set to true
  v
won store is set to false
```

So that's game initialization right? 

1351 made the doc. 

1421 made a few docs

1422 honing in on party decision making process. I could diagram score actins and tiles but it seems to be working correctly, doesn't it? 

1424 uhhhh probably not I guess?

I'm confusing myself a little bit I think, because the scores visible in the sheet are anticipating the next move not the one they just took.

1532 okay, small flurry of activity 

1536 can I learn anything about the calculations and state of the game through this yet?

1550 so, everything is started and we are about to decide what to do. every character wants to go to -101

1552 and so, next turn. moves.length = 3. everyone wants to adventure still, but 0-11 is the preferred tile to do that.

1553 adventure value of 000 should not be 3.125

okay I just refreshed and like it never is again. so... what?

oh shit not all the numbers are reactive. ah god damn how do I see which ones are and aren't

well, adv value for all the tile relatinoships, we can start there. member getting passed down maybe doesn't update?

1556 okay, found a couple of spots. I keep doing like, const foo = blah instead of $: foo = blah. I'll get there eventually maybe.

1557 almost time to do some dishes.

1559 small vision of: select a character, tiles that character knows about get some indication about their adv/rest/vend scores. their raw scores as a start maybe. 

then click on the party, and see what the party's next action and tile will be

make a change in gear and see how that changes the character's goals and understanding of the world, and the party's. that's probably an interesting thing to explore soon. 

1601 dishes and poke a child about laundry.

20221120 0939 alright. so still working to sort out why the party chooses to move to 0-11 instead of staying on -101 and drawing a card, which is the action I want them to be taking.

0941 best tile for adventuring comes up as 0-11

0-11
adv val: 1.5625
    cap: 1.5625
    nrg: 0.9166666666666667
    ger: 1.25
    hth: 1.5625
    sat: 1

-101

adv val: 1.25
    cap: 1.25
    nrg: 0.9166666666666667
    ger: 1.25
    hth: 1.25
    sat: 1

So capacity score differs why is that? 
Energy score doesn't differ, why is that? 
gear is the same, that makes sense
health score differs why is that
sat is the same.. that probably makes sense? Or should distance impact satiety as well? Distance to known food perhaps should? For now the same is fine though, the other factors are having more impact at this point

so I guess some flowcharts might help here a bit? 

0946 And adventure value for 000 is 3.125, that's super wrong. It gets dropped to 0 at some point but perhaps that happens later in the process. 

0947 oh hello Past Rob:

```
		const percentAvailable = 0.7; // RMD TODO restore calculations this.backpack().availableCapacity() / this.backpack().capacity
```

0949 when the game stars - backup. I just added `console.log("TR calcCap", this);` to the TileRelationship CalculateCapacity method. It gets output like dozens of times just when the game starts. That whole time, this.backpack is undefined so like, all this super fragile massive function chain for calculations might be just like..... poor. It does stuff, but not the right stuff anymore and is definitely in need of something. 

0951 I have a note somewhere perhaps. like this is an architecture problem fundamentally and I have a note somewhere about calculating all the scores every turn instead of doing it as things are called. 

It would have to be refreshed every time an item changes but that can be done. SO like a method to setup character.. uhh.. state sort of?

What happens with that. So state might be all the current and apparent and whatever stats, all the desire calculation stuff and tile relationships.

Okay this is maybe interesting. Can I get there? 

Right now characters are only impacted by progress in scoring tiles and stuff but what if there is a character.progress method as well? All the characters get progressed (in order of some stats based thing eventually maybe) and then all these values for everything are fixed in place. 

I think I thought about this and maybe chose not to. Like, I thought about caching stuff but also maybe having characters get progressed. I am not going to look into what I was thinking then, I'm guessing it was probably like, effort-based mostly. I want characters to have a lot of independence and this is the way to get them there I think. 

So this is a big refactor probably. Ooof. Okay but it can start relatively small probably? Start with simple stuff.

0956 Maybe I can minimize these wild bulky state objects I pass everywhere. Maybe. 

So I'm going to add a node to the progress game thing that is progress characters, then I'll add it to the code and maybe I'll write tests along the way for a while. Maybe.

1120 shovelled. groceries in like 20ish minutes or so? 25. 

So progressing character. Gear needs to be checked and stats updated, that's one major step, and tile relationship stuff needs to be updated, that's another. 

I think stats will be a little more straight-forward? Perhaps. 

1123 so I'm doing tiles. In part too because I don't remember much details of tile relationships right now. 

1125 So what is a tile relationship? It is the relationship between a character and a tile. 

There is knowledge that a character can have about a tile, and that is generally:
- how many cards of each type remain

```
class DeckKnowledge {
	constructor() {
		this.available = null;
		this.cardsRemaining = null;
		this.deckSize = null;
	}
}```

that's specifically knowledge about each of the decks. 

and then it's the collection of scores:
 - `calculateCapacityScore(character)`
 - `calculateEnergyScore(character)`
 - `calculateGearScore(character)`
 - `calculateHealthScore(character)`
 - `calculateSatietyScore(character)`

All of those combine together to make a tile score

If the tile score > 1, the character wants to go towards it. If the tile score < 1, the character wants to avoid it. 

Perhaps if the score is 2+ the character _must_ go towards it and if the party doesn't they will part ways. And similarly, if 0-, the party will never go there. But that is not necessarily the thing to worry about right now.

So the score for each tile changes every turn and the state of the world and the character's knowledge of it changes, so for each tile we update those values. 

1141 so I was only passing the character id to tile knowledge. Now that I am progressing it, I'll pass in the character and have it store what it needs, then calculate and write out all the values

1145 okay, time to get other stuff done. I'm leaving off while updating how tile relationship details are calculated. Structure is going well, but it is a big refactor. 

The next step is finding the places where the scores are used outside of the progress flow, so specifically what's going on is: calc capacity score fails because one of the times it is called there isn't a backpack. 

So find usages of it, and find if there is a better way to get this information/make sure it is present. I might need to not set all that stuff as null, or get more than just id or something. 

So yeah, keep going on that. Enjoy getting groceries!

1609 so it is occuring sometime after the character is progressed, when I am working on presenting all the stats. So, the read state, which means that this stuff should be available anyway.

And yes it appears to be. All the scores are set to 1 because this relationship is completely brand new I guess? It got constructed somehow but never given a character to work with. So instead of id I probably should construct tilerelationships with full characters and let the constructor do its thing? 

1612 okay, constructing with character did resolve that error and the sheet layout renders again

1617 capacity and health differ and don't differ in the problematic ways described above still. 

1621 time to roll out pizza dough. When I get back, look into capacity calculations more. I definitely saw stuff that needed changing. But also, these values should be coming from the stored results, not being recalculated.

20221121 0926 so work on pulling things from memory not calculating them. Maybe I can just comment out the calculate methods? Probably not because I use them internally. But I can search for some of them perhaps? 

I'm really only using them in the class itself or in the sheet layout stuff probably but anyway I'm definitely using them as part of the decision-making flow so start working out which are and aren't pulling from the right spot. mornings aren't always high clarity

0930 oh I think most external stuff is done via calculateTileRelationshipScore, all that stuff just cares about the outcome. And then the sheet, TileRelationship.svelte stuff. So updating that class and calls to that method will remove most of the repeated calculations stuff. performance isn't anyclose to an issue at this point and this is mostly being done now because it simplifies a lot of things I think but it will be nice not to have to do it later when like, 50 characters (will there ever be that many? who knows!) are being polled constantly. 

anyway, so on with it then.

0935 perhaps done

0935 and there is a slight behaviour change! Previously the party went M-101, M0-11, M000, M-101, A-101

[(M)ove and (A)dventure deck]

Now they go M-101, M0-11, A0-11 which is better! but it still seems like they should want to adventure right away. Something about energy and probably still distance calculations and such such? Also energy and satiety still go really high, no upper threshold apparently. But it is nice to see this improved things a bit because I'm getting more of the character-specific stuff involved. they still don't really seem to differ much in opinion about where to go but that will come in time as more and more of these things stabilize and improve.

0938 It would probably be beneficial to build a combat debugging screen or something. I'm not sure what that would look like but figure out a way to put a lot more detail of the combat into the log and then a big log screen, or something like that. 

one of my earlier designs was like an overview and ways to make certain parts - especially the log - overlap other parts and maybe a 'full-screen' mode for each of the panes might be an interesting way to have specific interactions easier to get to. there'es something ruminating in there. but ultimately I need to have a better understanding of what interactions I want to support. 

0944 there's a whole other half of character progression still, all the current/apparent stats and shit. Assuming I'm done with relationships for now but really I'm not, there's still weird decisions. So stick with this, the current/apparent stats should fix the roof-less energy and satiety situation too when I get there. But decision-making. 

0946 energy scores are the same, and 0-11 still gets a much higher adv score. so calc energy stuff....

```
let distanceScore = 1; // RMD TODO HexUtils.distance(tileToConsider, currentTile)
```

hello

1014 okay. so now at the start everything for all the neighbor tiles are scored identically and all scores are at 1. it feels like it might make sense but I'm a little concerned about the fact that everything changed and now it's all 1 right away. But that's what it should be, everything is brand new. 000 gets a 0 for adventuring score which is exactly correct because there's no cards. So everything makes a lot of sense here.

1015 and then a lot changes when the turn goes. 0-11 still wins for adventure, which is the highest demand still. 

nrg is still scored the same and now it is 1.1 so is distance the same? I can put distance score on the page. 

1019 oohhhhhhh `knowledge level: 3` for 0-11. Oh does it not change at all for -101? 

1020 -110 also increases to 3. 

1021 yes, so when entering the tile, more is learned about the neighbours but not the tile itself. That makes 0-11 (right upwards) and -110 (right downwards) of more adventuring value than the one the chaaracter is on. Then it gets reset when they move out of that tile and eventually knowledge is like fully loaded. 

So there's only like four levels of tile knowledge, just stepping into one shouldn't increase the neighbours beyond a certain threshold. I could see going from like 0 to 1 (tile exists) and then 1 to 2 (like, simple recognizance) but to know a tile you need to go to the tile. right? 

right. 

so character knowledge gets updated when the party moves... 

1108 so now there's like a different kind of bug. not a bad math bug but a bad flow bug. because according to the details on the sheet, the party wants to adventure on -101 but in the game they still move. so now what is up? revisit that flow find out where something is weird? maybe something is using a calculate function somewhere, etc?

1112 party pgroress scored actions and tiles have 1-10 so somewhere upstream from that

1115 I guess I am seeing values after the turn, so .. I'm not sure whether or not these values are predicting the next choice or explaining the previous one. 

1116 distance modifier might be out of whack. I think the sheet explains the previous one right because it's after all the progress has been done and character has been updated. 

it might be interesting to see what the next value (and previous value?) will be as well. hrm hrm. Some day.

or just flip through the state of the game. oohhhhhh snap that would be neat. I really am interested in seeing all this stuff. puzzling it out _might_ be interesting to other people? all depends on how it is presented. some of these numbers should be opaque, hidden in vague terms like the tile knoweldge tiers (though those are really bad names from a utility perspective)

any who! distance might be wrong. it's showing 0.01 for -101 which means the fact that distance is 0 is working against it which should never be the case. I guess in real terms distance is always going to be a scale of 0.01 to 1. either the distance makes a tile worse or there is no impact. there is no distance which is better than here, basically. 

distance from origin might be compelling for a character with high openness for example, or something along those lines might make a distant tile more enticing but that's a nuance that will not be implemented soon.

1122 yeah distance bug makes them always want to go elsewhere, just thrashing back and forth.

1124 so the lower a distance is, the better. 0 tiles away is the best possible distance score, which is 1. 1 tile away is less good, so by half? 

1128 okay so the stats really are confusing. I am seeing the current tile, like -101 say, but for the tile relationships that's all the values that led to the character being in that tile. So I need to think about these stats in relation to the previous tile

1132 nice! Good behavioural change! Party now goes to -101, adventures and rests as much as they are able, then proceeds in a clockwise circle around 000 because they are always able to rest and health and such, they never need to return to town. well they do eventually but like a lot of turns later - moves.length 67ish when all characters are completely full. so capacity calculations need tweaking but there's still a lot of real good change here, yay!

1139 so I think that is kind of perhaps most of it for this branch of progression? writing out and modifying all the stats is probably going to be a longer grind though it is probably not as buggy since it was touched not terribly long ago versus this stuff which was probably like a year old or something, it's been a while since I got into those systems.

1155 just read http://www.ericharshbarger.org/dice/go_first_dice.html that is pretty nifty. 

1209 so what is progressStats.

1210 so get Attribute does modifer calculations. What I want to have happen is for it just to return the existing thing. 

So on creation Attributes are created. 

1213 an attribute has a name, a label, a base value and the current value.

Before item modifers come in to play it is very straightforward, the base value is the capacity, the current value is just that. 

so health 10 base 7 current is 7/10. 

items modify things. they modify the base and by virtue of that the current.

Now I wondering what happens if current is a percentile. Items modify base. 

So we need true base - starts as the role of the die, fixed (for the time being at least, permanent attribute change is a possible mechanic but not implemented yet and not going to be as part of this current effort)

then apparent base, which is the modified value. so an item of increase health by 10% (not sure if that's a real possible value but for demo easy math purposes I'm going with it) 

true base: 10
apparent base: true base * 110% = 11
current: apparent base * 100% = 11
current: apparent base * 70% = 7.7 (rounded up to 8)

1220 it would be nice to visualize all the modifiers at play in sheet but I'm not sure I will be able to do that quickly. 

it does sort of feels like it should be logged out though, like

torso of increased health low_effectiveness increases health by 10% from 10 [previous apparent] to 11 [new apparent]

1221 logging systems. how do they even work? 

I guess there has to be tooling around this, is there anything in svelte (or sveltekit?) I don't want that interface dependancy on game logic if I can avoid it but if there's a fairly generic log object I can implement in the game engine then that's fine to tie into svelte loggin stuff

1225 nothing so obvious I feel obligated, though there is an interface defined in sveltekit 

1226 I can't even find it again. anyway, it was just levels and messages, very typical thing so fine. 

1232 okay I have a basic log implementation with debug and info levels. I am thinking about two things:
1) just make static methods that get the instance (I made it a singleton) and log shit to it. all static. 
2) something else. oh, granularity. if everything is a log then there is no granularity but that's okay for now it will just be a raw stream and maybe I can refine it over time 

1234 tell me that you love me more

there doesn't even need to be an instance. just _log outside the class. This is probably grossly inefficient but I'll let that problem arise when it does.

20221122 1523 it's lo-og it's lo-og it's big it's heavy it's wood

(I googled, "it's" is the correct one)

1526 so logging. I'm going to do dishes and dinner prep pretty soon so this is a bit of a dip in and out but maybe I can catch up on what I was doing to be ready for next time. The logger works, really quite nicely. 

It is destined to be problematic because it is a lot of content getting generated each turn and I'm just about to do more but well, maybe that will force persistence to dump some of it out or something. Or I can determine what is and isn't worth logging or disable info. Ah, set a log level. 

20221123 1531 hello again. did not do much yesterday nor today. 

1532 So I have this logger and it is okay. Noisy, very noisy. Probably not super great for the in game log? But perhaps it will be. I want to over load it and then figure out how to dial it back. A log level of "interface" might be interesting to consider. 

So I wanted this logging for a specific purpose I think? Oh right I wanted to log all the modifiers being calculated and such as well. Yes just a floooooood of data. But that is okay I think. A web worker to process the logs into presentable data or something maybe so that it never gets super full and doesn't have to be massaged real time. There are options for managing the scale issue is what I'm saying here. Create the issue then resolve it though, I don't know enough about this one to solve the problem in advance.

1536 So logging out character stats caching is what got me to this point, and I think I am able to go back and start doing things with it. 

1539 So I started calling it progressSTats and have just changed it to progressAttributes but that's also wrong-ish. I am sort of progressing the attributes so it is right enough for now but what I am doing is applying the effects of equipped gear. 

My inclination was to like "update awarenss then update brawn then blah blah blah and eventually update health" because resources should be impacted by personality and physicality changes. 

1541 but I think the way to do it is just go through all the equipped gear and apply its changes? But maybe not! Bother, this brain of mine.

All attributes need to be updated? Do they? Probably not. Only the ones that are affected by gear. So base attributes don't change on a turn-by-turn basis/as part of progression. They might be changed as the result of something happening during a turn but that change happens either before stats are calc'd (which really should be the first phase of any character's turn) which means they will have an impact on what happens this turn, or the change happens after that, in which case it does not have an impact on this turn. If it is either the very first or very last phase.

Which means maybe it should be the very last phase. But for now I will make it first. It's easy enough to move it to the end. 

1549 hmm. I was thinking I should reset all the attributes to base but that would require me to track specifically how much damage has been taken. So this isn't right. Although I would like to explore that current-as-percentage situation

1855 I should do current as percentage .. either later or concurrently or just fuck it pull the bandaid. 

1857 Okay so walk through what I'm trying to do. Context: Health. 

base: 10
current: 10  or 1.0 (100%)
apparent: 10

so the thought of looping through attributes and doing anything is no good, just work through the paperdoll applying the passive effect of the items. (mechanically there is no distinction but I think I need to keep that one for a later refactor)

there is already a place where that logic exists. when getting attributes. 

1900 hmm. So that one gets modifier for the attribute being retrieved. It seeks through the array seeing if the item modifies the sought after attribute. 

that's not what I want to do though. I want to go through the passive-impact slots in the doll, but keep the commented out hands and stuff because they should be able to do passive things as well. A different refactor, though.

1916 I'm really not sure what to do about current? I might have to track the negatives? 

For most of the stats it is fine I think. 

say brawn is base 50 and a torso of increase brawn by 1.1% is equipped.

current is 1.0. so should current become current * modifier = 1.1% so then apparent brawn is 50 * 1.1 = 55.

That works well but this model does not work for resources because.... 

there is an affect, their health is being reduced by 1.1% by the active modifier of the weapon.

1919 Well, the weapon leaves a cut of 1.1%. 

hmm that's an interesting thought. so there would be tracking of the negative/decrement/find a word in a bit? 

charA hits charB with sword of decrease health by 1.1%. It adds a wound.

health: {
    base: 10,
    current: base * every wound
    apparent: base * current
    wounds: [1.1, 2.3]
}

10 * 1.1 * 2.3 = 25.3

so that's already not great.

1922 a wound is a constant thing and resting takes out wounds. or maybe gradually reduces them based on endurance? lightly impacted by awareness and coordination and conscientousness and neuroticism?

I am interested in this system. But how do I do the math for wounds here. what does _decrease_ by 1.1& mean? 

10 - (10 * 1.1)

oh wait that's not what 1.1% looks like as a float. 0.011!

10 * 0.011 * 0.023 = 0.00253

so that is also not right. 

10 - (10 * 0.011) - (10 * 0.023) = 9.66

now we're tlaking!

Modifying health by 1.1% really not enough, I'll probably need to do something about that scale at some point. 

this also doesn't scale well does it? like if a tier 1 weapon does 10% damage


hrrrrngh. yeah this isn't good. The wounds idea is good but doing a percentage is not good. All those ones with 10, the same number of wounds would be required to kill regardless of health. 

5 - (5 * 0.011) - (5 * 0.023) = 4.83

exactly half

1933 no great ideas yet but I do like keeping track of the wounds. I can move forward with this janky system for now and figure out how to improve the behaviour of the wounds. 

there _is_ something here, even with the percentages. But it doesn't scale right because a tier 6 weapon would still take just as many hits to take down an enemy regardless of tier. Fewer than a tier 1 item because it's like 6% or whatever it is, not 1%. But enemy tiers don't matter in this scenario then because the damage scales with the base. 

So a wound could be on a 1-100 scale like the other attributes? I guess it's not explicitly 100 any more is it? 

then it is just doing 1.1 damage, and a tier 1 thing is going to have only 3 or whatever health so 3 solid hits and it is done. 

in theory something could modify the wound. it could be critical 2x or glancing .5x. good thoughts for a future day. 

so fine, fixed rate of damage in a wound. The items will apply a wound to an attribute and then when the 

1940 don't know where I was going with that. but anyway, effectiveness becomes a fixed number, gets * 100, however it ends up working. 

1950 this makes current not a percentage again. which means there is no need for apparent right now, because current isn't base * wounds, it is base - wounds. 

hooooowever. how do boons apply and when? they modify base. So apparent might be base modified by passives and current is apparent modified by wounds.

1952 but this doesn't stack. if each item is working from base then nothing accumulates past items and oh no it might be the case that I have to 

okay. I can accumulate all the item modifiers first and then apply them to any affected attributes. 

build an array of some sort.

20221124 0854 

0856
> apparent might be base modified by passives and current is apparent modified by wounds.

0911 lol right now they are too bad at fights to win and have depleted any close tiles and still each have 2 open inventory slots so right now will never drop stuff off. 

0917 so the interface isn't reactive right now and I'm pretty sure it is because the flitting does not force the update of the underlying stats. I'm not 100% sure that's the thing but I think so. 

0925 I think that might be progressAttributes done. Next is having that reflected. I guess it's just getATtribute that needs updating? 

0929 I do think that was it. The party now is good enough to beat some enemies and get some items but with 0 capacity they aren't really getting far. 

0930 or rather, they are going _too_ far. they aren't droppingn things off. that's around turn 96 at present. 

0933 vend value for 000 is 0. That definitely is not right. 

0934 might be too far away? tile relationship score 

```
tileid: 000

    capacity
    4.375
    distance
    0.2
    nrg
    0.18000000000000002
    ger
    1
    hth
    0
    sat
    8

knowledge level: 4
adv val: 3.125
rest val: 3.125
vend val: 0
```

these values are messed up. Not the values - capacity etc - but the adventure value? for 000 should never not be 0, that's a terrible place for adventures. And vend value for 000 especially should never happen too

those values aren't written out are they? 

0940 that should be part of updating the relationship, writing out a `values` object with adventuring, resting and vending vlaues. 

that happens in scoreactionsandtiles. So should score actions and tiles be part of updating tile relationships? I mean, probably?

0951 yeah that happens. also should update best tiles when doing the values. 

0956 about to go put a hook in the bathroom. What comes next, I think, is caching the best tile values in the tile relationship's `values` object. I'm not sure exactly what that looks like but bringing the whole thing over into the relationship triggered by progress is the right start. 

after that, update charater's decision making to come from the cached values. This is a big overhaul but I think it is going to simplify so very much. this feels like a really strong architectural change. Sure hope that isn't ironic forshadowing for whichever future entity is reading this!

1125 some hooks have been installed. Not digital ones, physical ones, from which hang plants. 

1125 so a big overhaul to.. best tile values. 

1127 ohhhhhh wait. the best tile should _not_ be part of the tile relationship. Hmm. Yes, because there's a good chance it won't be that tilerelationship.

so this needs to go in character still.

1135 so the tile relationship has the "values". the value of each relationship for the different actions. So deciding the best action is a matter of seeking through the relationships and identiying the best one. that is what the best tiles stuff does, right?

1142 I probably need to update the SheetLayout stuff and perhaps other places not to use those calculate methods? I guess I can see if I can find calls to them.

1147 okay, searched for like, `.calculate` and such and tried replacing all those calls with the previously calculated values and yeah stuff is pretty broken right now so I need to work through the various party calculations and member votes and things and trace what I've broken. Tests would be helpful for this Rob.

1150 looks like the characters' best tiles aren't getting populated properly, either the either the thing is bad or the other thing is bad. either they aren't getting written properly to begin with, or the thing that preps it for consumption isn't setting it up right so let's work up the flow.

1155 hmm. tile score goes to 0 if _any_ score goes to zero - because they're all multiplied. 

capacity and health are zero for the first tile beingn looked at

1157 oh okay, this is very first turn, game just started. all these scores being 0 here is correct, they don't get calculated until later on. right? 

then why are some of them not zero?

1158 there's a _lot_ of log statements. Maybe some of it is for the sheet stuff though I wouldn't think a different route would render so probably not. Anyway, can't figure out what next turn looks like because something craps out on the way.

1159 party is progressing. should it be?

oh because I'm autoplaying. Interesting? yes that was it. I just needed to turn it off for things to behave the way I thought they were supposed to.

So yes, the party is progressing on the second turn. it is behaving correctly in that sense. 

1201 which also, I think, means that .. something something something. 

1202 those things shouldn't be zero. that's what that means. probably?

1202 capacity score is zero. Makes some sense since there's not really value in coming here but that means then that it should be one, shouldn't it? Because in the great back and forth of confusion in my calculations, these scores are modifiers, fundamentally. 

1206 so there is absolutely zero value for adventuring because the adventuring deck is 0. That is right but I'm really going to fuck something up here probably? 

I am using values as scores as well? This UGH. If I ever multiply by something it has to be that 1 is neutral. 

But adventuring value should be zero here. but should that tank capacity score? Well, there isn't anything in the bags so there is no value from a capacity standpoint either. 

1209 so if there is no value for an action... can there be a best tile? 

1209 back up a little bit again and try again. Get rid of some of these log statements because those calculations are correct. 

Party line 55 is crapping out because the party decided to do something for which there is no best tile. So why did they pick it? Why is there no good tile? 

1211 Okay, the party chose to rest. That's, uh, _weird_ for the first action? But its best tiles is `[ null, null ]` so um, that's kind of the real problem right now, why are the tiles chose for _rest_ null when the score for rest is not null.  And why two of them?

1214 something is off in the tallying

1216 because there is no best tile for adventuring the tallying drops its score to 0. no tile, no desire.

So there should be a tile for adventuring, back in with this best tile issue. Adventuring shouldn't be zero , I am only seeing it as 0 earlier because the first tile it looks at is 000 for which yes, adventuring is bad. but the partymembervotes has non-zero value for adventuring, it is 1.33 or whatever and the other two are < 1 so adventuring wins but oops there's no tile picked! 

1231 stepped away to chop some shallot. 

1234 okay, it doesn't break now but that is just because at least one tile will get picked now because the starting score is -1, so even if a score is 0 null won't get returned. But this is still not right I think because the party is staying still, it's not picking the best tile correctly. Maybe there isn't enough knowledge at this point? 

nope, it looks at all the neighbours. so, check in on Jon then try to come back to this again. 

1255 so it is looking at all the tiles and none of them are good enough. what are the values that I'm comparing? 

1301 title relationship scores overall is always 0

because capacity or one of those others is 0?

1304 capacity is like always 0, so maybe I broke something here. 

So anyway, what does capacity do? 

		const capacityScore = 2 * percentAvailable > 0.5 ? adventuringValue : vendingValue

1306 000 has 0 for adventuringValue and vendingValue, so no matter what capacity will be 0. 

1315 okay. Capacity score relies on vending value. 

1315 so maybe just an order thing. Need to do values before scores. 

1318 I think that was of value, but it wasn't the only thing. It is possible I might need to progress the tile relationships on the 0th turn or something? 

1318 adventure value is 0 for all tiles on the first turn. same with knowledge level.

but all the scores are 1 so basically all the neighbours should be equal and have value for adventuring. but none. 


1321 hmmmmmmmmmmmmmmmmm something has stabilized but I am not sure what. I just updated the sheet component to use the correct best tiles but that's only interface not .. like... more than that.

game engine level I guess. shouldn't affect choices.

1324 okay I thinkk...... things are stable? ish? 

1330 the party still does not want to drop off their gear though

1330 there should never be a best tile for vend that _isn't_ 000 at this opint. That's the _only_ tile for vend.

Am I putting cards into other tiles? 

1332 so the characters may not know the tiles well enough to know that there are no cards. 
Also the characters should _really_ want to vend. 

1341
```
venture: 1.3310000000000004 -413
rest: 0.7290000000000001 -413
vend: 2 -413
```

and they do. but they pick a crappy tile for it. 

404 distance is like .5 where 000 is .2 

1407 got dressed. need to take Harvey to eye appointment at like 2:40. 

1415 okay, so I don't need to autoplay to see weird vend values. Vend should be 0 for any other tile and I see it as 1 in some places.

because it is not known that they're no good for vending. That's the big factor probably. Any new tile could be _fine_ for vending, but then as they get explored over time their thing drops from 1 to 0. Which is fine. 

1417 so maybe I do need to autoplay but it is so hard to wrap my head around all the values and properties of everything. 

so -404 or -413 and such they 

1419 they what? they get a score of 1 and then the distance dampener affects it? 

Vending is important. If one doesn't _know_ vending is available ... I don't know. I don't want to do exceptions but at some point the tile choice for vending is higher than 000 and I guess I keep poking at that situation. 

1426 health score for 000 is 0 at turn 85 or wherever I am.

1429 `const healthScore = percentAvailable > 0.5 ? adventuringValue : restingValue`

so if the character is health they adventure but 000 is no good for adventuring so it gets a health score of 0. But really it shouldn't matter. If the character is healthy do whatever - should be 1. Otherwise, rest. 

1431 that gets them coming home now. turn off autoplay again and smell test behaviour. 

1534 Waiting on Harvey's appointment. Behaviour smelled fine initially. 

1535 it would be good to make some of these bits and bobs testable. Given a particular character with particular items, does the expected outcome arise? 

1536 but I'll do that another time. the future!

1538 so flitting items should trigger character progression right? Because character progression doesn't really have permanent changes.

1548 am I displaying the wrong value? It doesn't seem like, probably. because it changes when the 

1550 okay. So, it doesn't change when we take the equipment off because there is no modifer for that attribute set so nothing happens. So I need to set things up so that every thing is recalculated regardless of whether or not there is equipment for it. 

So this gets me back to that baseline thought, reset every attribute to baseline and then apply item modifications. Current gets calculated as necessary because wounds to that attribute are captured. 

wounds and buffs might be the same thing. It's an interesting model. 

1553 wounds never get removed but that's okay, that will be rest mechanics to heal wounds to some extent or another.

1557 I'm not sure what changed but now the party doesn't dump equipment. they don't get enough to. die too much?


ah, was assigned `base` to current, instaed of attribute.base

1559 okay, equiping and unequipping items has a visual impact. good stuff so far. 

1607 so what is up with energy and satiety scores? 

1611 okay, so reseting resources to base appaears to have cleared that up a bit. I wasn't properly doing that so the calculations weren't going to show up and resting just like, kept going over the top however it was that worked.

