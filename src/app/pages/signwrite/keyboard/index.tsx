import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { fingerCombos, fingerIndex, FingerKeyboardRow, getOptions, ManualLetter } from "./FingerKeyboardRow";
import { FingerVariantKeyboardRow } from "./FingerVariantKeyboardRow";
import { RootKeyboardRow } from "./RootKeyboardRow";
import { FingerMap, fingerIndices } from "./types";
import { FingerVariantSelectionKeyboardRow } from "./FingerVariantSelectionKeyboardRow";

export * from "./KeyboardButton";
export * from "./RootKeyboardRow";
export * from "./types";

const resolveKey = ({
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

  const { selectedOptions } = getOptions({ selectedRoot, selectedFingers });
  if (!selectedOptions.length) {
    return selectedRoot;
  }

  const comboKey = selectedOptions
    .map((option) => {
      if (option.key) {
        return option.key;
      }
      return fingerIndex["񆅁"][fingerIndices.findIndex((finger) => finger === option.label)];
    })
    .join("");

  const selectedCombo = fingerCombos[selectedRoot]?.[comboKey];
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

export const SignKey = ({ value }: { value: React.ReactNode }) => {
  if (typeof value !== "string") {
    return <>{value}</>;
  }
  if ([...value].length < 2) {
    return <Typography variant="h1">{value}</Typography>;
  }

  return (
    <Box sx={{ position: "relative" }}>
      {[...value].map((char, index) => (
        <ManualLetter key={index} letter={char} opacity={1 / [...value].length} />
      ))}
    </Box>
  );
};

export function SignKeyboard() {
  const [selectedRoot, setSelectedRoot] = React.useState<string | undefined>(undefined);
  const [selectedFingers, setSelectedFingers] = React.useState<FingerMap>({});

  const [selectedFingerVariants, setSelectedFingerVariants] = React.useState<FingerMap<string[]>>({});
  const [currentRevealedVariants, setCurrentRevealedVariants] = React.useState<string[]>([]);

  return (
    <Stack spacing={0} justifyContent="flex-start" alignItems="center" sx={{ height: "100%" }}>
      <Stack justifyContent="center" alignItems="center" sx={{ height: "50%" }}>
        <SignKey value={resolveKey({ selectedRoot, selectedFingers, selectedFingerVariants })} />
      </Stack>
      <Stack spacing={0} direction="column" justifyContent="flex-start" sx={{ height: "30%" }}>
        <RootKeyboardRow selectedRoot={selectedRoot} setSelectedRoot={setSelectedRoot} />
        <FingerKeyboardRow
          selectedRoot={selectedRoot}
          // setSelectedRoot={setSelectedRoot}
          selectedFingers={selectedFingers}
          setSelectedFingers={setSelectedFingers}
          // selectedFingerVariants={selectedFingerVariants}
          // setSelectedFingerVariants={setSelectedFingerVariants}
          // currentRevealedVariants={currentRevealedVariants}
          // setCurrentRevealedVariants={setCurrentRevealedVariants}
        />
        <FingerVariantKeyboardRow
          selectedRoot={selectedRoot}
          selectedFingers={selectedFingers}
          currentRevealedVariants={currentRevealedVariants}
          setCurrentRevealedVariants={setCurrentRevealedVariants}
        />
        <FingerVariantSelectionKeyboardRow
          selectedRoot={selectedRoot}
          selectedFingers={selectedFingers}
          selectedFingerVariants={selectedFingerVariants}
          setSelectedFingerVariants={setSelectedFingerVariants}
          currentRevealedVariants={currentRevealedVariants}
        />
      </Stack>
    </Stack>
  );
}
