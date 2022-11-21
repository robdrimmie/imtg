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

