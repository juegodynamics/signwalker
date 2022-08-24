export class Toggler<ValueT> extends Array<ValueT> {
  public toggle(value: ValueT) {
    if (this.includes(value)) {
      return this.filter((thisValue) => thisValue !== value);
    }
    this.push(value);
    return [...this, value];
  }
}
