import {Enum} from 'extensions';
import {FingerShape} from './variants';

export const Digit = new Enum('񂮡', '񄷁', '񄚡', '', '');

export const DigitVariants = {
  options: Digit.keys,
  combinations: [],
} as const;

export const FingerShapeVariants = {
  options: FingerShape.keys,
  combinations: [],
} as const;
