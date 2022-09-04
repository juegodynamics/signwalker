import {Dispatch, XArray} from 'extensions';
import React from 'react';
import {Glyph, Text, Word} from './types';

export class SetGlyphAction {
  static Word<SelectionT>(
    {currentGlyphIndex, glyphs, ...rest}: Word<SelectionT>,
    nextGlyph: Glyph<SelectionT>
  ): Word<SelectionT> {
    return {
      ...rest,
      currentGlyphIndex,
      glyphs: new XArray(...glyphs).update(currentGlyphIndex, nextGlyph),
    };
  }

  static Text<SelectionT>(
    {currentWordIndex, words, ...rest}: Text<SelectionT>,
    nextGlyph: Glyph<SelectionT>
  ): Text<SelectionT> {
    return {
      ...rest,
      currentWordIndex,
      words: new XArray(...words).update(
        currentWordIndex,
        SetGlyphAction.Word<SelectionT>(words[currentWordIndex], nextGlyph)
      ),
    };
  }
}

export class SetWordAction {
  static Text<SelectionT>(
    {currentWordIndex, words, ...rest}: Text<SelectionT>,
    nextWord: Word<SelectionT>
  ): Text<SelectionT> {
    return {
      ...rest,
      currentWordIndex,
      words: new XArray(...words).update(currentWordIndex, nextWord),
    };
  }
}

// export class SetTextAction {
//   static NewWord(text: Text): Text {
//     return {
//       ...
//     }
//   }
// }

export const useEditorState = <
  SelectionT extends Record<string, any> = Record<string, any>
