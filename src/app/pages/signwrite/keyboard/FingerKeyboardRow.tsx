import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, Finger, fingerIndices, FingerMap, Option, toggleFingerInMap } from "./types";
import { fingerVariants } from "./FingerVariantKeyboardRow";
import { useKeyPress } from "./useKeyPress";

export const fingerIndex: Record<string, [string, string, string, string, string]> = {
  "񆅁": ["񅰁", "񀀡", "񄩡", "񄅡", "񃛡"],
  "񂱡": ["", "񀂁", "񄫁", "", "񃞡"],
  "񂰁": ["", "", "", "", ""],
  "񂙡": ["", "", "", "", ""],
  "񂡁": ["", "", "", "", ""],
  "񂤁": ["", "񀃡", "", "", ""],
  "񂳁": ["", "񀅁", "", "", ""],
  "񂼁": ["", "񀆡", "", "", ""],
  "񃈁": ["", "񀈁", "", "", ""],
  "񂇡": ["", "", "", "", ""],
};

type VariantKey = keyof typeof fingerVariants;

const fingerRealignments: Record<string, [number, number]> = {
  "񅰁": [-32, -59],
  "񀀡": [-56, -30],
  "񄩡": [-56, -30],
  "񄅡": [-43, -29],
  "񃛡": [-39, -30],
  "񀂁": [-53, -31],
};

export const ManualLetter = ({ letter, opacity = 0.5 }: { letter: string; opacity?: number }) => {
  const [top, left] = fingerRealignments[letter] || [0, 0];
  return (
    <Typography variant="h1" sx={{ position: "absolute", opacity, top, left }}>
      {letter}
    </Typography>
  );
};

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
}): [string[], string[], string[], string[], string[]] => [
  thumb ? (Array.isArray(thumb) ? thumb : [thumb]) : [],
  index ? (Array.isArray(index) ? index : [index]) : [],
  middle ? (Array.isArray(middle) ? middle : [middle]) : [],
  ring ? (Array.isArray(ring) ? ring : [ring]) : [],
  little ? (Array.isArray(little) ? little : [little]) : [],
];

export const fingerCombos: Record<
  string,
  Record<
    string,
    {
      key: string;
      custom?: React.ReactNode;
      redirect?: {
        selectedRoot?: string;
        selectedFingers: FingerMap;
        selectedFingerVariants?: FingerMap<string[]>;
      };
      variants?: {
        [key: string]: [string[], string[], string[], string[], string[]];
      };
    }
  >
> = {
  "񆅁": {
    "": { key: "񆅁" },
    "񅰁": { key: "񅰁" },
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
    "񄩡": { key: "񄩡" },
    "񄅡": { key: "񄅡" },
    "񃛡": { key: "񃛡" },
    "񅰁񀀡": { key: "񅊡" },
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
    "񅰁񄅡": { key: "" },
    "񀀡񄅡": { key: "" },
    "񄩡񄅡": {
      key: "",
      custom: (
        <Box sx={{ position: "relative" }}>
          <ManualLetter letter="񄩡" />
          <ManualLetter letter="񄅡" />
        </Box>
      ),
    },
    "񅰁񃛡": { key: "񃧡" },
    "񀀡񃛡": { key: "" },
    "񄩡񃛡": { key: "" },
    "񄅡񃛡": { key: "" },
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
        "񁝡": v({ thumb: "hinged:out" as VariantKey, index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
        "񁟁": v({ thumb: "hinged", index: ["hinged", "conjoined"], middle: ["hinged", "conjoined"] }),
        "񁠡": v({ thumb: "hinged:out" as VariantKey, middle: "hinged" }),
        "񁢁": v({ thumb: "hinged:out" as VariantKey, middle: "hinged", index: "crossed" }),
        "񁣡": v({ thumb: "hinged", middle: "hinged", index: "crossed" }),
        "񁥁": v({ thumb: "hooked", middle: "hinged", index: "hooked" }),
      },
    },
    "񅰁񀀡񄅡": { key: "" },
    "񅰁񄩡񄅡": { key: "" },
    "񀀡񄩡񄅡": { key: "" },
    "񅰁񀀡񃛡": { key: "" },
    "񅰁񄩡񃛡": { key: "" },
    "񀀡񄩡񃛡": { key: "" },
    "񅰁񄅡񃛡": { key: "" },
    "񀀡񄅡񃛡": { key: "" },
    "񄩡񄅡񃛡": { key: "" },
    "񅰁񀀡񄩡񄅡": { key: "" },
    "񅰁񀀡񄩡񃛡": { key: "" },
    "񅰁񀀡񄅡񃛡": { key: "" },
    "񅰁񄩡񄅡񃛡": { key: "" },
    "񀀡񄩡񄅡񃛡": {
      key: "񁦡",
      variants: {
        "񁨁": [[], ["bent"], ["bent"], ["bent"], ["bent"]],
        "񁩡": [[], ["hinged"], ["hinged"], ["hinged"], ["hinged"]],
        "񁫁": [[], ["conjoined"], ["conjoined"], ["conjoined"], ["conjoined"]],
        "񁬡": [[], ["conjoined:a"], ["conjoined:a"], ["conjoined:b"], ["conjoined:b"]],
      },
    },
    "񅰁񀀡񄩡񄅡񃛡": { key: "" },
  },
  "񂱡": {
    "": { key: "񂱡" },
    "񀂁": {
      key: "񀂁",
      variants: {
        "񀔁": v({ index: "hinged" }),
        "񀋁": v({ index: "bent" }),
        "񀩁": v({ index: "crossed", middle: "crossed" }),
      },
    },
    "񀂁񄫁": {
      key: "񀗁",
    },
    "񅰁񀂁񄫁": {
      key: "񀯁",
    },
  },
};

