<script lang="ts">
	import { getElementComponent, getElementProps, type Element } from "$lib/docs_loader";

    export interface TableElementProps {
        headers: Element[],
        rows: Element[][]
    }

    let { headers, rows }: TableElementProps = $props();
    let isValid: boolean = $derived.by(() => {
        if (!headers || !rows) return false;
        return rows.every(row => row.length === headers.length);
    });
</script>

{#if isValid}
    <table>
        <thead><tr>
            {#each headers as col}
                {@const Elem = getElementComponent(col)}
                {@const props = getElementProps(col)}
                <th><Elem {...props} /></th>
            {/each}
        </tr></thead>
        <tbody>
			{#each rows as row}
                <tr>
                    {#each row as entry}
                        {@const Elem = getElementComponent(entry)}
                        {@const props = getElementProps(entry)}
                        <td><Elem {...props} /></td>
                    {/each}
                </tr>
			{/each}
		</tbody>
    </table>
{/if}