import ch1Flags from '$lib/flags/ch1.json';
import ch2Flags from '$lib/flags/ch2.json';
import ch3Flags from '$lib/flags/ch3.json';
import ch4Flags from '$lib/flags/ch4.json';
import type { Flags } from '$lib/types';

const flags1 = ch1Flags as unknown as Flags;
const flags2 = ch2Flags as unknown as Flags;
const flags3 = ch3Flags as unknown as Flags;
const flags4 = ch4Flags as unknown as Flags;

export const prerender = true;

export async function load() {
  const chapters = [flags1, flags2, flags3, flags4].map((flags, i) => ({
  chapter: i + 1,
  pages: Object.keys(flags).map(key => ({
    slug: key,
    label: key,
    href: `/chapter${i + 1}/${key}`
  }))
}));

  return { chapters };
}