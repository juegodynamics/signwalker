import {Enum} from 'extensions';
import * as angle from './angle';
import * as circle from './circle';
import * as claw from './claw';
import * as cup from './cup';
import * as curlicue from './curlicue';
import * as fist from './fist';
import * as flat from './flat';
import * as hinge from './hinge';
import * as hook from './hook';
import * as oval from './oval';
import {RootHandShape} from './root';
import {
  DigitVariantDescriptor,
  FingerShape,
  FingerShapeVariantDescriptor,
} from './variants';

export {RootHandShape, FingerShape};

export const DigitCollection = {
  '񆅁': fist.Digit,
  '񂱡': circle.Digit,
  '񂰁': curlicue.Digit,
  '񂙡': claw.Digit,
  '񂡁': hook.Digit,
  '񂤁': cup.Digit,
  '񂳁': oval.Digit,
  '񂼁': hinge.Digit,
  '񃈁': angle.Digit,
  '񂇡': flat.Digit,
} as const;

export const AngleDecrementation = new Enum(
  '񉙧',
  '񉙨',
  '񉙡',
  '񉙢',
  '񉙣',
  '񉙤',
  '񉙥',
  '񉙦'
);
export const AngleIncrementation = new Enum(
  '񉙯',
  '񉙰',
  '񉙩',
  '񉙪',
  '񉙫',
  '񉙬',
  '񉙭',
  '񉙮'
);

export const VariantCollection: {
  [Shape in RootHandShape]: {
    DigitVariants: DigitVariantDescriptor<typeof DigitCollection[Shape]>;
    FingerShapeVariants: FingerShapeVariantDescriptor<
      typeof DigitCollection[Shape]
    >;
  };
} = {
  '񆅁': {
    DigitVariants: fist.DigitVariants,
    FingerShapeVariants: fist.FingerShapeVariants,
  },
  '񂱡': {
    DigitVariants: circle.DigitVariants,
    FingerShapeVariants: circle.FingerShapeVariants,
  },
  '񂰁': {
    DigitVariants: curlicue.DigitVariants,
    FingerShapeVariants: curlicue.FingerShapeVariants,
  },
  '񂙡': {
    DigitVariants: claw.DigitVariants,
    FingerShapeVariants: claw.FingerShapeVariants,
  },
  '񂡁': {
    DigitVariants: hook.DigitVariants,
    FingerShapeVariants: hook.FingerShapeVariants,
  },
  '񂤁': {
    DigitVariants: cup.DigitVariants,
    FingerShapeVariants: cup.FingerShapeVariants,
  },
  '񂳁': {
    DigitVariants: oval.DigitVariants,
    FingerShapeVariants: oval.FingerShapeVariants,
  },
  '񂼁': {
    DigitVariants: hinge.DigitVariants,
    FingerShapeVariants: hinge.FingerShapeVariants,
  },
  '񃈁': {
    DigitVariants: angle.DigitVariants,
    FingerShapeVariants: angle.FingerShapeVariants,
  },
  '񂇡': {
    DigitVariants: flat.DigitVariants,
    FingerShapeVariants: flat.FingerShapeVariants,
  },
} as const;
