<script lang="ts">
    import CodeBlock from "../CodeBlock.svelte";

    let { value, lang = "js", theme = "dark-plus" }: { value: string, lang?: string, theme?: string } = $props();
</script>

<CodeBlock code={value} {lang} {theme} />