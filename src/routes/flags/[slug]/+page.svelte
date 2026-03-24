<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
import GmlFilename from '$lib/components/GmlFilename.svelte';
	let { data } = $props();

	let copied = $state('');
</script>

<p class="text-muted">/flags/{data.key}</p>

<h1>{data.key}</h1>

<hr />

<h2>Info</h2>

<p>{@html data.doc?.body || 'No documentation has been added yet.'}</p>

<p>{@html data.doc?.other || ''}</p>

<div class="callout note">
	<span>✦</span>
	<span>This flag is first seen in <strong>Chapter {data.firstSeenChapter}</strong></span>
</div>

<hr />

{#if data.doc?.values && Object.keys(data.doc.values).length > 0}
	<h2>Values</h2>
	<table>
		<thead><tr><th>Value</th><th>Meaning</th></tr></thead>
		<tbody>
			{#each Object.entries(data.doc.values) as [value, meaning]}
				<tr>
					<td><code>{value}</code></td>
					<td>{meaning}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<hr />
{/if}

<h2>References</h2>

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
						<td><CodeBlock {code} block={true} /></td>
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
