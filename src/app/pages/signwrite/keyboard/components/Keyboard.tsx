import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {Dispatch, Enum, EnumType} from 'extensions';
import React from 'react';
import {
  captionToIndices,
  rows,
  spacingSize,
  totalWidth,
  unitSize,
} from './const';
import {KeyboardButton} from './KeyboardButton';
import {KeyboardRow} from './KeyboardRow';
import {GlyphButtonOverrides, GlyphButtonProps} from './types';
import {getNestedGroupedElementAt} from './utils';

export interface KeyboardState<SelectionT extends Record<string, any>> {
  resolvedKey: string;
  selectedKeys: SelectionT;
}

const HoldableKeyCode = new Enum(
  'ShiftLeft',
  'ShiftRight',
  'MetaLeft',
  'MetaRight',
  'AltLeft',
  'AltRight',
  'ControlLeft',
  'ControlRight'
);
type HoldableKeyCode = EnumType<typeof HoldableKeyCode>;
const defaultHeldKeyCodes = HoldableKeyCode.reduce((code) => false);

const ArrowKeyboardButton = (
  props: Partial<Parameters<typeof KeyboardButton>[0]>
) => (
  <Grid item xs={2}>
    <KeyboardButton {...props} caption={''} heightMultiplier={0.5} />
  </Grid>
);

const ModiferKeyboardButton = ({
  code,
  caption,
  heldKeyCodes,
  handleKeyCodeHeld,
}: Pick<Parameters<typeof KeyboardButton>[0], 'caption'> & {
  code: HoldableKeyCode;
  heldKeyCodes: Record<HoldableKeyCode, boolean>;
  handleKeyCodeHeld: (code: HoldableKeyCode) => void;
}) => (
  <KeyboardButton
    caption={caption}
    isSelected={heldKeyCodes[code]}
    onClick={() => handleKeyCodeHeld(code)}
  />
);

