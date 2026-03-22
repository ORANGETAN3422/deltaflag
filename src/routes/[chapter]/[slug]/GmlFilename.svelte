<script lang="ts">
	let { name }: { name: string } = $props();

	const parts = $derived(name.replace('.gml', '').split('_'));
	const prefix = $derived(parts[0] + '_');
	const type = $derived(parts[1] + '_');
	const event = $derived(parts[parts.length - 2] + '_');
	const index = $derived(parts[parts.length - 1] + '.gml');
	const objParts = $derived(parts.slice(2, -2));
	const obj = $derived(objParts.length > 0 ? objParts.join('_') + '_' : '');
</script>

<span>
	<span class="text-muted">{prefix}</span><span class="text-yellow">{type}</span><span
		class="text-soul">{obj}</span
	><span class="text-green">{event}</span><span class="text-muted">{index}</span>
</span>
