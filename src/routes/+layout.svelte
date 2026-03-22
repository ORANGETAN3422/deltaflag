<script lang="ts">
  import { page } from '$app/state';
  import type { LayoutProps } from './$types';
  import './layout.css';

  let { data, children }: LayoutProps = $props();

  let search = $state('');

  let filtered = $derived(
    data.pages.filter(p => p.label.toLowerCase().includes(search.toLowerCase()))
  );
</script>

<div class="doc-layout">
  <nav class="doc-sidebar">
    <div class="nav-logo">DeltaFlag</div>

   <input
    type="search"
    placeholder="Search..."
    bind:value={search}
    class="w-full px-3 py-2 rounded border border-gray-300 text-sm"
  />

    {#each filtered as p}
      <a
        href="/{p.slug}"
        class="nav-link"
        class:active={page.url.pathname === `/${p.slug}`}
      >
        {p.label}
      </a>
    {/each}
  </nav>

  <main class="doc-content">
    {@render children()}
  </main>
</div>