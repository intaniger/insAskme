<script>
	import 'carbon-components-svelte/css/g10.css';
	import '../styles/tailwind-output.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	let gradientTheme = '';
	$: ({ page } = getStores());

	$: {
		const { path } = $page;
		switch (path) {
			case '/register':
				gradientTheme = 'bg-gradient-to-r from-pastelRed to-pastelGreen';
				break;

			default:
				gradientTheme = 'bg-gradient-to-r from-bgSky to-bgPink';
				break;
		}
	}

	onMount(async () => {
		if (localStorage.getItem('askme:username') == null) {
			goto('/register');
		}
	});
</script>

<div
	class="container w-screen h-screen mx-auto transition-all duration-300 {gradientTheme} flex justify-center"
>
	<slot />
</div>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
