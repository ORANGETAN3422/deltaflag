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

    type CodeBlockType = 'inline' | 'block' | 'stretch';
    let { code, type = 'inline', lang = "js", theme = "dark-plus" }: { code: string, type?: CodeBlockType, lang?: string, theme?: string } = $props();
</script>

{#if type === 'block'}
    <pre><code>{#await highlight(splitCodeLine(code), lang, theme)}{code}{:then highlighted_html} {@html highlighted_html}{/await}</code></pre>
{:else if type === 'stretch'}
    <code class="block whitespace-pre-wrap min-w-72 max-w-72 overflow-hidden">
        {#await highlight(splitCodeLine(code), lang, theme)}
            {code}
        {:then highlighted_html} 
            {@html highlighted_html}
        {/await}
    </code>
{:else}
    <code>
        {#await highlight(splitCodeLine(code), lang, theme)}
            {code}
        {:then highlighted_html} 
            {@html highlighted_html}
        {/await}
    </code>
{/if}