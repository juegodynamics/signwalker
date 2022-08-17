import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Finger,
  fingerIndices,
  getDefaultSignState,
  FingerMap,
  Option,
  OptionMap,
  SignState,
  Dispatch,
  flattenOptionMap,
  toggleFingerInMap,
  toggleArrayEntry,
} from "./types";

const v = ({
  thumb,
  index,
  middle,
  ring,
  little,
}: {
  thumb?: VariantKey | VariantKey[];
  index?: VariantKey | VariantKey[];
  middle?: VariantKey | VariantKey[];
  ring?: VariantKey | VariantKey[];
  little?: VariantKey | VariantKey[];
}): [VariantKey[], VariantKey[], VariantKey[], VariantKey[], VariantKey[]] => [
  thumb ? (Array.isArray(thumb) ? thumb : [thumb]) : [],
  index ? (Array.isArray(index) ? index : [index]) : [],
  middle ? (Array.isArray(middle) ? middle : [middle]) : [],
  ring ? (Array.isArray(ring) ? ring : [ring]) : [],
  little ? (Array.isArray(little) ? little : [little]) : [],
];

export const rootOptions: OptionMap = {
  "񆅁": { label: "first" },
  "񂱡": { label: "circle" },
  "񂰁": { label: "curlicue" },
  "񂙡": { label: "claw" },
  "񂡁": { label: "hook" },
  "񂤁": { label: "cup" },
  "񂳁": { label: "oval" },
  "񂼁": { label: "hinge" },
  "񃈁": { label: "angle" },
  "񂇡": { label: "flat" },
};

export const getRootOptions = () => flattenOptionMap(rootOptions);

export const fingerVariants = {
  cupped: "񅊡񅢡",
  circled: "񅊡񅡁",
  hooked: "񅊡񅙡",
  hinged: "񀀡񀑁",
  bent: "񀀡񀉡",
  raised_knuckle: "񀀡񀎁",
  under: "񆅁񆂁",
  forward: "񅊡񅖡",
  between: "񁁁񁂡",
  conjoined: "񀕡񀠁",
  crossed: "񀕡񀧡",
};

export const getVariantSelectors = () => Object.entries(fingerVariants).map(([label, key]) => ({ key, label }));

export type VariantKey = keyof typeof fingerVariants;

export const fingerRealignments: Record<string, [number, number]> = {
  "񅰁": [-32, -59],
  "񀀡": [-56, -30],
  "񄩡": [-56, -30],
  "񄅡": [-43, -29],
  "񃛡": [-39, -30],
  "񀂁": [-53, -31],
  "񂮡": [-19, -48],
};

export const ManualLetter = ({ letter, opacity = 0.5 }: { letter: string; opacity?: number }) => {
  const [top, left] = fingerRealignments[letter] || [0, 0];
  return (
    <Typography variant="h1" sx={{ position: "absolute", opacity, top, left }}>
      {letter}
    </Typography>
  );
};

export const ManualLayeredLetter = ({ letters }: { letters: string[] }) => (
  <Box sx={{ position: "relative" }}>
    {[...letters].map((char, index) => (
      <ManualLetter key={index} letter={char} opacity={1 / [...letters].length} />
    ))}
  </Box>
);

interface FingerCombination {
  key: string;
  custom?: React.ReactNode;
  redirect?: {
    selectedRoot?: string;
    selectedFingers: FingerMap;
    selectedFingerVariants?: FingerMap<string[]>;
  };
  variants?: {
    [key: string]: [VariantKey[], VariantKey[], VariantKey[], VariantKey[], VariantKey[]];
  };
}

interface FingerSpecification {
  primaryFingers: [string, string, string, string, string];
  combinations: Record<string, FingerCombination>;
}

