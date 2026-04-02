<script lang="ts">
	import FlagSelector from '$lib/components/pagemaker/FlagSelector.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';

	import { onMount } from 'svelte';

	// draggable menu stuff
	let pos = $state({ x: 100, y: 100 });
	let dragging = $state(false);
	let offset = $state({ x: 0, y: 0 });

	let { flagInfo = $bindable(null) } = $props();
	let copied = $state('');

	// draggable menu functions
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
			x: event.clientX - offset.x,
			y: event.clientY - offset.y
		};
	}

	function handleMouseUp() {
		dragging = false;
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<!-- Draggable Selector -->
<div
	class="absolute z-100 flex w-72 flex-col gap-2 rounded-lg border border-(--color-border) bg-(--color-bg-3) p-2 shadow-lg"
	style="top: {pos.y}px; left: {pos.x}px;"
>
	<div
		class="cursor-move text-lg font-semibold text-white"
		onmousedown={handleMouseDown}
		role="button"
		tabindex="0"
	>
		<h3>Select Flag</h3>
	</div>

	<FlagSelector bind:flagInfo />
</div>

<!-- Default Stuff Display -->

{#if flagInfo}
	<p class="text-muted">/flags/{flagInfo.key}</p>
	<h1>{flagInfo.key}</h1>

	<hr />
	<h2>Info</h2>

	<p class="text-muted">There is currently no additional documentation for this page.</p>

	<hr />

	<h2>References</h2>
	<span class="text-muted"
		>This flag is first seen in <strong>Chapter {flagInfo.firstSeenChapter}.</strong></span
	>
	<table>
		<thead>
			<tr>
				<th>File</th>
				<th>Line</th>
				<th>Code</th>
			</tr>
		</thead>
		<tbody>
			{#each [1, 2, 3, 4] as chapter}
				{@const chapterEntries = flagInfo.entries.filter((e: any) => e.chapter === chapter)}
				{#if chapterEntries.length > 0}
					<tr>
						<td
							colspan="3"
							class="font-bold opacity-50"
							style="background-color: var(--color-theme-2-dim); color: var(--color-text);"
							><b>Chapter {chapter}</b></td
						>
					</tr>
					{#each chapterEntries as { filename, line, code }}
						<tr>
							<td
								onclick={() => {
									navigator.clipboard.writeText(filename.replace('.gml', ''));
									copied = filename;
									setTimeout(() => (copied = ''), 100);
								}}
								class:flash={copied === filename}
								style="cursor: pointer;"
							>
								<GmlFilename {filename} />
							</td>
							<td>{line}</td>
							<td><CodeBlock {code} type="stretch" /></td>
						</tr>
					{/each}
				{/if}
			{/each}
		</tbody>
	</table>
{/if}

<style>
	td.flash {
		background-color: rgba(142, 200, 240, 0.1);
		transition: background-color 0s;
	}
	td {
		transition: background-color 0.6s ease;
	}
</style>
