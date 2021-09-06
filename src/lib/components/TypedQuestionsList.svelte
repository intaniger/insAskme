<script lang="ts">
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import { dndFlipDurationMS } from '$lib/const';
	import type { Question } from '$lib/store';
	import { QuestionType } from '$lib/types/questionType';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	type callbackById = (id: string) => any;
	export let questions: Question[];
	export let status: QuestionType;
	export let onLeave: callbackById = (id) => console.log(`${id} - Left ${QuestionType[status]}`);
	export let onEnter: callbackById = (id) => console.log(`${id} - Enter ${QuestionType[status]}`);
	const basicHandle = (e) => {
		questions = e.detail.items;
	};
	const callbackHandler = (e) => {
		switch (e.detail.info.trigger) {
			case TRIGGERS.DROPPED_INTO_ZONE:
				onEnter(e);
				break;

			case TRIGGERS.DROPPED_INTO_ANOTHER:
				onLeave(e);

			default:
				break;
		}
	};
	const finalizeHandler = (e) => {
		basicHandle(e);
		callbackHandler(e);
	};
</script>

<div class="group grid content-start h-full overflow-y-hidden">
	<div
		class="row-auto flex justify-center 
                    {questions.length > 6 ? 'group-hover:shadow-md transition duration-200' : ''}"
	>
		<p class="font-friendlyWelcome text-2xl">{QuestionType[status]}</p>
	</div>
	<div class="row-auto max-h-full overflow-y-auto">
		<div
			class="appearance-none grid grid-cols-2"
			use:dndzone={{ items: questions, flipDurationMs: dndFlipDurationMS }}
			on:consider={basicHandle}
			on:finalize={finalizeHandler}
		>
			{#each questions as question (question.id)}
				<div class="flex justify-center" animate:flip={{ duration: dndFlipDurationMS }}>
					<QuestionCard {...question} {status} />
				</div>
			{/each}
		</div>
	</div>
</div>
