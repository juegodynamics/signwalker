import * as sign from "../signstruct";
import {
  fingerMapToVariantSignature,
  getSelectedCombination,
  getSelectedRootFingerMovement,
  getVariantOptions,
  isEqualSignature,
  variantSignatureToFingerMap,
} from "./selectors";
import {
  ContactIndicator,
  Finger,
  FingerMap,
  FingerMovementIndicator,
  getDefaultFingerMovementIndicator,
  getDefaultHandMovementIndicator,
  getDefaultSignWordState,
  Glyph,
  HandMovementIndicator,
  Handshape,
  mod,
  Rotation,
  SignTextState,
  SignWordState,
  toggleArrayEntry,
  toggleFingerInMap,
  VariantOption,
} from "./types";

export const getSelectedRootContactAction = (
  priorContact: ContactIndicator,
  nextSelectedRoot?: string
): ContactIndicator => ({
  ...priorContact,
  selectedRoot: priorContact.selectedRoot === nextSelectedRoot ? undefined : nextSelectedRoot,
  between: undefined,
  frequency: undefined,
  angle: 0,
});
export const getSelectedRootHandMovementAction = (
  priorMovement: HandMovementIndicator,
  nextSelectedRoot?: string
): HandMovementIndicator => ({
  ...getDefaultHandMovementIndicator(),
  selectedRoot: priorMovement.selectedRoot === nextSelectedRoot ? undefined : nextSelectedRoot,
  angle: 0,
});

export const getSelectedRootGlyphAction = (priorGlyph: Glyph, nextSelectedRoot?: string): Glyph => {
  if (priorGlyph instanceof sign.handshape.Glyph) {
    return new sign.handshape.Glyph({
      selectedRoot: priorGlyph.selectedRoot === nextSelectedRoot ? undefined : nextSelectedRoot,
    });
  }
  if (priorGlyph instanceof sign.contact.Glyph) {
    return new sign.contact.Glyph({ selectedRoot: nextSelectedRoot as sign.contact.Glyph["selectedRoot"] });
  }

  switch (priorGlyph.glyphType) {
    case "fingerMovement":
      return getSelectedRootFingerMovement(priorGlyph, nextSelectedRoot);
    case "handMovement":
      return getSelectedRootHandMovementAction(priorGlyph, nextSelectedRoot);
    default:
      return priorGlyph;
  }
};

export const predictSelectedFingerAction = (
  priorSign: Handshape,
  nextSelectedFinger: Finger | Finger[]
): Handshape => ({
  ...priorSign,
  selectedRoot: priorSign.selectedRoot,
  selectedFingers: Array.isArray(nextSelectedFinger)
    ? nextSelectedFinger.reduce<FingerMap>(
        (partial, nextKey) => ({
          ...partial,
          [nextKey]: true,
        }),
        {}
      )
    : toggleFingerInMap(priorSign.selectedFingers, nextSelectedFinger),
  selectedFingerVariants: {},
  currentRevealedVariants: [],
});

export const getChangeGlyphType = (priorGlyph: Glyph, targetGlyphType: Glyph["glyphType"]): Glyph => {
  switch (targetGlyphType) {
    case "handshape":
      return new sign.handshape.Glyph();
    case "contact":
      return new sign.contact.Glyph();
    case "fingerMovement":
      return getDefaultFingerMovementIndicator();
    case "handMovement":
      return getDefaultHandMovementIndicator();
    default:
      return priorGlyph;
  }
};

export const getSelectedFingerAction = (priorSign: Handshape, nextSelectedFinger: Finger | Finger[]): Handshape => {
  const nextSign = predictSelectedFingerAction(priorSign, nextSelectedFinger);
  const priorSelectedFingers = Object.keys(priorSign.selectedFingers);
  if (
    !Array.isArray(nextSelectedFinger) &&
    !getSelectedCombination(nextSign).combination?.key &&
    !(priorSelectedFingers.length === 1 && priorSelectedFingers[0] === nextSelectedFinger)
  ) {
    return { ...nextSign, selectedFingers: { [nextSelectedFinger]: true } };
  }

  return nextSign;
};

export const getRevealVariantAction = (priorSign: Handshape, nextRevealedVariant: string | string[]): Handshape => {
  const nextSign: Handshape = {
    ...priorSign,
    selectedRoot: priorSign.selectedRoot,
    selectedFingers: priorSign.selectedFingers,
    currentRevealedVariants: Array.isArray(nextRevealedVariant)
      ? nextRevealedVariant
      : toggleArrayEntry(priorSign.currentRevealedVariants, nextRevealedVariant),
    selectedFingerVariants: {},
  };

  const nextVariantOptions = getVariantOptions(nextSign);
  if (!nextVariantOptions.length) {
    return nextSign.currentRevealedVariants.length === 0 ? nextSign : priorSign;
  }

  const [thumb, index, middle, ring, little] = nextVariantOptions[0].signature;
  nextSign.selectedFingerVariants = { thumb, index, middle, ring, little };

  return nextSign;
};

export const getSelectVariantAction = (priorSign: Handshape, signature: VariantOption["signature"]): Handshape => {
  return {
    ...priorSign,
    // currentRevealedVariants: unique(signature.flatMap((key) => key)),
    selectedFingerVariants: isEqualSignature(fingerMapToVariantSignature(priorSign.selectedFingerVariants), signature)
      ? {}
      : variantSignatureToFingerMap(signature),
  };
};

export const getUpdateRotationAction = (priorSign: Handshape, rotation: Omit<Rotation, "key">): Handshape => {
  return {
    ...priorSign,
    hand: rotation.hand,
    angle: mod(rotation.angle, 8),
    wristAngle: mod(rotation.wristAngle, 3),
    perspective: rotation.perspective,
  };
};

