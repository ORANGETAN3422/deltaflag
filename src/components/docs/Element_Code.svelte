<script lang="ts">
	import type { CodeElement } from "$lib/docs_loader";
    import CodeBlock from "../CodeBlock.svelte";

    let { value, lang = "js", theme = "dark-plus" }: Omit<CodeElement, "type"> = $props();
</script>

<CodeBlock code={value} {lang} {theme} />