export const Keyboard = <SelectionT extends Record<string, any>>({
  selectedKeys,
  setSelectedKeys,
  glyphLayout,
  resolveKey,
  overrideKeys,
  shiftOverrideKeys,
}: {
  selectedKeys: SelectionT;
  setSelectedKeys: Dispatch<SelectionT>;
  glyphLayout: Array<Array<Array<GlyphButtonProps<SelectionT>>>>;
  resolveKey: (props: SelectionT) => string | undefined;
  overrideKeys?: GlyphButtonOverrides;
  shiftOverrideKeys?: GlyphButtonOverrides;
}) => {
  const [heldKeyCodes, setHeldKeyCodes] =
    React.useState<Record<HoldableKeyCode, boolean>>(defaultHeldKeyCodes);

  const handleKeyPress = React.useCallback<(ev: KeyboardEvent) => void>(
    ({key: nativeKey, code, metaKey, shiftKey, repeat}) => {
      if (HoldableKeyCode.includes(code)) {
        setHeldKeyCodes((priorHeldKeys) => ({...priorHeldKeys, [code]: true}));
        return;
      }

      if (repeat) {
        return;
      }

      const override = overrideKeys
        ? overrideKeys[nativeKey] || overrideKeys[code]
        : undefined;
      if (override) {
        override.onClick({metaKey, shiftKey});
        return;
      }

      if (metaKey || shiftKey || !captionToIndices[nativeKey]) {
        return;
      }

      setSelectedKeys((priorSelectedKeys) => {
        const [rowIndex, charIndex] = captionToIndices[nativeKey];
        const keyboardKey = getNestedGroupedElementAt(
          glyphLayout,
          rowIndex,
          charIndex
        );

        if (keyboardKey && !keyboardKey.isDisabled && !keyboardKey.isEmpty) {
          const nextSelectedKeys = keyboardKey.onClick(priorSelectedKeys);
          return nextSelectedKeys;
        }

        return priorSelectedKeys;
      });
    },
    [glyphLayout, setSelectedKeys, setHeldKeyCodes]
  );

  const handleKeyRaise = React.useCallback<(ev: KeyboardEvent) => void>(
    ({code}) => {
      if (HoldableKeyCode.includes(code)) {
        setHeldKeyCodes((priorHeldKeys) => ({...priorHeldKeys, [code]: false}));
      }
    },
    [setHeldKeyCodes]
  );

  const handleResetHeldKeys = React.useCallback(() => {
    setHeldKeyCodes(defaultHeldKeyCodes);
  }, [setHeldKeyCodes]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRaise);
    window.addEventListener('blur', handleResetHeldKeys);
    return () => {
      setHeldKeyCodes(defaultHeldKeyCodes);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRaise);
      window.removeEventListener('blur', handleResetHeldKeys);
    };
  }, [handleKeyPress, handleKeyRaise]);

  const handleKeyCodeHeld = React.useCallback(
    (code: HoldableKeyCode) => {
      setHeldKeyCodes((priorHeldKeys) => ({
        ...priorHeldKeys,
        [code]: !priorHeldKeys[code],
      }));
    },
    [setHeldKeyCodes]
  );

  return (
    <Stack direction="column" spacing={spacingSize}>
      {rows.map(({leader, leaderDisableFlex, captions, tail}, rowIndex) => (
        <KeyboardRow
          key={rowIndex}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          leader={leader}
          leaderDisableFlex={leaderDisableFlex}
          captions={captions}
          tail={tail}
          groups={glyphLayout[rowIndex]}
          resolveKey={resolveKey}
          overrideKeys={overrideKeys}
        />
      ))}
      <Stack direction="row" spacing={spacingSize} sx={{width: totalWidth}}>
        <KeyboardButton caption={'fn'} />
        <ModiferKeyboardButton
          caption="⌃"
          code="ControlLeft"
          heldKeyCodes={heldKeyCodes}
          handleKeyCodeHeld={handleKeyCodeHeld}
        />
        <ModiferKeyboardButton
          caption="⌥"
          code="AltLeft"
          heldKeyCodes={heldKeyCodes}
          handleKeyCodeHeld={handleKeyCodeHeld}
        />
        <ModiferKeyboardButton
          caption="⌘"
          code="MetaLeft"
          heldKeyCodes={heldKeyCodes}
          handleKeyCodeHeld={handleKeyCodeHeld}
        />
        <KeyboardButton
          caption={' '}
          onClick={overrideKeys?.['Space']?.onClick}
          flexGrow={1}
        />
        <ModiferKeyboardButton
          caption="⌘"
          code="MetaRight"
          heldKeyCodes={heldKeyCodes}
          handleKeyCodeHeld={handleKeyCodeHeld}
        />
        <ModiferKeyboardButton
          caption="⌥"
          code="AltRight"
          heldKeyCodes={heldKeyCodes}
          handleKeyCodeHeld={handleKeyCodeHeld}
        />
        <Grid
          container
          columns={6}
          spacing={0}
          sx={{flexGrow: 0, width: `calc(${unitSize} * 3)`}}
        >
          <Grid item xs={2} />
          <ArrowKeyboardButton
            glyph={overrideKeys?.['ArrowUp']?.glyph || ''}
            onClick={overrideKeys?.['ArrowUp']?.onClick}
          />
          <Grid item xs={2} />
          <ArrowKeyboardButton
            glyph={overrideKeys?.['ArrowLeft']?.glyph || ''}
            onClick={overrideKeys?.['ArrowLeft']?.onClick}
          />
          <ArrowKeyboardButton
            glyph={overrideKeys?.['ArrowDown']?.glyph || ''}
            onClick={overrideKeys?.['ArrowDown']?.onClick}
          />
          <ArrowKeyboardButton
            glyph={overrideKeys?.['ArrowRight']?.glyph || ''}
            onClick={overrideKeys?.['ArrowRight']?.onClick}
          />
        </Grid>
      </Stack>
    </Stack>
  );
};

// ['', '񈗡', '', '񈗣', '񈗥', '񈗧']

// {rows.map(({leader, captions, tail}, rowIndex) => (
//   <KeyboardRow
//   key={rowIndex}
//   leader={leader}
//   captions={captions}
//   tail={tail}
//   groups={}

//   />
// ))}
