import {
  GlyphProps,
  updateExclusive,
  updateInclusive,
} from 'app/pages/signwrite/keyboard';
import {mod} from 'extensions';
import * as selectors from './selectors';

interface Selection {
  root?: selectors.RootHandShape;
  wristAngle: number;
  angle: number;
  digits: string[];
  fingerShapes: selectors.FingerShape[];
  variant?: string;
}
export const defaultSelection = {
  wristAngle: 2,
  angle: 0,
  digits: [],
  fingerShapes: [],
};
const arr = <T>(element?: T): T[] => (element ? [element] : []);

type GlyphSelectors<Selection extends Record<string, any>> = Required<{
  [K in keyof Selection]: GlyphProps<Selection>[];
}>;

const resolveBaseKey = ({
  root,
  digits,
  variant,
}: Selection): string | undefined => {
  if (variant) return variant;
  if (!root || !digits.length) return root;
  if (digits.length === 1) return digits[0];
  return [...selectors.VariantCollection[root].DigitVariants.combinations].find(
    (combination) => combination.digitCombo.equals(...digits)
  )?.character;
};

export class KeyboardConfigurator {
  static getkeyLayout(
    selectedKeys: Selection
  ): Array<Array<Array<GlyphProps<Selection>>>> {
    const variantOptions: string[] = [];
    const enabledFingerShapes: selectors.FingerShape[] = [];
    const selectedVariantFingerShapes: selectors.FingerShape[] = [];

    if (selectedKeys.root) {
      [
        ...selectors.VariantCollection[selectedKeys.root].FingerShapeVariants
          .combinations,
      ].forEach((combination) => {
        if (combination.character === selectedKeys.variant) {
          selectedVariantFingerShapes.push(...combination.shapeCombo);
        }
        const matchesDigits = combination.digitCombo.equals(
          ...selectedKeys.digits
        );
        const matchesFingerShapes = selectedKeys.fingerShapes.length
          ? combination.shapeCombo.includesAll(...selectedKeys.fingerShapes)
          : true;
        if (matchesDigits && matchesFingerShapes) {
          enabledFingerShapes.push(...combination.shapeCombo);
          variantOptions.push(combination.character);
        }
      });
    }

    const glyphSelectors: GlyphSelectors<Selection> = {
      root: selectors.RootHandShape.keys.map((glyph) => ({
        glyph,
        onClick: ({root, wristAngle, angle, ...priorRest}: Selection) => ({
          root: updateExclusive(root, glyph),
          wristAngle,
          angle,
          digits: [],
          fingerShapes: [],
        }),
        ...(glyph === selectedKeys.root && {style: 'selected'}),
      })),
      digits: (selectedKeys.root
        ? [...selectors.DigitCollection[selectedKeys.root].keys]
        : []
      ).map((glyph) => ({
        glyph,
        preview: selectedKeys.digits.length > 0,
        onClick: ({digits, ...priorRest}: Selection) => ({
          ...priorRest,
          digits: updateInclusive(digits, glyph),
          variant: undefined,
        }),
        ...(selectedKeys.digits.includes(glyph) && {style: 'selected'}),
      })),
      wristAngle: [
        {
          glyph: selectedKeys.wristAngle === 2 ? '񋠫' : '񋜏',
          value: mod(selectedKeys.wristAngle + 1, 3),
        },
        {
          glyph: selectedKeys.wristAngle === 0 ? '񋠯' : '񋜇',
          value: mod(selectedKeys.wristAngle - 1, 3),
        },
      ].map(({glyph, value}) => ({
        glyph,
        preview: true,
        onClick: (priorSelection: Selection) => ({
          ...priorSelection,
          wristAngle: value,
        }),
      })),
      angle: [
        {
          glyph: '񋖁',
          value: mod(selectedKeys.angle + 1, 8),
        },
        {
          glyph: '񋖉',
          value: mod(selectedKeys.angle + 1, 8),
        },
      ].map(({glyph, value}) => ({
        glyph,
        preview: true,
        onClick: (priorSelection: Selection) => ({
          ...priorSelection,
          angle: value,
        }),
      })),
      fingerShapes: selectors.FingerShape.keys.map((glyph) => ({
        glyph,
        style: selectedKeys.fingerShapes.includes(glyph)
          ? 'selected'
          : !enabledFingerShapes.includes(glyph)
          ? 'disabled'
          : selectedVariantFingerShapes.includes(glyph)
          ? 'highlighted'
          : undefined,
        onClick: ({fingerShapes, ...priorSelection}: Selection) => ({
          ...priorSelection,
          fingerShapes: updateInclusive(fingerShapes, glyph),
        }),
      })),
      variant: variantOptions.map((glyph) => ({
        glyph,
        onClick: ({variant, ...priorRest}: Selection) => ({
          ...priorRest,
          variant: updateExclusive(variant, glyph),
        }),
        ...(glyph === selectedKeys.variant && {style: 'selected'}),
      })),
    };

    const keyLayout: Array<Array<Array<GlyphProps<Selection>>>> =
      selectedKeys.root
        ? [
            [glyphSelectors.root],
            [
              glyphSelectors.digits,
              glyphSelectors.wristAngle,
              glyphSelectors.angle,
            ],
            [glyphSelectors.fingerShapes],
            [glyphSelectors.variant],
          ]
        : [[glyphSelectors.root]];

    return keyLayout;
  }
  static resolveKey(selection: Selection): string | undefined {
    const baseKey = resolveBaseKey(selection);
    if (!baseKey) return;
    const baseCode = (baseKey.codePointAt(0) || 0) - 0x20;
    const modifiers =
      mod(selection.wristAngle, 3) * 16 + mod(selection.angle, 8);
    return String.fromCodePoint(baseCode + modifiers);
  }
  // static getAllSelectedGlyphs(selectedKeys: Selection): string[] {
  //   return [
  //     ...arr(selectedKeys.root),
  //     ...selectedKeys.digits,
  //     ...selectedKeys.fingerShapes,
  //     ...arr(selectedKeys.variant),
  //   ];
  // }
}
