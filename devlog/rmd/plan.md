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

1613 so like, what to do next? 

1614 first fight is lost and takes like 60 events. That's not _that_ much really? 6 combatants, a total of 10 tries each that's.... too much probably?

wounds are not being applied, right? I'm actually deducting from current during combat still?

1617 so yeah, time to get into combat-y stuff.

1927 time for some homework combat is .. rough.

2027 so, combat. how's that working for ya? 

2028 I was like "I should make a Combat class that manages everyting" and then I was like "oh yeah I have one of those"

2029 so that's how that's going. 

It's not _terrible_ terrible, it's just not good. 

2029 so the problem is just that everyone sucks, really. they just miss each other a lot and don't hurt each other a lot because that's what happens with normal people, really. punching the shit out of each other is hard and even killing someone with a sword is hard. 

2031 so one thing to try is to add the rest of the party. if three people die maybe six people won't. but there will be sooooo many rounds. Do we want combat that is 60 rounds even? 

2034 they all have two things in their inventory.

I think I need to .. geez. I was about to say I think I need to get it working without the win condition in the boot slot and without the backpack to start. and the character starts with nothing they go out as a group and wallop something and maybe someonen gets a piece of something and like, they're holding it in their hand. and so then after just a couple of fights perhaps they want to come to town? 

I guess vending desire should take currency into consideration and eventually knowledge of purchasing things? that's a far afield sort of place we've gotten to. 

2037 and start with one character and accumulate others over time. 

shit I really do think that's the right thing to do. and that makes the inventory management more interesting. Down to one character, dial down the intensity of the mobs and the drop rate, build up from there. 

2046 so budget is 6. I guess that might be something that differs based on the card maybe? but for now I'm doing math to get it.

2050 there's only something for the player to do if the character is like pretty crappy. they .. maybe they should get enough to fill their hands in the first fight? Should loot be that plentiful? 

somewhere along the way I need for them to remember getting their ass kicked on a particular tile and not wanting to go there and stuff, and then some what of mitigating that aversion

that's a really improtant mechanic. 

kd\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

2054 getting dozy.

20221125 0910 that was me falling asleep at the keyboard at 8:50 on a thursday night. wild parties, I tell you.

0910 so what I was thinking last night - and still think is probably a good path this morning - is that there needs to be something for the player to do quickly. And for that to happen, there can be only one character who should win the first fight but has to be able to do that with their bare hands and no equipment. then they are able to purchase a piece of equipment - either a weapon or a piece of armour is probably best. Or they acquire something and automatically equip it, etc. They should probably start with food and not the win condition item but 

0912 or, okay, here's maybe a thing. The win condition item _is_ a piece of equipment "Ceremonial Boots" or something like that for now. And it is not worth much of anything but when the player tries to sell it the equipment vendor refuses and there's a message (in the log probably?) that is like "The vendor refuses to purchase this item and insists that it should be returned to its original land" and then now the character has a region bias. 

hmm hmm hmm this is an okay premise. 

it feels like too high detail to be focusing on early on but also this is what is preventing the game from feeling like a game. There's no hook for a player to latch onto. 

So yes. The character should acquire the item after winning the first (or some other early) fight. it's the top card in the first tile in _one_ of the regions, and it needs to be returned to a tile deep in some different region but nothing about that tile is known other than the region it is in.

once again, mpiling up a ton of work for myself, but it's a bunch of things that have been waiting on being fixed anyway. Transfering the win item around should be possible, and 

perhaps the win condition item is like, cursed or otherwise bound to the character? I'm not sure which is better but that mechanic doesn't need to be implemented any time soon. it's worth considering though, to make sure the player doesn't lose track of it and right now since the character's pack is inaccessible to the player the only way for them to make sure the character has it is to equip it. 

0917 There's a lot that can be done around that, perhaps an icon that shows beside their name in the party pane or something like that.

0936 so how to make progress on this. I guess remove all starting equipment except the win condition and then figure out how to loot into a hand/include hands as carrying capacity and such. That will have a lot of impact.

0951 alright, so now that is a target. Yay targets. easiest first step is no starting gear.

0953 okay took away backpack. Likely to find a lot of problems. So one option that I do have here is just to start with a small container. a 1-lot backpack. The mechanics of using hands as carrying capacity are going to be complex and I might not want to deal with them. 

0954 Or maybe just the back itself is a one-slot carrying thing. And either it has a container or it has a magic 1-slot container. I like that notion.

0955 so yeah a lot breaks without the backpack so I think I will go for the 1-slot default carrying thing and no automatic equipping of gear. That means the player can tweak gear as soon as it gets dumped in the city. And carrying capacity becomes a more meaningful mechanic in the early game. even a 2-slot bag is a big step could do fibonacci-like, 1, 3, 5, etc or just 1 3 6 12 21 30. That is possibly a good sequence as well. 

0958 so this.backpack, if there isn't a pack, should return a magic 1-slot container or something. 

1000 or do I just start with like... a sack. holds one item. eventually new bags come. Yes I think that is what I will do. If the backpack doesn't exist a sack magically appears. sacks have zero value and don't get broken into mats and if someone tries to equip a backpack while a sack is there, the sack magically disappears. Maybe if a backpack is removed a sack magically appears too. 

1016 so currency doesn't get looted I guess.

1029 so right now with seed 20 there are two fights each which get currency then one that gets a weapon and fills the sack but the character still prefers adventuring which isn't the choice I think that should be happening. Especially this close to 000, they should want to unload fast. 0 carrying capacity is a bad place for a character to be. 

But the vend score is only .2. So 

1031 vend score is pretty naive. that's what's happening. 
```
		vendingDesireScore = (capacity.base - capacity.current) * .2
```

1 - 0 * .2 so yeah it will never be very high. 

When capacity.current is 0, it should be quite high. like, 2?

1034 okay so I'm 
1035 so I'm at a point where the party goes to drop off the equipment and then literally cannot win another fight after that. The early tiles are completely tapped out and the character is not strong enough to beat others. Building up currency is useless when not getting loot. So more easier combat or more loot. STarting with more encounters, the tiles should have like.... a lot of encounters. 

Where do I allocate encounters? In regions?

Tile.js
```
this.decks = this.environment.decksForTile(this);
```

1037 100 cards, 4:1 combat:trap ratio at present. 

Traps are broken don't forget. Probably. Maybe just not enough are happening.

