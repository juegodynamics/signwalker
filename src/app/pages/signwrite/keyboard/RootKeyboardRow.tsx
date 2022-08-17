import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { Dispatch, flattenOptionMap, OptionMap } from "./types";
import { KeyboardButton } from "./KeyboardButton";
import { useKeyPress } from "./useKeyPress";

const rootRow: OptionMap = {
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

const rootNativeKeys = [..."1234567890-="];

export const RootKeyboardRow = ({
  selectedRoot,
  setSelectedRoot,
}: {
  selectedRoot?: string;
  setSelectedRoot: Dispatch<string | undefined>;
}) => {
  const options = flattenOptionMap(rootRow);

  useKeyPress({
    setState: setSelectedRoot,
    nextStateFromKey: (pressedKey: string) => {
      const keyIndex = rootNativeKeys.findIndex((key) => key === pressedKey);
      return keyIndex >= 0 && keyIndex < options.length ? options[keyIndex].key : undefined;
    },
    updatePriorState: (priorSelectedRoot, nextSelectedRoot) =>
      priorSelectedRoot === nextSelectedRoot ? undefined : nextSelectedRoot,
  });

  return (
    <ToggleButtonGroup exclusive value={selectedRoot} onChange={(_, nextValue: string) => setSelectedRoot(nextValue)}>
      {options.map((option, index) => (
        <KeyboardButton key={index} value={option.key} display={option.key} topLeftCaption={rootNativeKeys[index]} />
      ))}
      {rootNativeKeys.slice(options.length, rootNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
