<script lang="ts">
    import CodeBlock from "../CodeBlock.svelte";

    export interface CodeElementProps {
        value: string,
        lang?: string,
        theme?: string
    }

    let { value, lang = "js", theme = "dark-plus" }: CodeElementProps = $props();
</script>

<CodeBlock code={value} {lang} {theme} />