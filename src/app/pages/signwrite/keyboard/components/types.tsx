export interface GlyphButtonProps<SelectionT> {
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
  onClick: (priorSelection: SelectionT) => SelectionT;
  isEmpty?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  hideCaption?: boolean;
  preview?: boolean;
}

export type GlyphButtonOverrides = {
  [key: string]: Omit<GlyphButtonProps<any>, 'onClick'> & {
    onClick: (ev?: {shiftKey?: boolean; metaKey?: boolean}) => void;
  };
};
