import {Enum, EnumTuple, EnumType, TupleSubset} from 'extensions';
export const FingerShape = new Enum(
  '񅊡񅢡',
  '񅊡񅡁',
  '񅊡񅙡',
  '񀀡񀑁',
  '񀀡񀉡',
  '񀀡񀎁',
  '񂇡񁲡',
  '񁁁񁂡',
  '񅊡񅖡',
  '񀕡񀠁',
  '񀕡񀧡'
);
export type FingerShape = EnumType<typeof FingerShape>;

export type DigitVariantDescriptor<DigitT extends Enum<readonly string[]>> = {
  options: EnumTuple<DigitT>;
  combinations: ReadonlyArray<{
    character: string;
    digitCombo: TupleSubset<EnumTuple<DigitT>>;
  }>;
};

export interface FingerShapeVariantDescriptor<
  DigitT extends Enum<readonly string[]>
> {
  options: EnumTuple<typeof FingerShape>;
  combinations: ReadonlyArray<{
    character: string;
    digitCombo: TupleSubset<EnumTuple<DigitT>>;
    shapeCombo: TupleSubset<EnumTuple<typeof FingerShape>>;
  }>;
}
