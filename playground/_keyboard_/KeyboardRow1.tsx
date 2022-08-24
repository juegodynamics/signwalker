import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  getChangeGlyphType,
  getUpdateContactAction,
  getUpdateFingerMovementAction,
  getUpdateHandMovementAction,
  getUpdateRotationAction,
  predictSelectedFingerAction,
} from "./actions";
import { KeyboardButtonProps } from "./KeyboardButton";
import { EmptyKeyboardRow, KeyboardRow, KeyboardRowProps } from "./KeyboardRow";
import { resolveHandshape } from "./resolve";
import {
  getContactRow1Options,
  getFingerOptions,
  getRotation,
  getRotationOptions,
  getSelectedCombination,
  isEqualContactIndicator,
  resolveContactIndicator,
} from "./selectors";
import {
  getFingerMovementRow1Options,
  isEqualFingerMovementOption,
  resolveFingerMovementIndicator,
} from "./selectors.fingerMovement";
import { getHandMovementRow1Options, transitionKeys } from "./selectors.handMovement";
import {
  ContactIndicator,
  Dispatch,
  Finger,
  FingerMovementIndicator,
  Glyph,
  HandMovementIndicator,
  Handshape,
} from "./types";

export const BaseKeyboardRow1 = <T extends string = string>({
  glyphType,
  setGlyphType,
  ...props
}: KeyboardRowProps<T> & { glyphType: Glyph["glyphType"]; setGlyphType: (glyphType: Glyph["glyphType"]) => void }) => (
  <KeyboardRow
    {...props}
    onSelectOverride={(nextValue: string) => {
      if (nextValue === "]") {
        setGlyphType("handMovement");
      }
      if (nextValue === "\\") {
        setGlyphType("fingerMovement");
      }
    }}
    selectedOverride={glyphType}
    nativeKeyOverrides={{
      "]": {
        value: "handMovement",
        children: (
          <Typography
            sx={{
              color: "primary.dark",
            }}
          >
            {"񉲓"}
          </Typography>
        ),
      },
      "\\": {
        value: "fingerMovement",
        children: (
          <Typography
            sx={{
              // fontSize: size === "small" ? "1.5em" : "2em",
              color: "primary.dark",
              // height: "1em",
            }}
          >
            {"񆧳"}
          </Typography>
        ),
      },
    }}
  />
);

const FingerKeyboardRow = ({ sign, setSign }: { sign: Handshape; setSign: Dispatch<Glyph> }) => {
  const fingerOptions = getFingerOptions(sign);
  const selectedOptions = fingerOptions.filter((option) => option.selected);
  const handShape = resolveHandshape(sign);
  const rotationOptions = sign.selectedRoot ? getRotationOptions(sign) : [];
  const rotationKeys = rotationOptions.map((option) => option.key);

  return (
    <BaseKeyboardRow1<Finger>
      glyphType={sign.glyphType}
      setGlyphType={(nextValue: string) => {
        if (nextValue === "fingerMovement") {
          return setSign((priorGlyph) => getChangeGlyphType(priorGlyph, "fingerMovement"));
        }
      }}
      row={1}
      options={[
        ...fingerOptions.map((option, index) => {
          const { combination: selectionResult } = getSelectedCombination(
            predictSelectedFingerAction(sign, option.label)
          );
          const isSelected = selectedOptions.includes(option);
          return {
            value: option.label,
            display: option.key,
            disabled: !option.key || (selectedOptions.length > 0 && !isSelected && !selectionResult?.key),
            topRightCaption:
              option.key && selectedOptions.length > 0 && !isSelected && selectionResult
                ? selectionResult.key
                : undefined,
          };
        }),
        ...rotationOptions.map((rotationOption, index) => ({
          value: rotationOption.key,
          display: rotationOption.key,
          topRightCaption: handShape && getRotation(handShape, rotationOption),
        })),
      ]}
      value={selectedOptions.map((option) => option.label)}
      onChange={(nextValues: Finger[]) => {
        const rotationKey = nextValues.find((value) => rotationKeys.includes(value));
        const rotationOption = rotationKey && rotationOptions.find((option) => option.key === rotationKey);
        if (rotationOption) {
          setSign(getUpdateRotationAction(sign, rotationOption));
          return;
        }
        setSign(predictSelectedFingerAction(sign, nextValues));
      }}
    />
  );
};

