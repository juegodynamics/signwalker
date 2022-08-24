import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';
import {KeyboardButton} from './KeyboardButton';
// import * as selectors from './selectors';

const rows: readonly {
  leader: string;
  captions: readonly string[];
  tail?: string;
}[] = [
  {leader: '`', captions: [...'1234567890-='] as const, tail: 'Backspace'},
  {leader: 'Tab', captions: [...'qwertyuiop[]\\'] as const},
  {leader: 'CapsLock', captions: [..."asdfghjkl;'"] as const, tail: 'Enter'},
  {leader: 'Shift', captions: [...'zxcvbnm,./'] as const, tail: 'Shift'},
] as const;

const captionToIndices: Record<string, [number, number]> = rows.reduce(
  (priorRow, {captions}, rowIndex) => ({
    ...priorRow,
    ...captions.reduce(
      (priorCaption, caption, captionIndex) => ({
        ...priorCaption,
        [caption]: [rowIndex, captionIndex],
      }),
      {}
    ),
  }),
  {}
);

const getNestedElementAt = <ElementT,>(
  arr: ElementT[][],
  index1: number,
  index2: number
): ElementT | undefined => {
  if (index1 < arr.length) {
    if (index2 < arr[index1].length) {
      return arr[index1][index2];
    }
  }
};

const getNestedGroupedElementAt = <ElementT,>(
  arr: ElementT[][][],
  rowIndex: number,
  entryIndex: number
): ElementT | undefined => {
  if (rowIndex < arr.length) {
    const flatGroup = arr[rowIndex].flatMap((group) => group);
    if (entryIndex < flatGroup.length) {
      return flatGroup[entryIndex];
    }
  }
};

interface KeyboardState<SelectionT extends Record<string, any>> {
  resolvedKey: string;
  selectedKeys: SelectionT;
}

export interface GlyphProps<SelectionT> {
  glyph: string;
  onClick: (priorSelection: SelectionT) => SelectionT;
  style?: 'selected' | 'highlighted' | 'disabled';
  preview?: boolean;
}

export const Keyboard = <SelectionT extends Record<string, any>>({
  getkeyLayout,
  resolveKey,
  // getAllSelectedGlyphs,
  onSelectKeys,
  getDefaultSelectedKeys,
}: {
  getkeyLayout: (
    props: SelectionT
  ) => Array<Array<Array<GlyphProps<SelectionT>>>>;
  resolveKey: (props: SelectionT) => string | undefined;
  // getAllSelectedGlyphs: (props: SelectionT) => string[];
  onSelectKeys?: (props: KeyboardState<SelectionT>) => void;
  getDefaultSelectedKeys: () => SelectionT;
}) => {
  const [keyboardState, setKeyboardState] = React.useState<
    KeyboardState<SelectionT>
  >(() => ({
    resolvedKey: resolveKey(getDefaultSelectedKeys()) || '',
    selectedKeys: getDefaultSelectedKeys(),
  }));

  const {selectedKeys} = keyboardState;
  // const allSelectedKeys: string[] = React.useMemo(
  //   () => getAllSelectedGlyphs(selectedKeys),
  //   [selectedKeys]
  // );
  const keyLayout = React.useMemo(
    () => getkeyLayout(selectedKeys),
    [selectedKeys]
  );

  const handleKeyPress = React.useCallback<
    (ev: {
      key: string;
      metaKey?: boolean;
      shiftKey?: boolean;
      altKey?: boolean;
    }) => void
  >(
    ({key: nativeKey, metaKey, shiftKey}) => {
      if (metaKey || shiftKey || !captionToIndices[nativeKey]) {
        return;
      }

      setKeyboardState((priorKeyboardState) => {
        const [rowIndex, charIndex] = captionToIndices[nativeKey];
        const keyboardKey = getNestedGroupedElementAt(
          getkeyLayout(priorKeyboardState.selectedKeys),
          rowIndex,
          charIndex
        );

        if (keyboardKey) {
          const nextSelectedKeys = keyboardKey.onClick(
            priorKeyboardState.selectedKeys
          );
          return {
            resolvedKey: resolveKey(nextSelectedKeys) || '',
            selectedKeys: nextSelectedKeys,
          };
        }

        return priorKeyboardState;
      });
    },
    [setKeyboardState]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    onSelectKeys?.(keyboardState);
  }, [keyboardState]);

  return (
    <Stack direction="column" spacing={'7px'}>
      {rows.map(({leader, captions, tail}, rowIndex) => {
        const glyphLengthsContained = keyLayout[rowIndex]
          ? keyLayout[rowIndex].flatMap((group) => group).length
          : 0;
        return (
          <Stack key={rowIndex} direction="row" spacing={'7px'}>
            <KeyboardButton caption={leader} widthExtension={rowIndex * 15} />
            {keyLayout[rowIndex]?.length &&
              keyLayout[rowIndex].map((group, groupIndex) =>
                group.length ? (
                  <Stack
                    key={groupIndex}
                    direction="row"
                    spacing={0}
                    divider={
                      <Stack direction="row" sx={{width: '7px'}}>
                        <Paper
                          sx={{
                            width: '1px',
                            height: '100%',
                            backgroundColor: 'paper',
                          }}
                        />
                        <Stack
                          direction="column"
                          justifyContent="space-evenly"
                          sx={{width: '5px'}}
                        >
                          {[...Array(2).keys()].map((key) => (
                            <Paper
                              key={key}
                              sx={{
                                width: '100%',
                                height: '20px',
                                backgroundColor: 'info.dark',
                                borderRadius: 0,
                              }}
                            />
                          ))}
                        </Stack>
                        <Paper
                          sx={{
                            width: '1px',
                            height: '100%',
                            backgroundColor: 'paper',
                          }}
                        />
                      </Stack>
                    }
                  >
                    {group.map((glyphProps, glyphIndex) => {
                      const totalPriorLengths = keyLayout[rowIndex]
                        .slice(0, groupIndex)
                        .flatMap((group) => group).length;
                      if (totalPriorLengths + glyphIndex >= captions.length) {
                        return null;
                      }
                      const caption = captions[totalPriorLengths + glyphIndex];

                      return (
                        <KeyboardButton
                          key={caption}
                          caption={caption}
                          head={glyphIndex === 0}
                          mid={0 < glyphIndex && glyphIndex < group.length - 1}
                          tail={glyphIndex === group.length - 1}
                          {...(glyphProps && {
                            glyph: glyphProps.glyph,
                            onClick: () => {
                              handleKeyPress({key: caption});
                            },
                            preview: glyphProps.preview
                              ? resolveKey(glyphProps.onClick(selectedKeys))
                              : undefined,
                            style: glyphProps.style,
                          })}
                        />
                      );
                    })}
                  </Stack>
                ) : null
              )}
            {captions
              .slice(glyphLengthsContained, captions.length)
              .map((caption) => (
                <KeyboardButton key={caption} caption={caption} />
              ))}
            {tail && <KeyboardButton caption={tail} flexGrow={1} />}
          </Stack>
        );
      })}
    </Stack>
  );
};
