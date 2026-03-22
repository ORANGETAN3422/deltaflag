<script lang="ts">
	import GmlFilename from './GmlFilename.svelte';
	let { data } = $props();

	let copied = $state('');
</script>

<p class="text-muted">/chapter{data.chapter}/{data.key}</p>

<h2>Chapter {data.chapter}</h2>
<h1>{data.key}</h1>

<hr />

<h3>Occurences in Code</h3>
<table>
	<thead>
		<tr>
			<th>File</th>
			<th>Line</th>
			<th>Code</th>
		</tr>
	</thead>
	<tbody>
		{#each data.entries as { filename, line, code }}
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
