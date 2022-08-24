import {Enum} from 'extensions';
import {
  DigitVariantDescriptor,
  FingerShape,
  FingerShapeVariantDescriptor,
} from './variants';

export const Digit = new Enum('񂟡', '񄟁', '񄯡', '񄖁', '񅇡');

export const DigitVariants: DigitVariantDescriptor<typeof Digit> = {
  options: Digit.keys,
  combinations: [],
} as const;

export const FingerShapeVariants: FingerShapeVariantDescriptor<typeof Digit> = {
  options: FingerShape.keys,
  combinations: [
    {
      character: '񄝡',
      digitCombo: Digit.subset('񄟁'),
      shapeCombo: FingerShape.subset('񁁁񁂡'),
    },
    {
      character: '񄜁',
      digitCombo: Digit.subset('񄟁'),
      shapeCombo: FingerShape.subset('񁁁񁂡'),
    },
  ],
} as const;
