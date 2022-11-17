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

