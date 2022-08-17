import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { ManualLetter, resolveKey, useKeyPress } from "./fingerData";
import { FingerKeyboardRow } from "./FingerKeyboardRow";
import { FingerVariantKeyboardRow } from "./FingerVariantKeyboardRow";
import { FingerVariantSelectionKeyboardRow } from "./FingerVariantSelectionKeyboardRow";
import { RootKeyboardRow } from "./RootKeyboardRow";
import { getDefaultSignState, SignState } from "./types";

export * from "./KeyboardButton";
export * from "./RootKeyboardRow";
export * from "./types";

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
  const [sign, setSign] = React.useState<SignState>(getDefaultSignState);

  useKeyPress(setSign);

  return (
    <Stack spacing={0} justifyContent="flex-start" alignItems="center" sx={{ height: "100%" }}>
      <Stack justifyContent="center" alignItems="center" sx={{ height: "50%" }}>
        <SignKey value={resolveKey(sign)} />
      </Stack>
      <Stack spacing={0} direction="column" justifyContent="flex-start" sx={{ height: "30%" }}>
        <RootKeyboardRow sign={sign} setSign={setSign} />
        <FingerKeyboardRow sign={sign} setSign={setSign} />
        <FingerVariantKeyboardRow sign={sign} setSign={setSign} />
        <FingerVariantSelectionKeyboardRow sign={sign} setSign={setSign} />
      </Stack>
    </Stack>
  );
}
