import mergedFlags from '../../../assets/flags/merged.json'
import { error } from '@sveltejs/kit';
import type { MergedFlags, FlagData } from '$lib/types';

export const prerender = true;

const merged = mergedFlags as unknown as MergedFlags;
export function entries() {
	// creates slug from the flag keys
	return Object.keys(merged).map((flagKey) => ({ slug: encodeURIComponent(flagKey) }));
}

export async function load({ params }) {
	const key = decodeURIComponent(params.slug);
	const flagData: FlagData = merged[key];

	if (!flagData) throw error(404, 'Flag not found');

	// yo
	const entries = await Promise.all(
		Object.entries(flagData.occurrences).flatMap(([ch, files]) =>
			Object.entries(files).map(async ([filename, [line, code]]) => ({
				chapter: parseInt(ch.replace('ch', '')),
				filename,
				line: line.replace('line ', ''),
				code: code
			}))
		)
	);

	return {
		key,
		firstSeenChapter: flagData.first_seen_chapter,
		entries
	};
}
