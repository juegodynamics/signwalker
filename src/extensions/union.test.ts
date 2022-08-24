import {UnionToIntersection} from './union';

type Type1 = {a: string} | {b: string} | {c: string};
type Type2 = {a: {a1: string}} | {a: {a2: string}} | {b: string};
type Type3 = string | number;

const Never: never = [][0];

// = UnionToIntersection ===
describe('UnionToIntersection', () => {
  it('T1 compiles to intersection', () => {
    expect<UnionToIntersection<Type1>>({
      a: 'foo',
      b: 'foo',
      c: 'foo',
    }).toBeTruthy();
  });

  it('T2 compiles to intersection', () => {
    expect<UnionToIntersection<Type2>>({
      a: {a1: 'foo', a2: 'foo'},
      b: 'foo',
    }).toBeTruthy();
  });

  it('T3 compiles to never', () => {
    expect<UnionToIntersection<Type3>>(Never).toBeFalsy();
  });
});
