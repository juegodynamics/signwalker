import {
  Glyph,
  FingerMovementIndicator,
  StepFingerMovementIndicator,
  SeriesFingerMovementIndicator,
  getDefaultFingerMovementIndicator,
} from "./types";

const symmetricStepMovements: Record<string, number> = {
  "񆡁": 0x46841,
  "񆨡": 0x46a21,
};

const rotatableStepMovements: Record<string, number> = {
  "񆱡": 0x46c61,
  "񆷡": 0x46de1,
  "񆺡": 0x46ea1,
  "񆼁": 0x46f01,
};

const stepMovements: Record<string, number> = {
  ...symmetricStepMovements,
  ...rotatableStepMovements,
};

const seriesMovements: Record<string, number> = {
  "񆧁": 0x469c1,
  "񆮡": 0x46ba1,
  // "񆰁":0x46C01,
  "񆴡": 0x46d21,
  "񆶁": 0x46d81,
};

export const getRootFingerMovementIndicatorOptions = () => Object.keys({ ...stepMovements, ...seriesMovements });
export const getSelectedRootFingerMovement = (
  priorGlyph: FingerMovementIndicator,
  nextSelectedRoot?: string
): FingerMovementIndicator => {
  if (!nextSelectedRoot) {
    return getDefaultFingerMovementIndicator();
  }
  const newRoot = {
    ...priorGlyph,
    selectedRoot: priorGlyph.selectedRoot === nextSelectedRoot ? undefined : nextSelectedRoot,
    ...(stepMovements[nextSelectedRoot] && {
      movementStyle: "step",
      size: "large",
      angle: 0,
      frequency: undefined,
    }),
    ...(seriesMovements[nextSelectedRoot] && {
      movementStyle: "series",
      pattern: "sequential",
      angle: 0,
      direction: "counterclockwise",
      count: 0,
    }),
  } as FingerMovementIndicator;
  return newRoot;
};

const resolveStepMovementIndicator = (movement: StepFingerMovementIndicator): string => {
  if (!movement.selectedRoot) {
    return "";
  }
  if (symmetricStepMovements[movement.selectedRoot]) {
    const sizeOffset = { small: 96, large: 0, scissors: 0 }[movement.size];
    const frequencyOffset = movement.frequency ? { double: 192, triple: 208, quadruple: 0 }[movement.frequency] : 0;

    return String.fromCodePoint(stepMovements[movement.selectedRoot] + sizeOffset + frequencyOffset + movement.angle);
  }
  if (rotatableStepMovements[movement.selectedRoot]) {
    const sizeOffset = { small: 96, large: 0, scissors: 0 }[movement.size];
    const frequencyOffset = movement.frequency ? { double: 16, triple: 48, quadruple: 64 }[movement.frequency] : 0;

    return String.fromCodePoint(stepMovements[movement.selectedRoot] + sizeOffset + frequencyOffset + movement.angle);
  }

  return "";
};

const resolveSeriesMovementIndicator = (movement: SeriesFingerMovementIndicator): string => {
  if (!movement.selectedRoot) {
    return "";
  }

  const countOffset = movement.count * 16;
  const alternatingOffset = movement.pattern === "alternating" ? 96 : 0;
  const directionOffset = movement.direction === "clockwise" ? 8 : 0;

  return String.fromCodePoint(
    seriesMovements[movement.selectedRoot] + countOffset + alternatingOffset + directionOffset + movement.angle
  );
};

export const resolveFingerMovementIndicator = (movement: FingerMovementIndicator): string => {
  switch (movement.movementStyle) {
    case "step":
      return resolveStepMovementIndicator(movement);
    case "series":
      return resolveSeriesMovementIndicator(movement);
    default:
      return "";
  }
};

const requiredStepKeys: Array<keyof StepFingerMovementIndicator> = ["selectedRoot", "size", "frequency", "angle"];
const requiredSeriesKeys: Array<keyof SeriesFingerMovementIndicator> = [
  "selectedRoot",
  "pattern",
  "direction",
  "count",
];

export const isEqualFingerMovementOption = (
  a: Partial<FingerMovementIndicator>,
  b: Partial<FingerMovementIndicator>
): boolean => {
  return a.movementStyle === "step" && b.movementStyle === "step"
    ? requiredStepKeys.every((key) => a[key] === b[key])
    : a.movementStyle === "series" && b.movementStyle === "series"
    ? requiredSeriesKeys.every((key) => a[key] === b[key])
    : false;
};

export const getFingerMovementRow1Options = (selectedRoot: string): Partial<FingerMovementIndicator>[] => {
  if (symmetricStepMovements[selectedRoot]) {
    return [
      {
        selectedRoot,
        movementStyle: "step",
        size: "large",
        angle: 0,
        frequency: undefined,
      },
      ...[...Array(8).keys()].map<Partial<FingerMovementIndicator>>((index) => ({
        selectedRoot,
        movementStyle: "step",
        size: "large",
        angle: index % 4,
        frequency: index < 4 ? "double" : "triple",
      })),
    ];
  }

  if (rotatableStepMovements[selectedRoot]) {
    return [...Array(8).keys()].map((index) => ({
      selectedRoot,
      movementStyle: "step",
      size: "large",
      angle: index,
      frequency: undefined,
    }));
  }

  if (seriesMovements[selectedRoot]) {
    return [...Array(6).keys()].map((index) => ({
      selectedRoot,
      movementStyle: "series",
      pattern: "sequential",
      direction: "counterclockwise",
      count: index,
    }));
  }

  return [];
};

export const getFingerMovementRow2Options = (selectedRoot: string): Partial<FingerMovementIndicator>[] => {
  if (symmetricStepMovements[selectedRoot]) {
    return [
      {
        selectedRoot,
        movementStyle: "step",
        size: "small",
        angle: 0,
        frequency: undefined,
      },
      ...[...Array(8).keys()].map<Partial<FingerMovementIndicator>>((index) => ({
        selectedRoot,
        movementStyle: "step",
        size: "small",
        angle: index % 4,
        frequency: index < 4 ? "double" : "triple",
      })),
    ];
  }

  if (rotatableStepMovements[selectedRoot]) {
    return [...Array(8).keys()].map((index) => ({
      selectedRoot,
      movementStyle: "step",
      size: "small",
      angle: index,
      frequency: undefined,
    }));
  }

  if (seriesMovements[selectedRoot]) {
    return [...Array(6).keys()].map((index) => ({
      selectedRoot,
      movementStyle: "series",
      pattern: "sequential",
      direction: "clockwise",
      count: index,
    }));
  }

  return [];
};

export const getFingerMovementRow3Options = (selectedRoot: string): Partial<FingerMovementIndicator>[] => {
  if (symmetricStepMovements[selectedRoot]) {
    return [];
  }

  if (rotatableStepMovements[selectedRoot]) {
    return [
      {
        frequency: "double",
      },
      {
        frequency: "triple",
      },
      {
        frequency: "quadruple",
      },
    ];
  }

  if (seriesMovements[selectedRoot]) {
    return [...Array(8).keys()].map((index) => ({
      angle: index,
    }));
  }

  return [];
};
