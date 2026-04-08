<script lang="ts">
	import type { Snippet } from "svelte";
    export type CalloutStyle = "note" | "info" | "warning" | "danger";

    let { children, style }: { children: Snippet, style: CalloutStyle } = $props();
    const iconChar: string = $derived.by(() => {
        switch(style) {
            case "note":    return "✦"
            case "info":    return "ℹ"
            case "warning": return "⚠"
            case "danger":  return "✖"
        }
    });
</script>

<div class={`callout ${style}`}>
    <span>{iconChar}</span>
    <span>{@render children()}</span>
</div>