import {Dispatch, XArray} from 'extensions';
import React from 'react';
import {Glyph, Text, Word} from './types';

export class SetGlyphAction {
  static Word(
    {currentGlyphIndex, glyphs, ...rest}: Word,
    nextGlyph: Glyph
  ): Word {
    return {
      ...rest,
      currentGlyphIndex,
      glyphs: new XArray(...glyphs).update(currentGlyphIndex, nextGlyph),
    };
  }

  static Text(
    {currentWordIndex, words, ...rest}: Text,
    nextGlyph: Glyph
  ): Text {
    return {
      ...rest,
      currentWordIndex,
      words: new XArray(...words).update(
        currentWordIndex,
        SetGlyphAction.Word(words[currentWordIndex], nextGlyph)
      ),
    };
  }
}

export class SetWordAction {
  static Text({currentWordIndex, words, ...rest}: Text, nextWord: Word): Text {
    return {
      ...rest,
      currentWordIndex,
      words: new XArray(...words).update(currentWordIndex, nextWord),
    };
  }
}

export const useEditorState = () => {
  const [text, setText] = React.useState<Text>({
    currentWordIndex: 0,
    words: [
      {
        currentGlyphIndex: 0,
        glyphs: [
          {
            character: '',
            x: 0,
            y: 0,
          },
        ],
      },
    ],
  });

  const currentWord = text.words[text.currentWordIndex];
  const setWord: Dispatch<Word> = React.useCallback(
    (nextWordOrFn: Word | ((priorWord: Word) => Word)) => {
      const nextWord =
        typeof nextWordOrFn === 'function'
          ? nextWordOrFn(currentWord)
          : nextWordOrFn;
      setText(SetWordAction.Text(text, nextWord));
    },
    [currentWord, text]
  );

  const currentGlyph = currentWord.glyphs[currentWord.currentGlyphIndex];
  const setGlyph: Dispatch<Glyph> = React.useCallback(
    (nextGlyphOrFn: Glyph | ((priorGlyph: Glyph) => Glyph)) => {
      const nextGlyph =
        typeof nextGlyphOrFn === 'function'
          ? nextGlyphOrFn(currentGlyph)
          : nextGlyphOrFn;
      setText(SetGlyphAction.Text(text, nextGlyph));
    },
    [currentGlyph, text]
  );

  return {
    text,
    setText,
    currentWord,
    setWord,
    currentGlyph,
    setGlyph,
  };
};
