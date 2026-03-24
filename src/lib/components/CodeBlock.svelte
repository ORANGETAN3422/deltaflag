<script lang="ts">
    import { codeToHtml } from 'shiki';

    async function highlight(code: string, lang: string, theme: string) {
        const raw = await codeToHtml(code, {lang, theme});
        return raw
            .replace(/<pre[^>]*><code[^>]*>/, '')
            .replace(/<\/code><\/pre>/, '')
            .replace(/background(-color)?:[^;"]*/g, '');
    }

    const maxCharCount = 35;
    function splitCodeLine(rawCode: string) {
        return rawCode
            .split('\n')
            .map(line => line.length > maxCharCount ?
                 line.replaceAll(' &&', '\n    &&').replaceAll(' ||', '\n    ||')
            : line)
            .join('\n');
    }

    let { code, block = false, lang = "js", theme = "dark-plus" }: { code: string, block?: boolean, lang?: string, theme?: string } = $props();
</script>

<code class={block ? "block whitespace-pre-wrap min-w-72 max-w-72 overflow-hidden" : ""}>
    {#await highlight(splitCodeLine(code), lang, theme)}
        {code}
    {:then highlighted_html} 
        {@html highlighted_html}
    {/await}
</code>