<script>
	import { dev } from '$app/env';
	import Button from '$lib/components/Button.svelte';
	import { createNewQuestion, ReadonlyFirebaseRTDBStore, _removeAllQuestions } from '$lib/store';
	import TypedQuestionsList from '$lib/components/TypedQuestionsList.svelte';

	const onClickAdd = () => {
		createNewQuestion({
			questioner: 'Tiger',
			question: 'Hi',
			upvote: 0,
			status: Math.floor(Math.random() * 3)
		});
	};
</script>

<svelte:head>
	<title>Ask Me | Instern Aug 2021</title>
</svelte:head>

<div class="grid my-8 content-between w-11/12">
	<div class="row-auto h-full pb-8 overflow-y-hidden">
		{#await $ReadonlyFirebaseRTDBStore}
			<p>loading all questions...</p>
		{:then questions}
			<div
				class="w-full h-full grid grid-cols-3 divide-x-2 divide-dotted divide-pastelOrange overflow-y-hidden"
			>
				{#each [0, 1, 2] as status}
					<TypedQuestionsList {...{ questions: questions[status], status }} />
				{/each}
			</div>
		{:catch}
			<p style="color: red">there are some error there, please try again.</p>
		{/await}
	</div>
	{#if dev}
		<div class="row-auto flex justify-around">
			<Button on:click={onClickAdd}>DEV: add mock data.</Button>
			<Button on:click={_removeAllQuestions}>DEV: RM all.</Button>
		</div>
	{/if}
</div>
