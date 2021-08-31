<script lang="ts">
	import type { QuestionType } from '$lib/types/questionType';
	import ThumbsUp16 from 'carbon-icons-svelte/lib/ThumbsUp16';

	export let questioner: string;
	export let question: string;
	export let upvote: number;
	export let status: QuestionType;
	export let attachments: string[] = [];

	let color = ['bg-cardColor1', 'bg-cardColor2', 'bg-cardColor3', 'bg-cardColor4'][status];
</script>

<div
	class="w-40 h-40 {color} bg-opacity-90 my-2 px-2 py-2.5 
  flex flex-col place-content-between font-readingFont shadow-lg"
>
	<div class="overflow-y-auto h-full">
		<p class="break-words text-sm max-h-2.5">{question}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-base inline-flex gap-x-1.5 items-center"><ThumbsUp16 />{upvote}</p>
		<p class="text-base">{questioner.toUpperCase()}</p>
	</div>
</div>
