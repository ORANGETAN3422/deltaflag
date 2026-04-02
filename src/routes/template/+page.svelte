<script lang="ts">
	import { codeToHtml } from 'shiki';

	const html = codeToHtml(
		`function greet(name) {
  return \`hello, \${name}\`;
}`,
		{ lang: 'javascript', theme: 'github-dark' }
	);

	let search = '';
</script>

<h1>Style Guide</h1>

<p>
	A reference page showing every styled element in the design system. Use this to check that your
	CSS is working correctly across all components.
</p>

<hr />

<!-- TYPOGRAPHY -->

<h2>Typography</h2>

<h1>Heading One</h1>
<h2>Heading Two</h2>
<h3>Heading Three</h3>
<h4>Heading Four</h4>

<p>
	This is a standard paragraph. It uses <strong>strong text</strong> for emphasis and
	<em>italic text</em>
	for flavour. You can also use
	<a href="#search">inline links</a> which glow on hover.
</p>

<p class="text-muted">Muted text using .text-muted.</p>
<p class="text-faint">Faint text using .text-faint.</p>
<p class="text-kris">Soul blue using .text-kris.</p>
<p class="text-susie">Gold using .text-susie.</p>
<p class="text-ralsei">Green using .text-ralsei.</p>

<hr />

<!-- CODE -->

<h2>Code</h2>

<p>
	Inline code looks like this: <code>const x = 42;</code>. It sits naturally in a sentence.
</p>

<pre>{@html html}</pre>

<hr />

<!-- BLOCKQUOTE -->

<h2>Blockquote</h2>

<blockquote>
	<p>"It's me, your best friend. Don't you remember? We promised we'd be together forever."</p>
</blockquote>

<hr />

<!-- CALLOUTS -->

<h2>Callouts</h2>

<div class="callout note">
	<span>✦</span>
	<span>This is a <strong>note</strong> callout. Use for tips and general info.</span>
</div>

<div class="callout info">
	<span>ℹ</span>
	<span>This is an <strong>info</strong> callout. Use for neutral notices.</span>
</div>

<div class="callout warning">
	<span>⚠</span>
	<span>This is a <strong>warning</strong> callout. Use for things to watch out for.</span>
</div>

<div class="callout danger">
	<span>✖</span>
	<span>This is a <strong>danger</strong> callout. Use for errors or destructive actions.</span>
</div>

<hr />

<!-- TABLE -->

<h2>Table</h2>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>href</code></td>
			<td><code>string</code></td>
			<td><code>/</code></td>
			<td>The link destination.</td>
		</tr>
		<tr>
			<td><code>active</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether the link is currently active.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td>—</td>
			<td>Display text for the link.</td>
		</tr>
	</tbody>
</table>

<hr />

<!-- BUTTONS -->

<h2>Buttons</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
	<button>Default</button>
	<button class="primary">Primary</button>
	<button disabled>Disabled</button>
</div>

<hr />

<!-- INPUTS -->

<h2>Inputs</h2>

<div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 24rem;">
	<input type="text" placeholder="Text input..." />
	<input type="search" placeholder="Search input..." bind:value={search} />
	<textarea rows="4" placeholder="Textarea..."></textarea>
</div>

<hr />

<!-- UTILITIES -->

<h2>Utilities</h2>

<p class="mono">This text uses the .mono utility — Fira Code.</p>
