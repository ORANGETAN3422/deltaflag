<script lang="ts">
	import { page } from '$app/state';
	// @ts-ignore
	import { base } from '$app/paths';
	import type { LayoutProps } from './$types';
	import './layout.css';

	let { data, children }: LayoutProps = $props();

	let search = $state('');
	let chapterFilter = $state<number | null>(null);
	let filterMode = $state<'firstseen' | 'exclusive'>('firstseen');

	const staticLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' }
	];

	let filteredFlags = $derived(
		(data.flagPages ?? []).filter((f) => {
			const matchesSearch = f.key.toLowerCase().includes(search.toLowerCase());
			if (!matchesSearch) return false;
			if (chapterFilter === null) return true;
			if (filterMode === 'firstseen') return f.firstSeenChapter === chapterFilter;
			if (filterMode === 'exclusive')
				return f.chapters.length === 1 && f.chapters[0] === chapterFilter;
			return true;
		})
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
			class="mb-3 w-full"
		/>

		<div class="nav-group-label">Filter by chapter</div>

		<div class="mb-1 flex gap-1">
			<button
				class="btn flex-1 text-xs"
				class:primary={chapterFilter === null}
				onclick={() => (chapterFilter = null)}
			>
				All
			</button>
			{#each [1, 2, 3, 4] as ch}
				<button
					class="btn flex-1 text-xs"
					class:primary={chapterFilter === ch}
					onclick={() => (chapterFilter = ch)}
				>
					{ch}
				</button>
			{/each}
		</div>

		{#if chapterFilter !== null}
			<div class="mb-3 flex flex-col gap-1">
				<button
					class="btn w-full text-left text-xs"
					class:primary={filterMode === 'firstseen'}
					onclick={() => (filterMode = 'firstseen')}
					title="Flags that first appear in this chapter"
				>
					First seen in ch. {chapterFilter}
				</button>
				<button
					class="btn w-full text-left text-xs"
					class:primary={filterMode === 'exclusive'}
					onclick={() => (filterMode = 'exclusive')}
					title="Flags that only appear in this chapter"
				>
					Only in ch. {chapterFilter}
				</button>
			</div>
		{:else}
			<div class="mb-3"></div>
		{/if}

		<br />

		<div class="mb-1 text-xs opacity-40">{filteredFlags.length} flags</div>

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
