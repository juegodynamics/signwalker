import * as d from '../types';
import {EditorGlyph} from './EditorGlyph';

export const min = <T,>(
  [first, ...rest]: T[],
  callbackfn: (entry: T) => number
): T => {
  let minValue = first;
  rest.forEach((element) => {
    if (callbackfn(element) < callbackfn(minValue)) {
      minValue = element;
    }
  });
  return minValue;
};

export const max = <T,>(
  [first, ...rest]: T[],
  callbackfn: (entry: T) => number
): T => {
  let maxValue = first;
  rest.forEach((element) => {
    if (callbackfn(element) > callbackfn(maxValue)) {
      maxValue = element;
    }
  });
  return maxValue;
};

export const EditorWord = ({
  id,
  word,
  isFocused,
}: {
  id: string;
  word: d.Word;
  isFocused: boolean;
}) => {
  const minY = word.glyphs.length
    ? min(word.glyphs, (glyph) => glyph.y).y
    : -50;
  const maxY = word.glyphs.length ? max(word.glyphs, (glyph) => glyph.y).y : 50;
  const height = Math.max(2 * (maxY - minY), 50);

  const width = 125;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100px',
        height: `${Math.floor((height * 100) / 125)}px`,
        ...(isFocused && {border: '1px solid'}),
      }}
    >
      <g>
        <path d={`M ${width / 2} 0 L ${width / 2} ${height}`} stroke="red" />
        {word.glyphs.map((glyph, glyphIndex) => (
          <EditorGlyph
            id={`${id}-${glyphIndex}`}
            key={glyphIndex}
            glyph={glyph}
            width={width}
            height={height}
            isFocused={word.currentGlyphIndex === glyphIndex && isFocused}
            yOffset={-(maxY + minY) / 2}
          />
        ))}
      </g>
    </svg>
  );
};
