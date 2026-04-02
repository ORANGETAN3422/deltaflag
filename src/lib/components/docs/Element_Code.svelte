<script>
	import CodeBlock from "../CodeBlock.svelte";
    let { value } = $props();
</script>

<CodeBlock code={value} />