import * as sign from "../signstruct";

export type Option<LabelT extends string = string> = {
  key: string;
  label: LabelT;
  selected?: boolean;
};

export type OptionMap<LabelT extends string = string> = Record<string, Omit<Option<LabelT>, "key">>;

export const flattenOptionMap = (optionMap: OptionMap): Option[] =>
  Object.entries(optionMap).map(([key, partialOption]) => ({ key, ...partialOption }));

export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export const toggleArrayEntry = <T,>(arr: T[], entry: T): T[] =>
  arr.includes(entry) ? arr.filter((arrEntry) => arrEntry !== entry) : [...arr, entry];

export const Finger = sign.handshape.Finger;
export type Finger = sign.handshape.Finger;
export type FingerMap<ValueT = boolean> = sign.handshape.FingerMap<ValueT>;

export const toggleFingerInMap = sign.handshape.toggleFingerInMap;

export type Handshape = sign.handshape.Glyph;

export interface ContactIndicator {
  glyphType: "contact";
  selectedRoot?: string;
  between?: boolean;
  frequency?: "double" | "triple";
  angle: number;
  x: number;
  y: number;
}

export const getDefaultContactIndicator = (): ContactIndicator => ({
  glyphType: "contact",
  selectedRoot: "񆇡",
  angle: 0,
  x: 0,
  y: 0,
});

type BaseFingerMovementIndicator = {
  glyphType: "fingerMovement";
  selectedRoot?: string;
  angle: number;
  x: number;
  y: number;
};

export type StepFingerMovementIndicator = BaseFingerMovementIndicator & {
  movementStyle: "step";
  size: "small" | "large" | "scissors";
  frequency?: "double" | "triple" | "quadruple";
};

// export type StepFingerMovementSignature =

export type SeriesFingerMovementIndicator = BaseFingerMovementIndicator & {
  movementStyle: "series";
  pattern: "sequential" | "alternating";
  direction: "clockwise" | "counterclockwise";
  count: number;
};

export type FingerMovementIndicator = StepFingerMovementIndicator | SeriesFingerMovementIndicator;

export const getDefaultFingerMovementIndicator = (): FingerMovementIndicator => ({
  glyphType: "fingerMovement",
  selectedRoot: "񆡁",
  angle: 0,
  x: 0,
  y: 0,
  movementStyle: "step",
  size: "large",
});

export type HandMovementIndicator = {
  glyphType: "handMovement";
  selectedRoot?: string;
  code: number;
  size: "small" | "medium" | "large" | "largest";
  frequency: "single" | "double" | "triple";
  alternating?: boolean;
  wristFlex?: boolean;
  headless?: boolean;
  angle: number;
  path: "none" | "bend" | "check" | "box" | "zigzag" | "peaks";
  x: number;
  y: number;
};

export const getDefaultHandMovementIndicator = (): HandMovementIndicator => ({
  glyphType: "handMovement",
  selectedRoot: "񆿁",
  code: 0x46fc1,
  size: "small",
  frequency: "single",
  wristFlex: false,
  headless: false,
  angle: 0,
  path: "none",
  x: 0,
  y: 0,
});

export type Glyph = sign.handshape.Glyph | sign.contact.Glyph | FingerMovementIndicator | HandMovementIndicator;

export interface SignWordState {
  glyph: Glyph[];
  glyphIndex: number;
}

export const getDefaultSignWordState = (): SignWordState => ({
  glyph: [new sign.handshape.Glyph()],
  glyphIndex: 0,
});

export interface SignTextState {
  words: SignWordState[];
  wordIndex: number;
}

export const getDefaultSignTextState = (): SignTextState => ({
  words: [getDefaultSignWordState()],
  wordIndex: 0,
});

export type VariantSignature<T = string> = [T[], T[], T[], T[], T[]];
export interface VariantOption {
  key: string;
  signature: VariantSignature;
}

export type HandshapeVariantKey =
  | "cupped"
  | "circled"
  | "hooked"
  | "hinged"
  | "bent"
  | "raised_knuckle"
  | "open"
  | "under"
  | "forward"
  | "conjoined"
  | "crossed";

export interface FingerCombination {
  key: string;
  redirect?: {
    selectedRoot?: string;
    selectedFingers: sign.handshape.FingerMap;
    selectedFingerVariants?: sign.handshape.FingerMap<string[]>;
  };
  variants?: {
    [key: string]: [
      HandshapeVariantKey[],
      HandshapeVariantKey[],
      HandshapeVariantKey[],
      HandshapeVariantKey[],
      HandshapeVariantKey[]
    ];
  };
}

export interface FingerSpecification {
  primaryFingers: [string, string, string, string, string];
  combinations: Record<string, FingerCombination>;
}
export const hasIndex = <T,>(arr: T[], index: number) => index >= 0 && index < arr.length;
export const equalArr = (a: string[], b: string[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);
export const equalNestedArr = (a: string[][], b: string[][]) =>
  a.length === b.length && a.every((subA, index) => equalArr(subA, b[index]));
export const unique = (arr: string[]): string[] =>
  Object.keys(arr.reduce((prior, next) => ({ ...prior, [next]: true }), {}));

export const mod = (n: number, m: number) => ((n % m) + m) % m;
