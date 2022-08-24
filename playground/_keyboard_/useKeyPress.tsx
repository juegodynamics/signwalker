import React from "react";
import {
  focusLastSignAction,
  focusNextSignAction,
  getBackspaceAction,
  getChangeGlyphType,
  getMoveSignAction,
  getNewSignAction,
  getNewWordAction,
  getRevealVariantAction,
  getSelectedFingerAction,
  getSelectedRootContactAction,
  getSelectedRootHandMovementAction,
  getSelectedRootHandshapeAction,
  getSelectVariantAction,
  getSignWordAction,
  getUpdateContactAction,
  getUpdateFingerMovementAction,
  getUpdateHandMovementAction,
  getUpdateRotationAction,
} from "./actions";
import {
  getContactRow1Options,
  getContactRow2Options,
  getContactRow3Options,
  getFingerOptions,
  getRootContactIndicatorOptions,
  getRootHandshapeOptions,
  getRotationOptions,
  getVariantOptions,
  getVariantSelectors,
} from "./selectors";
import {
  getFingerMovementRow1Options,
  getFingerMovementRow2Options,
  getFingerMovementRow3Options,
  getRootFingerMovementIndicatorOptions,
  getSelectedRootFingerMovement,
} from "./selectors.fingerMovement";
import { getHandMovementRow1Options, getRootHandMovementIndicatorOptions } from "./selectors.handMovement";
import { Dispatch, hasIndex, SignTextState, toggleArrayEntry } from "./types";

export const keyboardRows = [
  [..."1234567890-=", "Backspace"],
  [..."qwertyuiop[]\\"],
  [..."asdfghjkl;'", "Enter"],
  [..."zxcvbnm,./", "Shift"],
];
export const findKeyInRows = (key: string): { row: number; index: number } | undefined => {
  for (let row = 0; row < keyboardRows.length; row++) {
    if (keyboardRows[row].includes(key))
      return {
        row,
        index: keyboardRows[row].findIndex((keyboardKey) => keyboardKey === key),
      };
  }
};

const keysToMarkAsHeld = ["Control", "Meta", "Shift", "Alt"];

