export type SwapKey<
  ObjectT extends Record<string, any>,
  OriginalKeyT extends keyof ObjectT,
  NewKeyT extends string
> = Omit<ObjectT, OriginalKeyT> & {[K in NewKeyT]: ObjectT[OriginalKeyT]};

export type SwapValue<
  ObjectT extends Record<string, any>,
  OriginalKeyT extends keyof ObjectT,
  NewValT
> = Omit<ObjectT, OriginalKeyT> & {[K in OriginalKeyT]: NewValT};
