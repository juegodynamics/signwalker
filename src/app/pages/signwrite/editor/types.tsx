export type Glyph<
  SelectionT extends Record<string, any> = Record<string, any>
> = {
  character: string;
  selection: SelectionT;
  x: number;
  y: number;
};

export interface Word<
  SelectionT extends Record<string, any> = Record<string, any>
> {
  currentGlyphIndex: number;
  glyphs: Glyph<SelectionT>[];
}

export interface Text<
  SelectionT extends Record<string, any> = Record<string, any>
> {
  currentWordIndex: number;
  words: Word<SelectionT>[];
}
