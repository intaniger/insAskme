<script lang="ts">
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import { dndFlipDurationMS } from '$lib/const';
	import type { Question } from '$lib/types/question';
	import type { QuestionMovedEventPayload } from '$lib/types/questionsBucketEvent';
	import { QuestionType } from '$lib/types/questionType';
	import { createEventDispatcher } from 'svelte';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let questions: Question[];
	export let status: QuestionType;

	let _questions = questions;

	const dispatch = createEventDispatcher<QuestionMovedEventPayload>();
	const basicHandle = (e: CustomEvent<DndEvent<Question>>) => {
		_questions = e.detail.items;
	};
	const callbackHandler = (e: CustomEvent<DndEvent<Question>>) => {
		switch (e.detail.info.trigger) {
			case TRIGGERS.DROPPED_INTO_ZONE:
				const question = _questions.filter(({ id }) => id === e.detail.info.id)[0];
				const indexInserted = _questions.findIndex(({ id }) => id === question?.id);
				dispatch('entered', { question, indexInserted });
				break;

			case TRIGGERS.DROPPED_INTO_ANOTHER:
				dispatch('left', { question: questions.filter(({ id }) => id === e.detail.info.id)[0] });
				break;

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
                    {_questions.length > 6 ? 'group-hover:shadow-md transition duration-200' : ''}"
	>
		<p class="font-friendlyWelcome text-2xl">{QuestionType[status]}</p>
	</div>
	<div class="row-auto max-h-full overflow-y-auto">
		<div
			class="appearance-none grid grid-cols-2"
			use:dndzone={{ items: _questions, flipDurationMs: dndFlipDurationMS }}
			on:consider={basicHandle}
			on:finalize={finalizeHandler}
		>
			{#each _questions as question (question.id)}
				<div class="flex justify-center" animate:flip={{ duration: dndFlipDurationMS }}>
					<QuestionCard {...question} {status} />
				</div>
			{/each}
		</div>
	</div>
</div>
