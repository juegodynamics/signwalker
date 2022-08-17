export type Option<LabelT extends string = string> = {
  key: string;
  label: LabelT;
  selected?: boolean;
};

export type OptionMap<LabelT extends string = string> = Record<string, Omit<Option<LabelT>, "key">>;

export const flattenOptionMap = (optionMap: OptionMap): Option[] =>
  Object.entries(optionMap).map(([key, partialOption]) => ({ key, ...partialOption }));

export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type Finger = "thumb" | "index" | "middle" | "ring" | "little";
export type FingerMap<ValueT = boolean> = Partial<Record<Finger, ValueT>>;

export const fingerIndices: Finger[] = ["thumb", "index", "middle", "ring", "little"];
export const toggleFingerInMap = (fingerMap: FingerMap, finger: Finger) => ({
  ...(fingerMap.thumb ? (finger === "thumb" ? {} : { thumb: true }) : finger === "thumb" ? { thumb: true } : {}),
  ...(fingerMap.index ? (finger === "index" ? {} : { index: true }) : finger === "index" ? { index: true } : {}),
  ...(fingerMap.middle ? (finger === "middle" ? {} : { middle: true }) : finger === "middle" ? { middle: true } : {}),
  ...(fingerMap.ring ? (finger === "ring" ? {} : { ring: true }) : finger === "ring" ? { ring: true } : {}),
  ...(fingerMap.little ? (finger === "little" ? {} : { little: true }) : finger === "little" ? { little: true } : {}),
});

export const toggleArrayEntry = <T,>(arr: T[], entry: T): T[] =>
  arr.includes(entry) ? arr.filter((arrEntry) => arrEntry !== entry) : [...arr, entry];

export interface SignState {
  selectedRoot?: string;
  selectedFingers: FingerMap;
  selectedFingerVariants: FingerMap<string[]>;
  currentRevealedVariants: string[];
}

export const getDefaultSignState = (): SignState => ({
  selectedFingers: {},
  selectedFingerVariants: {},
  currentRevealedVariants: [],
});
