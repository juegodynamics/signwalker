import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

export const KeyboardButton = ({
  value,
  disabled,
  children,
  display,
  topLeftCaption,
  bottomRightCaption,
  ...props
}: {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  display?: string;
  topLeftCaption?: string;
  bottomRightCaption?: string;
}) => (
  <ToggleButton
    {...props}
    disabled={disabled}
    value={value}
    sx={{
      pt: 3,
      width: `65px`,
      height: "75px",
      position: "relative",
      top: 0,
      left: 0,
    }}
  >
    {display && <Typography sx={{ fontSize: "2.5em" }}>{display}</Typography>}
    {topLeftCaption && (
      <Typography sx={{ fontSize: "0.9em", position: "absolute", top: "2px", left: "4px", color: "#888" }}>
        {topLeftCaption}
      </Typography>
    )}
    {bottomRightCaption && (
      <Typography
        sx={{ fontSize: "1.5em", position: "absolute", bottom: "-10px", right: "2px", color: "warning.light" }}
      >
        {bottomRightCaption}
      </Typography>
    )}
    {children}
  </ToggleButton>
);