export const getSignTextAction = (priorSignText: SignWordState, nextGlyph: Glyph): SignWordState => ({
  ...priorSignText,
  glyph: [
    ...priorSignText.glyph.slice(0, priorSignText.glyphIndex),
    nextGlyph,
    ...priorSignText.glyph.slice(priorSignText.glyphIndex + 1, priorSignText.glyph.length),
  ],
});

export const getSignWordAction = (priorText: SignTextState, nextGlyph: Glyph): SignTextState => ({
  ...priorText,
  words: [
    ...priorText.words.slice(0, priorText.wordIndex),
    getSignTextAction(priorText.words[priorText.wordIndex], nextGlyph),
    ...priorText.words.slice(priorText.wordIndex + 1, priorText.words.length),
  ],
});

export const getNewSignAction = (priorText: SignTextState): SignTextState => {
  const priorWord = priorText.words[priorText.wordIndex];

  return {
    ...priorText,
    words: [
      ...priorText.words.slice(0, priorText.wordIndex),
      {
        ...priorWord,
        glyphIndex: priorWord.glyphIndex + 1,
        glyph: [...priorWord.glyph, new sign.handshape.Glyph()],
      },
      ...priorText.words.slice(priorText.wordIndex + 1, priorText.words.length),
    ],
  };
};

export const getBackspaceAction = (priorText: SignTextState): SignTextState => {
  if (!priorText.words.length) return priorText;

  const priorWord = priorText.words[priorText.wordIndex];
  if (!priorWord.glyph.length) {
    return {
      ...priorText,
      wordIndex: Math.max(priorText.wordIndex - 1, 0),
      words: [...priorText.words.slice(0, priorText.words.length - 1)],
    };
  }

  return {
    ...priorText,
    words: [
      ...priorText.words.slice(0, priorText.wordIndex),
      {
        ...priorWord,
        glyphIndex: Math.max(priorWord.glyphIndex - 1, 0),
        glyph:
          priorWord.glyph.length - 1 === 0
            ? [new sign.handshape.Glyph()]
            : [...priorWord.glyph.slice(0, priorWord.glyph.length - 1)],
      },
      ...priorText.words.slice(priorText.wordIndex + 1, priorText.words.length - 1),
    ],
  };
};

export const focusNextSignAction = (priorText: SignTextState): SignTextState => {
  const priorWord = priorText.words[priorText.wordIndex];

  return {
    ...priorText,
    words: [
      ...priorText.words.slice(0, priorText.wordIndex),
      {
        ...priorWord,
        glyphIndex: Math.min(priorWord.glyphIndex + 1, priorWord.glyph.length - 1),
      },
      ...priorText.words.slice(priorText.wordIndex + 1, priorText.words.length),
    ],
  };
};

export const focusLastSignAction = (priorText: SignTextState): SignTextState => {
  const priorWord = priorText.words[priorText.wordIndex];

  return {
    ...priorText,
    words: [
      ...priorText.words.slice(0, priorText.wordIndex),
      {
        ...priorWord,
        glyphIndex: Math.max(priorWord.glyphIndex - 1, 0),
      },
      ...priorText.words.slice(priorText.wordIndex + 1, priorText.words.length),
    ],
  };
};

export const getNewWordAction = (priorText: SignTextState): SignTextState => ({
  ...priorText,
  wordIndex: priorText.wordIndex + 1,
  words: [...priorText.words, getDefaultSignWordState()],
});

export const getMoveSignAction = (priorGlyph: Glyph, [dx, dy]: [number, number]): Glyph => {
  if (priorGlyph instanceof sign.handshape.Glyph) {
    return new sign.handshape.Glyph({
      x: Math.min(Math.max(priorGlyph.x + dx, -250), 250),
      y: Math.min(Math.max(priorGlyph.y + dy, -250), 250),
    });
  }
  if (priorGlyph instanceof sign.contact.Glyph) {
    return new sign.contact.Glyph({
      x: Math.min(Math.max(priorGlyph.x + dx, -250), 250),
      y: Math.min(Math.max(priorGlyph.y + dy, -250), 250),
    });
  }

  return {
    ...priorGlyph,
    x: Math.min(Math.max(priorGlyph.x + dx, -250), 250),
    y: Math.min(Math.max(priorGlyph.y + dy, -250), 250),
  };
};

export const getUpdateContactAction = (
  priorContact: ContactIndicator,
  nextContact?: Partial<ContactIndicator>
): ContactIndicator =>
  nextContact
    ? {
        ...priorContact,
        between: nextContact.between,
        frequency: nextContact.frequency,
        angle: nextContact.angle ?? priorContact.angle,
      }
    : {
        ...priorContact,
        between: false,
        frequency: undefined,
        angle: 0,
      };

export const getUpdateFingerMovementAction = (
  priorMovement: FingerMovementIndicator,
  nextMovement?: Partial<FingerMovementIndicator>
): FingerMovementIndicator =>
  nextMovement
    ? ({
        ...priorMovement,
        ...nextMovement,
      } as FingerMovementIndicator)
    : {
        ...priorMovement,
        angle: 0,
      };

export const getUpdateHandMovementAction = (
  priorMovement: HandMovementIndicator,
  nextMovement?: Partial<HandMovementIndicator>
): HandMovementIndicator =>
  nextMovement
    ? ({
        ...priorMovement,
        ...nextMovement,
      } as HandMovementIndicator)
    : {
        ...priorMovement,
        angle: 0,
      };
