import {Enum} from 'extensions';
import {FingerShape} from './variants';

export const Digit = new Enum('񂧁', '񀃡', '񄠡', '񄸡', '񁽁');

export const DigitVariants = {
  options: Digit.keys,
  combinations: [
    {
      character: '񅢡',
      digitCombo: Digit.subset('񂧁', '񀃡'),
    },
  ],
} as const;

export const FingerShapeVariants = {
  options: FingerShape.keys,
  combinations: [
    {
      character: '񂢡',
      digitCombo: Digit.subset(),
      shapeCombo: FingerShape.subset('񂇡񁲡'),
    },
    {
      character: '񂪁',
      digitCombo: Digit.subset(),
      shapeCombo: FingerShape.subset('񀕡񀠁'),
    },
    {
      character: '񂭁',
      digitCombo: Digit.subset(),
      shapeCombo: FingerShape.subset('񅊡񅖡'),
    },
    {
      character: '񂫡',
      digitCombo: Digit.subset(),
      shapeCombo: FingerShape.subset('񂇡񁲡', '񅊡񅖡'),
    },
    {
      character: '񂥡',
      digitCombo: Digit.subset('񂧁'),
      shapeCombo: FingerShape.subset('񂇡񁲡'),
    },
    {
      character: '񂨡',
      digitCombo: Digit.subset('񂧁'),
      shapeCombo: FingerShape.subset('񂇡񁲡', '񀕡񀠁'),
    },
    {
      character: '񁾡',
      digitCombo: Digit.subset('񁽁'),
      shapeCombo: FingerShape.subset('񂇡񁲡'),
    },
    {
      character: '񅤁',
      digitCombo: Digit.subset('񂧁', '񀃡'),
      shapeCombo: FingerShape.subset('񂇡񁲡'),
    },
  ],
} as const;
