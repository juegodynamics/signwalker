import {Enum} from './objects/enum';
import {SwapKey} from './swap';
import {TupleSubset} from './tuple';

class CombinationConflict<
  TupleT extends readonly string[],
  ValueT
> extends Error {
  path: TupleSubset<TupleT>;
  currentIndex: number;
  priorValue: ValueT;
  constructor(
    props: Pick<
      CombinationConflict<TupleT, ValueT>,
      'path' | 'currentIndex' | 'priorValue'
    >
  ) {
    super(
      `Failed to add value at ${props.path
        .slice(0, props.currentIndex)
        .join('.')} - value of ${props.priorValue} already existed!`
    );
    Object.assign(this, props);
  }
}

type CombinationIndex<TupleT extends readonly string[], ValueT> = {
  path: TupleSubset<TupleT>;
  currentIndex: number;
  value: ValueT;
};

class CombinationValue<TupleT extends readonly string[], ValueT> {
  value?: ValueT;
  combinations?: Partial<
    Record<TupleT[number], CombinationValue<TupleT, ValueT>>
  >;

  public add(
    {path, value}: Pick<CombinationIndex<TupleT, ValueT>, 'path' | 'value'>,
    onValueConflict: (
      index: SwapKey<CombinationIndex<TupleT, ValueT>, 'value', 'priorValue'>
    ) => void = (index) => {
      throw new CombinationConflict(index);
    }
  ) {
    this.addValueAtPath({path, currentIndex: 0, value, onValueConflict});
    return this;
  }

  public get(path: TupleSubset<TupleT>) {
    return this.getValueAtPath({path, currentIndex: 0});
  }

  private addValueAtPath({
    path,
    currentIndex,
    value,
    onValueConflict,
  }: CombinationIndex<TupleT, ValueT> & {
    onValueConflict: (
      index: SwapKey<CombinationIndex<TupleT, ValueT>, 'value', 'priorValue'>
    ) => void;
  }): void {
    if (!path.length || currentIndex >= path.length) {
      if (this.value) {
        onValueConflict({path, currentIndex, priorValue: this.value});
      }
      this.value = value;
      return;
    }

    if (!this.combinations) {
      this.combinations = {};
    }
    if (!this.combinations[path[currentIndex]]) {
      this.combinations[path[currentIndex]] = new CombinationValue<
        TupleT,
        ValueT
      >();
    }

    return this.combinations[path[currentIndex]]?.addValueAtPath({
      path,
      currentIndex: currentIndex + 1,
      value,
      onValueConflict,
    });
  }

  private getValueAtPath({
    path,
    currentIndex,
  }: {
    path: TupleSubset<TupleT>;
    currentIndex: number;
  }): ValueT | undefined {
    if (!path.length || currentIndex >= path.length) {
      return this.value;
    }

    return this.combinations?.[path[currentIndex]]?.getValueAtPath({
      path,
      currentIndex: currentIndex + 1,
    });
  }
}

export class CombinationSet<
  TupleT extends readonly string[],
  ValueT = string
> extends Enum<TupleT> {
  root: CombinationValue<TupleT, ValueT> = new CombinationValue();

  public combine(callbackfn: (subset: TupleSubset<TupleT>) => void) {
    for (let index = 0; index <= 2 ** this.length - 1; index++) {
      const subset: TupleT[number][] = [...index.toString(2)].reduce<
        TupleT[number][]
      >(
        (prior, nextDigit, index) =>
          nextDigit === '1'
            ? [...prior, this.key(this.length - 1 - index)]
            : prior,
        []
      );
      callbackfn(new TupleSubset<TupleT>(...subset));
    }
  }

  public add(subset: TupleSubset<TupleT>, value: ValueT) {
    this.root.add({path: this.sortSubset(subset), value});
    return this;
  }

  public get(subset: TupleSubset<TupleT>): ValueT | undefined {
    return this.root.get(this.sortSubset(subset));
  }
}