arrow trap is "avoid many small things"
boulder trap (doesn't exist yet" is "avoid one very big thing")

1040 decomposing an item only generates one mat, it doesn't do the scale thing.

1041 so I do think drop rate needs to be a bit higher. Also the items need to be more consistent in quality and utility. Right now first combat reward was a tier 5 weapon, that is a bit too much for a tier 1 opponent to have. 

1045 that gets complicated. I generate items via Mobs class but there's nothing in there to support limiting effectiveness. what calls that, I could perhaps pass an effectiveness through I think that's going to be best for now.

1046 oh I do it inside the Mob creation statics and then in the tests but this is fine. this is good, even.

1049 at some point I hope to induce the party off whichever first tile it found to go deep on. it doesn't need to resolve all 100 encounters. I guess as the deck size drops other tiles might be more attractive?

1050 drop rate does need to be higher

1128 okay so it's at something like 60% and this feels in the right neighbourhood. On this particular seed I got a lot of food and potions which is too bad. I did get the equip vendor to make a hat and when I tried to buy it the game crapped out a bit

1130 oh because the equip vendor has a standard paperdoll that it fills in the source detection doesn't work properly since it just looks for Paperdoll.DOLL_SLOT_HAND_LEFT or whatever. Now the visible screen will indicate if this is vend or mannequin typically, at least in the way I am doing things now. 

1130 so I need to make the vendor able to generate an item quick so I can reproduce this bug reliably.

1131 okay I have that going now. 

1203 items can be transferred from vendor to chest, but no charge occurs. items need to have their value set so it can be deducted?

1540 items should have their value set by the vendor, not at construction. And then it should drop by some percent or the character pays some amount over that based on some combination of attributes especially magnetism. but like, that level of economy can come later. simple value, used in either direction is fine. 

1707 cost is not deducted from character's inventory

1707 maybe hovering over a card that can go multiple places gets a destination overlay. not good for tap-based devices. I guess if I can determine if click is supported? but it would be anyway so there's not really a good way to determine that. I guess if it can hover it can just display the pane

1712 but cost should be deducted from the inventory. 

1723 it is now. 

2117 so right now the character goes to -101 until they get loot then back to 000 then back to -101 etc etc. there is no desire to roam to explore. 

there is no progression. 

2118 one of the possible types of vendors was trainers. it's long been the notion of increasing attributes by way of lkjdflkjadf by way of trainers?

the resources just kind of come out of nowhere right now. I guess that's mostly okay? I keep entertaining the notion that health should be derived from endurance and energy can be derived from brawn but neither fit as closely as I would like. and I'd rather they be the result of interactions from the stats?

The stats need to do something, right? There is some value in them for exploring and different desire and value and suchlike tile relationship scoring logic but there isn't like a reliable structure and there are a lot that go untested.

like a helm of increase conscientousness... what good is that? 

I guess conscientousness would be a good contributor to health. conscientousness and endurance contributing to health seems like it could make sense.

|            |agreeableness|awareness|conscientousness|brawn|neuroticism|
|coordination|             |         |                |     |           |
|extraversion|             |         |                |     |           |
|magnetism   |             |         |                |     |           |
|openness    |             |         |                |     |           |
|endurance50 |             |         |                |     |           |

agreeableness    coordination = easily coachable athlete        = 
agreeableness    extraversion = gregarious, friendly, outgoing  = 
agreeableness    magnetism    = beautiful/handsome and charming = 
agreeableness    openness     = kind                            = 
agreeableness    endurance    = always along for anything       = 
awareness        coordination = very agile                      = 
awareness        extraversion = event organizer                 = 
awareness        magnetism    = leadership                      = 
awareness        openness     = attuned to others needs         = 
awareness        endurance    = stalker?                        = 
conscientousness coordination = close-up magic                  = melee dps - knife rogue?
conscientousness extraversion = party host                      = 
conscientousness magnetism    = leadership                      = 
conscientousness openness     = honest                          = 
conscientousness endurance    = marathon runner                 = 
brawn            coordination = linebacker                      = melee dps - fighter
brawn            extraversion = circus strong man               = 
brawn            magnetism    = lumberjack                      = 
brawn            openness     = the tick                        = 
brawn            endurance    = slow moving hard hitter         = 
neuroticism      coordination = bomb diffuser                   = 
neuroticism      extraversion = larry david/george costanza     = 
neuroticism      magnetism    = manic pixie dream girl          = 
neuroticism      openness     = hypochondriac                   = 
neuroticism      endurance    = complains but gets it done      = 

coordination
extraversion
magnetism
openness
endurance

2152 I'm not sure what all those combinations do for me. It certainly doesn't get me deriving health and energy but that's okay. I might put that in Character as well. There's an aspect of job influence in there I might still add like possible jobs

2156 huh. I added it, I thought there would be way more jobs i nthat list. 

20221127 1037 so I'm not sure what to do about the above. It will ruminate. 

The current mechanism for choosing tiles is what forces the party to go to -101 entirely and deplete it. the scoring mechanism picks the first one with a good score and nothing that is equal can knock it off. 

I could either build an array of contenders and then pick one - building a deck is conceptually consistant with the mechanics in this system. Or I could shuffle the deck of all tiles in advance and then whichever one comes out first is fine. 

1040 or how would like... real-ish people make a choice here? Curiosity is a factor, right? Curious characters are going to be inclined to go to new tiles, explore new regions, do new stuff right? Openness would be that factor? Neuroticism might play into it? 

1041 I just realized that my split of attributes above is not personality vs physical, they're all mixed together which makes for invalid personality combinations. Anyway that's all fine. It's percolating! I don't think that's spelled right but anyway. 

1042 But what's their motiviation I ask myself, feeling a bit corny. But that's the point of all this really. Broadly the goal of the character is to return the win condition object to its home. 

But even before that, the goal of the character is to explore, right? They go out and find the object? But that's kind of a vote in favour for starting them with it. They are instantiated with the goal of returning that particular object, and the player believes that to be their goal as well.

I mean kind of correctly, but there are _secrets_ that have not been exposed here yet. We don't know why the character got the item and why they feel compelled to return it. Just that they do and by default a character in a game we start playing is our avatar and therefore their goals are our goals.

The character wants to return this item to some place but it is too dangerous for them at this point. As the player I want to help the character increase in ability and equipment so they/we can achieve their/our goal.

1319 okay so what do I want to do here. I guess I want to break ties with randomness. 

1329 okay, picks a random starting direction now but they keep going to that tile. tile knowledge ranking it higher than the others? 

1333 yep, tile knowledge jacks the adventure value up to 4.something something whereas all the others stay at 1. 

So the neighbours should be able to go up a bit higher I think, to 2 instead of just one. 

1335 changed the value of the decksize but haven't changed the neighbours thing I had to trace through to that again I don't remember exactly where it is. 

1336 same behaviour but now the adv value of the tile they keep going to is 3.25 which is still much higher than 1 but tweakable. And maybe it should not scale up that quick or the scale of tile knowledge should be broader. like 1-100 and ..

something I want is fuzzy thresholds. Like I don't want the tile to have to be visited 80 times but eventually more knolwedge will be gleaned. 

I guess I can manage that through odds. Tile knowledge only increases by a bit. what do I use the knowledge levels for? 

1339 so I have some Tile.KNOWLEDGE_foo constants. 0, 1, 2, 3, 4. If I change those constants to be.. something? 

they would still be thresholds though. TileRelationship.knowledgeLEvel can increase at random times and the threshold can be fixed and that works okay. 

So 

1935 so I guess try that. 

1957 that looks like it is working? At least for quite a few many turns. it's hard to go through all however many cards in the deck. eventually something has to make the tier of loot on this tiles less interesting. difficulty right? the character wants tiles that are easy enough to beat but have rewards worthwhile enough to do whatever. 

the shop made a tier 5 item on the first turn it could make something and it cost 2 currency to get so yeah, not much of much happening there. 

There's no way for a new player to understand what is ahppening still, and there's not really anything they seem to be doing well......... I'm not sure what that means.

feeling tired face droopy. 

2002 trying to think of how to attract a character to a region. A character could have a 'preferred region' property, or score the regions and such. But it is about tile attraction 

20221201 1944 unlikely to do much too soon, perhaps this weekend. there's some good smallish tasks, traps and things like that. Something perhaps about the regions to think about is aligning them to stats? There are 5 of each type of stat and 6 regions though. Maybe a region is all stats or something like that? 

That's a relatively good system to think about and maybe the combination of stats is a good source of flavour. 

Encounters should (perhaps) test stats. Combat is a test largely of awareness and brawn. so it doesn't even need to be one of each type and probably can't.


PERSONALITY_AGREEABLENESS
PERSONALITY_CONSCIENTIOUSNESS
PERSONALITY_EXTRAVERSION
PERSONALITY_NEUROTICISM
PERSONALITY_OPENNESS
PHYSICALITY_AWARENESS
PHYSICALITY_BRAWN
PHYSICALITY_COORDINATION
PHYSICALITY_ENDURANCE
PHYSICALITY_MAGNETISM

1950 there's 945 possible pairings of 10 items
 https://math.stackexchange.com/questions/532542/there-are-10-different-people-at-a-party-how-many-ways-are-there-to-pair-them-o

and a lot of those don't make sense probably. what tests agreeableness/conscientiousness

1951 So perhaps a different approach. 

What if each region emphasized one physicality and one personality trait? There aren't opposites so it isn't as though things cancel out but if for example the enchanted forest is combined with conscientiousness and brawn then the combat and trap encounters would impact those attributes of the character? 

what is the penalty for a character's conscientiousness going down? is lower always better or is it the case with personality that probably like the 60-80 range is probably ideal and the edges of both sides cause challenge

but how does it matter. is it possible to make it matter that a character is too agreeable? Well immediately to mind perhaps a character that is overly agreeable is more likely to stay with a party even if their goal tile is not being approached or however a character's goals are represented. 

A disagreeable character will be kicked out of a party quickly. An overly agreeable character will stay with a party even if their goals are not being prioritized.

An ~disconcientious~ apathetic character will not train very much? An overly conscientious (meticulous? have words for the extremes) character is too interested in staying in one place like, hundred percenting it or something like that?

An extreme introvert has troubles joining parties and an extreme extrovert has troubles when there are few party members maybe?

A closed person hates new ideas I'm not sure how that is reflected. An extremly open person is flighty, changes their mind all the time. some expression about a weather vane 

PERSONALITY_AGREEABLENESS
PERSONALITY_CONSCIENTIOUSNESS
PERSONALITY_EXTRAVERSION
PERSONALITY_NEUROTICISM
PERSONALITY_OPENNESS
PHYSICALITY_AWARENESS
PHYSICALITY_BRAWN
PHYSICALITY_COORDINATION
PHYSICALITY_ENDURANCE
PHYSICALITY_MAGNETISM

an unaware character gets hit a lot, an aware character dodges more readily, spots trap, an extremely aware person maybe has decision paralysis? ineffective because they can't prioritize what to be aware of maybe?
a weak character doesn't do much physical damage a brawny character should have lower agility? consumes more food for sure
an uncoordinated person triggers more traps? trips and hurts themselves more, misses attacks more often. an overly coordinated person... harder to find a downside to physical traits. 
low endurance low energy. high endurance like... is there a downside? apparently heart health can be a problem for people who overtrain endurance
unmagnetic people are repulsive. overly magnetic people are...

2007 so yeah downsides to physicality sure seem hard to think up. There's also none of these attributes that would impact magical ability. I guess training is conscientiousness, some amount of neuroticism probably helps do such things accurately? like component mixing or just hte knowledge and practice and stuff.

None of this seems to be important for characters who want to explore a region. So I'm back to swamp boots to protect against poison. 

The win condition return region is the enchanted forest. The enchanted forest is biased in favour of element A which has a contradictory relationship with the element in whichever region is opposite it.

So maybe there's some complimentary colour/zodiac combatibility type mechanism that can be explored with this. 

        left-upwards            right-upwards
    left                                    right
        left-downwards          right-downwards

left <-  opposes -> right
left-downwards <-  opposes -> right-upwards

left-upwards <-  opposes -> right-downwards
left-upwards <- dislikes -> left
left-upwards <- dislikes -> right-upwards
left-upwards <- likes -> left-downwards
left-upwards <- likes -> right-right

so, dislike neighbour regions like 

I'm trying to visualize it. So it's like
  \ /
-     -
  / \

  \ /
-  \  -  opposition
  / \

  \ /
-    -
  / \

no it isn't working. So complimentary colours are not immediately adjacent on a colour wheel to the current colour, so hexes which are immediately adjacent are not complimentary hexes is the thinking here. 

but it might make more sense to like those close to you and hate those far from you. 

left <- likes    -> left-upwards
left <- dislikes -> right-upwards
left <- opposes  -> right
left <- dislikes -> right-downwards
left <- likes    -> left-downwards

"likes" and "dislikes" here being I'm not entirely sure actually. 

So the idea is that left has element A and right has element B and they are in opposition. So they should be... ineffective against each other? 

A roshambo type situation is a circle. A beats B beats C beats A. 

2019 what I describe above is not a roshambo type situation. What type of situation is it? If elements oppose each other they should cancel each other out? what does that mean is that a usable mechanic? what would be good armour to wear while explore left?

What I want is to find gear that has an attribute that makes it easier to explore one specific region. That's the best way I can think of for gear to influence character decision making because all the gear of attribute modified by whatever isn't going to do it. 

OR maybe elements are defeated by attribute pairings? If we do all the combinations of one personality paired with one physicality that's like 25 "elements" . can I think of something that is the opposite of those combinations somehow?

|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_AWARENESS     |  |
|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_BRAWN         |  |
|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_COORDINATION  |  |
|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_MAGNETISM     |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_AWARENES      |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_BRAW          |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_COORDINATION  |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_MAGNETISM     |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_AWARENESS     |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_BRAWN         |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_COORDINATION  |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_MAGNETISM     |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_AWARENESS     |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_BRAWN         |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_COORDINATION  |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_MAGNETISM     |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_AWARENESS     |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_BRAWN         |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_COORDINATION  |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_MAGNETISM     |  |

2026 yogurt soon. one option could also just be having 6 elements and just picking pairs that oppose it. the discovery of what opposes what might be something that could be interesting?

or like, all entities in the Enchanted Forest are linked somehow to extraversion/brawn so gear that boosts those attributes makes characters more effective in encounters? 

mechanically that's pretty doable. gaminess I'm not too sure what it does other than be a way to influence characters. 

and then gear discovered in left region would boost stats that make the character more effective in right region? Or is it a matter of acquiring gear slowly over time that eventually starts biasing characters into one specific region? 

that is kind of interesting I think. the motivation behind doing all this stuff, the thing that makes it a game, is currently not known or apparently knowable by me but this mechanic is sort of interesting. The player will be able to know that the character never goes to the watery depths or whatever and somehow the player knows that the watery depths are biased/susceptible/linked to neuroticism/coordination. 

So the player starts biasing towards gearing characters in gear that boosts those attributes. The character knows that tiles in this region like those attributes and so as those values get higher they are more likely to enter those regions and difficulty levels.

difficulty levels could be gear quality checks based on attributes. 

tier 1 watery depths attributes don't matter much. tier 2 a little more, etc. 

before wanting to go into a tier 2 tile, the character needs to have neuroticism > 20 and coordination > 20 - specific thresholds to be determined still. 

I'd like it to be less explicitly thresholded like that and more that to be able to beat tier 2 opponents, characters with high values for those attributes will be more effective and therefore be less likely to die. 

2038 but implementing basic thresholds is a lot easier and is maybe a good step. 

so I'm not going to get this implemented tonight natch but what are the implementation steps? 
- regions need to get stats assigned to them
- characters need to factor the region's stats in the tile relationship

theoretically that's it, though there's a lot contained in each bullet point.

2040 having encounter types that specifically test the linked attributes is interesting to me 

the physicality are easier ones to test I guess. coordination? a roap bridge needs to be traversed, opponents are likely to have high awareness so dodging is more valuable? 

2043 things like that. yogurt now. I like this general idea, test the stats so characters need boosted stats so players can influence character decision by way of gear that modifies stats. these are all the systems that are currently in place. 

20221210 1111 a bit of a lull. fits and bursts is typical for me on this project. I've been thinking about how to communicate my hopes for this and the summary of it all is community. Or adoration? I'm not above admitting that the external validation of being known as someone who makes games is of value to me. But I want to build something here that allows me to build more things and to have people with me who build things. I don't need to be the center of it, being part of something is often a lot better than starting something but also I am so often just slightly out of alignment, the thing I am looking for isn't something I've found. 

1115 but there is a very long way before that and the thing I get out of this right now today is immediate and gratifying. It's just a very long term tweaking and futzing and puttering and it really makes a difference in my experience in the world to have a creative outlet so if this is all I ever get out of it I am way way ahead.

1116 So what is something to work on. Thinking on encounters previously. The aspect of the game I am trying to sort out is having gear influence character decision making. The mechanism by which I want to do this, that I hope is feasible and that seems like it builds on existing systems instead of making new ones, and adding complexity to those systems, is by having encounters test attributes. Gear modifies attributes, encounters test attributes, and success is building a character whose attributes allows them to discover and reach the tile.

But I don't have a solution for this right now. Combat is a good test of a variety of things. The traps as constructed are good tests of awareness and coordination and neuroticism. like, paying attention and reacting. traps and combat test both of those things.

probably a well-balanced system spreads things around very evenly but perhaps I do not want a well-balanced system. For one thing, I have no idea what the system is so making it well-balanced is particularly difficult. For another I just thought that it might be a type of progression. 

So in theory combat tests a _lot_ of attributes but it isn't going to be a good test of say extraversion and magnetism. 

also for personality especially I want there to be weird advantages to being very high and very low. Like, a test that introverts are more likely to see at than extroverts. a test where non-magnetic people are more likely to succeed than magnetic people. that's like a stealth mission or something, a non-magnetic person isn't repulsive... okay maybe they should be. 

It is difficult to be discreet when you're extremely attractive. People are going to notice you when you're in a space. Similarly if you're extremely unattractive, it makes you stand out. But if you're like 20% - 60% attractive? people look right past you right? 70% is going to have people attentive and over 90% people are going to be like... obnoxious about it or intimidated by it in some cases.

The tests aren't exclusively about high is good, it's about managing gear and characters such that you have good coverage for several different sorts of situations

even different combat scenarios. I think right now I have a budget for Mobs yeah. And there are different spending strategies. Those different strageties favour different party compositions (and probably other things too) or different character abilities. 

A lot of very small very fast - plague rats swarming or zergs rushing or whatever - enemies is going to test attributes differently than one large - colossus or giant or suchlike - thing. Agility vs endurance in a lot of ways.

1127 chaining encounters eventually could be very interesting too. A trap encounter becomes a combat encounter - the trap triggers and frees an opponent from a cage who then attacks. Or like, a conversation encounter fails and the opposing party becomes hostile or the shopkeep calls their guards on the rogue.

1152 there are a lot of questions about how to implement that, how to represent it in data. The tile relationship is to hold some of that. 

1153 so a tile relationship should change every time that tile is interacted. Perhaps in very small amounts 

2
4
8
16
32
64

just needed to see powers of two for a bit. that exponential line should be represented in game behaviours, difficulty, etc etc. 

1155 so an encounter happens, attributes are tested, and the character fails. The character's relationship with that tile is affected in that they believe they need more of a particular attribute before they will go there again, perhaps on that same scale. 

So.. but like a character's attributes don't go from 1 - 100 it starts somewhere in the middle or these days I think it is 8d8 so 8-64. 

But that logic is simple threshold logic, it isn't sweet spot logic. Do I start with threshold logic to get the mechanics in place and then figure out sweet spot logic. Or do they just know which way their attribute is insufficient?

If I fight and I dodge a lot and I hit a lot but I do not do enough damage to kill the opponent I want more brawn before continuing.

If I fight and I am not able to dodge and I hit a lot and I do a lot of damage when I hit but I die first I want more coordination and awareness - whichever missed. I guess they work in conjunction like "do I see the attack coming" and "am I able to respond to the attack" or perhaps it is more awareness is detection of attack (doesn't have to be concious, but does the training kick in to even _start_ reacting) and then coordination determines whether or not the reaction is succesful. 

That's a good way to look at it. I think right now the combat stuff is just that both of them modify rolls but it is not something like attack role versus a static defense number, it is a coordination roll for the attack and an awareness roll for the defense.

if awareness is unsuccessful the attack hits. 

I see here the value of a passive defense score. Someone can just miss without the target doing anything, especially in the case of like a bow and arrow right. 

So:
- coordination roll by the attacker determines if the attack is on target
- Awareness roll by the defender determines if the target has an opportunity to defend
- Coordination roll by the defender determines if the target adequately defends (dodge or parry for the time being at least it doesn't matter just that a defensive action was successful)
- and then something determines how much damage is done. Weapons have degrees of effectiveness which establishes a base value and the coordination roll determines if the 

1206 brain went blank. A high coordination roll means that a sensitive area is hit so it is like a critical roll, so the higher the coordination the more damage something does. An attack can hit but in a graze sort of situation it just nicks flesh.

So it isn't a straight up pass/success on the defense action. There is an attack coordination roll and a defense coordination roll. 

say evenly matched opponents, both have 50 coordination, both have the same weapon that does 5 damage. I don't think that's exactly how damage works but for the sake of this exercise it is for now.

In this situation it is a straight up dice roll. Attacker rolls 80 defender rolls 20. Attack absolutely succeeds and does a high amount of damage.

So things are modified so we want it on a range of 0 to 2 or higher even, why not 10x the damage if an attack hits exactly the right spot of the brain to immediately kill someone. 

challenge and reward need to be factors in tile relationships. This is probably the point in time where I should start making wiki pages or at least text files for these behaviours but right now I do not want to. So I shan't. Although it is possible to get the wiki in the source right?

1211 yes it is a separate project. For my convenience I could symlink something to it or just open it additionally probably in my editor. for pondering. back to other pondering.

so attacker rolls 80 defender rolls 20. Attack defniitely hits and that's a pretty clear victory, it's going to do quite a bit of damage. 

1212 start with a simple possibility: 

```
attackRoll - defenseRoll = damageModifer
80 - 20 = 60

weaponDamage * damageModifier = totalDamage
5 * 60 = 300
```

now I definitely don't want to just do straight up points. I'm thinking that `damageModifier` is a percentage of something but I don't know how that's working just yet. 

it goes negative when defense is good right, like swap the rolls:

```
damageModifier = attackRoll - defenseRoll
-60 = 20 - 80

totalDamage = weaponDamage * damageModifer
-300 = 5 * -60
```

so it didn't heal anything because a sword isn't going to heal anything but in this scenario it was a clear and easy dodge or parry. defensive action. 

1216 So with these examples it is a little off because of the big 300/-300 number instead of a percentage between 0 and 2 but I'm also not sure it is wrong necessarily, that totalDamage isn't hit points, there's some translation between the two. maybe as simple as dividing by 100 to get 3/-3. 

3 is a lot at tier 1 which a weapon that does 5 damage is probably better and that base value goes far quickly.

60 attack vs 55 defense

this is really close but the attack definitely lands but just barely. 

a just barely dodge is a dodge, a just barely attack is a glancing blow. The attack roll needs to be a lot higher than the defense roll to land and do meaningful damage. That's a balance issue I think to keep in mind.

```
damageModifier = attackRoll - defenseRoll
5 = 60 - 55

totalDamage = weaponDamage * damageModifer
25 = 5 * 5

actualDamageReduction = totalDamage / 100
.25 = 25 / 100
```

so in that specific example it is so low that no damage is done. so the attack roll needs to be 10+ higher than the defence roll in this scenario to do damage, assuming that things are rounded. ((5 * 10 = 50) / 100) = .5, which rounds to 1. 

that's a function of the weapon. so if the weapon does 1 then the difference needs to be at least 50 in favour of the attacker for any damage to be done. If I think of damage like the exponential scale above - which isn't how it works but I don't remember how it works and I am curious if the exponential scale is of help or hinderance. 

 2 * 25 =   50 / 100 = 0.5 = 1 point of damage
 4 * 25 =  100 / 100 =  1   = 1 point of damage
 8 * 25 =  200 / 100 =  2
16 * 25 =  400 / 100 =  4
32 * 25 =  800 / 100 =  8
64 * 25 = 1600 / 100 = 16

why am I doing * 25? What am I demonstrating here. this is weapon effectiveness being modified by an attack roll that is 25 > the defense roll.

but I think I want to see what it takes from a roll perspective to do .5 points of damage, the absolutely minimum effective damage dealing

 2 * 25 =   50 / 100 = 0.5  = 1 point of damage
 4 * 13 =   52 / 100 = 0.52 = 1 point of damage
 8 * 25 =  200 / 100 =  2
16 * 25 =  400 / 100 =  4
32 * 25 =  800 / 100 =  8
64 * 25 = 1600 / 100 = 16

no it's 50/whatever to get to the interesting stuff
50 /  2 = 25
50 /  4 = 12.5
50 /  8 =  6.25
50 / 16 =  3.125
50 / 32 =  1.5625
50 / 64 =  0.78125

So a weapon of effectiveness 64 only needs to beat the defense roll by 1 to inflict damage, but a weapon of effectiveness 25 needs the attack to beat the defense roll by 25 for it to land. 

so low tier creatures 

I'm not sure. hmm. 

oh some jobs should use different stats in combat and potentially in other scenarios. like, in combat for fighters and rogues and like hunters, physical damage types, brawn and coordination matter a lot. I haven't even included brawn in the damage thing, that's to consider. 

but a mage's attacks shouldn't depend on coordination right, their skills come from their personality perhaps? 

a tanks most important combat attribute is endurance. this might be an interesting way to identify jobs, what attribute do they emphasize? 

a tank wants to have endurance and magnetism to be able to attract the attacks. or this might be a case where low magentism/repulsiveness is of value too? but magnetism ultimately is about the ability to influence other characters. 

so worry less about that and more about the desired attributes themselves. that's a good way to influence party makeup for different regions too perhaps, or like a character that is at odds with the party already (currently expressed as wanting to go in a different direction than the group often, sort of maybe not really but close enough for this entry's purposes) might leave the party if the party decides to go to a region that tests attributes in ways that character will fail. 

So a tank isn't going to be effective against an opponent that is not susceptible to magnetism, because that opponent's decision formula will have other stronger factors. I don't know how that would be represented though. In a sense oppositional attributes would be most preferable but is there such a mix?


|  PERSONALITY_AGREEABLENESS      |  PHYSICALITY_AWARENESS     |  |
|  PERSONALITY_CONSCIENTIOUSNESS  |  PHYSICALITY_BRAWN      |  |
|  PERSONALITY_EXTRAVERSION       |  PHYSICALITY_COORDINATION     |  |
|  PERSONALITY_NEUROTICISM        |  PHYSICALITY_ENDURANCE     |  |
|  PERSONALITY_OPENNESS           |  PHYSICALITY_MAGNETISM     |  |

that is not oppositional right now that is just both lists being made available. Seeing agreeablesness and magnetism together like this does make me think that an agreeable person is especially susceptible to magnetism so I know above entries having me sorting out the like/dislike relationship between things but I think I am getting to it a little bit here. Each physical attribute has a personality attribute that it is dominant against and one that it is susceptible to and the other three are like, neutral or something. maybe degrees fo dominance/susceptibility if it works out. 

agreeableness dominates ... nothing. it is susceptible to magnetism.
concientiousness dominates ... nothing? it is susceptible to .. magnetism?

1239 this is not playing out as I'd hoped but at least it is a fast failure. I can't just say that conscientousness dominates brawn because how? that doesn't make sense. 

1256 so then for encounters

1306 got distracted. I don't remember what I was thinking about encounters. 

There could be magnetism-specific encounters. That's a negotiation and stuff. And it's a special case then? 

1308 so the thing I am hoping to achieve is to associate regions with attributes so then players modify the characters to try to get to them. 

but maybe that systematic mechanism is not as good as different types of encounters that eventually cover things off?


1310 OR entirely-ish different consideration: Is that too much flavour?

Another thing I haven't discussed in this repo yet but it is possible that this entire thing is best done completely generically. That's why I have difficulty tiers instead of experience levels and jobs like melee dps instead of rogue and fighter, to some extent it is about the system not about the flavour. 

In which case then biasing towards generic encourages me to just assign a personality and physicality to each region (one region with no bias) and then make just attribute-testing encounters. Not combat or traps, those are both generic, but oppositional interactions where one side is particularly strong in a couple and particularly weak in a couple of attributes. Build the system, don't justify it with realism or logic or anything else. 

1313 This is not to say that flavour is unimportant, but that flavourless (as in water, not vanilla) is also worth consideration.

1314 Also it allows for skinning in the future or flavour being added by the regions which has long been a consideration. So maybe there is a way for the Forbidden Forest to add flavour to encounters that test awareness and neuroticism.

1314 so this might be a big thing. Is it a one way thing? How massive is this restructure? Not very I think. There's some work involved but I don't think this is like a massive architectural impact decision. 

While a board is being built I can "deal" out the physicality and personality attributes. The no-attribute one is like, easiest or the most generic sort of loot and then above I have some relationships mapped based on tile distance. and the empty one is just neutral, so maybe ohhhhh the tile opposite the blank tile isn't going to have any weaknesses then, that's interesting. So like:

| Tile             | Opposite         | Personality         | Physicality   |  |
|  Left            |  Right           |  Blank              |  Blank        |  |
|  Left-upwards    |  Right-downwards |  AGREEABLENESS      |  AWARENESS    |  |
|  Right-upwards   |  Left-downwards  |  CONSCIENTIOUSNESS  |  BRAWN        |  |
|  Right           |  Left            |  EXTRAVERSION       |  COORDINATION |  |
|  Right-downwards |  Left-upwards    |  NEUROTICISM        |  ENDURANCE    |  |
|  Left-downwards  |  Right-upwards   |  OPENNESS           |  MAGNETISM    |  |

So in this case, Left is easiest and Right is hardest. 

1322 So does oppositionality actually matter? How would that be impacted? Implemented? 

One possibility is to uhhhh just blanked. One possibility .. is to 

1322 oh! have it impact the Mob generation roles. So actually yes this is probably the best? Or it modifies the encounters in some fashion based on those things, but in a combat scenario modifying the way mob attributes are generated makes the most sense. 

So Right-down is NERUO and ENDU, leftup is AGREE, AWARE.

So - right these encounters don't need to make narrative sense. It is not combat, it is opposition of a systematic nature.

So right-down is generated such that Mob neuro and endu is increased by some percentage, and agree and aware are decreased by some percentage. Up above I had something about likes/dislikes relationships. 

1325 one example of that is
```
left <- likes    -> left-upwards
left <- dislikes -> right-upwards
left <- opposes  -> right
left <- dislikes -> right-downwards
left <- likes    -> left-downwards
```

but my examples above are rightdown and leftup so 

```
leftup <- likes    -> right-upwards
leftup <- dislikes -> right
leftup <- opposes  -> right-downwards
leftup <- dislikes -> left-downwards
leftup <- likes    -> left-upwards
```

1326 There's only five rows which I was thinking was a mistake but of course the sixth row is just `left <- is -> left` so 5 is fine. 

so if I translate all that to attributes?

| Tile             | Opposite         | Personality         | Physicality   |  |
|  Left            |  Right           |  Blank              |  Blank        |  |
|  Left-upwards    |  Right-downwards |  AGREEABLENESS      |  AWARENESS    |  |
|  Right-upwards   |  Left-downwards  |  CONSCIENTIOUSNESS  |  BRAWN        |  |
|  Right           |  Left            |  EXTRAVERSION       |  COORDINATION |  |
|  Right-downwards |  Left-upwards    |  NEUROTICISM        |  ENDURANCE    |  |
|  Left-downwards  |  Right-upwards   |  OPENNESS           |  MAGNETISM    |  |

```
leftup AGR/AWA <- is       -> left-upwards      AGR/AWA
leftup AGR/AWA <- likes    -> right-upwards     CON/BRA
leftup AGR/AWA <- dislikes -> right             EXT/COO
leftup AGR/AWA <- opposes  -> right-downwards   NEU/END
leftup AGR/AWA <- dislikes -> left-downwards    OPE/MAG
leftup AGR/AWA <- likes    -> left              blank/blank
```

so a mob generated in leftup gets 
++ to AGR/AWA
 + to CON/BRA
 - to EXT/COO
-- to NEU/END
 - to OPE/MAG
 + to blank/blank

 So a party is going to want gear that defends against AGR/AWA and attacks against NEU/END

 1331 so this is a big chunk of work. And all of this as described won't have immediate impact on the game because there's no tile relationship stuff. 

 and higher difficulty mobs are probably going to have gear that mitigates their biggest weakness so going in the side door with in this case lke EXT/COO and OPE/MAG targeting gear is more effective in the higher tiers

 I am struck by the notion that the material a piece of gear is made from interacts with physicality, and the style of the gear impacts personality, such that gear also impacts two different things and then finding (or encouraging the creation of) gear that is the specific good combinations in opposition to a particular region are especially desirable. 

 perhaps it shouldn't be the case that gear dropped in right (in this example) improves both ext and coo. Perhaps gear increases 
 (region-aligned personality + random physicality) OR
 (random personality + region-aligned physicality)

 blank is a valid possibility, so it is a d6 chance

1337 leet! 

potentially tile difficulty plays into the random attribute selection by biasing the table or something like that. So a low difficult tile will often drop gear that is entirely region aligned but it is very low power gear. A high difficulty tile will only very rarely drop gear that is entirely region aligned but you could 

so then yeah, there's a bunch of work to do to pick and choose what the best set of gear to target a specific reagion would be. 

This tells me that eventually and relatively quickly the player is going to want 6 mannequins and those should get allocated relllllatively easily. Certainly have all 6 before a typical halfway point in the game right, it shouldn't be necessary to clump shit together in bags and update the single mannequin manually. So I'm not sure when they should be allocated but I guess each region would hold its own mannequin in a tier 1, 2 or 3 tile. 

but a mannequin for each region for each character? That's a pretty intense interface. Especially if there's like 6 parties with 36 characters roaming around! Complexity could get marvellously large! Difficulty stays relatively low but the challenge comes from volume of work/things to track

1342 Okay I like this. If there is a compelling reason to bias in favour of narrative I think all of this will still be structured in a way that is useful and once both the region/attribute alignment and tile relationship management work is completed then it will be a system that can be modified. The mechanics of attributes-driving-bias will persist this just is a big step in complexity and therefore perhaps enough of a step in complexity for some time.

1346 Okay I have updated project with references about the region/attribute alignment and tile relationship region/attribute alignment alignment. Or like, considering a region's impact before going. 

1348 So the immediate task ahead is region tile alignment. So when the Board is being generated and the regions are generated I need to shuffle and deal out personality and physicality decks onto the tiles. Pick one to be blanks and then deal clockwise from there.

And then the impact on mob attributes needs to be implemented, and loot dropping needs to be updated. notes are in project. 

I'm going to do some dishes I think. 

So first step when I get back: Look at Board and Region generation. 

1534 board generation. 

1536 board calls a "generateTiles" method that I am going to rename to generateRegions. 

1537 terminology: Region is one of six sections on the board. They are named for their orientation: Left, LeftUpwards, etc. 

Environment is a layer of flavour that is applied to a region. 

There are always 6 regions. Ideally there are more than 6 Environments, so that the flavour is different each time.

So a board doesn't need to generate regions. But it might need to flavour regions? 

It needs to configure regions. Each region gets an environment and a physicality (including blank) and a personality (including blank). Oh should it always be a blank blank region or should it be a chance that there is a blank blank region? I'm not sure. I'll go with whichever is easiest I think. I think that "wildcard" (or "null value" or whatever) should get dealt randomly... probably. I can see it both ways right now, there's an advantage to one particularly hard region, but also that makes some boards harder than others and that is kind of nice. roll that 12, I dare you. Or double 1s if you'd rather.

1616 region and tile generation is improved but origin town is nowhere to be found now. 
1618 okay fixed that.

It's not obvious to me that the game can be one but if it can then this is a good something or other. commit point.

1901 so where was I? regions are getting setup are they getting set up with everything they need? 

1905 it can run 2000 turns without - oh no there are some errors.

1908 eventually OriginTown's vend deck runs out, then the party's fucked. Each tile has 100 adventure cards right now so there's no way origintown can keep up.

1909 the party shouldn't choose to vend if they can't - and what does choosing to vend even mean any more with vendors that the player interacts with, it's probably not an action worth picking any more - 

1940 but this is not the time to remove - or disable - vending. 

1941 and eventually the party fills up the chest. So right now the game is not autoplayable to the end. I guess this might be a threshold change. If there's enough content for the game to be interesting then the chest is going to fill up long before the end can be reached. 

maybe there's something that can be done 

1945 but now is not the time for that. low focus.

1945 So region configuration is complete right? 

1947 which means my next action is `impact mob generation and loot generation`. 

I feel like I do need a Regions class or something that holds all the regions and can like, it's fine there's a fixed number 

1957 Right, Regions. 

2000 ohhhh my tests are not in good shape right now. I made a significant change to the rolls so now all my dice roll related tests are shot. frumble froo. 

2002 it is time to get off a commercial editor for this project. Well, not immediately, tonight is not a good night for that drastic a change but I need to relearn how to use vim and maybe even that window management thing for terminals. I usually just setup a bunch of iterm windows but doing it inside a single terminal session would be good to know.

I can't even remember the name of that tool though, sheesh.

2004 tmux! a multiplexer! sheesh again. 

anyway I like those sorts of setups maybe I can do something good with that. 

2006 but not tonight. low focus!

2006 working on Regions class. 

No, working on tests. Trap flow changed. This _is_ an okay time to try to rethink how this stuff all works. It is so untestable right now, all of it. 

2007 okay if I am changing encounters soon to be attribute tests then Traps and Combat are on their way out at least for a while and that has made me really quite excited!

When I was talking to Jen earlier today I said something along the lines of "me using my intelligence to attack you and you defending with your brawn doesn't make sense" - probably really not very much like that at all but that notion of my two strengths versus your two strenghts. And I think it _does_ work. Because if the job is ranged dps and the character uses their coordination and extraversion to fight against another characters brawn and openness well, that is like Incredible Hulk fighting Quicksilver or something like that. They are not equally matched! But it is not immediately obvious who would win. 

This feels like it is a huge levelling up in my understanding of what to build. An inflection point! Combat and the traps are so fucking clunky right now and this builds on the existing systems and ties encounters much more into that. 

So I've circled back a bit to attributes defining a job but I think I disproved the feasibility of that above but if I ignore the need for narrative at present then it is okay. 

strong physicality traits probably implies melee. well, high endurance and brawn. but high coordination and awareness is a rogue/melee dps but also a ranger/ranged dps. extraversion perhaps doesn't influence job? So maybe job is only based on physical attributes? 

Perhaps instead of job it is combat role does that change thoughts? I'm not sure. Maybe just neuroticism determines melee or not but that's unfair it's not the case that an archer is absolutely an archer out of self-protection but because they're a good fucking archer. it's a useful skill. a mage is going to stay out of melee because they have not been trainingn their body they've been training their mind. concientousness perhaps. a highly concientous person is likely to be a good mage because that requires study and discipline? 

2017 but then what about a natural magic type. Narrative isn't the goal right now but it helps me map onto the combat role better. it is still however justification. Role doesn't matter, this might just be a darling, fuck. 

So the role doesn't matter position might be: If encounters are entirely about testing one character's attack against another's defense, and both characters get to use their best attributes in each case, then what do things like melee dps and ranged buffs even mean? 

that's combat system: the game or something. 

fuck this is a big piece to rip out. perhaps and probably not mechanically but just, conceptual. But I already ditched race/species and that didn't feel this big. But combat isn't an explicit thing. That's flavour. Narrative is not the thing right now. 

2020 And if it is a wrong decision then the roles (and species even) can be reintroduced at some point when their value is better understood. 

2021 still don't like it. I don't hate it but my immediate reaction is that there is a diminishing. But that's the thing that needs to happen! Rip shit out and put it back if it turns out to be important but I can't think of an argument against doing it other than that I think I'm clever in reducing combat roles down to those two range attributes and three role attributes. 

That's not generic, that's reductive. 

I've just created a billion other - well okay whatever like the number of combinations of attributes is which I think is earlier in this file but I'm not going to worry about it. 5! maybe, that's 120 instead of 6. but all of them attack and defend with their best selves. 

But sometimes their best selves is ineffective. If their best defense is an attribute that isn't being attacked then. 

hmm I'm not sure about how the test works again. mobs are going to have attributes that bias in favour of the region's attributes and are weak in the opposing ways but 

so then characters always attack with their best attribute against that attribute of the opponent's. Brawn vs brawn. Openness vs Openness. 

So if left has [agree/awareness] and right has [concientoussness/brawn] than a mob spawning in left probably has:

- higher than average agree and aware
- lower than average conc and brawn

so my characters start exploring that region and their tile relationships start becoming biased. count the types of attacks of the mobs. if most of them are aware then the character's aware should be high so the player can then equip helm of increase aware so that they defend better. 

and weapon of 

shit I'm eliminating health? no because these are just hits.

and if the opposite region is known to the player they know to equip weapon of brawn because it is more likely to be low until mob gear of quality starts being a factor

2031 so then health. there's formulas above from earlier today that track damage and stuff. my brawn roll is 50 units higher than yours so I do x damage. The attributes aren't changed. 

So there's still space here for things that modify the attributes of an opponent. buffs. heals too. how does that happen without the concept of buffs? (debuffs are a type of buff)

It doesn't yet. But that at least is one thought in support of retaining Jobs - which I'm more and more inclined to excplicitly call combat role. 

but that can come another time. I think it is a very good starting point to put the attribute testing encounter in place in some fashion. 

There is still need for initiative? No because that is notionally baked in to the idea of attributes interacting with each other. 

This makes combat for parties larger than one character weird though. One v One is no big deal because speed is represented as coordination. 

I don't have a specific speed attribute. I'm mostly okay with that, I think it is a function of coordination and endurance probably. If a character has high coordination to avoid tripping, brawn to propel themselves and endurance to persist they are a fast runner. 

2039 right? like I think they have to be. 

so what is the actual code work I can do now? Tests! SHEESH

So I can comment out the whole of Test.spec.js. q

20221211 1339 okay I didn't do much after that last night but the test suite passes now. Since that is working what was the work I wanted to be doing but was blocked by? `  - * impact mob generation and loot generation`

Right, tile attributes. I was making a Regions class to encapsulate a bunch of the region logic that's going on, because having the impact on attributes that I'm hoping to have is going to have to do a bunch of "what are the attributes of the other regions and how does that impact which stats I modify by how much?" 

1515 okay, Regions class. 

1519 So I moved the regions array from Board to it and populateRegions fails because it loops through the regions. 

Do I call something in regions and pass in the things it needs? Sure maybe why not.

1520 I don't even need to call something, this should happen in the constructor

1531 okay I have a Regions class

1534 what next? `- * impact mob generation and loot generation`. I needed regions to get attributes setup properly. I have Regions now. None of that functionality is implemented but I have a place for it. 

So Mob generation. 

1539 I dallied in a command line setup for a few moments and struggled to remember how I did those things. I am still struggling and I am retreating to the gentle comfort of the lazy tool. The thing I was just struck by is how much configuration I will need to do to get vim to a place where I really feel strong in it again and that is an interesting effort and perhaps I'll wind my way there eventually but there's a lot I'm willing to give up for ease I suppose. Also familiarity, my muscle memory is much less vim oriented these days. 

I'll keep chugging though. I do have a dotfiles repo that I might be able to poke around with again.

In bursts.

1541 Mob generation. 

1545 Right now mobs are generated by way of static methods based on tiers which call the constructor with small functions to calculate physicality and personality. Right now these are simple die rolls, low tiers get low die rolls high tiers get high tier rows, etc. 

1553 I had tricked myself into thinking that the site is being updated with pushes but no, none of that is in place yet so while the game is published the live version is quite a bit out of date. I have a process for doing that but since it involves server stuff it isn't anything I'm going to get into here. Eventually I would like to use whatever GitHub's CI/CD tools are but today is not that day either.

1554 So if mob generation needs to take into consideration the region they are in.. how? 

1555 it is called from Tile so I can pass whatever it is I need. The region, I guess. 

1557 probably a factory or builder pattern is better for all this but for now I've just started passing the region into those static methods. 

1558 I don't calculate personality attributes in this process at present, I leave that to chance in the character class. 

So the constructor generates the resources and physicality stats, and eventually the personality ones, based on the methods passed in. These are basic: 

```
		const mob = Mobs.template(
			() => Dice.d4(),
			() => 10 + Dice.d10(),
			'Tier 1 Mob'
		)
```

so resources start 1-4, and physicality resources can be in the 10-20 range. 

1601 stalling out a bit. This generation mechanism needs to change. 

So maybe given a tile, a mob should generate itself. 

1603 a mob is a thin wrapper around a character. So a mob generated in tile -101 (immediately left of origin) gets flavoured by the tile's environment and created with consideration for the region's attributes and relationships. 

So like, `agreeableness = region.modifyAttribute(Attribute.PERSONALITY_AGREEABLENESS, agreeableness)`

That smells okay to me. 

1610 oh wow I just learned about the HEXACO personality model
https://en.wikipedia.org/wiki/HEXACO_model_of_personality_structure

HEX

this will probably necessitate a change. There's a physical attribute I've been thinking of a lot too. speed maybe. it's much simpler than brawn+endurance+coordination. 

so maybe. 

this might be more trademarked than CANOE though. 

1618 I'm not sure how to determine that and it's a challenge, you guessed it, for another day. 

For today I still need to figure out how to have regions modify attributes. Or rather, implement the idea I had above, region.modifyAttribute. That's going to be big and gross probably isn't it? 

1620 
```
    modifyAttribute(attribute, value) {
        return value * this.modifiers(attribute)
    }
```

ha, so nope. oh that should be an array. BUT I need to set that array up still, during construction. 

1628 so how to setup the modifiers. Nothing changes resources so they all get set to 1 but right now all the others do as well and I'm not sure how to make it better than that. 

so a region has a physicality attribute, and its opposite region has a physicality attribute. 

This region's physicality attribute modifier should be * 2, and the opposite region should be / 2. Then the neighbours get an increase of * 1.5. 

it is an interesting initialization problem and I'm not cracking it right now. 

1632 I setup a property for opposite in the base regions template. So there are some relationships in there: 

```
baseRegions[Hex.LEFT_WARDS] = {
    color: 'pink',
    stemDirection: Hex.LEFT_WARDS,
    upDirection: Hex.LEFT_UPWARDS,
    downDirection: Hex.LEFT_DOWNWARDS,
    opposite: Hex.RIGHT_WARDS
}
```

so, ups downs and opposite. up and downs get the 1.5 modifier, opposite gets the /2 modifier, opposite.up and opposite.down get the /1.5 modifier.

1643 shit, okay. The hex constants I was trying to use are actual hexes, not like a string that is "LEFT UPWARDS" or suchlike. 

that might complicate things in that I need to specify `.id` in places but it will still probably work out, the references just need to be unique within the scope of the regions. 

1647 ugh. so this all depends on 

2026 back here. It's an object, not an array because I'm populating it with keys. There's no iterating across that. 

2032 this.opposite is undefined. I don't really know what that means yet. 

2041 getting close, but this is the current modifiers output: 

```
      done a region [ PERSONALITY_OPENNESS: 2, undefined: 0.5, PHYSICALITY_AWARENESS: 2 ]
```

2057 instead of updirection and down direction maybe like, clockwards and anticlockwards? 

2058 oh right I can't get the personality and physicality of the upwards/clockwards one because it gets set after this one. I'm trying to meddle with the future.

2101 I think modifiers are mostly correct now. 

20221213 2001 not here for a long time, working on CS with H. Damnit I just had something actually worth noting down. Oh right! I"m going to have to build the new encounter type too.

20221215 1922 another cs session shortly. I did get that item into project.md. 

working on 

1926 working on something with regions and getting the modifiers from the regions. oh modifiers are mostly correct I thought so I need to roll back a bit further to figure out what to do next.

2011 Are the modifiers being applied? 

2013 this is happening during mob generation, theoretically. 

Should happen during character generation, get a starting region or starting tile or something. 

Hm. Starting the character not on origin town is interesting. Have that initial first combat and also that sets them up as a member of that region. I noted the other night, perhaps not in this file and just to myself, that having this effect on characers might be interesting. 

2022 apply region modifiers to mobs, that's the next step

2209 uhhhh things are a bit exploded. fix broken tests. want to get region into Tile, it used to just take environment so need to make sure I'm sending right things to right places. 

20221216 1944 I heard about codeberg.org today and tried using it and I got caught in some weird activation code error, where the activation codes I get sent are immediately inactive. I'll give it a try another time.

20221217 0937 not going to get far today, only 10 or so minutes. Tests are failing and app isn't launching. Maybe try to sneak a push out if I can stabilize things. I got approved on peoplemaking.games last night and posted some things and the visible version is very out of date so it would be nice to get a bit more up.

0942 oh, okay. So `Tile.origin` makes OriginTown, which is an environment. But I'm trying to pass regions into tiles now because there's more than just the environment that is worth knowing. So this structure doesn't play nice because OriginTown is an environment. 

So there should also be a Region for OriginTown? Probably. 

0950 Oh and the tile specs are passing environments in rather than regions. So that's where to pick up next. I changed the construction of Tiles such that they are constructed with a region instead of just an environment but there are secondary effects from that change left to resolve, especially in the tests.

20221218 1149 right, region instead of environment.

1822 things are stable again, published a thing. Have my mastadon account and told eft about it and in theory perhaps a couple of people who aren't me have looked. There just isn't much to do though. 

1823 so what to do next. impact mob generation and loot generation is the current project and so.. Mobs.js again.

1925 okay, the modifiers are being applied to mobs. I think it works fine but it's not super clear. There's so much I need to change to be aligned to region attributes.

1929 the next thing is having region modifiers impact loot generation. I'm inclined to look at encounters though. 

1931 so how does the thingamajig work. Encounters? 

1935 it is part of party progression, after they decide the adventure action and draw from the adventure deck. 

The adventure deck is setup in each Environment, right? 

1936 just in Environment.js right now.

So okay, going on an adventure.
the adventure tests attribute and attribute
character defends with attribute and attribute
defense fails, character takes damage
defense succeeds, character resists damage
character attacks the adventure (this doesn't make sense, a mob or something more) 

1937 I have some thoughts above about how to generate mobs in thi.. or like, how these encounters go maybe.

1946 I never landed on clear combat changes. But fundamentally, characters need high defense in the region's attributes and high attack against the region's most vulnerable attributes. 

Region LEFT_WARDS 
personality CONSC
physicality AWARE

Region RIGHT_WARDS
personality OPENNESS
physicality BRAWN

so those two regions are in opposition. 

If a character has high openness and brawn and good defense against cons and aware, they should want to explore the left_wards region. 

I do eventually want to make higher tier mobs defend against their weakness in some fashion or another but that can come later, for now everything's super stereotyped

2003 SO the way to revamp encounters is to what. Make them just that single competition? No, everyone should still take turns but how do things resolve

I mean just in party order would work. each character in the party goes, each mob in their party goes. players first is a bias but that's fine probably? 

2005 I am resisting an initiative order because that is a test of attributes.

It is okay if attributes do other things though. 

Maybe if I just sort the list of actors by roll * coordinating%

It's dramatically more simple. 

2010 okay stepping away for a while. Making a new Encounter, TestAttributes. Pass it tile and the party. make mobs in the existing fashion, cycle through everyone attacking each other, yadda yadda. 

2150 maybe a touch more

2153 so the encounter gets instantiated in Environment.js when the deck is created so I don't know the party yet but it is an encounter for a party so that is what I can do.

2201 have a structure in place. lots of messy but it's going in the right direction overall still. Encounter.runForParty has a nice ring to it. 

So what does this attribute testing encounter do? 

It's run like a simple combat loop. So it is necessary to do decide who goes first. Classic initiative is roll the die, apply modifier, fastest character goes first. 

Simplest implementation for now is party order then opponents order. Will make party order interesting, eventually, at least. 

Simple sounds good for now. I am still concerned this is eliminating the need for health but it's still of use for now I think. 

2205 I have an opportunity to generate mobs during board creation here. I like some run time randomization though so I'm going to stick with this. It is pretty straight forward to extract I think, should I change my mind eventually

2215 stuck a bit. I pass the party but the party only has character ids, and I need the full character store to look things up. Or at least a list of the characters. 

Sleepy though. night.

20221219 2155 I had a thought today that encounters are simply all the attacking party's modifers for the combined strike and all the defending party's combined value for the defense and it's actually like both defense and offense, the winning modified roll wins it all.

It just rips all the combat and jobs and everything out but all that shit is too much for what the party is out there doing anyway.

the whole combat and encounter stuff just feels bad. 

2202 
2204 okay how about party attacks with one dominant attribute? 

hmm. this might oversimplify. haven't made any changes yet but. 

It would render health nothing which isn't itself a big thing but there's something about the back and forth that feels like it's more of a test?

There are two attributes, a personality and a physicality. Party wants to attack with something different than those because mobs in this region are generally very high in those attributes. 

Okay so like, Quicksilver vs Hulk. Quicksilver rolls based on their best two attributes - magnetism because he's witty? and coordination for speed - and Hulk rolls on theirs - brawn and neuroticism, say. 

Boil it all down to two numbers? 

Oh, the party doesn't attack given its strengths, the _party_ does. X-Men doesn't use openness and endurance, each X-Men member uses their own best attributes and a roll. All percentages right? .72 * .61 * .92 type deal roll times personality times physicality

that's a good starting point and it feels like a good level of combat abstraction. I think I like this a lot. but now it is late and sleep beckons. 

1904 okay time for other things for a while. Left off calculating encounter scores in Encounter.js. Error in browser points to next action too.

1944 just wrote:
```
				if(charactersEncounterScore >= mobsEncounterScore) {
					// characters win, Distribute loot
				} else {
					// characters lose. impact?
				}
```

if there is no health there is no need to rest. well, energy I suppose. but what if there are no resources? rip rip rip. hrm. gets rid of food. is there a use for potions any more? 

but what is the impact of losing? Some things might be losing gear. or currency. 

I like the different pieces though. 

1946 so for now I am going to leave them in, even if health never changes and food is never consumed. I will take them out when it seems right to or when I no longer hold attachements to it. Or I'll figure out how to make it interesting. 

But for now, I will say if the party loses they need to like the tile less, want to have better stats with the qualities of it to go there and get moved one tile towards Hub. they get pushed back. 

Health can still be of value, a lost fight might just be lost health, and there's the energy cost of moving tiles into those spots that you lose if you get pushed back. So there is potential utility for those still.

20221221 1409 vacation day today so a bit of extra time. Working on resolving the new encounters now.

1411 so I am at a point where I need to figure out how to represent victories and losses in a tile relationship. 

A victory increases desire. A loss decreases desire. 

If a character is victorious in an encounter then they should want to come there more. 

So one way is to track the stat that they lost against. The personality stat and physicality stat of the tile become like... thresholds?

So `tileRelationship.thresholds.personality` or somesuch shape. 

So if I lose to a "70" - although that can't happen with the way scoring is happening and modified so this probably won't work but get it out of my brain at least. 

So if I lose to a 70 AWARENESS then tileRElationship.thresholds.personality.attribute = AWARENESS and personality.threshold = 70.

So if my attribute AWARENESS is lower than 70, I am disclined to go to this tile. There might be other more compelling reasons that overload that but if my awareness is like 5? Fuck that noise those people are going to _trounce_ me. 

1417 hmm. as written, this encounter scoring mechanism doesn't pit the character's best attributes against the region's.
```
				const encounterScore = (score, character)  => {
					console.log("a loop with character", character, currentTile, score, currentTile.region.personality,
					
						character.getAttribute(currentTile.region.personality)
					)
					return score
						* character.getAttribute(currentTile.region.personality).current
						* character.getAttribute(currentTile.region.physicality).current
				}
```

this is calculating how well all the characters do with the region's dominant attributes but Hulk v Quicksilver dictates that each character use their best attributes. So I need a getBestAttribute or something. 

1503 I haven't been focusing, but that's what days off are for. I am thinking about how to set the threshold and I guess if the character loses in a tile that emphasizes AWARENESS then their awareness is too low. 

A narrow defeat might encourage the character to go back, or only increase the threshold a small amount
A moderate defeat might increase the threshold by.. 5? 
A resounding defeat would set the threshold quite high probably

Size of defeat can be measured by the difference in encounter scores probably. I don't know what that range mioght be but right now for example with seed 20 the first fight's charactersEncounterScore is 21168 and the mobsEncounterScore is 7200. So that's a times 3 victory that seems pretty solid? BUT ALSO I don't know what the possible range is like, really. What happens if I put a brand new character in a tier 6 tile? I don't know! Something, probably. It would (and should!) be a huge gap though

I get so far from things through the code though right? Like the part does an action and it goes into encounter which goes into character blah blah blah. 

1517 adding this to TileRelationship:
```
		this.attributes = {
			personality: tile.personality,
			personalityThreshold: 0,
			physicality: tile.physicality,
			physicaltyThreshold: 0
		}
```

1605 okay so I'm just going to modify them by 5 in each direction and then I guess gear score should be calculated with this? Or gear score is entirely useless and like there's an encounterConfidenceScore or something like that?

Well, I'm just going to leave it as gear score for now because it really is the result of a character's gear and such. So yeah, this is a gear-gated progression game. 

1608 this simplifies gear score _so much_. dang that's good refactoring.

1610 hmm. So one way to do gear score is if charater's personality trait > threshold then good, else bad. That is the simplification I had in mind when complimenting myself there. 

The complicating factor is the way tilerelationships store character data. Like, a character has tile relationships right, so I don't want the entire character stored in the relationship because then all the relationships are also in there and blah blah blah. circular references amirite?

so for gear score calculating I was looking at the tier of each piece of gear. Now I just want to compare two numbers basically. But I don't store those numbers oh oh..

no. damn. it has to get updated every time so I need to keep something in progress right?

Okay yeah so fuck it, I'm just going to store the character's personality and physicality all the time too. There's definitely a better way to capture and maintain this relationship but this is what I am doing anyway. 

I guess arguably character should calculate a bunch of shit or whatever is necessary with all of its attributes in its progress, then pass that along down to the tilerelationship's progress. but it's easier for now to let tilerelationship know a bunch about character than the other way around. character's already fucking huge.

1626 regions can have null values for personality and physicality. If a region doesn't have these then it needs to create mobs without biased stats. So it is just a .

huh. What to. Okay so the null region is a special case that will happen every game so it's not that special but it is different than the others. 

If I'm in a region without any specific stat and I win then my gear overall is good, and if I lose than I guess my gear overall is bad? 

Okay so maybe I need a threshold for all stats instead of just the region's favorites. If I don't know anything about the region I can make some guesses based on gear quality which is how things were being done before when I was crowing about how simple I'd made things. 

well, time to step aside for a while, so I guess I have something to ponder as my evening begins.

2109 Averages. I keep forgetting that some things should be averages, and I think these encounter scores should be.

And if a personality or physicality is null, then the character just uses their best personality

2211 okay, things are working right now in that they aren't crashing but encounters don't fully replace combat yet and so like I think things stall out

2213 committed that so but what do I need to do? step through from party progress I guess? 

2216 oh look at that an infinte loop in Encounter.js `while(loot.length > 0) {`

2226 ohhhh I forgot that loot is an object: `return { items, currency: this.currency };`

2237 hmm, high neuroticism is good according to this model. That's not a super awesome thing necessarily

2238 okay working on Encounter, need to allocate currency. How do I do it in Combat? 

20221223 ???? sometimes I don't want to record the time I guess. 

I'm doing a thing. Encounters are run, Items modifyCharacters. 

???? might be something going on with how destination tiles are selected but that's all in the process of being changed anyway so I'll get to that eventually.

20221225 1113 
1124 okay so the thing I was doing with extracting functionality from the encounter went poorly. I definitely need a stronger and consistent style. am I doing functional programming? Uhhh I mean really not even close anywhere. Am I doing OOP? not really either! so, figure something about that out. make it more testable especially things are just so clunky in that regard.

1125 the party can be victorious but they can't lose properly yet. Oh I'm not sure currency is being allocated

1130 okay currency is allocated better. 

1131 the party eventually stops exploring tiles and it looks like that is because the deck is empty but maybe the card information is wrong? I don't know.

1132 argh. I had a small todo list mentally assembled and started adding it to project and fwhoomp there it went. 

1133 it pr updating character tile relationships in each of those cases

I almost wrote about it instead of doing it. 

1135 this is a really big refactor and sometime soonish the dishwasher is going to finish and I'm going to spend a bunch of time working on a turkey dinner and then probably play videogames for a while so it's not going to like... do much. I'm not sure what do much means here but it's a big hard thing that is going to move in small pieces I think and none of them happening soon. This is a week off work though and so I do hope to move the needle. 

1136 This is a big piece and I'm excited for it. I'm more and more content with entirely losting Combat and Traps - I think I removed them a commit or two ago. Eventually if there's a skinning system to like make an sf thing maybe that skin can figure out what to call the job with high Openness and Brawn or whatever but that is not at present my concern.

1137 more generic more better and all that.

1140 So I'm a little blocked because the party decides to hit tile whatever left-downwards is and just stay there resting. It's a motivations balance issue so it isn't super great but I can't work through the loss case. 

But I guess I can work through the win case and the motivation changes of different equipment and see how that changes party behaviour in this scenario. Losing does already call the defeated whatever in the relationship so lots of changes can take place 

1142 so the personality and physicality thresholds are changing. Gear score calc is where this should impact. 

1948 a bit of time to poke around. calculateGearScore is a mess, I was in the middle of things there

```
		// if the character's attribute is higher than the relationship, then it is good.
		const characterPersonality = this.tile.region.personality 
			? this.personality.get((this.tile.region.personality).apparent)
			: this.getBestPersonality().apparent
```

I dont think this makes any sense. 

So I'm consider a tile. I have a relationship with that tile. I know that that tile's personality trait is OPENNESS and physicality is BRAWN. 

`this.tile.rgion.personality` might be null. If it is, then get the character's best personality score. If it isn't, get the character's score for that attribute.

The character has a threshold. if a character is defeated that threshold is increased by 5. That can probably be changed perhaps depending on how sound the defeat was, which is discussed above, but for now it goes up by five when the character is defeated.

So tile101's brawn threshold for a character is 0 because we don't know anything else about the tile. We lose, it goes to 5. 

Next time the character considers that tile, if their BRAWN is > 5 then they are comfortable going there. If it is < 5, they are not.

The initial threshold should probably be their attribute score. 

1954 If the character wins, it goes to -5, or ([character's attribute value] - 5) so we are comfortable going there. Long term this should be some sort of arc where only just surpassing it makes it highly desirable, just missing it is cautiously interested, and badly missing it or resoundingly higher than it are like, too scared to go and too bored to bother. 

2120 thresholds are being primed with the character's average personality and physicality. Not the best, but better than nothing. Oh that might only be in the case whereumm. something. is missing? where did you go brain

2121 only in the case where a tile doesn't have that trait? 

20221226 0817 today might be a progress day. It might also be a Cyberpunk 2077 day. 

But what I'm working on was tile relationship. I got that initial threshold in place 

20221227 0911 I woke up this morning thinking about project structure and architecture. This project is do for a massive architectural overhaul but I am not really up to speed on what that looks like in modern javascript and truly I've never really had a strong opinion about how to do things and without benefit of other eyeballs on my work tend towards a mishmash of styles and conventions based on whatever I feel like in the moment I'm writing things, and whatever it is I can bang together to make behaviours that resemble what I want. 

That's going to continue, this is still me, but I do want to start moving towards something. 

There's a lot of bad information about javascript in the world and it's hard to find discussion of conventions that I really feel great about. I'm inclined towards functional programming - there's lots of parameter copying throughout the code at least - but not very good at it. 

0914 Anyway I found these two references. I haven't gotten into them substantially but they're referenced from a couple of independent branches I went down and based on some critique of Eric Elliiot's work which I've found very useful over the years so that but even better is a compelling argument.

https://mostly-adequate.gitbook.io/mostly-adequate-guide/
https://github.com/getify/Functional-Light-JS

0917 both are books so will be longish term things to work through but 

0957 that mostly adequate book is missing all its subsections. oh, no, they're just presented weirdly

1400 so what work am I trying to do? Another Great Refactor. Get attributes working as tile influence. Encounters impacting relationships

1401 scrolled up. gear score, thresholds, etc. 

1403 game flows okay but party still gets stuck resting on left-downwards. down-leftwards. 

character's health alternates between 5 and whatever amount it gets healed. 

It is weird that health is changing at all. 

1404 I think above I postulated that this behaviour would be fixed when all the tile relationship stuff was done and that it was better to wait. I think that is still the case, though I do not believe that it will be cleared up by unravelling all of this, I think it is some other problem I've introduced. 

1406 okay so all the old flow stuff is in there for gear score too. 

gear score is amultiplier, so it needs to be 0+ not 0.0-1.0

20221228 0820 I'm hoping today is a productive day.

0825 not just with this, but I'd like to move the needle on this rework again. there's been some good steps but it's been a couple of days of Cyberpunk 2077 and that will continue to be the case for a while. 

Gear score is the thing. 

0826 `gear score character stats 28 36` and then the two objects. that's outputting the character's value for the personality attribute in question and the physicality one in question

0851 https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch03#oh-to-be-pure-again

this discussion of function purity (which is a bit of a barfy name but that's not math's problem really) is a good one. 

```

// impure
let minimum = 21;
const checkAge = age => age >= minimum;
​```

it is impure because something else can change minimum, that's an external dependency. That's a notion of functional programming I don't think has registered before. 

I am glad this is basics but I'd also like to see something that is like "here's how to turn a large scale oop project into a large-scale functional project over time". I guess this will sort of be that, although it's not starting from a particularly strong oop state. More like an oopish mess turned into something clean. I hope, eventually.

0854 So gear score though. I need to eat sometime soonish and I want to do some non-this work after around 10 or so so there's not too much time right now. Gaming time means less project time and I know that and that's a trade-off I have to be okay making. I'm excited for both and I don't want to completely lose this thread.

So the score is getting the character's two stats. It needs to find out if the character's gear is better or worse than the tile's thresholds.

0907 so, better gear scores coming. probably not done but it's hard to say without really knowing what the actual system is supposed to be. 

In my head lately I've been working on a clever analogy for the project. The model train room is very appropriate but it somewhat implies more forethought than I actually am bringing to the table here. So what I've been working on is that it's like a gelatenous cube that I'm trying to sculpt into something. There's no firm edges anywhere.

1556 so I think at this point there's no getting around the stuck-on-left-downwards issue. That should reveal what I've missed. There's consequences of failure as well but that definitely won't impact this behaviour. Will be interrupted again soon, this wasn't a strong imtg day necessarily but was good for other things.

20221229 0935 it's not going to be a week of focus on this and I'm just going to stop talking about that here. So what's up with that demand for rest on left-downwards.

0936 I have a big console.error outputting "returning unlimited deck size is that on purpose" that is probably worth looking into as well. I'm certain it was, but while converting to Encounters I probably left a lot of cruft from Combat and Trap as well.

0938 something is generating 999 cards? did I make a loop? yes in origin town so that there would be effectively unlimited rest and vend cards. okay so yes it is on purpose. so I should just ditch that error.

0941 it has been long enough since I looked at /sheet that I can't remember which numbers are factoring into the next decision and which ones factored into the decision that just took place. most of it should be _current state_.

the whole messy state thing is another reason I want to keep working on understanding functional programming. clean state transitions please!

0948 
```
Adventure: 0

Rest: 0.7290000000000001

    -110
    -110

Vend: 0
```

so like, that's why. adv and vend scores get stuck at 0.

so something is probably multiplying adventure score by 0 or some such sort of event.

0953 the party member has an adventure score in their vote but it drops to 0. because of cards in the tiles maybe? something in the tally process.

0956 So the character is choosing -110 (down-leftwards/left-downwards - the latter, just confirmed and want to get consistent. left or right side first because hexes are pointy up) for adventure even though there are no tiles on it. I still suspect this is related to how I swaped in Encounters because the deck shouldn't be empty but I want to make sure that putting 100 cards in the deck isn't just masking something.

So why does the character choose -110 as best for adventuring?

0959 size of deck doesn't really look like it contributes to the desire-related scores:
```
capacity
  1
  distance
  0.3333333333333333
  nrg
  0.3666666666666667
  ger
  1.2100000000000002
  hth
  1
  sat
  1
  overall
  0.44366666666666676
```
if I do the math:
1 * 0.3333333333333333 * 0.3666666666666667 * 1.2100000000000002 * 1 * 1 = 0.1478888889

so why is overall score not 0.1478888889?

1002 I don't know that it is related but choosing the best tile for an action dampens based on distance but arguably the energy score should be doing that?

```
			// Dampen the score based on the distance
			const tileDistance = this.currentTile.distanceFromTile(tileUnderConsideration)
			const distanceDampener = 1 - tileDistance * 0.1
```

1004 yes, in TileRelationship calcenergy
```
		const energyScore = multiplier * this.scores.distance
```

and calcdistance:
```
return (distance === 0) ? 1 : 1 / (distance + 1)
```

