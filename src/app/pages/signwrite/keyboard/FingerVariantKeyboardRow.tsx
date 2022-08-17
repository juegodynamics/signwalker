import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, toggleArrayEntry, FingerMap } from "./types";
import { useKeyPress } from "./useKeyPress";
import { getOptions, fingerCombos } from "./FingerKeyboardRow";

const fingerVariantNativeKeys = [..."asdfghjkl;'"];

export const fingerVariants = {
  cupped: "񅊡񅢡",
  circled: "񅊡񅡁",
  hooked: "񅊡񅙡",
  hinged: "񀀡񀑁",
  bent: "񀀡񀉡",
  raised_knuckle: "񀀡񀎁",
  under: "񆅁񆂁",
  conjoined: "񀕡񀠁",
  crossed: "񀕡񀧡",
  forward: "񅊡񅖡",
  between: "񁁁񁂡",
};

const getPossibleVariants = ({
  selectedRoot,
  selectedFingers,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;
}): string[] => {
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

  return possibleVariants
    .flatMap((variant) => variant.pose)
    .flatMap((poses) => poses)
    .flatMap((poses) => poses.split(":")[0]);
};

export const FingerVariantKeyboardRow = ({
  selectedRoot,
  selectedFingers,
  currentRevealedVariants,
  setCurrentRevealedVariants,
}: {
  selectedRoot?: string;
  selectedFingers: FingerMap;
  currentRevealedVariants: string[];
  setCurrentRevealedVariants: Dispatch<string[]>;
}) => {
  const options = Object.entries(fingerVariants).map(([label, key]) => ({ key, label }));
  const possibleVariants = getPossibleVariants({ selectedRoot, selectedFingers });

  useKeyPress({
    setState: setCurrentRevealedVariants,
    nextStateFromKey: (pressedKey: string) => {
      const keyIndex = fingerVariantNativeKeys.findIndex((key) => key === pressedKey);
      return keyIndex >= 0 && keyIndex < options.length ? options[keyIndex].label : undefined;
    },
    updatePriorState: (priorRevealedVariants, nextRevealedVariant) =>
      toggleArrayEntry(priorRevealedVariants, nextRevealedVariant),
    // releasePriorState: (priorRevealedVariants, nextRevealedVariant) =>
    //   priorRevealedVariants.includes(nextRevealedVariant)
    //     ? priorRevealedVariants.filter((priorVariant) => priorVariant !== nextRevealedVariant)
    //     : priorRevealedVariants,
  });

  return (
    <ToggleButtonGroup
      value={currentRevealedVariants}
      onChange={(_, nextRevealedVariants: string[]) => {
        setCurrentRevealedVariants(nextRevealedVariants);
      }}
      sx={{ pl: 5 }}
    >
      {options.map((option, index) => {
        const [pre, post] = [...option.key];
        const isPossibleVariant = possibleVariants.includes(option.label);
        return (
          <KeyboardButton
            key={index}
            disabled
            value={isPossibleVariant ? option.label : ""}
            topLeftCaption={fingerVariantNativeKeys[index]}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                position: "absolute",
                bottom: "2px",
                left: "6px",
                color: isPossibleVariant ? "primary.dark" : "divider",
                opacity: isPossibleVariant ? 1 : 0.5,
                transition: "opacity color 300ms",
              }}
            >
              {pre}
            </Typography>
            <Typography
              sx={{
                fontSize: "2em",
                position: "absolute",
                bottom: "20px",
                left: "30px",
                color: "primary.light",
                opacity: isPossibleVariant ? 1 : 0.2,
                transition: "opacity 300ms",
              }}
            >
              {post}
            </Typography>
            <Typography
              sx={{
                fontSize: "2em",
                position: "absolute",
                bottom: "4px",
                left: "15px",
                color: "secondary.light",
                transform: "rotate(45deg)",
                opacity: isPossibleVariant ? 1 : 0.2,
                transition: "opacity 300ms",
              }}
            >
              {"⇡"}
            </Typography>
          </KeyboardButton>
        );
      })}
      {fingerVariantNativeKeys.slice(options.length, fingerVariantNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
