import flagsData from '$lib/flags.json';
import type { Flags } from '$lib/types';

const flags = flagsData as unknown as Flags;

export const prerender = true;

export async function load() {
  const pages = Object.keys(flags).map(key => ({
    slug: encodeURIComponent(key),
    label: key
  }));

  return { pages };
}