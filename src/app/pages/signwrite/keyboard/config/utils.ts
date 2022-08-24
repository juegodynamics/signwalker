export const updateExclusive = <T extends string>(
  current: T | undefined,
  next: T
): T | undefined => (!current || current !== next ? next : undefined);

export const updateInclusive = <T extends string>(current: T[], next: T): T[] =>
  current.includes(next)
    ? current.filter((entry) => entry !== next)
    : [...current, next];
