<script>
	// no logic or params or anything really
</script>

<div class="placeholder" />

<!--
  playing cards are 2.5x3.5 inches. 3.5/2.5 = 1.4
-->
<style>
	/* .placeholder {
    height: calc(2px + (1.4 * min(5vmin, 50px)));
    width: calc(2px + min(5vmin, 50px));

    border-radius: calc(min(5vmin, 50px) / 6.25);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF6EB;

    border: 1px solid #272727;
    margin: 1px;

	} */

	.placeholder {
		border: 1px solid #272727;
		margin: 1px;
		display: inline-block;
		height: calc(2px + (1.4 * min(5vmin, 50px)));
		width: calc(2px + min(5vmin, 50px));
		border-radius: calc(min(5vmin, 50px) / 6.25);

		background-color: #4a4545;
	}
</style>
