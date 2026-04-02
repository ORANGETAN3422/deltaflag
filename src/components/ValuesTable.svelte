<script lang="ts">
	let { values }: { values: Record<string, string> } = $props();
</script>

{#if values}
	<hr />
	<h2>Values</h2>
	<table>
		<thead><tr><th>Value</th><th>Description</th></tr></thead>
		<tbody>
			{#each Object.entries(values) as [value, desc]}
				<tr>
					<td><code>{value}</code></td>
					<td>{desc}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}