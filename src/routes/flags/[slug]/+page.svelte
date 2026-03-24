<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';
	import type { Component } from 'svelte';

	let { data } = $props();
	let copied = $state('');
	
	const allDocs = import.meta.glob<{ default: Component }>('/src/lib/documentation/*.md');
  	const docPath = $derived(`/src/lib/documentation/${data.key}.md`);
  	const docLoader = $derived(allDocs[docPath]);
</script>

<p class="text-muted">/flags/{data.key}</p>
<h1>{data.key}</h1>

<hr />
<h2>Info</h2>

{#if docLoader}
  	{#await docLoader() then doc}
    	<doc.default />
  	{/await}
{:else}
  	<p class="text-muted">There is currently no additional documentation for this page.</p>
{/if}

<hr />

<h2>References</h2>
<span class="text-muted">This flag is first seen in <strong>Chapter {data.firstSeenChapter}.</strong></span>

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
			{@const chapterEntries = data.entries.filter((e) => e.chapter === chapter)}
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
						<td><CodeBlock {code} type='stretch' /></td>
					</tr>
				{/each}
			{/if}
		{/each}
	</tbody>
</table>

<style>
	td.flash {
		background-color: rgba(142, 200, 240, 0.1);
		transition: background-color 0s;
	}
	td {
		transition: background-color 0.6s ease;
	}
</style>