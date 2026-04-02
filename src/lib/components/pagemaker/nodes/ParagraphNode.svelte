<script lang="ts">
	let { text = 'placeholder' }: { text: string } = $props();
	let editableElement: HTMLElement;

	let undoStack: string[] = [];

	const classes = [
		{ label: 'muted', tag: 'span', className: 'text-muted' },
		{ label: 'faint', tag: 'span', className: 'text-faint' },
		{ label: 'kris', tag: 'span', className: 'text-kris' },
		{ label: 'susie', tag: 'span', className: 'text-susie' },
		{ label: 'ralsei', tag: 'span', className: 'text-ralsei' },
		{ label: 'bold', tag: 'strong', className: '' },
		{ label: 'italic', tag: 'em', className: '' }
	];

	let selectionRange: Range | null = null;

	function editable(element: HTMLElement) {
		editableElement = element;
		if (!element.innerText) element.innerText = text;
	}

	function saveSelection() {
		const sel = window.getSelection();
		if (sel && !sel.isCollapsed && editableElement.contains(sel.anchorNode)) {
			selectionRange = sel.getRangeAt(0).cloneRange();
		} else {
			selectionRange = null;
		}
	}

	function applyStyle(tag: string, className: string) {
		if (!selectionRange) return;
		pushUndo();

		const wrapper = document.createElement(tag);
		if (className) wrapper.className = className;

		selectionRange.surroundContents(wrapper);

		const sel = window.getSelection();
		sel?.removeAllRanges();
		text = editableElement.innerHTML;
	}

	function pushUndo() {
		if (editableElement) undoStack.push(editableElement.innerHTML);
	}

	function undo() {
		if (undoStack.length === 0) return;
		const last = undoStack.pop();
		if (last && editableElement) {
			editableElement.innerHTML = last;
			text = last;
		}
	}
</script>

<div
	class="mt-1 mb-1 flex w-full items-start justify-between gap-2 rounded-lg border border-(--color-theme-1-dim) bg-(--color-bg-1) p-2"
>
	<div class="flex flex-1 flex-col gap-2">
		<!-- style controls -->
		<div class="flex items-center gap-1 border-b border-(--color-border-faint) pb-2 text-xs">
			{#each classes as style}
				<button
					class="rounded bg-(--color-bg-0) px-2 py-1 text-[10px] transition-colors hover:bg-(--color-bg-2)"
					onmousedown={() => {
						saveSelection();
						applyStyle(style.tag, style.className);
					}}
				>
					<svelte:element this={style.tag} class={style.className}> a </svelte:element>
				</button>
			{/each}
			<button
				class="rounded bg-(--color-bg-0) px-2 py-1 text-[10px] transition-colors hover:bg-(--color-bg-2)"
				onclick={undo}
			>
				Undo
			</button>
		</div>

		<!-- text area -->
		<svelte:element
			this={'p'}
			contenteditable="true"
			bind:this={editableElement}
			use:editable
			class="p-2 px-1 outline-none"
			role="textbox"
			tabindex="0"
			oninput={() => (text = editableElement.innerHTML)}
			onmouseup={saveSelection}
			onkeyup={saveSelection}
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
