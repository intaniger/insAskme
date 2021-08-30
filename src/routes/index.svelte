<script>
	import { firebaseRDBStore } from '$lib/store';
</script>

<svelte:head>
	<title>Ask Me | Instern Aug 2021</title>
</svelte:head>

{#await $firebaseRDBStore}
	<p>loading all questions...</p>
{:then data}
	<p>stringified data from the store is {data}</p>
{:catch}
	<p style="color: red">there are some error there, please try again.</p>
{/await}
