<script lang="ts">
	import mergedFlags from '$lib/flags/merged.json';
	import type { MergedFlags, FlagData } from '$lib/types';
	import { onMount } from 'svelte';

	const merged = mergedFlags as unknown as MergedFlags;

	let flagNumber = $state<number | null>(null);
	let { flagInfo = $bindable<any>(null) }: { flagInfo: any } = $props();

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

		console.log($state.snapshot(flagInfo));
	}
</script>

<input
	type="number"
	bind:value={flagNumber}
	placeholder="Enter flag number"
	class="rounded-lg border border-(--color-border)"
/>

<button onclick={() => flagNumber !== null && getFlagDetails(flagNumber!)}> Load Flag </button>