export const useKeyPress = (setText: Dispatch<SignTextState>, setHeldKeys: Dispatch<string[]>) => {
  const handleKeyPress = React.useCallback<(ev: KeyboardEvent) => void>(
    ({ key, metaKey, shiftKey }) => {
      if (keysToMarkAsHeld.includes(key)) {
        setHeldKeys((priorHeldKeys) => toggleArrayEntry(priorHeldKeys, key));
      }

      if (metaKey) return;
      setText((priorText) => {
        const priorWord = priorText.words[priorText.wordIndex];
        const priorGlyph = priorWord.glyph[priorWord.glyphIndex];

        if (shiftKey) {
          if (key === "Tab") {
            return focusLastSignAction(priorText);
          }
          return priorText;
        }

        if (key === "-") {
          return getSignWordAction(priorText, getChangeGlyphType(priorGlyph, "handshape"));
        }
        if (key === "=") {
          return getSignWordAction(priorText, getChangeGlyphType(priorGlyph, "contact"));
        }
        if (key === "]") {
          return getSignWordAction(priorText, getChangeGlyphType(priorGlyph, "handMovement"));
        }
        if (key === "\\") {
          return getSignWordAction(priorText, getChangeGlyphType(priorGlyph, "fingerMovement"));
        }

        if (key === "Tab") {
          return focusNextSignAction(priorText);
        }

        if (priorGlyph.selectedRoot && key === " ") {
          return getNewSignAction(priorText);
        }

        if (priorGlyph.selectedRoot && key === "Enter") {
          return getNewWordAction(priorText);
        }

        if (key === "ArrowUp") {
          return getSignWordAction(priorText, getMoveSignAction(priorGlyph, [0, -10]));
        }
        if (key === "ArrowDown") {
          return getSignWordAction(priorText, getMoveSignAction(priorGlyph, [0, 10]));
        }
        if (key === "ArrowLeft") {
          return getSignWordAction(priorText, getMoveSignAction(priorGlyph, [-10, 0]));
        }
        if (key === "ArrowRight") {
          return getSignWordAction(priorText, getMoveSignAction(priorGlyph, [10, 0]));
        }

        if (key === "Backspace") {
          return getBackspaceAction(priorText);
        }

        const searchResults = findKeyInRows(key);
        if (!searchResults) {
          return priorText;
        }
        const { row: keyRow, index: keyIndex } = searchResults;

        if (priorGlyph.glyphType === "contact") {
          const rootOptions = getRootContactIndicatorOptions();
          if (keyRow === 0 && hasIndex(rootOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectedRootContactAction(priorGlyph, rootOptions[keyIndex]));
          }

          if (priorGlyph.selectedRoot) {
            const contactDoubleOptions = getContactRow1Options(priorGlyph.selectedRoot);
            const contactTripleOptions = getContactRow2Options(priorGlyph.selectedRoot);
            const contactAdditionalOptions = getContactRow3Options(priorGlyph.selectedRoot);

            if (keyRow === 1 && hasIndex(contactDoubleOptions, keyIndex)) {
              return getSignWordAction(priorText, getUpdateContactAction(priorGlyph, contactDoubleOptions[keyIndex]));
            }

            if (keyRow === 2 && hasIndex(contactTripleOptions, keyIndex)) {
              return getSignWordAction(priorText, getUpdateContactAction(priorGlyph, contactTripleOptions[keyIndex]));
            }

            if (keyRow === 3 && hasIndex(contactAdditionalOptions, keyIndex)) {
              return getSignWordAction(
                priorText,
                getUpdateContactAction(priorGlyph, contactAdditionalOptions[keyIndex])
              );
            }
          }
        }

        if (priorGlyph.glyphType === "fingerMovement") {
          const rootOptions = getRootFingerMovementIndicatorOptions();
          if (keyRow === 0 && hasIndex(rootOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectedRootFingerMovement(priorGlyph, rootOptions[keyIndex]));
          }

          if (priorGlyph.selectedRoot) {
            const fingerMovementRow1Options = getFingerMovementRow1Options(priorGlyph.selectedRoot);
            const fingerMovementRow2Options = getFingerMovementRow2Options(priorGlyph.selectedRoot);
            const fingerMovementRow3Options = getFingerMovementRow3Options(priorGlyph.selectedRoot);

            if (keyRow === 1 && hasIndex(fingerMovementRow1Options, keyIndex)) {
              return getSignWordAction(
                priorText,
                getUpdateFingerMovementAction(priorGlyph, fingerMovementRow1Options[keyIndex])
              );
            }
            if (keyRow === 2 && hasIndex(fingerMovementRow2Options, keyIndex)) {
              return getSignWordAction(
                priorText,
                getUpdateFingerMovementAction(priorGlyph, fingerMovementRow2Options[keyIndex])
              );
            }
            if (keyRow === 3 && hasIndex(fingerMovementRow3Options, keyIndex)) {
              return getSignWordAction(
                priorText,
                getUpdateFingerMovementAction(priorGlyph, fingerMovementRow3Options[keyIndex])
              );
            }
          }
        }

        if (priorGlyph.glyphType === "handMovement") {
          const rootOptions = getRootHandMovementIndicatorOptions();
          if (keyRow === 0 && hasIndex(rootOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectedRootHandMovementAction(priorGlyph, rootOptions[keyIndex]));
          }

          if (priorGlyph.selectedRoot) {
            const handMovementRow1Options = getHandMovementRow1Options(priorGlyph);

            if (keyRow === 1 && hasIndex(handMovementRow1Options, keyIndex)) {
              if (handMovementRow1Options[keyIndex].disabled) {
                return priorText;
              }
              return getSignWordAction(
                priorText,
                getUpdateHandMovementAction(priorGlyph, handMovementRow1Options[keyIndex].nextMovement)
              );
            }
          }
        }

        if (priorGlyph.glyphType === "handshape") {
          const rootOptions = getRootHandshapeOptions();
          const fingerOptions = getFingerOptions(priorGlyph);
          const rotationOptions = getRotationOptions(priorGlyph);
          const variantSelectors = getVariantSelectors();
          const variantOptions = getVariantOptions(priorGlyph);

          if (keyRow === 0 && hasIndex(rootOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectedRootHandshapeAction(priorGlyph, rootOptions[keyIndex].key));
          }

          if (keyRow === 1 && hasIndex(fingerOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectedFingerAction(priorGlyph, fingerOptions[keyIndex].label));
          }

          if (keyRow === 1 && hasIndex(rotationOptions, keyIndex - fingerOptions.length)) {
            return getSignWordAction(
              priorText,
              getUpdateRotationAction(priorGlyph, rotationOptions[keyIndex - fingerOptions.length])
            );
          }

          if (keyRow === 2 && hasIndex(variantSelectors, keyIndex)) {
            return getSignWordAction(priorText, getRevealVariantAction(priorGlyph, variantSelectors[keyIndex].label));
          }

          if (keyRow === 3 && hasIndex(variantOptions, keyIndex)) {
            return getSignWordAction(priorText, getSelectVariantAction(priorGlyph, variantOptions[keyIndex].signature));
          }
        }

        return priorText;
      });
    },
    [setText]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
