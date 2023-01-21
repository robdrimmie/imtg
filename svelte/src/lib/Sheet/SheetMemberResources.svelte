<script>
    export let member

    const health = member.getHealth()
    const energy = member.getEnergy()
    const satiety = member.getSatiety()
</script>

<div class="resources">
    <div><b>resources</b></div>
    <div class="row">
        <div> health {health.current} / {health.base}</div>
        <div> energy {energy.current} / {energy.base}</div>
        <div> satiety {satiety.current} / {satiety.base}</div>
    </div>
</div>

<style>
.row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>
