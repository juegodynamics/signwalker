import { getChangeGlyphType, getSelectedRootGlyphAction } from "./actions";
import { GridLayout } from "./GridLayout";
import { KeyboardRow } from "./KeyboardRow";
import {
  getRootContactIndicatorOptions,
  getRootFingerMovementIndicatorOptions,
  getRootHandshapeOptions,
} from "./selectors";
import { getRootHandMovementIndicatorOptions } from "./selectors.handMovement";
import { Dispatch, Glyph, Option } from "./types";

const getRootOptions = (glyph: Glyph): Option[] => {
  switch (glyph.glyphType) {
    case "handshape":
      return getRootHandshapeOptions();
    case "contact":
      return getRootContactIndicatorOptions().map<Option>((option) => ({
        key: option,
        label: option,
      }));
    case "fingerMovement":
      return getRootFingerMovementIndicatorOptions().map<Option>((option) => ({
        key: option,
        label: option,
      }));
    case "handMovement":
      return getRootHandMovementIndicatorOptions().map<Option>((option) => ({
        key: option,
        label: option,
      }));
    default:
      return [];
  }
};

const RootKeyboardRow = ({
  glyph,
  setGlyph,
  rootOptions,
  onDelete,
}: {
  glyph: Glyph;
  setGlyph: Dispatch<Glyph>;
  rootOptions: Option[];
  onDelete: () => void;
}) => {
  const options = rootOptions.map((option) => ({
    value: option.key,
    display: option.key,
  }));
  return (
    <KeyboardRow
      exclusive
      row={0}
      options={options}
      value={glyph.selectedRoot}
      onChange={(nextValue: string | undefined) => {
        setGlyph((priorSign) => getSelectedRootGlyphAction(priorSign, nextValue));
      }}
      onSelectOverride={(nextValue: string) => {
        if (nextValue === "Backspace") {
          onDelete();
          return;
        }
        if (nextValue === "handshape") {
          return setGlyph((priorGlyph) => getChangeGlyphType(priorGlyph, "handshape"));
        }
        if (nextValue === "contact") {
          return setGlyph((priorGlyph) => getChangeGlyphType(priorGlyph, "contact"));
        }
      }}
      selectedOverride={glyph.glyphType}
      nativeKeyOverrides={{
        "-": {
          value: "handshape",
          children: <GridLayout size="small" values={["񀀧", "񀀥", "񀀡", "񀀣"]} />,
        },
        "=": {
          value: "contact",
          children: <GridLayout values={["񆇡", "񆌁", "񆐡", "񆕁"]} />,
        },
        Backspace: {
          value: "Backspace",
          topLeftCaption: "delete",
        },
      }}
    />
  );
};

export const KeyboardRow0 = ({
  glyph,
  setGlyph,
  onDelete,
}: {
  glyph: Glyph;
  setGlyph: Dispatch<Glyph>;
  onDelete: () => void;
}) => <RootKeyboardRow glyph={glyph} setGlyph={setGlyph} onDelete={onDelete} rootOptions={getRootOptions(glyph)} />;
