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