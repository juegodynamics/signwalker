import Stack from '@mui/material/Stack';
import React from 'react';
import {EditorText, useEditorState} from './editor';
import {Keyboard} from './keyboard';
import * as signstruct from './signstruct';

// const keyboard = new signstruct.handshape.VariantSelectorKeyboard();

export default function SignWalker() {
  const {
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
    offsetXY,
    deleteLast,
  } = useEditorState<signstruct.GlyphSelection>({
    defaultSelection: signstruct.defaultSelection,
    resolver: signstruct.KeyboardConfigurator.resolveKey,
  });

  const [heldKeys, setHeldKeys] = React.useState<Record<string, boolean>>({});

  const glyphLayout = React.useMemo(
    () =>
      currentGlyph.selection
        ? signstruct.KeyboardConfigurator.getGlyphLayout(currentGlyph.selection)
        : [],
    [currentGlyph.selection]
  );

  const handleKeyUp = React.useCallback<(ev: KeyboardEvent) => void>(
    ({key}) => {
      setHeldKeys((priorHeldKeys) => ({...priorHeldKeys, [key]: false}));
    },
    [setHeldKeys]
  );

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{height: '100%'}}
    >
      <EditorText text={text} />
      <Keyboard<signstruct.GlyphSelection>
        selectedKeys={currentGlyph.selection}
        setSelectedKeys={setSelection}
        glyphLayout={glyphLayout}
        resolveKey={signstruct.KeyboardConfigurator.resolveKey}
        overrideKeys={{
          Space: {
            onClick: () => addGlyph(),
          },
          Enter: {
            onClick: () => addWord(),
          },
          Backspace: {
            onClick: () => deleteLast(),
          },
          ArrowUp: {
            glyph: '񈗡',
            onClick: () => offsetXY(0, 40),
          },
          ArrowLeft: {
            glyph: '񈗣',
            onClick: () => offsetXY(-40, 0),
          },
          ArrowDown: {
            glyph: '񈗥',
            onClick: () => offsetXY(0, -40),
          },
          ArrowRight: {
            glyph: '񈗧',
            onClick: () => offsetXY(40, 0),
          },
        }}
      />
    </Stack>
  );
}
