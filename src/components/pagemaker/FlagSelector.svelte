<script lang="ts">
	import mergedFlags from '../../assets/flags/merged.json';
	import type { MergedFlags, FlagData } from '$lib/types';
	import { onMount } from 'svelte';

	const merged = mergedFlags as unknown as MergedFlags;

	let flagNumber = $state<number | null>(null);
	let { flagInfo = $bindable<any>(null) }: { flagInfo: any } = $props();

	let pos = $state({ x: 0, y: 20 });
	let dragging = $state(false);
	let offset = $state({ x: 0, y: 0 });

	async function getFlagDetails(flag: number) {
		const key = `global.flag[${flag}]`;
		const data: FlagData = merged[key];

		if (!data) {
			flagInfo = null;
			return;
		}

		// yo
		const entries = Object.entries(data.occurrences).flatMap(([ch, files]) =>
			Object.entries(files).map(([filename, [line, code]]) => ({
				chapter: parseInt(ch.replace('ch', '')),
				filename,
				line: line.replace('line ', ''),
				code
			}))
		);

		flagInfo = {
			key,
			firstSeenChapter: data.first_seen_chapter,
			entries
		};
	}

	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		offset = {
			x: event.clientX - pos.x,
			y: event.clientY - pos.y
		};
		event.preventDefault();
	}

	function handleMouseMove(event: MouseEvent) {
		if (!dragging) return;
		pos = {
			x: Math.max(300, Math.min(event.clientX - offset.x, window.innerWidth - 270)),
			y: Math.max(0, Math.min(event.clientY - offset.y, window.innerHeight - 150))
		};
	}

	function handleMouseUp() {
		dragging = false;
	}

	onMount(() => {
		pos = { x: window.innerWidth - 370, y: 20 };
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	class="fixed z-100 flex w-72 flex-col rounded-lg border border-(--color-theme-2) bg-(--color-bg-3) shadow-lg"
	style="top: {pos.y}px; left: {pos.x}px;"
>
	<div
		class="h-8 cursor-move rounded-t-lg bg-(--color-theme-2)"
		onmousedown={handleMouseDown}
		role="button"
		tabindex="0"
	>
		<!-- ✖ i need this later -->
	</div>

	<div class="-mt-3 flex flex-1 flex-col gap-2 pr-2 pb-2 pl-2">
		<h3 class="select-none">Select Flag</h3>
		<input
			type="number"
			bind:value={flagNumber}
			placeholder="Enter flag number"
			class="rounded-lg border border-(--color-border) pl-2"
		/>

		<button onclick={() => flagNumber !== null && getFlagDetails(flagNumber!)}> Load Flag </button>
	</div>
</div>
