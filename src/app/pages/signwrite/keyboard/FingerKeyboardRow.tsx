import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, Finger, SignState } from "./types";

import { fingerCombos, getFingerOptions, getSelectedFingerAction } from "./fingerData";

const fingerNativeKeys = [..."qwertyuiop[]"];

export const FingerKeyboardRow = ({ sign, setSign }: { sign: SignState; setSign: Dispatch<SignState> }) => {
  const options = getFingerOptions(sign);
  const selectedOptions = options.filter((option) => option.selected);

  return (
    <ToggleButtonGroup
      value={selectedOptions.map((option) => option.label)}
      onChange={(_, nextValues: Finger[]) => {
        setSign((priorSign) => getSelectedFingerAction(priorSign, nextValues));
      }}
      sx={{ pl: 2.5 }}
    >
      {options.map((option, index) => (
        <KeyboardButton
          key={index}
          value={option.label}
          display={option.key}
          topLeftCaption={fingerNativeKeys[index]}
          bottomRightCaption={!option.key ? fingerCombos["񆅁"].primaryFingers[index] : undefined}
        />
      ))}
      {fingerNativeKeys.slice(options.length, fingerNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
