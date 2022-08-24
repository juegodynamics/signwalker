export type Unique<K extends Array<keyof any>> = Array<
  keyof Record<K[number], any>
>;
