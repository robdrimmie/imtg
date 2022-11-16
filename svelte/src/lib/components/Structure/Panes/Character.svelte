<script>
    import CharacterDetails from '$lib/components/Content/CharacterDetails.svelte'
    import { characters, selected } from '$lib/stores.js'

    $: character = $characters[$selected.character]

    $: () => {
        console.log(character.job)
    }
</script>

<div class="character">
    <div class="name">
        {character.name}
    </div>
    <div class="job">
            {character.job.name}
    </div>
    <div class="health">
        health {character.getHealth().current} / {character.getHealth().base}
    </div>
    <div class="energy">
        energy {character.getEnergy().current} / {character.getEnergy().base}
    </div>
    <div class="satiety">
        satiety {character.getSatiety().current} / {character.getSatiety().base}
    </div>

    <!-- 
        // RMD TODO there's a better way to make these. Make a small component and loop through them or something
    -->
    <div class="stat agreeableness">
        <span>agreeableness</span> <span>{character.getAgreeableness().current} ({character.getAgreeableness().base})</span>
    </div>
    <div class="stat awareness">
        <span>awareness</span><span>{character.getAwareness().current} ({character.getAwareness().base})</span>
    </div>
    <div class="stat conscientousness">
        <span>conscientousness</span><span>{character.getConscientousness().current} ({character.getConscientousness().base})</span>
    </div>
    <div class="stat brawn">
        <span>brawn</span><span>{character.getBrawn().current} ({character.getBrawn().base})</span>
    </div>
    <div class="stat neuroticism">
        <span>neuroticism</span><span>{character.getNeuroticism().current} ({character.getNeuroticism().base})</span>
    </div>
    <div class="stat coordination">
        <span>coordination</span><span>{character.getCoordination().current} ({character.getCoordination().base})</span>
    </div>
    <div class="stat extraversion">
        <span>extraversion</span><span>{character.getExtraversion().current} ({character.getExtraversion().base})</span>
    </div>
    <div class="stat magnetism">
        <span>magnetism</span><span>{character.getMagnetism().current} ({character.getMagnetism().base})</span>
    </div>
    <div class="stat openness">
        <span>openness</span><span>{character.getOpenness().current} ({character.getOpenness().base})</span>
    </div>
    <div class="stat endurance">
        <span>endurance</span><span>{character.getEndurance().current} ({character.getEndurance().base})</span>
    </div>
    <div class="currency">
        currency {character.currency}
    </div>
</div>

<style>
.character {
    background-color: lightcyan;
    display: grid;
    grid-template-areas: 
        "name              name              name              name              name              name"
        "job               job               job               job               job               job"
        "health            health            energy            energy            satiety           satiety"
        "agreeableness     agreeableness     agreeableness     awareness         awareness         awareness"
        "conscientousness  conscientousness  conscientousness  brawn             brawn             brawn"
        "neuroticism       neuroticism       neuroticism       coordination      coordination      coordination"
        "extraversion      extraversion      extraversion      magnetism         magnetism         magnetism"
        "openness          openness          openness          endurance         endurance         endurance"
        "currency          currency          currency          currency          currency          currency"
    ;

    height: 100%;
    width: 100%;
}

.stat {
    border: 1px solid gainsboro;
    text-align: center;
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-items: center;
}

.name {
    grid-area: name;
    
    font-weight: bold;
    font-size: xx-large;
}

.job {
    grid-area: job;

    font-style: italic;
}

.health {
    grid-area: health;
}

.energy {
    grid-area: energy;
}

.satiety {
    grid-area: satiety;
}

.agreeableness {
    grid-area: agreeableness;
}

.awareness {
    grid-area: awareness;
}

.conscientousness {
    grid-area: conscientousness;
}

.brawn {
    grid-area: brawn;
}

.neuroticism {
    grid-area: neuroticism;
}

.coordination {
    grid-area: coordination;
}

.extraversion {
    grid-area: extraversion;
}

.magnetism {
    grid-area: magnetism;
}

.openness {
    grid-area: openness;
}

.endurance {
    grid-area: endurance;
}

.currency {
    grid-area: currency;
}
</style>