export const fingerCombos: Record<string, FingerSpecification> = {
  "񆅁": {
    primaryFingers: ["񅰁", "񀀡", "񄩡", "񄅡", "񃛡"],
    combinations: {
      "": { key: "񆅁" },
      "񅰁": {
        key: "񅰁",
        variants: {
          "񅳁": v({ thumb: "hinged" }),
          "񅴡": v({ thumb: "conjoined" }),
          "񅶁": v({ thumb: "bent" }),
          "񅷡": v({ thumb: "forward" }),
          "񅹁": v({ thumb: "between:index-middle" as VariantKey }),
          "񅺡": v({ thumb: "between:middle-ring" as VariantKey }),
          "񅼁": v({ thumb: "between:ring-little" as VariantKey }),
          "񅽡": v({ thumb: "under:index-middle" as VariantKey }),
          "񅿁": v({ thumb: "under:over-index-middle" as VariantKey }),
          "񆀡": v({ thumb: "under:index-middle-ring" as VariantKey }),
          "񆂁": v({ thumb: "under:index-middle-ring-little" as VariantKey }),
          "񆃡": v({
            thumb: "under:over-index-middle-ring-little" as VariantKey,
            index: "raised_knuckle",
            middle: "raised_knuckle",
            ring: "raised_knuckle",
            little: "raised_knuckle",
          }),
        },
      },
      "񀀡": {
        key: "񀀡",
        variants: {
          "񀏡": v({ index: "cupped" }),
          "񀑁": v({ index: "hinged" }),
          "񀒡": v({ index: "hinged:low" as VariantKey }),
          "񀉡": v({ index: "bent" }),
          "񀌡": v({ index: "bent", thumb: "under:index" as VariantKey }),
          "񀎁": v({ thumb: "raised_knuckle" }),
        },
      },
      "񄩡": {
        key: "񄩡",
        variants: {
          "񄬡": v({ middle: "raised_knuckle" }),
        },
      },
      "񄅡": {
        key: "񄅡",
        variants: {
          "񄇁": v({ ring: "raised_knuckle" }),
        },
      },
      "񃛡": {
        key: "񃛡",
        variants: {
          "񃝁": v({ thumb: "under" }),
          "񃣁": v({ little: "raised_knuckle" }),
          "񃤡": v({ little: "bent" }),
          "񃦁": v({ thumb: "hooked", little: "hooked" }),
        },
      },
      "񅰁񀀡": {
        key: "񅊡",
        variants: {
          "񅍡": v({ thumb: "hinged" }),
          "񅏁": v({ thumb: "conjoined" }),
          "񅐡": v({ thumb: "bent" }),
          "񅒁": v({ index: "bent" }),
          "񅓡": v({ thumb: "bent", index: "bent" }),
          "񅕁": v({ index: "hinged" }),
          "񅖡": v({ thumb: "forward" }),
          "񅘁": v({ thumb: "forward", index: "bent" }),
          "񅙡": v({ thumb: "hooked", index: "hooked" }),
          "񅛁": v({ thumb: "hooked:curlicue" as VariantKey, index: "hooked:curlicue" as VariantKey }),
          "񅜡": v({ thumb: "between:inside" as VariantKey, index: "circled" }),
          "񅟡": v({ thumb: "under", index: "circled" }),
          "񅡁": v({ thumb: "circled", index: "circled" }),
        },
      },
      "񅰁񄩡": { key: "񄮁" },
      "񀀡񄩡": {
        key: "񀕡",
        variants: {
          "񀘡": v({ index: "bent", middle: "bent" }),
          "񀚁": v({ index: "raised_knuckle", middle: "raised_knuckle" }),
          "񀞡": v({ index: "hinged" }),
          "񀝁": v({ middle: "hinged" }),
          "񀛡": v({ index: "hinged", middle: "hinged" }),
          "񀠁": v({ index: "conjoined", middle: "conjoined" }),
          "񀡡": v({ index: ["bent", "conjoined"], middle: "conjoined" }),
          "񀣁": v({ index: "conjoined", middle: ["bent", "conjoined"] }),
          "񀤡": v({ index: ["cupped", "conjoined"], middle: ["cupped", "conjoined"] }),
          "񀦁": v({ index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
          "񀧡": v({ index: "crossed", middle: "crossed" }),
          "񀪡": v({ index: "crossed", middle: ["crossed", "bent"] }),
          "񀬁": v({ index: ["crossed", "bent"], middle: "crossed" }),
        },
      },
      "񅰁񄅡": { key: "񄔡" },
      "񀀡񄅡": { key: "񄓁" },
      "񄩡񄅡": {
        key: "񄎡",
        variants: {
          "񄐁": v({ middle: "conjoined", ring: "conjoined" }),
          "񄑡": v({ middle: "raised_knuckle", ring: "raised_knuckle" }),
        },
      },
      "񅰁񃛡": { key: "񃧡" },
      "񀀡񃛡": { key: "񃰡" },
      "񄩡񃛡": { key: "񄲡" },
      "񄅡񃛡": { key: "񄈡" },
      "񅰁񀀡񄩡": {
        key: "񀭡",
        variants: {
          "񀼡": v({ thumb: "cupped", index: "cupped", middle: "cupped" }),
          "񀾁": v({ thumb: "circled", index: "circled", middle: "circled" }),
          "񀿡": v({ thumb: "hooked", index: "hooked", middle: "hooked" }),
          "񁁁": v({ thumb: "hinged", index: "hinged", middle: "hinged" }),
          "񁂡": v({ thumb: "between:index-middle" as VariantKey, index: "hinged", middle: "hinged" }),
          "񁄁": v({ index: "conjoined", middle: "conjoined" }),
          "񁅡": v({ thumb: "conjoined", index: "conjoined", middle: "conjoined" }),
          "񁇁": v({ thumb: "bent", index: "conjoined", middle: "conjoined" }),
          "񁈡": v({ thumb: "hooked", middle: "hooked" }),
          "񁊁": v({ thumb: "hooked", index: "hooked" }),
          "񀰡": v({ thumb: "bent" }),
          "񀲁": v({ index: "bent", middle: "bent" }),
          "񀳡": v({ thumb: "bent", index: "bent", middle: "bent" }),
          "񀹡": v({ index: "hinged" }),
          "񀶡": v({ middle: "hinged" }),
          "񀸁": v({ thumb: "conjoined", middle: "hinged" }),
          "񀵁": v({ index: "hinged", middle: "hinged" }),
          "񀻁": v({ thumb: "forward" }),
          "񁎡": v({ thumb: "forward", index: "conjoined", middle: "conjoined" }),
          "񁋡": v({ index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
          "񁍁": v({ index: "crossed", middle: "crossed" }),
          "񁐁": v({ thumb: "forward", index: ["cupped", "conjoined"], middle: ["cupped", "conjoined"] }),
          "񁑡": v({ thumb: "cupped", middle: "cupped" }),
          "񁓁": v({ thumb: "cupped", index: "cupped" }),
          "񁔡": v({ thumb: "circled", middle: "circled" }),
          "񁚡": v({ thumb: "circled", index: "circled" }),
          "񁖁": v({ thumb: "circled", index: "hinged", middle: "circled" }),
          "񁗡": v({ thumb: "hinged:out" as VariantKey, index: "bent" }),
          "񁙁": v({ thumb: "hinged:in" as VariantKey, index: "bent" }),
          "񁜁": v({ thumb: ["hinged", "conjoined"], index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
          "񁝡": v({
            thumb: "hinged:out" as VariantKey,
            index: ["hinged", "conjoined"],
            middle: ["hinged", "conjoined"],
          }),
          "񁟁": v({ thumb: "hinged", index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
          "񁠡": v({ thumb: "hinged:out" as VariantKey, middle: "hinged" }),
          "񁢁": v({ thumb: "hinged:out" as VariantKey, middle: "hinged", index: "crossed" }),
          "񁣡": v({ thumb: "hinged", middle: "hinged", index: "crossed" }),
          "񁥁": v({ thumb: "hooked", middle: "hinged", index: "hooked" }),
        },
      },
      "񅰁񀀡񄅡": { key: "" },
      "񅰁񄩡񄅡": { key: "" },
      "񀀡񄩡񄅡": {
        key: "񃉡",
        variants: {
          "񃑁": [[], ["bent"], ["bent"], ["bent"], []],
          "񃒡": [[], ["conjoined"], ["conjoined"], ["conjoined"], []],
        },
      },
      "񅰁񀀡񃛡": { key: "񃪡" },
      "񅰁񄩡񃛡": { key: "񄱁" },
      "񀀡񄩡񃛡": { key: "񃶡", variants: { "񃾁": v({ index: "crossed", middle: "crossed" }) } },
      "񅰁񄅡񃛡": { key: "" },
      "񀀡񄅡񃛡": { key: "񄗡" },
      "񄩡񄅡񃛡": { key: "񄴁" },
      "񅰁񀀡񄩡񄅡": {
        key: "񃕡",
        variants: {
          "񃗁": [[], [], ["hinged"], ["hinged"], []],
          "񃘡": [[], [], ["bent"], ["bent"], []],
          "񃚁": [["circled"], ["circled"], ["circled"], ["circled"], []],
        },
      },
      "񅰁񀀡񄩡񃛡": { key: "񄁁" },
      "񅰁񀀡񄅡񃛡": { key: "񄦡" },
      "񅰁񄩡񄅡񃛡": { key: "" },
      "񀀡񄩡񄅡񃛡": {
        key: "񁦡",
        variants: {
          "񁨁": [[], ["bent"], ["bent"], ["bent"], ["bent"]],
          "񁩡": [[], ["hinged"], ["hinged"], ["hinged"], ["hinged"]],
          "񁫁": [[], ["conjoined"], ["conjoined"], ["conjoined"], ["conjoined"]],
          "񁬡": [
            [],
            ["conjoined:split-a" as VariantKey],
            ["conjoined:split-a" as VariantKey],
            ["conjoined:split-b" as VariantKey],
            ["conjoined:split-b" as VariantKey],
          ],
          "񁯡": [
            [],
            ["conjoined:bent-a" as VariantKey],
            ["conjoined:bent-a" as VariantKey],
            ["conjoined:bent-b" as VariantKey],
            ["conjoined:bent-b" as VariantKey],
          ],
        },
      },
      "񅰁񀀡񄩡񄅡񃛡": {
        key: "񁲡",
        variants: {
          "񁵡": [[], ["bent"], ["bent"], ["bent"], ["bent"]],
          "񁸡": [["bent"], ["bent"], ["bent"], ["bent"], ["bent"]],
          "񁻡": v({ thumb: "forward" }),
          "񂃁": [["forward"], ["hinged"], ["hinged"], ["hinged"], ["hinged"]],
          "񂄡": [[], ["hinged"], ["hinged"], ["hinged"], ["hinged"]],
          "񂆁": [["conjoined"], ["hinged"], ["hinged"], ["hinged"], ["hinged"]],
        },
      },
    },
  },
  "񂱡": {
    primaryFingers: ["", "񀂁", "񄫁", "", "񃞡"],
    combinations: {
      "": { key: "񂱡" },
      "񀂁": {
        key: "񀂁",
        variants: {
          "񀔁": v({ index: "hinged" }),
          "񀋁": v({ index: "bent" }),
          "񀩁": v({ index: "crossed", middle: "crossed" }),
        },
      },
      "񄫁": { key: "񄫁" },
      "񃞡": { key: "񃞡" },
      "񀂁񄫁": {
        key: "񀗁",
        variants: {
          "񀩁": v({ index: "crossed", middle: "crossed" }),
        },
      },
      "񀂁񄅡": {
        key: "񃲁",
      },
      "񄅡񃞡": {
        key: "񄊁",
      },
      "񅰁񀂁񄫁": {
        key: "񀯁",
      },
      "񀂁񄫁񄅡": {
        key: "񃋁",
      },
      "񀂁񄫁񃞡": {
        key: "񃸁",
        variants: {
          "񃿡": v({ middle: "crossed", little: "crossed" }),
        },
      },
      "񀂁񄅡񃞡": {
        key: "񄙁",
      },
      "񄫁񄅡񃞡": {
        key: "񄵡",
        variants: {
          "񅀁": v({ middle: "bent", ring: "bent", little: "bent" }),
        },
      },
    },
  },
  "񂰁": {
    primaryFingers: ["񂮡", "񄷁", "񄚡", "", ""],
    combinations: {
      "": {
        key: "񂰁",
      },
      "񀀡": {
        key: "",
        custom: <ManualLayeredLetter letters={["񂮡", "񀂁"]} />,
      },
    },
  },
  "񂙡": {
    primaryFingers: ["񂛁", "񅞁", "", "", ""],
    combinations: {
      "񂛁": {
        key: "񂛁",
        variants: {
          "񁮁": v({ index: "conjoined", middle: "conjoined", ring: "conjoined", little: "conjoined" }),
          "񂜡": v({ thumb: "conjoined" }),
          "񂞁": v({ thumb: "forward" }),
        },
      },
      "񅞁": { key: "񅞁" },
      "񄩡񄅡񃛡": {
        key: "񅁡",
      },
      "񂛁񄩡񄅡񃛡": {
        key: "񅃁",
      },
    },
  },
  "񂡁": { primaryFingers: ["񂟡", "", "", "", ""], combinations: {} },
  "񂤁": { primaryFingers: ["", "񀃡", "", "", ""], combinations: {} },
  "񂳁": { primaryFingers: ["", "񀅁", "", "", ""], combinations: {} },
  "񂼁": { primaryFingers: ["", "񀆡", "", "", ""], combinations: {} },
  "񃈁": {
    primaryFingers: ["񅮡", "񀈁", "", "", "񃡡"],
    combinations: {
      "": { key: "񃈁" },
      "񅮡": {
        key: "񅮡",
        variants: {
          "񅭁": v({ thumb: "under:in" as VariantKey }),
          "񅫡": v({ thumb: "under:out" as VariantKey }),
        },
      },
      "񀈁": { key: "񀈁" },
      "񃡡": { key: "񃡡" },
      "񀈁񃡡": { key: "񃵁" },
      "񄩡񃡡": {
        key: "",
        variants: {
          "񄄁": v({ thumb: "crossed", index: "crossed" }),
        },
      },
      "񄅡񃡡": { key: "񄍁" },
      "񅮡񀈁񃡡": {
        key: "񃯁",
        variants: {
          "񃭡": v({ thumb: "under:out" as VariantKey }),
        },
      },
      "񀈁񄩡񄅡": { key: "񃎁" },
      "񀈁񄩡񃡡": { key: "񃼡" },
      "񀈁񄅡񃡡": {
        key: "񄥁",
        variants: {
          "񄣡": v({ thumb: "under:out" as VariantKey }),
        },
      },
      "񄩡񄅡񃡡": {
        key: "񄾡",
        variants: {
          "񄽁": v({ thumb: "under:in" as VariantKey }),
          "񄻡": v({ thumb: "under:out" as VariantKey }),
        },
      },
    },
  },
  "񂇡": { primaryFingers: ["", "", "", "", ""], combinations: {} },
};

export const getFingerOptions = ({
  selectedRoot,
  selectedFingers,
}: Pick<SignState, "selectedRoot" | "selectedFingers">): Option<Finger>[] =>
  !selectedRoot || !(selectedRoot in fingerCombos)
    ? []
    : fingerCombos[selectedRoot].primaryFingers.map((key, index) => ({
        key,
        label: fingerIndices[index],
        selected: Boolean(selectedFingers[fingerIndices[index]]),
      }));

export const getSelectedFingerOptions = (
  props: Pick<SignState, "selectedRoot" | "selectedFingers">
): Option<Finger>[] => getFingerOptions(props).filter((option) => option.selected);

export const getPossibleVariants = ({
  selectedRoot,
  selectedFingers,
  currentRevealedVariants,
}: Pick<SignState, "selectedRoot" | "selectedFingers" | "currentRevealedVariants">): string[] => {
  if (!selectedRoot) {
    return [];
  }

  const selectedOptions = getSelectedFingerOptions({ selectedRoot, selectedFingers });
  if (!selectedOptions.length) {
    return [];
  }

  const comboKey = selectedOptions.map((option) => option.key).join("");

  let possibleVariants = Object.entries(fingerCombos[selectedRoot]?.combinations[comboKey]?.variants || {}).map(
    ([key, pose]) => ({
      key,
      pose,
    })
  );

  if (currentRevealedVariants.length) {
    possibleVariants = possibleVariants.filter((variant) => {
      return currentRevealedVariants.every((currentVariant) =>
        variant.pose
          .flatMap<string>((pose) => pose)
          .flatMap((pose) => pose.split(":")[0])
          .includes(currentVariant)
      );
    });
  }

  return possibleVariants
    .flatMap((variant) => variant.pose)
    .flatMap((poses) => poses)
    .flatMap((poses) => poses.split(":")[0]);
};

export interface VariantOption {
  key: string;
  pose: [string[], string[], string[], string[], string[]];
}

export const getVariantOptions = ({
  selectedRoot,
  selectedFingers,
  currentRevealedVariants,
}: Pick<SignState, "selectedRoot" | "selectedFingers" | "currentRevealedVariants">): Array<VariantOption> => {
  if (!selectedRoot) {
    return [];
  }

  const selectedOptions = getSelectedFingerOptions({ selectedRoot, selectedFingers });
  if (!selectedOptions.length) {
    return [];
  }

  const comboKey = selectedOptions.map((option) => option.key).join("");

  const possibleVariants = Object.entries(fingerCombos[selectedRoot]?.combinations[comboKey]?.variants || {}).map(
    ([key, pose]) => ({
      key,
      pose,
    })
  );

  return possibleVariants.filter((variant) => {
    const uniqueKeys = Object.keys(
      variant.pose
        .flatMap((v) => v)
        .reduce((part, nextModifier) => ({ ...part, [nextModifier.split(":")[0]]: true }), {})
    );
    return (
      currentRevealedVariants.length &&
      currentRevealedVariants.every((currentVariant) => uniqueKeys.includes(currentVariant)) &&
      Math.abs(currentRevealedVariants.length - uniqueKeys.length) <= 1
    );
  });
};

export const resolveKey = ({
  selectedRoot,
  selectedFingers,
  selectedFingerVariants,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;
  selectedFingerVariants: FingerMap<string[]>;
}): NonNullable<React.ReactNode> => {
  if (!selectedRoot) {
    return "";
  }

  const selectedOptions = getSelectedFingerOptions({ selectedRoot, selectedFingers });
  if (!selectedOptions.length) {
    return selectedRoot;
  }

  const comboKey = selectedOptions
    .map((option) => {
      if (option.key) {
        return option.key;
      }
      return fingerCombos["񆅁"].primaryFingers[fingerIndices.findIndex((finger) => finger === option.label)];
    })
    .join("");

  const selectedCombo = fingerCombos[selectedRoot]?.combinations[comboKey];
  if (selectedCombo?.custom) {
    return selectedCombo.custom;
  }
  if (!selectedCombo || !selectedCombo.key) {
    return comboKey;
  }

  if (!selectedCombo.variants || Object.values(selectedFingerVariants).flatMap((v) => v).length === 0) {
    return selectedCombo.key;
  }

  const [selectedThumb, selectedIndex, selectedMiddle, selectedRing, selectedLittle] = [
    selectedFingerVariants.thumb || [],
    selectedFingerVariants.index || [],
    selectedFingerVariants.middle || [],
    selectedFingerVariants.ring || [],
    selectedFingerVariants.little || [],
  ];

  const selectedVariant = Object.entries(selectedCombo.variants || {})
    .map(([key, pose]) => ({
      key,
      pose,
    }))
    .find(({ pose: [thumb, index, middle, ring, little] }) => {
      return [
        [selectedThumb, thumb],
        [selectedIndex, index],
        [selectedMiddle, middle],
        [selectedRing, ring],
        [selectedLittle, little],
      ].every(([a, b]) => a.length === b.length && a.every((val, index) => val === b[index]));
    });

  return selectedVariant ? selectedVariant.key : selectedCombo.key;
};

export const keyboardRows = [[..."1234567890-="], [..."qwertyuiop[]"], [..."asdfghjkl;'"], [..."zxcvbnm,./"]];
export const findKeyInRows = (key: string): { row: number; index: number } | undefined => {
  for (let row = 0; row < keyboardRows.length; row++) {
    if (keyboardRows[row].includes(key))
      return { row, index: keyboardRows[row].findIndex((keyboardKey) => keyboardKey === key) };
  }
};

const hasIndex = <T,>(arr: T[], index: number) => index >= 0 && index < arr.length;

export const getSelectedRootAction = (priorSign: SignState, nextSelectedRoot: string): SignState => ({
  ...getDefaultSignState(),
  ...(priorSign.selectedRoot !== nextSelectedRoot && { selectedRoot: nextSelectedRoot }),
});

export const getSelectedFingerAction = (priorSign: SignState, nextSelectedFinger: Finger | Finger[]): SignState => ({
  ...getDefaultSignState(),
  selectedRoot: priorSign.selectedRoot,
  selectedFingers: Array.isArray(nextSelectedFinger)
    ? nextSelectedFinger.reduce<FingerMap>(
        (partial, nextKey) => ({
          ...partial,
          [nextKey]: true,
        }),
        {}
      )
    : toggleFingerInMap(priorSign.selectedFingers, nextSelectedFinger),
});

export const getRevealVariantAction = (priorSign: SignState, nextRevealedVariant: string | string[]): SignState => {
  const nextSign: SignState = {
    selectedRoot: priorSign.selectedRoot,
    selectedFingers: priorSign.selectedFingers,
    currentRevealedVariants: Array.isArray(nextRevealedVariant)
      ? nextRevealedVariant
      : toggleArrayEntry(priorSign.currentRevealedVariants, nextRevealedVariant),
    selectedFingerVariants: {},
  };

  const nextVariantOptions = getVariantOptions(nextSign);
  if (!nextVariantOptions.length) {
    return nextSign.currentRevealedVariants.length === 0 ? nextSign : priorSign;
  }

  const [thumb, index, middle, ring, little] = nextVariantOptions[0].pose;
  nextSign.selectedFingerVariants = { thumb, index, middle, ring, little };

  return nextSign;
};

export const getSelectVariantAction = (
  priorSign: SignState,
  [thumb, index, middle, ring, little]: VariantOption["pose"]
): SignState => ({
  ...priorSign,
  selectedFingerVariants: {
    thumb,
    index,
    middle,
    ring,
    little,
  },
});

export const useKeyPress = (setSign: Dispatch<SignState>) => {
  const handleKeyPress = React.useCallback(
    ({ key }: { key: string }) => {
      setSign((priorSign) => {
        const rootOptions = getRootOptions();
        const fingerOptions = getFingerOptions(priorSign);
        const variantSelectors = getVariantSelectors();
        const variantOptions = getVariantOptions(priorSign);
        const searchResults = findKeyInRows(key);
        if (!searchResults) {
          return priorSign;
        }
        const { row: keyRow, index: keyIndex } = searchResults;

        if (keyRow === 0 && hasIndex(rootOptions, keyIndex)) {
          return getSelectedRootAction(priorSign, rootOptions[keyIndex].key);
        }

        if (keyRow === 1 && hasIndex(fingerOptions, keyIndex)) {
          return getSelectedFingerAction(priorSign, fingerOptions[keyIndex].label);
        }

        if (keyRow === 2 && hasIndex(variantSelectors, keyIndex)) {
          return getRevealVariantAction(priorSign, variantSelectors[keyIndex].label);
        }

        if (keyRow === 3 && hasIndex(variantOptions, keyIndex)) {
          return getSelectVariantAction(priorSign, variantOptions[keyIndex].pose);
        }

        return priorSign;
      });
    },
    [setSign]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
