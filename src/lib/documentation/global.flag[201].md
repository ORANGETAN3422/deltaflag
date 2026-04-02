<script>
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';
	import ValuesTable from '$lib/components/ValuesTable.svelte';

	const filename = "gml_Object_obj_darkeyepuzzle_Step_0";
	const code = "global.flag[201] = 1;";
	const values = {"0": "Puzzle not solved", "1": "Puzzle Solved"};
</script>

Stores whether the Dark Eye Puzzle in chapter 1 has been completed.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />
<ValuesTable {values} />
