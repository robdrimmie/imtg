<script>
	export let icon;
	export let name;
</script>

<div class="card">
	<div class="letter no-select">
		<img src={icon} alt={name} /><br />
		{name}
	</div>
</div>

<style>
	.card {
		border-radius: calc(min(5vmin, 45px) / 6.25);
		align-items: center;
		justify-content: center;
		background-color: #fff6eb;
	}

	.letter {
		font-size: 1vmin;
		color: #707070;
	}
</style>
