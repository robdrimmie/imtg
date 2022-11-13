<script>
	export let hex
	export let fill = 'lightblue'
	export let partyIndex = null

	const sqrt3 = Math.sqrt(3);
	const point5bySqrt = 0.5 * sqrt3;
	const baseHexagonPoints = [
		{ x: 1.5, y: point5bySqrt },
		{ x: 0, y: sqrt3 },
		{ x: -1.5, y: point5bySqrt },
		{ x: -1.5, y: point5bySqrt * -1 },
		{ x: 0, y: sqrt3 * -1 },
		{ x: 1.5, y: point5bySqrt * -1 }
	];

	const size = 1.8;
	$: modifiedX = size * (sqrt3 * hex.q + (sqrt3 / 2) * hex.r);
	$: modifiedY = size * ((3 / 2) * hex.r);

	$: points = baseHexagonPoints.reduce((prev, curr) => {
		return `${prev} ${curr.x + modifiedX} , ${curr.y + modifiedY} `;
	}, '');
</script>

{#if partyIndex === null}
	<polygon id="{hex.id()}" {fill} {points} />
{:else}
	<polygon id="party_{partyIndex}" {fill} {points} />
{/if}

<style></style>
