import mergedFlags from '$lib/flags/merged.json';
import { error } from '@sveltejs/kit';
import { codeToHtml } from 'shiki';

import docs from '$lib/documentation/1-100.json';

type Docs = Record<string, { body: string; other: string; values: Record<string, string> }>;
const allDocs = docs as unknown as Docs;

type MergedFlags = Record<
	string,
	{
		first_seen_chapter: number;
		occurrences: Record<string, Record<string, [string, string]>>;
	}
>;

const merged = mergedFlags as unknown as MergedFlags;

async function highlight(code: string) {
	const raw = await codeToHtml(code, { lang: 'js', theme: 'dark-plus' });
	return raw
		.replace(/<pre[^>]*><code[^>]*>/, '')
		.replace(/<\/code><\/pre>/, '')
		.replace(/background(-color)?:[^;"]*/g, '');
}

async function highlightInline(html: string) {
	const matches = [...html.matchAll(/<pre><code>([\s\S]*?)<\/code><\/pre>/g)];
	let result = html;
	for (const match of matches) {
		const highlighted = await highlight(match[1]);
		result = result.replace(match[0], `<pre><code>${highlighted}</code></pre>`);
	}
	return result;
}

export const prerender = true;

export function entries() {
	return Object.keys(merged).map((key) => ({ slug: encodeURIComponent(key) }));
}

export async function load({ params }) {
	const key = decodeURIComponent(params.slug);
	const flag = merged[key];

	if (!flag) throw error(404, 'Flag not found');

	const allEntries = await Promise.all(
		Object.entries(flag.occurrences).flatMap(([ch, files]) =>
			Object.entries(files).map(async ([filename, [line, code]]) => ({
				chapter: parseInt(ch.replace('ch', '')),
				filename,
				line: line.replace('line ', ''),
				code: await highlight(code)
			}))
		)
	);

	return {
		key,
		firstSeenChapter: flag.first_seen_chapter,
		entries: allEntries,
		doc: allDocs[key]
			? {
					body: allDocs[key].body,
					other: await highlightInline(allDocs[key].other),
					values: allDocs[key].values
				}
			: null
	};
}
