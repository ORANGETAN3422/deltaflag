<script lang="ts">
	import { page } from '$app/state';
	// @ts-ignore
	import { base } from '$app/paths';
	import type { LayoutProps } from './$types';
	// import { fly } from 'svelte/transition';
	import './layout.css';

	let { data, children }: LayoutProps = $props();
	let search = $state('');

	// let currentChapter = $state(1);
	// let animTime = 200;
	// let filtered = $derived(
	// 	(data.chapters.find((c) => c.chapter === currentChapter)?.pages ?? []).filter((p) =>
	// 		p.label.toLowerCase().includes(search.toLowerCase())
	// 	)
	// );

	const staticLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' }
	];

	let filteredFlags = $derived(
		(data.flagPages ?? []).filter((f) => f.key.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="doc-layout">
	<nav class="doc-sidebar">
		<div class="nav-logo">DeltaFlag</div>

		{#each staticLinks as p}
			<a
				href="{base}{p.href}"
				class="nav-link"
				class:active={page.url.pathname === `${base}${p.href}`}
			>
				{p.label}
			</a>
		{/each}

		<div class="nav-group-label">Flags</div>

		<input
			id="search"
			type="search"
			placeholder="Search flags..."
			bind:value={search}
			class="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
		/>

		<div class="nav-links">
			{#each filteredFlags as f}
				<a
					href="{base}{f.href}"
					class="nav-link"
					class:active={decodeURIComponent(page.url.pathname) === `${base}${f.href}`}
				>
					{f.key}
				</a>
			{/each}
		</div>
	</nav>

	<main class="doc-content">
		{@render children()}
	</main>
</div>
