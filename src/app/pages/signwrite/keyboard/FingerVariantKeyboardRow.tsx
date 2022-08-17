import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { fingerVariants, getPossibleVariants, getRevealVariantAction } from "./fingerData";
import { KeyboardButton } from "./KeyboardButton";
import { Dispatch, SignState } from "./types";

const fingerVariantNativeKeys = [..."asdfghjkl;'"];
export const FingerVariantKeyboardRow = ({ sign, setSign }: { sign: SignState; setSign: Dispatch<SignState> }) => {
  const options = Object.entries(fingerVariants).map(([label, key]) => ({ key, label }));
  const possibleVariants = getPossibleVariants(sign);

  return (
    <ToggleButtonGroup
      value={sign.currentRevealedVariants}
      onChange={(_, nextRevealedVariants: string[]) => {
        setSign((priorSign) => getRevealVariantAction(priorSign, nextRevealedVariants));
      }}
      sx={{ pl: 5 }}
    >
      {options.map((option, index) => {
        const [pre, post] = [...option.key];
        const isPossibleVariant = possibleVariants.includes(option.label);
        return (
          <KeyboardButton
            key={index}
            disabled
            value={isPossibleVariant ? option.label : ""}
            topLeftCaption={fingerVariantNativeKeys[index]}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                position: "absolute",
                bottom: "2px",
                left: "6px",
                color: isPossibleVariant ? "primary.dark" : "divider",
                opacity: isPossibleVariant ? 1 : 0.5,
                transition: "opacity color 300ms",
              }}
            >
              {pre}
            </Typography>
            <Typography
              sx={{
                fontSize: "2em",
                position: "absolute",
                bottom: "20px",
                left: "30px",
                color: "primary.light",
                opacity: isPossibleVariant ? 1 : 0.2,
                transition: "opacity 300ms",
              }}
            >
              {post}
            </Typography>
            <Typography
              sx={{
                fontSize: "2em",
                position: "absolute",
                bottom: "4px",
                left: "15px",
                color: "secondary.light",
                transform: "rotate(45deg)",
                opacity: isPossibleVariant ? 1 : 0.2,
                transition: "opacity 300ms",
              }}
            >
              {"⇡"}
            </Typography>
          </KeyboardButton>
        );
      })}
      {fingerVariantNativeKeys.slice(options.length, fingerVariantNativeKeys.length).map((nativeKey) => (
        <KeyboardButton key={nativeKey} value={""} topLeftCaption={nativeKey} />
      ))}
    </ToggleButtonGroup>
  );
};
