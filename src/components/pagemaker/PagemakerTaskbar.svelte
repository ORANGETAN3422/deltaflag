<script lang="ts">
	import FlagSelector from './FlagSelector.svelte';

	let { flagInfo = $bindable(null) } = $props();

	let toggles = $state({
		flagSelector: true,
		elementInterface: true
	});

	let taskbarItems = [
		{
			id: 'flagSelector',
			label: 'F',
			colorClass: 'bg-(--color-theme-2)! hover:bg-(--color-theme-2-dim)!',
			toggle: () => (toggles.flagSelector = !toggles.flagSelector)
		},
		{
			id: 'elementInterface',
			label: 'E',
			colorClass: 'bg-(--color-theme-1)! hover:bg-(--color-theme-1-dim)!',
			toggle: () => (toggles.elementInterface = !toggles.elementInterface)
		}
	];
</script>

<div
	class="fixed top-2.5 right-2.5 z-50 flex flex-col items-center gap-3 rounded-lg border border-(--color-theme-1) bg-(--color-bg-4) p-3 text-white shadow-lg backdrop-blur-sm"
>
	{#each taskbarItems as item}
		<button
			onclick={item.toggle}
			title={item.label}
			class={`m-0 flex h-12 w-12 items-center justify-center rounded-md! border-0! p-0 text-white! focus:outline-none! ${item.colorClass}`}
		>
			{item.label[0]}
		</button>
	{/each}
</div>

<div style="display: {toggles.flagSelector ? 'block' : 'none'};">
	<FlagSelector bind:flagInfo />
</div>
