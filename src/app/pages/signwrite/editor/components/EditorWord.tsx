import * as d from '../types';
import {EditorGlyph} from './EditorGlyph';

export const EditorWord = ({
  word,
  isFocused,
}: {
  word: d.Word;
  isFocused: boolean;
}) => {
  // const smallestY = word.glyphs.reduce((prior,next)=>prior===-1||prior<next.y?next.y:prior,-1)
  // const largestY = word.glyphs.reduce((prior,next)=>prior>next.y?next.y:prior,0)
  return (
    <svg
      viewBox="0 0 125 125"
      style={{
        height: '100px',
        width: '100px',
        ...(isFocused && {border: '1px solid'}),
      }}
    >
      <g>
        <path d="M 62.5 0 L 62.5 125" stroke="red" />
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
};
