import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { KeyboardButton, KeyboardButtonProps } from "./KeyboardButton";
import { keyboardRows } from "./useKeyPress";

const keyboardLeaders = ["`", "Tab", "Caps", "Shift"];
const keyboardTailDx: { [row: number]: { [key: string]: number } } = {
  0: {
    Backspace: 18,
  },
  2: {
    Enter: 18 * 2.5 + 1,
  },
  3: {
    Shift: 18 * 5 + 1,
  },
};

export type KeyboardRowProps<T extends string = string> = {
  row: 0 | 1 | 2 | 3;
  options: KeyboardButtonProps[];
  nativeKeyOverrides?: Record<string, KeyboardButtonProps>;
  selectedOverride?: string;
  onSelectOverride?: (key: string) => void;
} & (
  | {
      exclusive: true;
      value: T | undefined;
      onChange: (nextValue: T | undefined) => void;
    }
  | { exclusive?: false | undefined; value: T[]; onChange: (nextValues: T[]) => void }
);

export const KeyboardRow = <T extends string = string>({
  row,
  options,
  nativeKeyOverrides,
  selectedOverride,
  onSelectOverride,
  exclusive,
  value,
  onChange,
}: KeyboardRowProps<T>) => {
  const optionLengthLimit = keyboardRows[row].length - 2 + (row === 1 ? 1 : 0);
  return (
    <Stack direction="row">
      <ToggleButtonGroup
        exclusive={exclusive}
        value={value}
        onChange={exclusive ? (_, nextValue: T) => onChange(nextValue) : (_, nextValues: T[]) => onChange(nextValues)}
      >
        <KeyboardButton
          disabled
          key={keyboardLeaders[row]}
          value={""}
          topLeftCaption={keyboardLeaders[row]}
          dx={row * 18}
        />
        {options.slice(0, optionLengthLimit + 1).map((option, index) => (
          <KeyboardButton key={keyboardRows[row][index]} topLeftCaption={keyboardRows[row][index]} {...option} />
        ))}
        {keyboardRows[row]
          .slice(Math.min(options.length, optionLengthLimit + 1), keyboardRows[row].length)
          .map((nativeKey) => {
            const dx = keyboardTailDx[row]?.[nativeKey] || 0;
            return nativeKeyOverrides?.[nativeKey] ? null : (
              // <KeyboardButton key={nativeKey} dx={dx} {...nativeKeyOverrides?.[nativeKey]} />
              <KeyboardButton disabled key={nativeKey} dx={dx} value={""} topLeftCaption={nativeKey} />
            );
          })}
      </ToggleButtonGroup>
      {nativeKeyOverrides && selectedOverride && onSelectOverride && (
        <ToggleButtonGroup
          exclusive
          value={selectedOverride}
          onChange={(_, nextValue: string) => onSelectOverride(nextValue)}
        >
          {Object.entries(nativeKeyOverrides).map(([nativeKey, overrideProps]) => (
            <KeyboardButton
              key={nativeKey}
              {...overrideProps}
              topLeftCaption={nativeKey}
              dx={keyboardTailDx[row]?.[nativeKey] || 0}
            />
          ))}
        </ToggleButtonGroup>
      )}
    </Stack>
  );
};

export const EmptyKeyboardRow = ({ row }: { row: KeyboardRowProps["row"] }) => (
  <KeyboardRow row={row} options={[]} value={[]} onChange={() => null} />
);
