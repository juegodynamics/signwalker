export interface Glyph {
  character: string;
  x: number;
  y: number;
}

export interface Word {
  currentGlyphIndex: number;
  glyphs: Glyph[];
}

export interface Text {
  currentWordIndex: number;
  words: Word[];
}
