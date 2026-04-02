<script lang="ts">
	let { text = 'placeholder', headerStyle = 1 }: { text: string; headerStyle: number } = $props();
	let editableElement: HTMLElement;

	function editable(element: HTMLElement) {
		editableElement = element;
		if (!element.innerText) element.innerText = text;
	}
</script>

<div
	class="mt-1 mb-1 flex w-full items-start justify-between gap-1 rounded-lg border border-(--color-theme-1-dim) bg-(--color-bg-1) p-2"
>
	<div class="flex-1">
		<!-- style controls -->
		<div class="flex items-center gap-1 border-b border-(--color-border-faint) pb-2 text-xs">
			<button
				class="cursor-pointer rounded px-1.5 py-0.5 transition hover:text-(--color-theme-1-dim)"
				onclick={() => {
					headerStyle = headerStyle > 1 ? headerStyle - 1 : 4;
				}}
			>
				&lt;
			</button>

			<span class="rounded bg-(--color-bg-3) px-1.5 py-0.5 text-[10px] select-none">
				h{headerStyle}
			</span>

			<button
				class="cursor-pointer rounded px-1.5 py-0.5 transition hover:text-(--color-theme-1-dim)"
				onclick={() => {
					headerStyle = headerStyle < 4 ? headerStyle + 1 : 1;
				}}
			>
				&gt;
			</button>
		</div>

		<!-- text area -->
		<svelte:element
			this={'h' + headerStyle}
			contenteditable="true"
			bind:this={editableElement}
			class="px-1 outline-none"
			use:editable
			oninput={() => (text = editableElement.innerText)}
		></svelte:element>
	</div>

	<!-- handle -->
	<button
		class="grid cursor-grab grid-cols-2 grid-rows-3 place-items-center gap-1 self-center opacity-60 transition hover:opacity-100"
	>
		{#each Array.from({ length: 6 })}
			<div class="h-1 w-1 rounded-full bg-(--color-theme-1)"></div>
		{/each}
	</button>
</div>
