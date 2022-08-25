import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {spacingSize, unitSize} from './const';
import {KeyboardButton} from './KeyboardButton';
import {GlyphButtonOverrides, GlyphButtonProps} from './types';

const KeyboardGroupDivider = () => (
  <Stack direction="row" sx={{width: spacingSize}}>
    <Stack
      direction="column"
      justifyContent="space-evenly"
      sx={{width: `calc(${spacingSize})`}}
    >
      {[...Array(5).keys()].map((key) => (
        <Paper
          key={key}
          sx={{
            width: `calc(${spacingSize})`,
            height: `calc(${unitSize} * 0.04)`,
            backgroundColor: 'text.disabled',
            borderRadius: 0,
          }}
        />
      ))}
    </Stack>
  </Stack>
);

export const KeyboardGroup = <SelectionT,>({
  selectedKeys,
  setSelectedKeys,
  group,
  resolveKey,
  captions,
  overrideKeys,
}: {
  selectedKeys: SelectionT;
  setSelectedKeys: (nextSelectedKeys: SelectionT) => void;
  group: GlyphButtonProps<SelectionT>[];
  resolveKey: (selection: SelectionT) => string | undefined;
  captions: string[];
  overrideKeys?: GlyphButtonOverrides;
}) => (
  <Stack direction="row" spacing={0} divider={<KeyboardGroupDivider />}>
    {group.map((glyphPropsFromGroup, glyphIndex) => {
      if (glyphIndex >= captions.length) return null;
      const caption = captions[glyphIndex];
      const glyphOverride = overrideKeys?.[caption];

      const glyphProps = glyphOverride
        ? {...glyphOverride, preview: undefined}
        : glyphPropsFromGroup
        ? {
            ...glyphPropsFromGroup,
            onClick: () => {
              setSelectedKeys(glyphPropsFromGroup.onClick(selectedKeys));
            },
            preview: glyphPropsFromGroup.preview
              ? resolveKey(glyphPropsFromGroup.onClick(selectedKeys))
              : undefined,
          }
        : undefined;

      return (
        <KeyboardButton
          key={caption}
          caption={glyphProps?.hideCaption ? '' : caption}
          head={glyphIndex === 0}
          mid={0 < glyphIndex && glyphIndex < group.length - 1}
          tail={glyphIndex === group.length - 1}
          {...(glyphProps &&
            !glyphProps.isEmpty && {
              glyph: glyphProps.glyph,
              onClick: glyphProps.onClick,
              preview: glyphProps.preview,
              isSelected: glyphProps.isSelected,
              isHighlighted: glyphProps.isHighlighted,
              isDisabled: glyphProps.isDisabled,
            })}
        />
      );
    })}
  </Stack>
);
