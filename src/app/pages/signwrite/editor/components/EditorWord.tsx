import * as d from '../types';
import {EditorGlyph} from './EditorGlyph';

export const EditorWord = ({
  word,
  isFocused,
}: {
  word: d.Word;
  isFocused: boolean;
}) => (
  <svg
    // key={wordIndex}
    viewBox="0 0 500 500"
    style={{
      height: '100px',
      width: '100px',
      ...(isFocused && {border: '1px solid'}),
    }}
  >
    <g>
      <path d="M 250 0 L 250 500" stroke="red" />
      {word.glyphs.map((glyph, glyphIndex) => (
        <EditorGlyph
          key={glyphIndex}
          glyph={glyph}
          isFocused={word.currentGlyphIndex === glyphIndex && isFocused}
        />
      ))}
    </g>
  </svg>
);