>({
  defaultSelection,
  resolver,
}: {
  defaultSelection: SelectionT;
  resolver: (selection: SelectionT) => string | undefined;
}) => {
  const [text, setText] = React.useState<Text<SelectionT>>({
    currentWordIndex: 0,
    words: [
      {
        currentGlyphIndex: 0,
        // swu: '',
        glyphs: [
          {
            character: '',
            x: 0,
            y: 0,
            selection: defaultSelection,
          },
        ],
      },
    ],
  });

  const addWord = React.useCallback(
    () =>
      setText((priorText) => ({
        ...priorText,
        currentWordIndex: priorText.currentWordIndex + 1,
        words: [
          ...priorText.words,
          {
            currentGlyphIndex: 0,
            glyphs: [
              {
                character: '',
                x: 0,
                y: 0,
                selection: defaultSelection,
              },
            ],
          },
        ],
      })),
    [setText]
  );

  const currentWord = text.words[text.currentWordIndex];
  const setWord: Dispatch<Word<SelectionT>> = React.useCallback(
    (
      nextWordOrFn:
        | Word<SelectionT>
        | ((priorWord: Word<SelectionT>) => Word<SelectionT>)
    ) => {
      const nextWord =
        typeof nextWordOrFn === 'function'
          ? nextWordOrFn(currentWord)
          : nextWordOrFn;
      setText(SetWordAction.Text(text, nextWord));
    },
    [currentWord, text]
  );

  const addGlyph = React.useCallback(
    () =>
      setWord((priorWord) => {
        let nextHeight = 0;

        priorWord.glyphs.forEach((glyph, glyphIndex) => {
          const priorElement = document.getElementById(`${0}-${glyphIndex}`);
          if (priorElement && priorElement.offsetHeight) {
            console.log(priorElement.offsetHeight);
            nextHeight += priorElement.offsetHeight;
          }
        });
        return {
          ...priorWord,
          currentGlyphIndex: priorWord.currentGlyphIndex + 1,
          glyphs: [
            ...priorWord.glyphs,
            {
              character: '',
              x: 0,
              y: nextHeight,
              selection: defaultSelection,
            },
          ],
        };
      }),
    [setWord]
  );

  const currentGlyph = currentWord.glyphs[currentWord.currentGlyphIndex];
  const setGlyph: Dispatch<Glyph<SelectionT>> = React.useCallback(
    (
      nextGlyphOrFn:
        | Glyph<SelectionT>
        | ((priorGlyph: Glyph<SelectionT>) => Glyph<SelectionT>)
    ) => {
      const nextGlyph =
        typeof nextGlyphOrFn === 'function'
          ? nextGlyphOrFn(currentGlyph)
          : nextGlyphOrFn;
      setText(SetGlyphAction.Text<SelectionT>(text, nextGlyph));
    },
    [currentGlyph, text]
  );

  const setSelection: Dispatch<SelectionT> = React.useCallback(
    (
      nextSelectionOrFn:
        | SelectionT
        | ((priorSelection: SelectionT) => SelectionT)
    ) => {
      const nextSelection =
        nextSelectionOrFn instanceof Function
          ? nextSelectionOrFn(currentGlyph.selection)
          : nextSelectionOrFn;
      setText(
        SetGlyphAction.Text<SelectionT>(text, {
          ...currentGlyph,
          character: resolver(nextSelection) || '',
          selection: nextSelection,
        })
      );
    },
    [currentGlyph, text]
  );

  const offsetXY = React.useCallback(
    (dx: number, dy: number) =>
      setGlyph((priorGlyph) => ({
        ...priorGlyph,
        x: priorGlyph.x + dx,
        y: priorGlyph.y + dy,
      })),
    [setGlyph]
  );

  const focusForward = React.useCallback(
    () =>
      setText((priorText) => {
        const currentWordIndex = priorText.currentWordIndex;
        const currentWord = priorText.words[priorText.currentWordIndex];
        const currentGlyphIndex = currentWord.currentGlyphIndex;

        if (currentGlyphIndex + 1 < currentWord.glyphs.length) {
          return SetWordAction.Text<SelectionT>(priorText, {
            ...currentWord,
            currentGlyphIndex: currentGlyphIndex + 1,
          });
        }
        if (currentWordIndex + 1 < priorText.words.length) {
          return {
            ...priorText,
            currentWordIndex: currentWordIndex + 1,
          };
        }
        return priorText;
      }),
    [setText]
  );

  const focusBackward = React.useCallback(
    () =>
      setText((priorText) => {
        const currentWordIndex = priorText.currentWordIndex;
        const currentWord = priorText.words[priorText.currentWordIndex];
        const currentGlyphIndex = currentWord.currentGlyphIndex;

        if (currentGlyphIndex - 1 >= 0) {
          return SetWordAction.Text<SelectionT>(priorText, {
            ...currentWord,
            currentGlyphIndex: currentGlyphIndex - 1,
          });
        }
        if (currentWordIndex - 1 >= 0) {
          return {
            ...priorText,
            currentWordIndex: currentWordIndex - 1,
          };
        }
        return priorText;
      }),
    [setText]
  );

  const deleteLast = React.useCallback(
    () =>
      setText((priorText) => {
        const currentWordIndex = priorText.currentWordIndex;
        const currentWord = priorText.words[priorText.currentWordIndex];
        const currentGlyphIndex = currentWord.currentGlyphIndex;
        if (currentGlyphIndex - 1 >= 0) {
          return SetWordAction.Text<SelectionT>(priorText, {
            ...currentWord,
            currentGlyphIndex: currentGlyphIndex - 1,
            glyphs: currentWord.glyphs.slice(0, currentWord.glyphs.length - 1),
          });
        }
        if (currentWordIndex + 1 >= 0) {
          return {
            ...priorText,
            currentWordIndex: currentWordIndex - 1,
            words: priorText.words.slice(0, priorText.words.length - 1),
          };
        }
        return priorText;
      }),
    [setText]
  );

  // const focusOn = React.useCallback((wordIndex: number, glyphIndex: number)=>setText((priorText)=>{
  //   if (0 <= wordIndex && wordIndex < priorText.words.length) {
  //     const nextFocusedWord =
  //     if (0 <= wordIndex && wordIndex < priorText.words.length) {

  //     }
  //   }
  //   const currentWordIndex = priorText.currentWordIndex
  //   const currentWord = priorText.words[priorText.currentWordIndex];
  //   const currentGlyphIndex = currentWord.currentGlyphIndex;

  //   if (currentGlyphIndex-1>= 0){
  //     return SetWordAction.Text(priorText, {
  //       ...currentWord,
  //       currentGlyphIndex: currentGlyphIndex-1,
  //     })
  //   }
  //   if (currentWordIndex+1>=0){
  //     return {
  //       ...priorText,
  //       currentWordIndex: currentWordIndex-1
  //     }
  //   }
  //   return priorText
  // }),[setText])

  return {
    text,
    setText,
    currentWord,
    setWord,
    currentGlyph,
    setGlyph,
    setSelection,
    addWord,
    addGlyph,
    focusForward,
    focusBackward,
    deleteLast,
    offsetXY,
  };
};
