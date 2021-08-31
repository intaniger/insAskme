<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let additionalClass = '';
</script>

<button
	class={`${additionalClass} group p-2 
          bg-white bg-opacity-10 border-pinkSecondary border-2 text-freshPink rounded-sm
          font-friendlyWelcome text-lg
          hover:bg-freshPink hover:text-white
          transition-all duration-100 ease-in`}
	on:click={(e) => dispatch('click', e)}
>
	<slot />
</button>
