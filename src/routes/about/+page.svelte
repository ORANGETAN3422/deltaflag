<script lang="ts">
	import GmlFilename from '../[chapter]/[slug]/GmlFilename.svelte';
</script>

<p class="text-muted">/about</p>

<h1>About</h1>

<hr />

<h2>What is this?</h2>

<p>
	Deltarune stores its save data in a cryptic format, which makes it incredibly difficult to figure
	out what does what. This project is an attempt to reverse engineer the save data format, and
	provide documentation for when each flag is modified, and what it does.
</p>

<p>
	Flags are stored in the array <code>global.flags</code>, which are referenced throughout the
	entirety of the game among all chapters. The flags can have any value assigned to them, but are
	referenced to as an index which makes it basically impossible to figure out what they do without
	already knowing what they do.
</p>

<hr />

<h2>How to Use This Documentation</h2>

<p>
	Each page documents a single flag, and lists every single time that flag is modified in the code.
	You can sort flags by what chapter they are in, and search for them as well.
</p>

<p>Each flag contains a table, which lists:</p>
<ul class="-mt-4">
	<li><strong>File</strong>: The file in which the flag is modified.</li>
	<li><strong>Line</strong>: The line number at which the flag is modified.</li>
	<li><strong>Code</strong>: The code that modifies the flag.</li>
</ul>

<h3>Example</h3>
<p class="text-faint">(this is not a real example these flags dont happen)</p>
<table>
	<thead>
		<tr>
			<th>File</th>
			<th>Line</th>
			<th>Code</th>
		</tr>
	</thead>
	<tbody>
		{#each [{ filename: 'gml_Object_obj_orange_shop_Create_0.gml', line: '20', code: 'global.flag[666] = 1;' }, { filename: 'gml_Object_obj_gaster_battle_Step_0.gml', line: '47', code: 'if (global.flag[666] == 0)' }, { filename: 'gml_Object_obj_berdly_date_Create_0.gml', line: '7', code: 'global.flag[666] = 0;' }] as { filename, line, code }}
			<tr>
				<td><GmlFilename name={filename} /></td>
				<td>{line}</td>
				<td><code class="block break-all whitespace-pre-wrap">{code}</code></td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="callout info">
	<span>ℹ</span>
	<span
		>You can click on <strong>filename</strong> to copy the filename to your clipboard. This will
		also remove <strong>.gml</strong> from the end of the filename when you copy it, so that it is
		more convenient to paste into <strong>UndertaleModTool</strong>.
	</span>
</div>

<p>
	Hopefully, at some point in time, there will also be some text on each flag which covers it's
	purpose and usage but that would take a while so idk rn and some other issues.
</p>

<hr />

<div class="callout note">
	<span>✦</span>
	<span>Made by <strong>ORANGETAN</strong></span>
</div>

<div class="kristainer">
	{#each Array(10) as _, i}
		<img
			src="/kris.png"
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
