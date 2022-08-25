import {GlyphButtonProps, updateExclusive} from 'app/pages/signwrite/keyboard';
import {repeat} from 'extensions';
import * as selectors from './selectors';
import {GlyphSelection} from './types';

export const defaultSelection: GlyphSelection = {
  selectionType: 'contact',
  root: '񆇡',
  between: false,
  frequency: 'single',
  angle: 0,
};

const frequencyOffset: {[K in selectors.Frequency]: number} = {
  single: 0,
  double: 0x60,
  triple: 0x70,
};

const betweenOffset = 0x60;

const updateCodePoint = (character: string, amount: number) =>
  String.fromCodePoint((character.codePointAt(0) || 0) + amount);

type ContactButtonProps = GlyphButtonProps<GlyphSelection>;

export class KeyboardConfigurator {
  static resolveKey(selection: GlyphSelection): string | undefined {
    if (!selection.root) return;

    const offset =
      frequencyOffset[selection.frequency] +
      (selection.frequency !== 'single' && selection.between
        ? betweenOffset
        : 0) +
      (selection.angle || 0);

    return updateCodePoint(selection.root, offset);
  }

  static getGlyphLayout(
    selection: GlyphSelection
  ): Array<Array<Array<ContactButtonProps>>> {
    const rootGlyphOptions: ContactButtonProps[] = selectors.Indicator.keys.map(
      (glyph) => ({
        glyph,
        isSelected: glyph === selection.root,
        onClick: ({root}: GlyphSelection) => ({
          selectionType: 'contact',
          root: updateExclusive(root, glyph),
          between: defaultSelection.between,
          frequency: defaultSelection.frequency,
          angle: defaultSelection.angle,
        }),
      })
    );

    if (!selection.root) return [[rootGlyphOptions]];

    const selectOptionHandler = (
      frequency: selectors.Frequency,
      angle: number,
      between: boolean
    ): ContactButtonProps => {
      const isSelected =
        frequency === selection.frequency &&
        angle === selection.angle &&
        between === selection.between;
      const onClick = () =>
        isSelected
          ? {...defaultSelection, root: selection.root}
          : {...selection, frequency, angle, between};
      return {
        glyph: KeyboardConfigurator.resolveKey(onClick()),
        isSelected,
        onClick,
      };
    };

    const standardFrequencyOptions: ContactButtonProps[] =
      selectors.Frequency.subset('double', 'triple').flatMap((frequency) =>
        repeat(4, (angle) => selectOptionHandler(frequency, angle, false))
      );

    const betweenFrequencyOptions: ContactButtonProps[] =
      selectors.Frequency.subset('double', 'triple').flatMap((frequency) =>
        repeat(4, (angle) => selectOptionHandler(frequency, angle, true))
      );

    return [
      [rootGlyphOptions],
      [standardFrequencyOptions],
      [betweenFrequencyOptions],
    ];
  }
}
