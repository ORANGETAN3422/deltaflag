<script lang="ts">
    import CodeBlock from "../CodeBlock.svelte";

    export interface CodeElementProps {
        value: string,
        lang?: string,
        theme?: string,
        stretch?: boolean
    }

    let { value, lang = "js", theme = "dark-plus", stretch = false }: CodeElementProps = $props();
</script>

<CodeBlock code={value} {lang} {theme} type={stretch ? "stretch" : "inline"} />