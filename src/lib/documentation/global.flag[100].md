<script>
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';
	import ValuesTable from '$lib/components/ValuesTable.svelte';

	const filename = "gml_GlobalScript_scr_text";
	const code = "global.flag[100] = 1;";
	const values = {"0": "Hasn't collected glowshard", "1": "Has collected glowshard"};
</script>

Stores whether the glowshard has been collected from the room in chapter 1.
Sets the glowing shard icon in the room to be visible if collected or not as well.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />
<ValuesTable {values} />
