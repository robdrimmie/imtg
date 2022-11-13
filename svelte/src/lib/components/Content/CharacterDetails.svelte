<script>
	export let character;
</script>

{#if character}
	<div class="tombstone">
		<h2>{character.name}</h2>
		<h3>{character.job.name}</h3>
	</div>
	<div class="resources">
		<ol>
			<li>health: {character.getHealth().current} / {character.getHealth().base}</li>
			<li>energy: {character.getEnergy().current} / {character.getEnergy().base}</li>
			<li>satiety: {character.getSatiety().current} / {character.getSatiety().base}</li>
		</ol>
	</div>
	<div class="scores">scores</div>
	<div class="traits">
		<div class="container">
			<h4>personality</h4>
			<ol>
				<li>Agreeableness: {character.getAgreeableness().current}</li>
				<li>Conscientousness: {character.getConscientousness().current}</li>
				<li>Extraversion: {character.getExtraversion().current}</li>
				<li>Neuroticism: {character.getNeuroticism().current}</li>
				<li>Openness: {character.getOpenness().current}</li>
			</ol>
		</div>
		<div class="container">
			<h4>physicality</h4>
			<ol>
				<li>Awareness: {character.getAwareness().current}</li>
				<li>Brawn: {character.getBrawn().current}</li>
				<li>Coordination: {character.getCoordination().current}</li>
				<li>Endurance: {character.getEndurance().current}</li>
				<li>Magnetism: {character.getMagnetism().current}</li>
			</ol>
		</div>
	</div>
	<div>Currency: {character.currency}</div>
{:else}
	BAD CHARACTER PROVIDED
{/if}

<style>
	h2,
	h3,
	h4,
	ol,
	li,
	ul {
		padding: 0;
		margin: 0;
	}

	h2 {
		font-size: medium;
	}

	h3 {
		font-size: smaller;
	}

	h4 {
		font-size: xx-small;
	}

	li {
		font-size: smaller;
	}

	.container {
		padding: 0;
		margin: 0;
		width: 50%;
	}

	.traits {
		display: flex;
		flex-direction: row;

		width: 100%;

		background: green;
	}

	.resources {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
