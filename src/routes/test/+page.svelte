<script lang="ts">
	import JsonDoc from "$components/docs/JsonDoc.svelte";
	import { loadDoc } from "$lib/docs_loader";
</script>

<h1>Test Page</h1>

{#await loadDoc("testdoc")}
	<p>yo</p>
{:then doc} 
	<JsonDoc {doc} />
{/await}