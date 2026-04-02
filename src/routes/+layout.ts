import ch1Flags from '$assets/flags/ch1.json';
import ch2Flags from '$assets/flags/ch2.json';
import ch3Flags from '$assets/flags/ch3.json';
import ch4Flags from '$assets/flags/ch4.json';

import mergedFlags from '$assets/flags/merged.json';

import type { Flags } from '$lib/types';

const flags1 = ch1Flags as unknown as Flags;
const flags2 = ch2Flags as unknown as Flags;
const flags3 = ch3Flags as unknown as Flags;
const flags4 = ch4Flags as unknown as Flags;

export const prerender = true;

export async function load() {
	const chapters = [flags1, flags2, flags3, flags4].map((flags, i) => ({
		chapter: i + 1,
		pages: Object.keys(flags).map((key) => ({
			slug: key,
			label: key,
			href: `/chapter${i + 1}/${key}`
		}))
	}));

	const merged = mergedFlags as unknown as Record<
		string,
		{
			first_seen_chapter: number;
			occurrences: Record<string, Record<string, [string, string]>>;
		}
	>;

	const flagPages = Object.entries(merged).map(([key, value]) => ({
		key,
		href: `/flags/${encodeURIComponent(key)}`,
		firstSeenChapter: value.first_seen_chapter,
		chapters: Object.keys(value.occurrences).map((ch) => parseInt(ch.replace('ch', ''))),
		occurrences: value.occurrences
	}));

	return { chapters, flagPages };
}
