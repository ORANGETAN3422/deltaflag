import flagsData from '$lib/flags.json';
import { error } from '@sveltejs/kit';

type Flags = {
  [flagKey: string]: {
    [filename: string]: string[];
  };
};

const flags = flagsData as unknown as Flags;

export async function load({ params }) {
  const key = decodeURIComponent(params.slug);
  const entries = flags[key];

  if (!entries) throw error(404, 'Flag not found');

  return { key, entries };
}