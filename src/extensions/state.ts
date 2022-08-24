export interface State<T> {
  copy: (values?: Partial<T>) => T;
}
