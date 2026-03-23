<script lang="ts">
    import { codeToHtml } from 'shiki';

    async function highlight(code: string, lang: string, theme: string) {
        const raw = await codeToHtml(code, {lang, theme});
        return raw
            .replace(/<pre[^>]*><code[^>]*>/, '')
            .replace(/<\/code><\/pre>/, '')
            .replace(/background(-color)?:[^;"]*/g, '');
    }

    let { code, block = false, lang = "js", theme = "dark-plus" }: { code: string, block?: boolean, lang?: string, theme?: string } = $props();
</script>

<code class={block ? "block break-all whitespace-pre-wrap" : ""}>
    {#await highlight(code, lang, theme)}
        {code}
    {:then highlighted_html} 
        {@html highlighted_html}
    {/await}
</code>