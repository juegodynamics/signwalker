import {
  GlyphButtonProps,
  updateExclusive,
  updateInclusive,
} from 'app/pages/signwrite/keyboard';
import {mod} from 'extensions';
import * as selectors from './selectors';
import {GlyphSelection} from './types';

export const defaultSelection: GlyphSelection = {
  selectionType: 'handshape',
  wristAngle: 2,
  angle: 0,
  digits: [],
  fingerShapes: [],
};

const resolveBaseKey = ({
  root,
  digits,
  variant,
}: GlyphSelection): string | undefined => {
  if (variant) return variant;
  if (!root || !digits.length) return root;
  if (digits.length === 1) return digits[0];
  return [...selectors.VariantCollection[root].DigitVariants.combinations].find(
    (combination) => combination.digitCombo.equals(...digits)
  )?.character;
};

export class KeyboardConfigurator {
  static getGlyphLayout(
    selection: GlyphSelection
  ): Array<Array<Array<GlyphButtonProps<GlyphSelection>>>> {
    const variantOptions: string[] = [];
    const enabledFingerShapes: selectors.FingerShape[] = [];
    const selectedVariantFingerShapes: selectors.FingerShape[] = [];

    if (selection.root) {
      [
        ...selectors.VariantCollection[selection.root].FingerShapeVariants
          .combinations,
      ].forEach((combination) => {
        if (combination.character === selection.variant) {
          selectedVariantFingerShapes.push(...combination.shapeCombo);
        }
        const matchesDigits = combination.digitCombo.equals(
          ...selection.digits
        );
        const matchesFingerShapes = selection.fingerShapes.length
          ? combination.shapeCombo.includesAll(...selection.fingerShapes)
          : true;
        if (matchesDigits && matchesFingerShapes) {
          enabledFingerShapes.push(...combination.shapeCombo);
          variantOptions.push(combination.character);
        }
      });
    }

    const rootGlyphOptions: GlyphButtonProps<GlyphSelection>[] =
      selectors.RootHandShape.keys.map((glyph) => ({
        glyph,
        isSelected: glyph === selection.root,
        onClick: ({root, wristAngle, angle}: GlyphSelection) => ({
          selectionType: 'handshape',
          root: updateExclusive(root, glyph),
          wristAngle,
          angle,
          digits: [],
          fingerShapes: [],
        }),
      }));

    const digitGlyphOptions: GlyphButtonProps<GlyphSelection>[] = (
      selection.root ? [...selectors.DigitCollection[selection.root].keys] : []
    ).map((glyph) => ({
      glyph,
      isSelected: selection.digits.includes(glyph),
      preview: selection.digits.length > 0,
      onClick: ({digits, ...priorRest}: GlyphSelection) => ({
        ...priorRest,
        digits: updateInclusive(digits, glyph),
        fingerShapes: [],
        variant: undefined,
      }),
    }));

    const wristAngleGlyphOptions: GlyphButtonProps<GlyphSelection>[] = [
      {
        glyph: selection.wristAngle === 2 ? '񋠫' : '񋜏',
        value: mod(selection.wristAngle + 1, 3),
      },
      {
        glyph: selection.wristAngle === 0 ? '񋠯' : '񋜇',
        value: mod(selection.wristAngle - 1, 3),
      },
    ].map(({glyph, value}) => ({
      glyph,
      preview: true,
      onClick: (priorSelection: GlyphSelection) => ({
        ...priorSelection,
        wristAngle: value,
      }),
    }));

    const angleGlyphOptions: GlyphButtonProps<GlyphSelection>[] = [
      {
        glyph: '񋖁',
        value: mod(selection.angle + 1, 8),
      },
      {
        glyph: '񋖉',
        value: mod(selection.angle - 1, 8),
      },
    ].map(({glyph, value}) => ({
      glyph,
      preview: true,
      onClick: (priorSelection: GlyphSelection) => ({
        ...priorSelection,
        angle: value,
      }),
    }));

    const fingerShapeGlyphOptions: GlyphButtonProps<GlyphSelection>[] =
      selectors.FingerShape.keys.map((glyph) => ({
        glyph,
        isSelected: selection.fingerShapes.includes(glyph),
        isHighlighted: selectedVariantFingerShapes.includes(glyph),
        isDisabled: !enabledFingerShapes.includes(glyph),
        onClick: ({fingerShapes, ...priorSelection}: GlyphSelection) => ({
          ...priorSelection,
          fingerShapes: enabledFingerShapes.includes(glyph)
            ? updateInclusive(fingerShapes, glyph)
            : [glyph],
        }),
      }));
    const variantGlyphOptions: GlyphButtonProps<GlyphSelection>[] =
      variantOptions.map((glyph) => ({
        glyph,
        isSelected: glyph === selection.variant,
        onClick: ({variant, ...priorRest}: GlyphSelection) => ({
          ...priorRest,
          variant: updateExclusive(variant, glyph),
        }),
      }));

    const keyLayout: Array<Array<Array<GlyphButtonProps<GlyphSelection>>>> =
      selection.root
        ? [
            [rootGlyphOptions],
            [digitGlyphOptions, wristAngleGlyphOptions, angleGlyphOptions],
            [fingerShapeGlyphOptions],
            [variantGlyphOptions],
          ]
        : [[rootGlyphOptions]];

    return keyLayout;
  }
  static resolveKey(selection: GlyphSelection): string | undefined {
    const baseKey = resolveBaseKey(selection);
    if (!baseKey) return;
    const baseCode = (baseKey.codePointAt(0) || 0) - 0x20;
    const modifiers =
      mod(selection.wristAngle, 3) * 16 + mod(selection.angle, 8);
    return String.fromCodePoint(baseCode + modifiers);
  }
}