const fingerNativeKeys = [..."qwertyuiop[]"];

export const getOptions = ({
  selectedRoot,
  selectedFingers,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;
}) => {
  const options: Option<Finger>[] =
    selectedRoot && fingerIndex[selectedRoot]
      ? fingerIndex[selectedRoot].map((key, index) => ({
          key,
          label: fingerIndices[index],
        }))
      : [];
  const selectedOptions = options.filter((option) => Boolean(selectedFingers[option.label]));
  return {
    options,
    selectedOptions,
  };
};

export const FingerKeyboardRow = ({
  selectedRoot,
  selectedFingers,
  // setSelectedRoot,
  setSelectedFingers,
}: // selectedFingerVariants,
// setSelectedFingerVariants,
// currentRevealedVariants,
// setCurrentRevealedVariants,
{
  selectedRoot?: string;
  selectedFingers: FingerMap;
  // setSelectedRoot: Dispatch<string | undefined>;
  setSelectedFingers: Dispatch<FingerMap>;
  // selectedFingerVariants: FingerMap<string[]>;
  // setSelectedFingerVariants: Dispatch<FingerMap<string[]>>;
  // currentRevealedVariants: string[];
  // setCurrentRevealedVariants: Dispatch<string[]>;
}) => {
  const { options, selectedOptions } = getOptions({ selectedRoot, selectedFingers });

  const nextStateFromKey = React.useCallback(
    (pressedKey: string) => {
      const keyIndex = fingerNativeKeys.findIndex((key) => key === pressedKey);
      return keyIndex >= 0 && keyIndex < options.length ? options[keyIndex].label : undefined;
    },
    [options]
  );

  useKeyPress({
    setState: setSelectedFingers,
    nextStateFromKey: nextStateFromKey,
    updatePriorState: (priorSelectedFingers, nextSelectedFinger) =>
      toggleFingerInMap(priorSelectedFingers, nextSelectedFinger),
  });

  return (
    <ToggleButtonGroup
      value={selectedOptions.map((option) => option.label)}
      onChange={(_, nextValues: Finger[]) => {
        setSelectedFingers(
          nextValues.reduce(
            (partial, nextKey) => ({
              ...partial,
              [nextKey]: true,
            }),
            {}
          )
        );
      }}
      sx={{ pl: 2.5 }}
    >
      {options.map((option, index) => (
        <KeyboardButton
          key={index}
          // disabled={!option.key}
          value={option.label}
          display={option.key}
          topLeftCaption={fingerNativeKeys[index]}
          bottomRightCaption={!option.key ? fingerIndex["񆅁"][index] : undefined}
        />
      ))}
      {fingerNativeKeys.slice(options.length, fingerNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
