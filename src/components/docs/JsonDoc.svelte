<script lang="ts">
    import type { JsonDoc, Paragraph } from "$lib/docs_loader";
    import { getParagraphComponent, getElementComponent, getElementProps } from "$lib/docs_loader";

    let { doc, fallback = `<p class="text-muted">There is no documentation available for this page.</p>` }: { doc: JsonDoc | null, fallback?: string } = $props();
</script>

{#if doc}
    {#each doc.sections as section}
        <h2>{section.title}</h2>
        {#each section.paragraphs as paragraph}
            {@render paragraphBlock(paragraph)}
        {/each}
        <hr/>
    {/each}
{:else}
    {@html fallback}
{/if}

{#snippet paragraphBlock(paragraph: Paragraph)}
    {@const Parag = getParagraphComponent(paragraph)}
    {@const {type, elements, ...props} = paragraph}
    <Parag {...props}>
        {#snippet children()}
            {#each paragraph.elements as element}
                {@const Elem = getElementComponent(element)}
                {@const props = getElementProps(element)}
                <Elem {...props} />
            {/each} 
        {/snippet} 
    </Parag>
{/snippet}