<script lang="ts">
	import { onMount } from 'svelte';

	let pos = $state({ x: 0, y: 180 });
	let dragging = $state(false);
	let offset = $state({ x: 0, y: 0 });

	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		offset = {
			x: event.clientX - pos.x,
			y: event.clientY - pos.y
		};
		event.preventDefault();
	}

	function handleMouseMove(event: MouseEvent) {
		if (!dragging) return;
		pos = {
			x: Math.max(300, Math.min(event.clientX - offset.x, window.innerWidth - 270)),
			y: Math.max(0, Math.min(event.clientY - offset.y, window.innerHeight - 150))
		};
	}

	function handleMouseUp() {
		dragging = false;
	}

	onMount(() => {
		pos = { x: window.innerWidth - 370, y: 180 };
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	class="fixed z-101 flex w-72 flex-col rounded-lg border border-(--color-theme-1) bg-(--color-bg-3) shadow-lg"
	style="top: {pos.y}px; left: {pos.x}px;"
>
	<div
		class="h-8 cursor-move rounded-t-lg bg-(--color-theme-1)"
		onmousedown={handleMouseDown}
		role="button"
		tabindex="0"
	>
		<!-- ✖ i need this later -->
	</div>

	<div class="-mt-3 flex flex-1 flex-col gap-2 pr-2 pb-2 pl-2">
		<h3 class="select-none">Insert Element</h3>
	</div>
</div>
