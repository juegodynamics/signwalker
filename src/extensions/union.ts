// convert a union to an intersection: X | Y | Z ==> X & Y & Z
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// convert a union to an overloaded function X | Y ==> ((x: X)=>void) & ((y:Y)=>void)
export type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

// returns true if the type is a union otherwise false
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// type ValueUnionToOvlds = UnionToOvlds<ValueObject>

// takes last from union
export type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? A
  : never;
