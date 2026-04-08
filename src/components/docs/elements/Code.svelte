<script lang="ts">
    import CodeBlock from "$components/CodeBlock.svelte";

    export interface CodeProps {
        value: string,
        lang?: string,
        theme?: string,
        stretch?: boolean
    }

    let { value, lang = "js", theme = "dark-plus", stretch = false }: CodeProps = $props();
</script>

<CodeBlock code={value} {lang} {theme} type={stretch ? "stretch" : "inline"} />