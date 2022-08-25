import {useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import {
  borderRadiusSize,
  captionFontSize,
  previewFontSize,
  unitHeight,
  unitSize,
} from './const';

export const KeyboardButton = ({
  caption,
  glyph: Glyph,
  preview,
  onClick,
  isEmpty,
  isSelected,
  isHighlighted,
  isDisabled,
  head,
  mid,
  tail,
  flexGrow,
  heightMultiplier,
}: {
  caption: string;
  glyph?:
    | string
    | React.FunctionComponent<{
        isEmpty?: boolean;
        isSelected?: boolean;
        isHighlighted?: boolean;
        isDisabled?: boolean;
        borderRadiusSize: string;
        captionFontSize: string;
        previewFontSize: string;
        unitSize: string;
      }>;
  preview?: string;
  onClick?: () => void;
  isEmpty?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  heightMultiplier?: number;
  head?: boolean;
  mid?: boolean;
  tail?: boolean;
  flexGrow?: number;
}) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      disableFocusRipple={!onClick}
      disableRipple={!onClick}
      disableTouchRipple={!onClick}
      variant={onClick ? 'contained' : 'outlined'}
      tabIndex={-1}
      // color={style === 'selected' ? 'primary' : 'info'}
      // color={isSelected ? 'primary' : undefined}
      sx={{
        p: 0,
        color: isSelected
          ? theme.palette.background.paper
          : theme.palette.text.primary,
        backgroundColor: onClick
          ? isSelected
            ? 'primary.main'
            : 'info.main'
          : theme.palette.background.default,
        transition: '0ms',
        height: heightMultiplier
          ? `calc(${unitHeight} * ${heightMultiplier})`
          : unitHeight,
        position: 'relative',
        minWidth: '0px',
        ...(flexGrow
          ? {flexGrow}
          : {
              width: unitSize,
            }),
        ...((!onClick || isDisabled) && {
          cursor: 'default',
        }),
        ...(!onClick && {borderColor: theme.palette.divider}),
        ...(mid && {
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
        }),
        ...(head && {
          borderTopLeftRadius: borderRadiusSize,
          borderBottomLeftRadius: borderRadiusSize,
          ...(!tail && {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
          }),
        }),
        ...(tail && {
          ...(!head && {
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }),
          borderTopRightRadius: borderRadiusSize,
          borderBottomRightRadius: borderRadiusSize,
        }),
      }}
    >
      {Glyph !== undefined &&
        (typeof Glyph === 'string' ? (
          <Typography
            sx={{
              fontSize: `calc(${unitSize} * 0.45)`,
              ...(isHighlighted && {color: 'warning.light'}),
              ...(isDisabled && {color: 'info.light'}),
            }}
          >
            {Glyph}
          </Typography>
        ) : (
          <Glyph
            isEmpty={isEmpty}
            isSelected={isSelected}
            isHighlighted={isHighlighted}
            isDisabled={isDisabled}
            borderRadiusSize={borderRadiusSize}
            captionFontSize={captionFontSize}
            previewFontSize={previewFontSize}
            unitSize={unitSize}
          />
        ))}
      {caption && (
        <Typography
          variant="caption"
          color={isSelected ? '#222' : '#888'}
          sx={{
            fontSize: captionFontSize,
            position: 'absolute',
            top: '0px',
            left: `calc(${borderRadiusSize} * 0.4)`,
          }}
        >
          {caption}
        </Typography>
      )}
      {preview && !isSelected && (
        <Typography
          variant="caption"
          color={'primary.light'}
          sx={{
            fontSize: previewFontSize,
            position: 'absolute',
            top: '0px',
            right: `calc(${borderRadiusSize} * 0.4)`,
          }}
        >
          {preview}
        </Typography>
      )}
    </Button>
  );
};
