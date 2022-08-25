export const rows: readonly {
  leader: string;
  leaderDisableFlex?: boolean;
  captions: readonly string[];
  tail?: string;
}[] = [
  {
    leader: '`',
    leaderDisableFlex: true,
    captions: [...'1234567890-='] as const,
    tail: 'Backspace',
  },
  {leader: 'Tab', captions: [...'qwertyuiop[]\\'] as const},
  {leader: 'CapsLock', captions: [..."asdfghjkl;'"] as const, tail: 'Enter'},
  {leader: 'Shift', captions: [...'zxcvbnm,./'] as const, tail: 'Shift'},
] as const;

export const captionToIndices: Record<string, [number, number]> = rows.reduce(
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

export const unitHeight = 'min(20vw, 70px)';
export const unitSize = 'min(6vw, 70px)';
export const borderRadiusSize = 'min(1vw, 15px)';
export const spacingSize = `calc(${unitSize} / 8.5)`;
export const totalWidth = `calc(calc(${unitSize} * 14.5) + calc(${spacingSize} * 14))`;
// export const previewFontSize = '1.2em';
export const previewFontSize = `calc(${unitSize} * 0.25)`;
// export const captionFontSize = '0.8em';
export const captionFontSize = `calc(${unitSize} * 0.16)`;
