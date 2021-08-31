<script>
	import { createNewQuestion, ReadonlyFirebaseRTDBStore } from '$lib/store';
	import { dev } from '$app/env';
	import Button from '$lib/components/Button.svelte';

	const onDevClick = () => {
		console.log('Dev mocked new data');
		createNewQuestion({ name: 'Tiger' });
	};
</script>

<svelte:head>
	<title>Ask Me | Instern Aug 2021</title>
</svelte:head>

<div class="grid content-between">
	<div class="row-auto">
		{#await $ReadonlyFirebaseRTDBStore}
			<p>loading all questions...</p>
		{:then data}
			<p>stringified data from the store is {JSON.stringify(data)}</p>
		{:catch}
			<p style="color: red">there are some error there, please try again.</p>
		{/await}
	</div>
	{#if dev}
		<div class="row-auto flex justify-center">
			<Button on:click={onDevClick}>DEV: add mock data.</Button>
		</div>
	{/if}
</div>
