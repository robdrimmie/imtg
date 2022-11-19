<script>
    export let member
</script>

<div class="resources">
    <div><b>resources</b></div>
    <div class="row">
        <div> health {member.getCurrentHealth()}</div>
        <div> energy {member.getCurrentEnergy()}</div>
        <div> satiety {member.getCurrentSatiety()}</div>

    </div>
</div>

<style>
.row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>
