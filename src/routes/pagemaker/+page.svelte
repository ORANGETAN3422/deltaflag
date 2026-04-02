<script lang="ts">
	import PagemakerTaskbar from '$lib/components/pagemaker/PagemakerTaskbar.svelte';

	import HeadingNode from '$lib/components/pagemaker/nodes/HeadingNode.svelte';
	import ParagraphNode from '$lib/components/pagemaker/nodes/ParagraphNode.svelte';

	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';

	let { flagInfo = $bindable(null) } = $props();
	let copied = $state('');
</script>

<PagemakerTaskbar bind:flagInfo />

{#if flagInfo}
	<p class="text-muted">/flags/{flagInfo.key}</p>
	<h1>{flagInfo.key}</h1>

	<hr />
	<h2>Info</h2>

	<HeadingNode text="Test Header" headerStyle={2} />
	<ParagraphNode
		text="LDM ball cube ball big cube ball next Rest In Peace niflheim vismuth slow wave fast robot keep going!"
	/>

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
