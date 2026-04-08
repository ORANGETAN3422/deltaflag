<script lang="ts">
	import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<blockquote><p>{@render children()}</p></blockquote>