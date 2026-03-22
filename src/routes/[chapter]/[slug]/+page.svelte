<script lang="ts">
  import GmlFilename from './GmlFilename.svelte';
  let { data } = $props();
</script>

<p class="text-muted">/chapter{data.chapter}/{data.key}</p>

<h2>Chapter {data.chapter}</h2>
<h1>{data.key}</h1>

<hr />

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Line</th>
      <th>Code</th>
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(data.entries) as [file, [line, code]]}
      <tr>
        <td><GmlFilename name={file} /></td>
        <td>{line}</td>
        <td><code class="block whitespace-pre-wrap break-all">{@html code}</code></td>
      </tr>
    {/each}
  </tbody>
</table>