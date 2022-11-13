<script>
	import { page } from '$app/stores';
</script>

<ul>
	<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Map</a></li>
	<li class:active={$page.url.pathname === '/parties'}>
		<a sveltekit:prefetch href="/parties">Parties</a>
	</li>
	<li class:active={$page.url.pathname === '/transfer'}>
		<a sveltekit:prefetch href="/transfer">Transfer</a>
	</li>
	<li class:active={$page.url.pathname === '/settings'}>
		<a sveltekit:prefetch href="/settings">Settings</a>
	</li>
</ul>

<style>
	ul {
		display: flex;

		padding: 0;
		margin: 0;

		align-items: center;
		justify-content: space-around;
		list-style: none;
	}

	li {
		background-color: whitesmoke;

		padding-left: 1vw;
		width: 100vw;
	}

	li.active {
		background-color: lightyellow;
	}

	li a {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