const ContactDoubleKeyboardRow = ({
  contact,
  setContact,
}: {
  contact: ContactIndicator;
  setContact: Dispatch<Glyph>;
}) => {
  const contactDoubleOptions = contact.selectedRoot ? getContactRow1Options(contact.selectedRoot) : [];
  const contactDoubleKeyboardOptions = contactDoubleOptions.map((option, index) => ({
    value: `${index}`,
    display: resolveContactIndicator({ ...contact, ...option }),
  }));
  const currentContactDoubleOptionIndex = contactDoubleOptions.findIndex((option) =>
    isEqualContactIndicator(option, contact)
  );

  return (
    <BaseKeyboardRow1<string>
      glyphType={contact.glyphType}
      setGlyphType={(nextValue: string) => {
        if (nextValue === "fingerMovement") {
          return setContact((priorGlyph) => getChangeGlyphType(priorGlyph, "fingerMovement"));
        }
      }}
      exclusive
      row={1}
      options={contactDoubleKeyboardOptions}
      value={`${currentContactDoubleOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setContact(getUpdateContactAction(contact, nextValue ? contactDoubleOptions[parseInt(nextValue)] : undefined));
      }}
    />
  );
};

const FingerMovementKeyboardRow = ({
  movement,
  setMovement,
}: {
  movement: FingerMovementIndicator;
  setMovement: Dispatch<Glyph>;
}) => {
  const fingerMovementRow1Options = movement.selectedRoot ? getFingerMovementRow1Options(movement.selectedRoot) : [];
  const fingerMovementRow1KeyboardOptions = fingerMovementRow1Options.map((option, index) => ({
    value: `${index}`,
    display: resolveFingerMovementIndicator({ ...movement, ...option } as FingerMovementIndicator),
  }));
  const currentFingerMovementOptionIndex = fingerMovementRow1Options.findIndex((option) =>
    isEqualFingerMovementOption(
      {
        ...movement,
        ...Object.entries(option).reduce(
          (part, [nextKey, nextVal]) => (nextVal !== undefined ? { ...part, [nextKey]: nextVal } : part),
          {}
        ),
      },
      movement
    )
  );

  return (
    <BaseKeyboardRow1<string>
      glyphType={movement.glyphType}
      setGlyphType={(nextValue: string) => {
        if (nextValue === "fingerMovement") {
          return setMovement((priorGlyph) => getChangeGlyphType(priorGlyph, "fingerMovement"));
        }
      }}
      exclusive
      row={1}
      options={fingerMovementRow1KeyboardOptions}
      value={`${currentFingerMovementOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setMovement(
          getUpdateFingerMovementAction(
            movement,
            nextValue ? fingerMovementRow1Options[parseInt(nextValue)] : undefined
          )
        );
      }}
    />
  );
};

const HandMovementKeyboardRow = ({
  movement,
  setMovement,
}: {
  movement: HandMovementIndicator;
  setMovement: Dispatch<Glyph>;
}) => {
  const theme = useTheme();
  const handMovementRow1Options = movement.selectedRoot ? getHandMovementRow1Options(movement) : [];
  const handMovementRow1KeyboardOptions: KeyboardButtonProps[] = handMovementRow1Options.map((option, index) => {
    const nextKey =
      option.disabled || !option.nextMovement ? undefined : String.fromCodePoint(option.nextMovement.code);
    const Key = transitionKeys[option.transition];
    return {
      value: `${index}`,
      children: (
        <>
          <Key disabled={option.disabled} />
          {nextKey && (
            <Typography
              sx={{
                fontSize: "3em",
                color: "warning.light",
                backgroundColor: theme.palette.background.paper,
                opacity: 0.7,
                position: "absolute",
                height: "100%",
                width: "100%",
                bottom: "0px",
              }}
            >
              {nextKey}
            </Typography>
          )}
        </>
      ),
      // topRightCaption: option.disabled
      //   ? undefined
      //   : option.nextMovement?.code
      //   ? String.fromCodePoint(option.nextMovement?.code)
      //   : "",
    };
  });
  // const currentFingerMovementOptionIndex = handMovementRow1Options.findIndex((option) =>{
  //   option.
  // }
  //   isEqualFingerMovementOption(
  //     {
  //       ...movement,
  //       ...Object.entries(option).reduce(
  //         (part, [nextKey, nextVal]) => (nextVal !== undefined ? { ...part, [nextKey]: nextVal } : part),
  //         {}
  //       ),
  //     },
  //     movement
  //   )
  // );

  return (
    <BaseKeyboardRow1<string>
      glyphType={movement.glyphType}
      setGlyphType={(nextValue: string) => {
        if (nextValue === "fingerMovement") {
          return setMovement((priorGlyph) => getChangeGlyphType(priorGlyph, "fingerMovement"));
        }
        if (nextValue === "handMovement") {
          return setMovement((priorGlyph) => getChangeGlyphType(priorGlyph, "handMovement"));
        }
      }}
      exclusive
      row={1}
      options={handMovementRow1KeyboardOptions}
      value={undefined}
      // value={handMovementRow1Options.filter((option)=>option.isFlipped).map(option=>option.transition)}
      onChange={(nextValue: string | undefined) => {
        setMovement(
          getUpdateHandMovementAction(
            movement,
            nextValue ? handMovementRow1Options[parseInt(nextValue)].nextMovement : undefined
          )
        );
      }}
    />
  );
};

export const KeyboardRow1 = ({ glyph, setGlyph }: { glyph: Glyph; setGlyph: Dispatch<Glyph> }) => {
  switch (glyph.glyphType) {
    case "handshape":
      return (
        <FingerKeyboardRow
          sign={glyph}
          setSign={(newGlyph) =>
            typeof newGlyph === "function" ? setGlyph(() => newGlyph(glyph)) : setGlyph(newGlyph)
          }
        />
      );
    case "contact":
      return (
        <ContactDoubleKeyboardRow
          contact={glyph}
          setContact={(newGlyph) =>
            typeof newGlyph === "function" ? setGlyph(() => newGlyph(glyph)) : setGlyph(newGlyph)
          }
        />
      );
    case "fingerMovement":
      return (
        <FingerMovementKeyboardRow
          movement={glyph}
          setMovement={(newGlyph) =>
            typeof newGlyph === "function" ? setGlyph(() => newGlyph(glyph)) : setGlyph(newGlyph)
          }
        />
      );
    case "handMovement":
      return (
        <HandMovementKeyboardRow
          movement={glyph}
          setMovement={(newGlyph) =>
            typeof newGlyph === "function" ? setGlyph(() => newGlyph(glyph)) : setGlyph(newGlyph)
          }
        />
      );
    default:
      return <EmptyKeyboardRow row={1} />;
  }
};
