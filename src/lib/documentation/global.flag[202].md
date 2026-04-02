<script>
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';
	import ValuesTable from '$lib/components/ValuesTable.svelte';

	const filename = "gml_Object_obj_dustpile_susie_Step_0";
	const code = "global.flag[202] = 1;";
	const values = {"0": "Didn't sprint", "1": "Sprinted"};
</script>

Stores if Kris sprints during the Dust Pile cutscene with susie before the lancer chase in Chapter 1. This variable is only set and never read from.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />
<ValuesTable {values} />
