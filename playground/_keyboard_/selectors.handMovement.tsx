import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HandMovementIndicator } from "./types";

const handMovements = {
  "񆿁": 0x46fc1,
};

export const getRootHandMovementIndicatorOptions = () => Object.keys(handMovements);

export const transitionValues = {
  decrementedSize: "񈙑񈗱",
  incrementedSize: "񈗱񈙑",
  decrementedFrequency: "񈟑񈗱",
  incrementedFrequency: "񈗱񈟑",
  headless: "񈙁񈛑",
  wristFlex: "񈗡񈝡",
};

export const DescriptorKey = ({ value, disabled }: { value: string; disabled?: boolean }) => (
  <Typography
    sx={{
      fontSize: "2em",
      color: disabled ? "disabled" : "secondary.light",
      opacity: disabled ? 0.4 : 1,
      transition: "opacity 200ms",
    }}
  >
    {value}
  </Typography>
);

export const SeparatorKey = ({ value, disabled }: { value: string; disabled?: boolean }) => (
  <Typography
    sx={{
      fontSize: "1.5em",
      color: disabled ? "disabled" : undefined,
      opacity: disabled ? 0.4 : 1,
      transition: "opacity 200ms",
    }}
  >
    {value}
  </Typography>
);

export const CenterRow = ({ children }: { children: React.ReactNode }) => (
  <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
    {children}
  </Stack>
);

export const transitionKeys = {
  decrementedSize: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈙑"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈗱"} disabled={disabled} />
    </CenterRow>
  ),
  incrementedSize: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈗱"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈙑"} disabled={disabled} />
    </CenterRow>
  ),
  decrementedFrequency: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈟑"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈗱"} disabled={disabled} />
    </CenterRow>
  ),
  incrementedFrequency: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈗱"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈟑"} disabled={disabled} />
    </CenterRow>
  ),
  headless: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈙁"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈙱"} disabled={disabled} />
    </CenterRow>
  ),
  wristFlex: ({ disabled }: { disabled?: boolean }) => (
    <CenterRow>
      <DescriptorKey value={"񈗱"} disabled={disabled} />
      <SeparatorKey value={"񆽧"} disabled={disabled} />
      <DescriptorKey value={"񈝱"} disabled={disabled} />
    </CenterRow>
  ),
};

type TransitionValue = keyof typeof transitionValues;

export type HandMovementTransition = {
  transition: TransitionValue;
  disabled?: boolean;
  nextMovement?: HandMovementIndicator;
};

const sizeValues: Array<HandMovementIndicator["size"]> = ["small", "medium", "large", "largest"];
const frequencyValues: Array<HandMovementIndicator["frequency"]> = ["single", "double", "triple"];

type Shift<T extends string> = { code: number; value: T };

const getDecrementIncrementPairing = <T extends string>(
  values: T[],
  currentValue: T,
  codeDifference: number,
  customJumps?: Partial<Record<T, Partial<Record<T, number>>>>
): [Shift<T> | undefined, Shift<T> | undefined] => {
  const currentIndex = values.findIndex((value) => value === currentValue);
  return [
    currentIndex - 1 < 0
      ? undefined
      : {
          code: -1 * (customJumps?.[values[currentIndex - 1]]?.[values[currentIndex]] ?? codeDifference),
          value: values[currentIndex - 1],
        },
    currentIndex + 1 >= values.length
      ? undefined
      : {
          code: customJumps?.[values[currentIndex]]?.[values[currentIndex + 1]] ?? codeDifference,
          value: values[currentIndex + 1],
        },
  ];
};

const getDecrementIncrementOptions = <T extends string>(
  currentMovement: HandMovementIndicator,
  getNextMovement: (nextValue: T) => HandMovementIndicator,
  [decrementKey, incrementKey]: [TransitionValue, TransitionValue],
  values: T[],
  currentValue: T,
  codeDifference: number,
  options?: { customJumps?: Partial<Record<T, Partial<Record<T, number>>>>; disabled?: boolean }
) => {
  const [decrement, increment] = getDecrementIncrementPairing(
    values,
    currentValue,
    codeDifference,
    options?.customJumps
  );

  return [
    {
      transition: decrementKey,
      disabled: !decrement || options?.disabled,
      nextMovement: decrement
        ? { ...getNextMovement(decrement.value), code: currentMovement.code + decrement.code }
        : currentMovement,
    },
    {
      transition: incrementKey,
      disabled: !increment || options?.disabled,
      nextMovement: increment
        ? { ...getNextMovement(increment.value), code: currentMovement.code + increment.code }
        : currentMovement,
    },
  ];
};

export const getHandMovementRow1Options = (currentMovement: HandMovementIndicator): HandMovementTransition[] => {
  if (!currentMovement.selectedRoot) {
    return [];
  }
  if (currentMovement.selectedRoot === "񆿁") {
    return [
      ...getDecrementIncrementOptions(
        currentMovement,
        (nextSize) => ({ ...currentMovement, size: nextSize }),
        ["decrementedSize", "incrementedSize"],
        sizeValues,
        currentMovement.size,
        96
      ),
      ...getDecrementIncrementOptions(
        currentMovement,
        (nextFrequency) => ({ ...currentMovement, frequency: nextFrequency }),
        ["decrementedFrequency", "incrementedFrequency"],
        frequencyValues,
        currentMovement.frequency,
        480,
        { disabled: currentMovement.headless }
      ),
      {
        transition: "headless",
        nextMovement: {
          ...currentMovement,
          code: currentMovement.code + 48 * (currentMovement.headless ? -1 : 1),
          headless: !Boolean(currentMovement.headless),
        },
      },
      {
        transition: "wristFlex",
        disabled: currentMovement.size !== "small",
        nextMovement:
          currentMovement.size === "small"
            ? {
                ...currentMovement,

                code: currentMovement.code + 384 * (currentMovement.wristFlex ? -1 : 1),
                wristFlex: !Boolean(currentMovement.wristFlex),
              }
            : currentMovement,
      },
    ];
  }

  return [];
};
