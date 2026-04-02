<script lang="ts">
    import { loadDoc, getParagraphComponent, getElementComponent } from "$lib/docs_loader";
    import type { Paragraph } from "$lib/docs_loader";

    let { docName }: { docName: string } = $props();
</script>

{#await loadDoc(docName)}
    <p>Loading...</p>
{:then doc} 
    {#if doc}
        {#each doc.sections as section}
            <h2>{section.title}</h2>
            {#each section.paragraphs as paragraph}
                {@render paragraphBlock(paragraph)}
            {/each}
            <hr/>
        {/each}
    {:else}
        <p class="text-muted">There is no documentation available for this page.</p>
    {/if}
{/await}

{#snippet paragraphBlock(paragraph: Paragraph)}
    {@const Parag = getParagraphComponent(paragraph)}
    <Parag>
        {#each paragraph.elements as element}
            {@const Elem = getElementComponent(element)}
            <Elem {...element} />
        {/each} 
    </Parag>
{/snippet}