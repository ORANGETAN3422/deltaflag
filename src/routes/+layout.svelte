<script lang="ts">
  import { page } from '$app/state';
  // @ts-ignore
  import { base } from '$app/paths';
  import type { LayoutProps } from './$types';
  import { fly } from 'svelte/transition';
  import './layout.css';

  let { data, children }: LayoutProps = $props();

  let search = $state('');
  let currentChapter = $state(1);

  let animTime = 200;

  let filtered = $derived(
    (data.chapters.find(c => c.chapter === currentChapter)?.pages ?? [])
      .filter(p => p.label.toLowerCase().includes(search.toLowerCase()))
  );

  $effect(() => {
    currentChapter;
  });
</script>

<div class="doc-layout">
  <nav class="doc-sidebar">
    <div class="nav-logo">DeltaFlag</div>

    <select bind:value={currentChapter} class="w-full px-3 py-2 mb-2 font-[--font-display] text-xl tracking-wider uppercase">
      {#each ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4'] as chapter, i}
        <option value={i + 1}>{chapter}</option>
      {/each}
    </select>

   <input
    id="search"
    type="search"
    placeholder="Search..."
    bind:value={search}
    class="w-full px-3 py-2 mb-2 rounded border border-gray-300 text-sm"
  />

    {#key currentChapter}
      <div in:fly={{ duration: animTime, x: -50, delay: animTime }} out:fly={{ duration: animTime, x: -50 }} class="nav-links">
        {#each filtered as p}
          <a
            href="{base}{p.href}"
            class="nav-link"
            class:active={page.url.pathname === `${base}${p.href}`}
          >
            {p.label}
          </a>
        {/each}
      </div>
    {/key}
  </nav>

  <main class="doc-content">
    {@render children()}
  </main>
</div>