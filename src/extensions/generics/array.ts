export class XArray<ValueT> extends Array<ValueT> {
  public update(index: number, value: ValueT): ValueT[] {
    return [
      ...this.slice(0, index),
      value,
      ...this.slice(index + 1, this.length),
    ];
  }
}
