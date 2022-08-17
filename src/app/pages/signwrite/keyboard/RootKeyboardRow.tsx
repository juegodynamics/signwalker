import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getRootOptions, getSelectedRootAction } from "./fingerData";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, SignState } from "./types";

const rootNativeKeys = [..."1234567890-="];

export const RootKeyboardRow = ({ sign, setSign }: { sign: SignState; setSign: Dispatch<SignState> }) => {
  const options = getRootOptions();

  return (
    <ToggleButtonGroup
      exclusive
      value={sign.selectedRoot}
      onChange={(_, nextValue: string) => setSign((priorSign) => getSelectedRootAction(priorSign, nextValue))}
    >
      {options.map((option, index) => (
        <KeyboardButton key={index} value={option.key} display={option.key} topLeftCaption={rootNativeKeys[index]} />
      ))}
      {rootNativeKeys.slice(options.length, rootNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
