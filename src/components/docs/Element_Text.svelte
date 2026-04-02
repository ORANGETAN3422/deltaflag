<script lang="ts">
	import type { TextElement, TextElementStyle } from "$lib/docs_json_parser";

    let { value, style = null, bold = false}: Omit<TextElement, "type"> = $props();

    const getClassName = (key: TextElementStyle): string => {
        switch (key) {
            case null: return ""
            case "italic": return ""
            case "muted": return "text-muted"
            case "faint": return "text-faint"
            case "soul": return "text-soul"
            case "yellow": return "text-yellow"
            case "green": return "text-green"
        }
    };
</script>

<span class={getClassName(style)}>
    {#if bold && style === "italic"}
        <strong><em>{@html value}</em></strong>
    {:else if bold}
        <strong>{@html value}</strong>
    {:else if style === "italic"}
        <em>{@html value}</em>
    {:else}
        {@html value}
    {/if}
</span>