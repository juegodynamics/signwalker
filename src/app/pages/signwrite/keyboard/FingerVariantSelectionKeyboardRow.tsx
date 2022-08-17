import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, fingerIndices, FingerMap, toggleArrayEntry } from "./types";
import { useKeyPress } from "./useKeyPress";
import { fingerCombos, getOptions } from "./FingerKeyboardRow";

const fingerVariantSelectionNativeKeys = [..."zxcvbnm,./"];

const getVariantOptions = ({
  selectedRoot,
  selectedFingers,
  currentRevealedVariants,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;
  currentRevealedVariants: string[];
}): Array<{
  key: string;
  pose: [string[], string[], string[], string[], string[]];
}> => {
  if (!selectedRoot) {
    return [];
  }

  const { selectedOptions } = getOptions({ selectedRoot, selectedFingers });
  if (!selectedOptions.length) {
    return [];
  }

  const comboKey = selectedOptions.map((option) => option.key).join("");

  const possibleVariants = Object.entries(fingerCombos[selectedRoot]?.[comboKey]?.variants || {}).map(
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

export const equalArr = (a: string[], b: string[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);
export const equalNestedArr = (a: string[][], b: string[][]) =>
  a.length === b.length && a.every((subA, index) => equalArr(subA, b[index]));

export const FingerVariantSelectionKeyboardRow = ({
  selectedRoot,
  selectedFingers,
  selectedFingerVariants,
  setSelectedFingerVariants,
  currentRevealedVariants,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;

  selectedFingerVariants: FingerMap<string[]>;
  setSelectedFingerVariants: Dispatch<FingerMap<string[]>>;
  currentRevealedVariants: string[];
}) => {
  const options = getVariantOptions({ selectedRoot, selectedFingers, currentRevealedVariants });
  const [selectedThumb, selectedIndex, selectedMiddle, selectedRing, selectedLittle] = [
    selectedFingerVariants.thumb || [],
    selectedFingerVariants.index || [],
    selectedFingerVariants.middle || [],
    selectedFingerVariants.ring || [],
    selectedFingerVariants.little || [],
  ];

  const currentOption = options.find(({ pose: [thumb, index, middle, ring, little] }) => {
    return [
      [selectedThumb, thumb],
      [selectedIndex, index],
      [selectedMiddle, middle],
      [selectedRing, ring],
      [selectedLittle, little],
    ].every(([a, b]) => a.length === b.length && a.every((val, index) => val === b[index]));
  });

  useKeyPress({
    setState: setSelectedFingerVariants,
    nextStateFromKey: (pressedKey: string) => {
      const keyIndex = fingerVariantSelectionNativeKeys.findIndex((key) => key === pressedKey);
      return keyIndex >= 0 && keyIndex < options.length ? options[keyIndex].pose : undefined;
    },
    updatePriorState: (priorSelectedVariants, nextPose) =>
      equalNestedArr(Object.values(priorSelectedVariants), nextPose)
        ? {}
        : nextPose.reduce(
            (part, nextFinger, index) => ({
              ...part,
              [fingerIndices[index]]: nextFinger,
            }),
            {}
          ),
  });

  return (
    <ToggleButtonGroup
      value={currentOption?.key}
      onChange={(_, nextSelectedVariantsKey: string) => {
        const nextOption = options.find((option) => option.key === nextSelectedVariantsKey);
        if (nextOption) {
          const [thumb, index, middle, ring, little] = nextOption.pose;
          setSelectedFingerVariants({
            thumb,
            index,
            middle,
            ring,
            little,
          });
        }
      }}
      sx={{ pl: 7.5 }}
    >
      {options.slice(0, fingerVariantSelectionNativeKeys.length).map((option, index) => (
        <KeyboardButton
          key={index}
          value={option.key}
          display={option.key}
          topLeftCaption={fingerVariantSelectionNativeKeys[index]}
        />
      ))}
      {fingerVariantSelectionNativeKeys
        .slice(options.length, fingerVariantSelectionNativeKeys.length)
        .map((nativeKey) => (
          <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
        ))}
    </ToggleButtonGroup>
  );
};
