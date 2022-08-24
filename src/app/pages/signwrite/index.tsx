import Stack from '@mui/material/Stack';
import {EditorText, useEditorState} from './editor';
import {Keyboard} from './keyboard';
import * as signstruct from './signstruct';

// const keyboard = new signstruct.handshape.VariantSelectorKeyboard();

export default function SignWalker() {
  const {text, setText, currentWord, setWord, currentGlyph, setGlyph} =
    useEditorState();

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{height: '100%'}}
    >
      <EditorText text={text} />
      <Keyboard
        getkeyLayout={signstruct.handshape.KeyboardConfigurator.getkeyLayout}
        resolveKey={signstruct.handshape.KeyboardConfigurator.resolveKey}
        // getAllSelectedGlyphs={
        //   signstruct.handshape.KeyboardConfigurator.getAllSelectedGlyphs
        // }
        getDefaultSelectedKeys={() => signstruct.handshape.defaultSelection}
        onSelectKeys={({resolvedKey}) => {
          setGlyph((priorGlyph) => ({
            ...priorGlyph,
            character: resolvedKey,
          }));
        }}
      />
    </Stack>
  );
}
