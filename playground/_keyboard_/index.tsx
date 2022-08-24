import Stack from "@mui/material/Stack";
import React from "react";
import { getBackspaceAction, getSignWordAction } from "./actions";
import { KeyboardProvider } from "./context.Keyboard";
import { KeyboardRow0 } from "./KeyboardRow0";
import { KeyboardRow1 } from "./KeyboardRow1";
import { KeyboardRow2 } from "./KeyboardRow2";
import { KeyboardRow3 } from "./KeyboardRow3";
import { SignText } from "./SignText";
import { Dispatch, getDefaultSignTextState, Glyph, SignTextState } from "./types";
import { useKeyPress } from "./useKeyPress";

export * from "./KeyboardButton";
export * from "./KeyboardRow0";
export * from "./types";

export function SignKeyboard() {
  const [signText, setSignText] = React.useState<SignTextState>(getDefaultSignTextState);
  const [heldKeys, setHeldKeys] = React.useState<string[]>([]);

  useKeyPress(setSignText, setHeldKeys);

  const word = signText.words[signText.wordIndex];
  const glyph = word.glyph[word.glyphIndex];

  const setGlyph: Dispatch<Glyph> = React.useCallback(
    (nextSignOrFn: Glyph | ((priorSign: Glyph) => Glyph)) => {
      const nextSign = typeof nextSignOrFn === "function" ? nextSignOrFn(glyph) : nextSignOrFn;
      setSignText(getSignWordAction(signText, nextSign));
    },
    [glyph, signText]
  );

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <SignText text={signText} />
      <KeyboardProvider value={{ heldKeys, setHeldKeys }}>
        <Stack spacing={0} direction="column" justifyContent="flex-start" sx={{ height: "30%" }}>
          <KeyboardRow0 glyph={glyph} setGlyph={setGlyph} onDelete={() => setSignText(getBackspaceAction(signText))} />
          <KeyboardRow1 glyph={glyph} setGlyph={setGlyph} />
          <KeyboardRow2 glyph={glyph} setGlyph={setGlyph} />
          <KeyboardRow3 glyph={glyph} setGlyph={setGlyph} />
        </Stack>
      </KeyboardProvider>
    </Stack>
  );
}
