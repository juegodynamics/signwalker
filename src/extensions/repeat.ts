export const repeat = <T>(max: number, callbackfn: (index: number) => T): T[] =>
  [...Array(max).keys()].map(callbackfn);

export const flatRepeat = <T>(
  max: number,
  callbackfn: (index: number) => T[]
): T[] => [...Array(max).keys()].flatMap(callbackfn);
