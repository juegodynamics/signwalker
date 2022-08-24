import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { resolveKey } from "./resolve";
import { resolveContactIndicator } from "./selectors.contact";
import { resolveFingerMovementIndicator } from "./selectors.fingerMovement";
import { Glyph, SignTextState } from "./types";

const resolveCharacter = (glyph: Glyph): string => {
  switch (glyph.glyphType) {
    case "handshape":
      return resolveKey(glyph);
    case "contact":
      return resolveContactIndicator(glyph);
    case "fingerMovement":
      return resolveFingerMovementIndicator(glyph);
    case "handMovement":
      return String.fromCodePoint(glyph.code);
    default:
      return "";
  }
};

const SignGlyph = ({ glyph, isFocused }: { glyph: Glyph; isFocused: boolean }) => {
  const theme = useTheme();
  const character = resolveCharacter(glyph);

  return (
    <text
      x={250 + glyph.x}
      y={250 + glyph.y - (!character ? 40 : 0)}
      fill={isFocused ? theme.palette.secondary.light : theme.palette.text.primary}
      alignmentBaseline="middle"
      textAnchor="middle"
      style={{ fontSize: "120px", textAlign: "center" }}
    >
      {character || "⎶"}
      {!character && (
        <animate
          attributeType="XML"
          attributeName="opacity"
          values="0;1;1;0"
          dur="1.5s"
          calcMode="discrete"
          repeatCount="indefinite"
        />
      )}
    </text>
  );
};

export const SignText = ({ text }: { text: SignTextState }) => (
  <Paper variant="outlined" sx={{ position: "relative", height: "700px", width: "80vw" }}>
    <Stack
      direction="column"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="flex-start"
      sx={{ height: "100%" }}
    >
      {text.words.map((word, wordIndex) => (
        <svg
          key={wordIndex}
          viewBox="0 0 500 500"
          style={{ height: "100px", width: "100px", ...(text.wordIndex === wordIndex && { border: "1px solid" }) }}
        >
          <g>
            <path d="M 250 0 L 250 500" stroke="red" />
            {word.glyph.map((glyph, signIndex) => (
              <SignGlyph
                key={signIndex}
                glyph={glyph}
                isFocused={word.glyphIndex === signIndex && text.wordIndex === wordIndex}
              />
            ))}
          </g>
        </svg>
      ))}
    </Stack>
  </Paper>
);
