<script lang="ts">
	import { base } from '$app/paths';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import GmlFilename from '$lib/components/GmlFilename.svelte';

	const example_references = [
		{ 
			filename: 'gml_Object_obj_orange_shop_Create_0.gml', 
			line: '20', 
			code: 'global.flag[666] = 1;'
		}, 
		{ 
			filename: 'gml_Object_obj_gaster_battle_Step_0.gml', 
			line: '47', 
			code: 'if (global.flag[666] == 0)'
		}, 
		{ 
			filename: 'gml_Object_obj_berdly_date_Create_0.gml', 
			line: '7', 
			code: 'global.flag[666] = 0;'
		}
	]
</script>

<p class="text-muted">/about</p>

<h1>About</h1>

<hr />

<h2>What is this?</h2>

<p>
	Deltarune stores its save data in a cryptic format, which makes it incredibly difficult to figure
	out what does what. This project is an attempt to reverse engineer the save data format, and
	provide documentation for when each flag is accessed or modified, and what it does.
</p>

<p>
	Save file flags are stored in the array <CodeBlock code="global.flags"/>, which is referenced throughout the
	entirety of the game within the code of all chapters. The individual flags can have any value assigned to them, but are
	referenced via a unique index, which makes it extremely challenging to figure out what they do without digging through the code.
</p>

<div class="callout warning">
	<span>⚠</span>
	<span
		>A lot of entries, <strong>particularly assignments</strong> are <strong>missing</strong> here.
		This is because they are not referenced through an index, but rather an expression which makes
		it a bit harder to track. Therefore, <strong>some information may be missing.</strong></span
	>
</div>

<hr />

<h2>Using This Documentation</h2>

<p>
	Each page documents a single flag and lists every place where it is accessed or modified.
	You can search for specific flags and filter by chapters using the options on the left.
</p>

<p>Each flag page has a table listing all code references. Each row contains:</p>
<ul class="-mt-4">
	<li><strong>File</strong>: A file in which the flag is accessed or modified.</li>
	<li><strong>Line</strong>: The line number at which the flag is modified.</li>
	<li><strong>Code</strong>: The code that references the flag</li>
</ul>

<h3>Example</h3>
<p class="text-faint">(This is not a real example and these flags don't exist)</p>
<table>
	<thead>
		<tr>
			<th>File</th>
			<th>Line</th>
			<th>Code</th>
		</tr>
	</thead>
	<tbody>
		{#each example_references as { filename, line, code }}
			<tr>
				<td><GmlFilename {filename} /></td>
				<td>{line}</td>
				<td><CodeBlock {code} block={true}/></td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="callout info">
	<span>ℹ</span>
	<span
		>You can click on <strong>filename</strong> to copy it to your clipboard. This will also remove the
		<strong>.gml</strong> extension from the end, to allow easy pasting into <strong>UndertaleModTool</strong>.
	</span>
</div>

<p>
	Hopefully, at some point in time, there will also be some text on each flag covering it's
	purpose and usage, but that would take a lot of time and there are other issues.
</p>

<hr />

<div class="callout note">
	<span>✦</span>
	<span>Made by <strong>ORANGETAN</strong></span>
</div>

<div class="kristainer">
	{#each Array(10) as _, i}
		<img
			src="{base}/kris.png"
			alt="GOD FUCKING DAMMIT KRIS WHERE THE HELL ARE WE"
			class="kris"
			style="top: {i * 0.5}px; z-index: {10 - i};"
		/>
	{/each}
</div>

<style>
	.kristainer {
		position: relative;
		width: 350px;
		height: 300px;
	}

	.kris {
		position: absolute;
		animation:
			rainbow 3s linear infinite,
			spin 6s linear infinite;
		transform-style: preserve-3d;
	}

	@keyframes rainbow {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
		}
		100% {
			transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
		}
	}
</style>
