<script lang="ts">
	import GmlFilename from "../GmlFilename.svelte";

	export interface GmlFilenameElementProps {
    	value: string
	}

    let { value }: GmlFilenameElementProps = $props();
</script>

<GmlFilename filename={value} />