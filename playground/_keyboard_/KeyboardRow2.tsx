import Typography from "@mui/material/Typography";
import { getRevealVariantAction, getUpdateContactAction, getUpdateFingerMovementAction } from "./actions";
import { EmptyKeyboardRow, KeyboardRow } from "./KeyboardRow";
import {
  extractVariantsInFingerMap,
  getContactRow2Options,
  getFingerMovementRow2Options,
  getPossibleVariants,
  getVariantSelectors,
  isEqualFingerMovementOption,
  resolveContactIndicator,
  resolveFingerMovementIndicator,
} from "./selectors";
import { ContactIndicator, Dispatch, FingerMovementIndicator, Glyph, Handshape } from "./types";

const FingerVariantKeyboardRow = ({ sign, setSign }: { sign: Handshape; setSign: Dispatch<Handshape> }) => {
  const possibleVariants = getPossibleVariants(sign);
  const selectedVariants = extractVariantsInFingerMap(sign.selectedFingerVariants).map((v) => v.split(":")[0]);

  const options = getVariantSelectors().map((option) => {
    const [pre, post] = [...option.key];
    const isPossibleVariant = possibleVariants.includes(option.label);
    const isHighlightedVariant = selectedVariants.length && selectedVariants.includes(option.label);
    return {
      disabled: !isPossibleVariant,
      value: isPossibleVariant ? option.label : "",
      children: (
        <>
          <Typography
            sx={{
              fontSize: "1.5em",
              position: "absolute",
              bottom: "2px",
              left: "6px",
              color: isHighlightedVariant ? "warning.light" : isPossibleVariant ? "primary.dark" : "divider",
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
              color: isHighlightedVariant ? "warning.light" : "primary.light",
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
              bottom: "-5px",
              right: "9px",
              color: "secondary.light",
              opacity: isPossibleVariant ? 1 : 0.2,
              transition: "opacity 300ms",
            }}
          >
            {"񈮉"}
          </Typography>
        </>
      ),
    };
  });

  return (
    <KeyboardRow
      row={2}
      value={sign.currentRevealedVariants}
      onChange={(nextRevealedVariants: string[]) => {
        setSign((priorSign) => getRevealVariantAction(priorSign, nextRevealedVariants));
      }}
      options={options}
    />
  );
};

const ContactTripleKeyboardRow = ({
  contact,
  setContact,
}: {
  contact: ContactIndicator;
  setContact: Dispatch<ContactIndicator>;
}) => {
  const contactDoubleOptions = contact.selectedRoot ? getContactRow2Options(contact.selectedRoot) : [];
  const currentContactDoubleOptionIndex = contactDoubleOptions.findIndex((option) =>
    ["selectedRoot", "between", "frequency", "angle"].every(
      (key) => option[key as keyof typeof option] === contact[key as keyof ContactIndicator]
    )
  );

  return (
    <KeyboardRow
      exclusive
      row={2}
      options={contactDoubleOptions.map((option, index) => ({
        value: `${index}`,
        display: resolveContactIndicator({ ...contact, ...option }),
      }))}
      value={`${currentContactDoubleOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setContact((priorContact) =>
          getUpdateContactAction(priorContact, nextValue ? contactDoubleOptions[parseInt(nextValue)] : undefined)
        );
      }}
    />
  );
};

const FingerMovementKeyboardRow = ({
  movement,
  setMovement,
}: {
  movement: FingerMovementIndicator;
  setMovement: Dispatch<FingerMovementIndicator>;
}) => {
  const fingerMovementRow2Options = movement.selectedRoot ? getFingerMovementRow2Options(movement.selectedRoot) : [];
  const fingerMovementRow2KeyboardOptions = fingerMovementRow2Options.map((option, index) => ({
    value: `${index}`,
    display: resolveFingerMovementIndicator({ ...movement, ...option } as FingerMovementIndicator),
  }));
  const currentFingerMovementOptionIndex = fingerMovementRow2Options.findIndex((option) =>
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
    <KeyboardRow<string>
      exclusive
      row={2}
      options={fingerMovementRow2KeyboardOptions}
      value={`${currentFingerMovementOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setMovement((priorMovement) =>
          getUpdateFingerMovementAction(
            priorMovement,
            nextValue ? fingerMovementRow2Options[parseInt(nextValue)] : undefined
          )
        );
      }}
    />
  );
};

export const KeyboardRow2 = ({ glyph, setGlyph }: { glyph: Glyph; setGlyph: Dispatch<Glyph> }) => {
  switch (glyph.glyphType) {
    case "handshape":
      return (
        <FingerVariantKeyboardRow
          sign={glyph}
          setSign={(newSign) => (typeof newSign === "function" ? setGlyph(() => newSign(glyph)) : setGlyph(newSign))}
        />
      );
    case "contact":
      return (
        <ContactTripleKeyboardRow
          contact={glyph}
          setContact={(newSign) => (typeof newSign === "function" ? setGlyph(() => newSign(glyph)) : setGlyph(newSign))}
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
    default:
      return <EmptyKeyboardRow row={2} />;
  }
};
