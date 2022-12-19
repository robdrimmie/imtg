<script>
    import {started, won } from '$lib/stores.js';

</script>

<div class="about">
    <article>
        <p>
Hi. My name is <a rel="me" href="https://peoplemaking.games/@robdrimmie">Rob Drimmie</a> and this is <strong>Inventory Management: The Game</strong>.
</p><p>
You don't control the characters in this game. The characters move around on their own, 
making decisions based on several factors. One of those factors is the gear in their 
inventory, which you do control.
</p><p>
It feels generous to call this a prototype, so don't expect to enjoy yourself overly 
much. There are a bunch of systems that are implemented but they are all implemented 
in extraordinarily naive and buggy ways.
</p><p>
I am working on this because I find working on it enjoyable. To the extent that I can explain my
relationship with it, the best analogy I've found is a model train set. With like, a room
dedicated to it. The room is pretty barebones at this point through, there's no fake grass or 
houses or tunnels but there's like a complete loop and a train that goes around it. There's a 
few boxes that might one day be mountains and part of the table is painted blue but this is the 
kind of train set that just barely meets that definition.
</p><p>
In that fashion, this is technically a game in that there is an objective that can be completed. 
The character has a Win Condition item equipped as their boots. The character will keep exploring
until they find the special tile to return it to, at which point the game will immediately be
completed. Don't move the Win Condition, there's a bug that will break things in non obvious ways
for a while and then very obvious ways if you do. Characters can't die right now, so it is very 
difficult to not win, it's just a matter of how many turns it takes to get there (way too many).
</p><p>
There are a <em>lot</em> of other bugs too. For display related things, toggling between modes can help. 
For others, well, sorry about that run.
</p><p>
There are plans but they are mostly buried in a 15000+ line markdown file that I have been keeping 
as a dev log. Some of the earliest next steps at this point include improved tracking of those plans which
could lead to improved communication of them as well.
</p><p>
What is present here is the very basic systems and their very basic interactions. And, uh, no 
information on how to use them. Oh, and there's no persistance. If you reload, you lose all progress
as a new randomly generated world is created. 
</p>
        <p><strong>Press any key to start</strong>, and also when you want to progress time in game.</p>
    </article>
    
</div>

<style>
.about {
    background-color: #c5decdff;
    position: absolute;
    top: 0;
    left: 0;

    height: 90vh;
    width: 90vw;

    padding: 5vh 5vw 5vh 5vw
}    

article, h1, h2 {
    background-color: #c5decdff;
    overflow: scroll;
}

p {
    line-height: 1.5em;
    width: 60em;
}

strong {
    font-size: x-large;
}
</style>