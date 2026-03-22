<script lang="ts">
  let { name }: { name: string } = $props();

  const parts = name.replace('.gml', '').split('_');
  const prefix = parts[0];
  const type   = parts[1];
  const event  = parts[parts.length - 2];
  const index  = parts[parts.length - 1];
  const obj    = parts.slice(2, -2).join('_');
</script>

<span>
  <span class="text-muted">{prefix}_</span><span class="text-yellow">{type}_</span><span class="text-soul">{obj}_</span><span class="text-green">{event}_</span><span class="text-muted">{index}.gml</span>
</span>