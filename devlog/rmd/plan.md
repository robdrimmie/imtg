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

