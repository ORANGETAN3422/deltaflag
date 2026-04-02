<script lang="ts">
	import type { GmlFilenameElement } from "$lib/docs_json_parser";
	import GmlFilename from "../GmlFilename.svelte";

    let { value }: Omit<GmlFilenameElement, "type"> = $props();
</script>

<GmlFilename filename={value} />