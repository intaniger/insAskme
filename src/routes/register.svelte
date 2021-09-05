<script>
	import Button from '$lib/components/Button.svelte';

	import { goto } from '$app/navigation';
	import { insternNameList, registerPlaceholderAskPrefix } from '$lib/const';
	import { randomElementFromArray } from '$lib/utils';
	import Query16 from 'carbon-icons-svelte/lib/Query16';
	import Rocket16 from 'carbon-icons-svelte/lib/Rocket16';
	import { writable } from 'svelte/store';

	let name = '';
	let selectedDynamicPlaceholder = writable(randomElementFromArray(insternNameList));
	let toDisplayPlaceholder = '';
	selectedDynamicPlaceholder.subscribe((newSelected) => {
		toDisplayPlaceholder = randomElementFromArray(registerPlaceholderAskPrefix) + ' ';
		const withQuestionmark = newSelected + '?';

		const sentenceLength = withQuestionmark.length;

		setTimeout(() => {
			selectedDynamicPlaceholder.update((value) => {
				let output = randomElementFromArray(insternNameList);
				while (output === value) {
					output = randomElementFromArray(insternNameList);
				}
				return output;
			});
		}, (sentenceLength + 5) * 100);

		withQuestionmark.split('').forEach((character, i) =>
			setTimeout(() => {
				toDisplayPlaceholder = toDisplayPlaceholder + character;
			}, (i + 0.5) * 100)
		);
	});

	const onGoCurious = () => {
		if (name.length === 0) {
			alert('Introduce your name first pls.');
			return;
		}
		localStorage.setItem('askme:username', name);
		goto('/');
	};
</script>

<div class="flex h-full w-1/3 items-center">
	<div class="grid w-full grid-cols-1 gap-4 justify-center">
		<h3 class="px-1 font-friendlyWelcome text-xl font-medium text-textTitle">
			Hey! what's your name here?
		</h3>
		<input
			type="text"
			class="appearance-none h-6 px-4 py-6 w-full
         bg-pastelYellow rounded-lg border-transparent border-2 
         focus:border-pastelOrange focus:outline-none
         transition-colors duration-200
         font-userInput text-xl"
			placeholder={toDisplayPlaceholder}
			bind:value={name}
			on:keypress={(e) => (e.key === 'Enter' ? onGoCurious() : null)}
		/>
		<div class="flex justify-self-end">
			<Button on:click={onGoCurious} additionalClass="w-40">
				Go curious
				<Query16 class="inline group-hover:hidden" />
				<Rocket16 class="hidden group-hover:inline animate-diagonal" /></Button
			>
		</div>
	</div>
</div>
