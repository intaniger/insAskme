<script lang="ts">
	import { dev } from '$app/env';
	import Button from '$lib/components/Button.svelte';
	import { createNewQuestion, ReadonlyFirebaseRTDBStore, _removeAllQuestions } from '$lib/store';
	import QuestionsBucket from '$lib/components/QuestionsBucket.svelte';
	import type { QuestionEnteredEvent, QuestionLeftEvent } from '$lib/types/questionsBucketEvent';
	import { QuestionType } from '$lib/types/questionType';

	const onClickAdd = () => {
		createNewQuestion({
			questioner: 'Tiger',
			question: 'Hi',
			upvote: 0,
			status: Math.floor(Math.random() * 3)
		});
	};

	const __pocEnteredEvent = (status: string) => (e: CustomEvent<QuestionEnteredEvent>) => {
		console.log(e.detail.question, `Inserted @${e.detail.indexInserted} to ${status}`);
	};

	const __pocLeftEvent = (status: string) => (e: CustomEvent<QuestionLeftEvent>) => {
		console.log(e.detail.question, `Left from ${status}`);
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
					<QuestionsBucket
						on:entered={__pocEnteredEvent(QuestionType[status])}
						on:left={__pocLeftEvent(QuestionType[status])}
						{...{ questions: questions[status], status }}
					/>
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
