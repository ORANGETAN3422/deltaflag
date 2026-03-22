<script>
  import { page } from '$app/state';
  import './layout.css';

  export let data;
</script>

<div class="doc-layout">
  <nav class="doc-sidebar">
    <div class="nav-logo">Sitename</div>

    {#each data.pages as p}
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
    <slot />
  </main>
</div>