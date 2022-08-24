import {useTheme} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

export interface KeyboardButtonProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  display?: string;
  topLeftCaption?: string;
  topRightCaption?: string;
  dx?: number;
}

export const KeyboardButton = ({
  value,
  disabled,
  children,
  display,
  topLeftCaption,
  topRightCaption,
  dx = 0,
  ...props
}: KeyboardButtonProps) => {
  const theme = useTheme();
  return (
    <ToggleButton
      {...props}
      disabled={disabled}
      value={value}
      sx={{
        pt: 3,
        width: `${65 + dx}px`,
        height: '75px',
        position: 'relative',
        top: 0,
        left: 0,
      }}
    >
      {display && <Typography sx={{fontSize: '2.4em'}}>{display}</Typography>}

      {topRightCaption && (
        <Typography
          sx={{
            fontSize: '1.5em',
            position: 'absolute',
            top: '-1px',
            right: '4px',
            color: 'primary.light',
            textShadow: `2px 2px 5px ${theme.palette.background.paper}`,
          }}
        >
          {topRightCaption}
        </Typography>
      )}
      {children}
      {topLeftCaption && (
        <Typography
          sx={{
            fontSize: '0.9em',
            position: 'absolute',
            top: '2px',
            left: '4px',
            color: '#888',
          }}
        >
          {topLeftCaption}
        </Typography>
      )}
    </ToggleButton>
  );
};
