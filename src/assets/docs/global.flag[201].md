<script>
	import CodeBlock from '../../components/CodeBlock.svelte';
	import GmlFilename from '../../components/GmlFilename.svelte';
	import ValuesTable from '../../components/ValuesTable.svelte';

	const filename = "gml_Object_obj_darkeyepuzzle_Step_0";
	const code = "global.flag[201] = 1;";
	const values = {"0": "Puzzle not solved", "1": "Puzzle Solved"};
</script>

Stores whether the Dark Eye Puzzle in chapter 1 has been completed.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />
<ValuesTable {values} />
