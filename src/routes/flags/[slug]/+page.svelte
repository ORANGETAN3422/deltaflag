<script lang="ts">
	import GmlFilename from './GmlFilename.svelte';
	let { data } = $props();

	let copied = $state('');
</script>

<p class="text-muted">/flags/{data.key}</p>
<p class="text-muted">First seen: Chapter {data.firstSeenChapter}</p>

<h1>{data.key}</h1>

<hr />

<h3>Occurrences in Code</h3>

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
							<GmlFilename name={filename} />
						</td>
						<td>{line}</td>
						<td><code class="block break-all whitespace-pre-wrap">{@html code}</code></td>
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
