export class TupleSubset<TupleT extends readonly string[]> extends Array<
  TupleT[number]
> {
  public equals<ElementT extends string = TupleT[number]>(
    ...elements: ElementT[]
  ): boolean {
    return (
      (!elements.length ||
        elements.every((element) => this.includes(element))) &&
      elements.length === this.length
    );
  }

  public equalsToggle<ElementT extends string = TupleT[number]>(
    ...elements: ElementT[]
  ):
    | {isEqualWithToggled: true; toggled: TupleT[number]}
    | {isEqualWithToggled: false; toggled?: undefined} {
    for (let thisElement of this) {
      if (this.toggle(thisElement).equals(...elements)) {
        return {isEqualWithToggled: true, toggled: thisElement};
      }
    }

    return {
      isEqualWithToggled: false,
    };
  }

  public includesAll<ElementT extends string = TupleT[number]>(
    ...elements: ElementT[]
  ): boolean {
    return elements.every((element) => this.includes(element));
  }

  public excluded<ElementT extends string = TupleT[number]>(
    ...elements: ElementT[]
  ): TupleT[number][] {
    return elements.filter((element) => !this.includes(element));
  }

  public toggle<ElementT extends string = TupleT[number]>(
    element: ElementT
  ): TupleSubset<TupleT> {
    return new TupleSubset<TupleT>(
      ...(this.includes(element)
        ? this.filter((thisElement) => thisElement !== element)
        : [...this, element])
    );
  }

  public copy() {
    return new TupleSubset<TupleT>(...this);
  }
}

export type First<TupleT extends readonly any[]> = TupleT[0];
export type Length<TupleT extends readonly any[]> = TupleT['length'];

// add an element to the end of a tuple
export type Push<TupleT extends readonly any[], ItemT> = readonly [
  ...TupleT,
  ItemT
];

export type Prepend<TupleT extends readonly any[], ItemT> = readonly [
  ItemT,
  ...TupleT
];

export type Pop<TupleT extends readonly any[]> = ((
  ..._: TupleT
) => any) extends (_: TupleT[0], ..._1: infer Rest) => any
  ? readonly [...Rest]
  : never;

export type Reverse<
  TupleT extends readonly any[],
  PrefixT extends readonly any[] = []
> = {
  0: PrefixT;
  1: ((..._: TupleT) => any) extends (_: infer First, ..._1: infer Next) => any
    ? Reverse<Next, Prepend<PrefixT, First>>
    : never;
}[TupleT extends readonly [any, ...any[]] ? 1 : 0];

export type Join<TuplesT extends readonly any[][]> = [...TuplesT[number]];
