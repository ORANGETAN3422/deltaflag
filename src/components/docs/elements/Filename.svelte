<script lang="ts">
	import GmlFilename from "$components/GmlFilename.svelte";

	export interface FilenameProps {
    	value: string
	}

    let { value }: FilenameProps = $props();
</script>

<GmlFilename filename={value} />