<script lang="ts">
	import type { QuestionType } from '$lib/types/questionType';
	import ThumbsUp16 from 'carbon-icons-svelte/lib/ThumbsUp16';

	const duskedColorPredicate = /(1)$/;

	export let id: string;
	export let questioner: string;
	export let question: string;
	export let upvote: number;
	export let status: QuestionType;
	export let attachments: string[] = [];

	let color = ['bg-cardColor1', 'bg-cardColor2', 'bg-cardColor3'][status];
	let textColor = duskedColorPredicate.test(color) ? 'text-white' : 'text-textTitle';
	let fillColor = duskedColorPredicate.test(color) ? 'fill-white' : 'fill-textTitle';
</script>

<div
	class="w-40 h-40 {color} bg-opacity-90 my-2 px-2 py-2.5 
  flex flex-col place-content-between font-readingFont shadow-lg"
>
	<div class="overflow-y-auto h-full">
		<p class="break-words text-sm max-h-2.5 {textColor}">{question}</p>
	</div>
	<div class="flex flex-row justify-between items-end">
		<p class="text-cramped inline-flex gap-x-1.5 items-end {textColor}">
			<ThumbsUp16 class={fillColor} />{upvote}
		</p>
		<div class="inline-flex items-end">
			<p class="text-xs {textColor}">asked by</p>
			<p class="text-sm {textColor} ml-1 font-bold">{questioner.toUpperCase()}</p>
		</div>
	</div>
</div>
