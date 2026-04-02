<script lang="ts">
    import { parseJson, getParagraphComponent, getElementComponent } from "$lib/docs_json_parser";
    import type { JsonDoc, Paragraph } from "$lib/docs_json_parser";

    import test from '../../assets/docs/testdoc.json';
    const doc = test as JsonDoc;
</script>

{#each doc.sections as section}
    <h2>{section.title}</h2>
    {#each section.paragraphs as paragraph}
        {@render paragraphBlock(paragraph)}
    {/each}
    <hr/>
{/each}

{#snippet paragraphBlock(paragraph: Paragraph)}
    {@const Parag = getParagraphComponent(paragraph)}
    <Parag>
        {#each paragraph.elements as element}
            {@const Elem = getElementComponent(element)}
            <Elem {...element} />
        {/each} 
    </Parag>
{/snippet}