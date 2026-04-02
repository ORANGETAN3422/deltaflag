<script lang="ts">
	import type { CodeElement } from "$lib/docs_json_parser";
    import CodeBlock from "../CodeBlock.svelte";

    let { value, lang = "js", theme = "dark-plus" }: Omit<CodeElement, "type"> = $props();
</script>

<CodeBlock code={value} {lang} {theme} />