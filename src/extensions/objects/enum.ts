import {TupleSubset} from '../tuple';

export class Enum<TupleT extends readonly string[]> {
  constructor(...keys: TupleT) {
    this.keys = keys;
  }

  public readonly keys: TupleT;

  public key(index: number): TupleT[number] {
    return this.keys[index];
  }

  public includes(key?: string): key is TupleT[number] {
    if (!key) return false;
    return this.keys.includes(key);
  }

  public getIncluded(keys: string[]): TupleT[number] | undefined {
    for (let key of keys) {
      if (this.includes(key)) {
        return key;
      }
    }
    return;
  }

  public getAllIncluded(keys: string[]): TupleSubset<TupleT> {
    const includedKeys: TupleT[number][] = [];
    for (let key of keys) {
      if (this.includes(key)) {
        includedKeys.push(key);
      }
    }
    return new TupleSubset(...includedKeys);
  }

  // public getAllExcluded(keys: string[]):  TupleSubset<TupleT> {
  //   const excludedKeys: TupleT[number][] = [];
  //   for (let key of keys) {
  //     if (!this.includes(key)) {
  //       includedKeys.push(key);
  //     }
  //   }
  //   return new TupleSubset(...includedKeys);
  // }

  public index(key: TupleT[number]): number {
    return this.keys.findIndex((thisKey) => thisKey === key);
  }

  public get length(): number {
    return this.keys.length;
  }

  public subset(...subset: TupleT[number][]): TupleSubset<TupleT> {
    return this.sortSubset(new TupleSubset(...subset));
  }

  public sortSubset(subset: TupleSubset<TupleT>): TupleSubset<TupleT> {
    return subset.copy().sort((a, b) => this.index(a) - this.index(b));
  }

  static union<
    TupleA extends readonly string[],
    TupleB extends readonly string[]
  >(enumA: Enum<TupleA>, enumB: Enum<TupleB>): Enum<[...TupleA, ...TupleB]> {
    return new Enum(...enumA.keys, ...enumB.keys);
  }

  public push<TupleB extends readonly string[]>(
    ...tupleB: TupleB
  ): Enum<[...TupleT, ...TupleB]> {
    return Enum.union(this, new Enum(...tupleB));
  }

  public union<TupleB extends readonly string[]>(
    enumB: Enum<TupleB>
  ): Enum<[...TupleT, ...TupleB]> {
    return Enum.union(this, enumB);
  }

  public forEach(callbackfn: (key: TupleT[number], index: number) => void) {
    this.keys.forEach(callbackfn);
  }

  public map<ValueT>(
    callbackfn: (key: TupleT[number], index: number) => ValueT
  ) {
    return this.keys.map(callbackfn);
  }

  public filter(
    callbackfn: (key: TupleT[number]) => boolean
  ): TupleSubset<TupleT> {
    return new TupleSubset(...this.keys.filter(callbackfn));
  }

  static reduce<KeyT extends string, ValueT>(
    keys: readonly KeyT[],
    callbackfn: (key: KeyT, index: number) => ValueT
  ): Record<KeyT, ValueT> {
    return keys.reduce((partialObject, nextKey, index) => {
      return {
        ...partialObject,
        [nextKey]: callbackfn(nextKey, index),
      };
    }, {}) as Record<KeyT, ValueT>;
  }

  public reduce<ValueT>(
    callbackfn: (key: TupleT[number], index: number) => ValueT
  ) {
    return Enum.reduce(this.keys, callbackfn);
  }

  static subreduce<KeyT extends string, ValueT>(
    values: readonly KeyT[],
    callbackfn: (key: KeyT, index: number) => ValueT | undefined
  ): Partial<Record<KeyT, ValueT>> {
    return values.reduce((partialObject, nextKey, index) => {
      const nextKeyValue = callbackfn(nextKey, index);
      return {
        ...partialObject,
        ...(nextKeyValue && {[nextKey]: nextKeyValue}),
      };
    }, {});
  }

  public subreduce<ValueT>(
    callbackfn: (key: TupleT[number], index: number) => ValueT | undefined
  ) {
    return Enum.subreduce(this.keys, callbackfn);
  }
}

export type EnumType<EnumT extends Enum<readonly string[]>> =
  EnumT extends Enum<infer TupleT> ? TupleT[number] : never;
export type EnumTuple<EnumT extends Enum<readonly string[]>> =
  EnumT extends Enum<infer TupleT> ? TupleT : never;
export type EnumFirst<EnumT extends Enum<readonly string[]>> =
  EnumT extends Enum<infer TupleT> ? TupleT[0] : never;
export type EnumLength<EnumT extends Enum<readonly string[]>> =
  EnumT extends Enum<infer TupleT> ? TupleT['length'] : never;
