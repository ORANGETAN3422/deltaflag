<script>
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';

	const filename = "gml_Object_obj_writer_Create_0";
	const code = "if (global.flag[6] == 1)\n	skippable = 0;";
</script>

Makes text unskippable in the <span class=\"text-green\">writer object</span>.

Usage in <GmlFilename {filename} />:  
<CodeBlock {code} type='block' />