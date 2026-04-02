<script>
	import CodeBlock from 	'$components/CodeBlock.svelte';
	import GmlFilename from '$components/GmlFilename.svelte';
	import ValuesTable from '$components/ValuesTable.svelte';

	const filename = "gml_Object_obj_writer_Create_0";
	const code = "if (global.flag[6] == 1)\n	skippable = 0;";
	const values = {"0": "unskippable", "1": "skippable"};
</script>

Makes text unskippable in the <span class="text-green">writer object</span>.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />
<ValuesTable {values} />