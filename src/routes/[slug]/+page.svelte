<script>
  export let data;
</script>

<h1>{data.key}</h1>

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
        <td>{file}</td>
        <td>{line}</td>
        <td><code class="block whitespace-pre-wrap break-all">{code}</code></td>
      </tr>
    {/each}
  </tbody>
</table>