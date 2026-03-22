export type FlagEntries = {
  [filename: string]: string[];
};

export type Flags = {
  [flagKey: string]: FlagEntries;
};