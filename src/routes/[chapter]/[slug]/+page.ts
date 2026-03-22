import ch1Flags from '$lib/flags/ch1.json';
import ch2Flags from '$lib/flags/ch2.json';
import ch3Flags from '$lib/flags/ch3.json';
import ch4Flags from '$lib/flags/ch4.json';

import { error } from '@sveltejs/kit';
import { codeToHtml } from 'shiki';

type Flags = { [flagKey: string]: { [filename: string]: string[] } };

const allFlags = [ch1Flags, ch2Flags, ch3Flags, ch4Flags] as unknown as Flags[];

async function highlight(code: string) {
  const raw = await codeToHtml(code, { lang: 'js', theme: 'dark-plus' }); // js is cloe enough to gml
  return raw
    .replace(/<pre[^>]*><code[^>]*>/, '')
    .replace(/<\/code><\/pre>/, '')
    .replace(/background(-color)?:[^;"]*/g, '');
}

export async function load({ params }) {
  const chapterIndex = parseInt(params.chapter.replace('chapter', '')) - 1;
  const flags = allFlags[chapterIndex];

  if (!flags) throw error(404, 'Chapter not found');

  const entries = (flags as Flags)[params.slug];

  if (!entries) throw error(404, 'Flag not found');

  const highlightedEntries = await Promise.all(
    Object.entries(entries).map(async ([filename, [line, code]]) => {
      return [filename, [line, await highlight(code)]] as const;
    })
  );

  return {
    key: params.slug,
    entries: Object.fromEntries(highlightedEntries),
    chapter: chapterIndex + 1
  };
}