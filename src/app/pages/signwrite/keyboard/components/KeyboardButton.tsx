import {useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

export const KeyboardButton = ({
  caption,
  glyph,
  preview,
  onClick,
  style,
  widthExtension = 0,
  head,
  mid,
  tail,
  flexGrow,
}: {
  caption: string;
  glyph?: React.ReactNode;
  preview?: string;
  onClick?: () => void;
  style?: 'selected' | 'highlighted' | 'disabled';
  widthExtension?: number;
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
      // color={style === 'selected' ? 'primary' : 'info'}
      // color={isSelected ? 'primary' : undefined}
      sx={{
        p: 0,
        color:
          style === 'selected'
            ? theme.palette.background.paper
            : theme.palette.text.primary,
        backgroundColor: onClick
          ? style === 'selected'
            ? 'primary.main'
            : 'info.main'
          : theme.palette.background.default,
        transition: 'color 200ms',
        height: '60px',
        position: 'relative',
        ...(flexGrow
          ? {flexGrow}
          : {
              width: `${65 + widthExtension}px`,
            }),
        ...((!onClick || style === 'disabled') && {
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
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
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
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
        }),
      }}
    >
      {/* <Box
        // elevation={isSelected ? 8 : 0}
        sx={{
          height: '100%',
          width: `100%`,
          position: 'relative',
          // backgroundColor: isSelected ? 'secondary.dark' : undefined,
        }}
      > */}
      {glyph &&
        (typeof glyph === 'string' ? (
          <Typography
            sx={{
              fontSize: '1.9em',
              ...(style === 'highlighted' && {color: 'warning.light'}),
              ...(style === 'disabled' && {color: 'info.light'}),
            }}
          >
            {glyph}
          </Typography>
        ) : (
          glyph
        ))}
      {caption && (
        <Typography
          variant="caption"
          color={style === 'selected' ? '#222' : '#888'}
          sx={{
            fontSize: '0.8em',
            position: 'absolute',
            top: '0px',
            left: '4px',
          }}
        >
          {caption}
        </Typography>
      )}
      {preview && style !== 'selected' && (
        <Typography
          variant="caption"
          color={'primary.light'}
          sx={{
            fontSize: '1.2em',
            position: 'absolute',
            top: '0px',
            right: '4px',
          }}
        >
          {preview}
        </Typography>
      )}
    </Button>
  );
};
