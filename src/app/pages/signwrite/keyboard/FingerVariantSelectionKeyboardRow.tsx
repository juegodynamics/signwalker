import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getSelectVariantAction, getVariantOptions } from "./fingerData";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, SignState } from "./types";

const fingerVariantSelectionNativeKeys = [..."zxcvbnm,./"];

export const equalArr = (a: string[], b: string[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);
export const equalNestedArr = (a: string[][], b: string[][]) =>
  a.length === b.length && a.every((subA, index) => equalArr(subA, b[index]));

export const FingerVariantSelectionKeyboardRow = ({
  sign,
  setSign,
}: {
  sign: SignState;
  setSign: Dispatch<SignState>;
}) => {
  const options = getVariantOptions(sign);
  const [selectedThumb, selectedIndex, selectedMiddle, selectedRing, selectedLittle] = [
    sign.selectedFingerVariants.thumb || [],
    sign.selectedFingerVariants.index || [],
    sign.selectedFingerVariants.middle || [],
    sign.selectedFingerVariants.ring || [],
    sign.selectedFingerVariants.little || [],
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

  return (
    <ToggleButtonGroup
      value={currentOption?.key}
      onChange={(_, nextSelectedVariantsKey: string) => {
        const nextOption = options.find((option) => option.key === nextSelectedVariantsKey);
        if (nextOption) {
          setSign((priorSign) => getSelectVariantAction(priorSign, nextOption.pose));
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
