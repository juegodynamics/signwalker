import {First, Length, Pop, Prepend, Push, Reverse} from './tuple';

const Cases = {
  Tuple1: ['one'] as const,
  Tuple2: ['one', 'two', 'three'] as const,
  Tuple3: [1, 'two', 3, 'four'] as const,
};
type Cases = typeof Cases;
type CaseKey = keyof Cases;

const Tests = {
  First: (): {
    [K in CaseKey]: First<Cases[K]>;
  } => ({
    Tuple1: 'one',
    Tuple2: 'one',
    Tuple3: 1,
  }),
  Length: (): {
    [K in CaseKey]: Length<Cases[K]>;
  } => ({
    Tuple1: 1,
    Tuple2: 3,
    Tuple3: 4,
  }),
  Push: (): {
    [K in CaseKey]: Push<Cases[K], 'pushedValue'>;
  } => ({
    Tuple1: ['one', 'pushedValue'] as const,
    Tuple2: ['one', 'two', 'three', 'pushedValue'] as const,
    Tuple3: [1, 'two', 3, 'four', 'pushedValue'] as const,
  }),
  Prepend: (): {
    [K in CaseKey]: Prepend<Cases[K], 'prependedValue'>;
  } => ({
    Tuple1: ['prependedValue', 'one'] as const,
    Tuple2: ['prependedValue', 'one', 'two', 'three'] as const,
    Tuple3: ['prependedValue', 1, 'two', 3, 'four'] as const,
  }),
  Pop: (): {
    [K in CaseKey]: Pop<Cases[K]>;
  } => ({
    Tuple1: [] as const,
    Tuple2: ['two', 'three'] as const,
    Tuple3: ['two', 3, 'four'] as const,
  }),
  Reverse: (): {
    [K in CaseKey]: Reverse<Cases[K]>;
  } => ({
    Tuple1: ['one'] as const,
    Tuple2: ['three', 'two', 'one'] as const,
    Tuple3: ['four', 3, 'two', 1] as const,
  }),
};

Object.entries(Tests).forEach(([testName, getCases]) => {
  describe(`Compiling ${testName}`, () => {
    Object.entries(getCases()).forEach(([caseName, result]) => {
      it(`${caseName} --> Success`, () => {
        expect(result).toBeDefined();
      });
    });
  });
});
