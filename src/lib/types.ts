export type FlagEntries = {
	[filename: string]: string[];
};

export type Flags = {
	[flagKey: string]: FlagEntries;
};

export type MergedFlags = {
	[flagKey: string]: FlagData;
};

export type FlagData = {
	first_seen_chapter: number; // first seen chapter
	occurrences: Record<string, Record<string, [string, string]>>; // todo: cleanup lol
};
