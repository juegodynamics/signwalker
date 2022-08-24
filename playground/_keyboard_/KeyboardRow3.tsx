import { getSelectVariantAction, getUpdateContactAction, getUpdateFingerMovementAction } from "./actions";
import { EmptyKeyboardRow, KeyboardRow } from "./KeyboardRow";
import {
  getContactRow3Options,
  getFingerMovementRow3Options,
  getSelectedVariantOption,
  getVariantOptions,
  isEqualContactIndicator,
  isEqualFingerMovementOption,
  resolveContactIndicator,
  resolveFingerMovementIndicator,
} from "./selectors";
import { ContactIndicator, Dispatch, FingerMovementIndicator, Glyph, Handshape } from "./types";

export const FingerVariantSelectionKeyboardRow = ({
  sign,
  setSign,
}: {
  sign: Handshape;
  setSign: Dispatch<Handshape>;
}) => {
  const options = getVariantOptions(sign);
  const selectedVariantOption = getSelectedVariantOption(sign);

  return (
    <KeyboardRow
      row={3}
      exclusive
      value={selectedVariantOption?.key}
      options={options.map((option, index) => ({
        value: option.key,
        display: option.key,
      }))}
      onChange={(nextSelectedVariantsKey: string | undefined) => {
        const nextOption = options.find((option) => option.key === nextSelectedVariantsKey);
        if (nextOption) {
          setSign((priorSign) => getSelectVariantAction(priorSign, nextOption.signature));
        }
      }}
    />
  );
};

const ContactRow3 = ({
  contact,
  setContact,
}: {
  contact: ContactIndicator;
  setContact: Dispatch<ContactIndicator>;
}) => {
  const contactOptions = contact.selectedRoot ? getContactRow3Options(contact.selectedRoot) : [];
  const contactKeyboardOptions = contactOptions.map((option, index) => ({
    value: `${index}`,
    display: resolveContactIndicator({ ...contact, ...option }),
  }));
  const currentContactOptionIndex = contactOptions.findIndex((option) => isEqualContactIndicator(option, contact));

  return (
    <KeyboardRow<string>
      exclusive
      row={3}
      options={contactKeyboardOptions}
      value={`${currentContactOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setContact((priorContact) =>
          getUpdateContactAction(priorContact, nextValue ? contactOptions[parseInt(nextValue)] : undefined)
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
  const fingerMovementRow3Options = movement.selectedRoot ? getFingerMovementRow3Options(movement.selectedRoot) : [];
  const fingerMovementRow3KeyboardOptions = fingerMovementRow3Options.map((option, index) => ({
    value: `${index}`,
    display: resolveFingerMovementIndicator({ ...movement, ...option } as FingerMovementIndicator),
  }));
  const currentFingerMovementOptionIndex = fingerMovementRow3Options.findIndex((option) =>
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
      row={3}
      options={fingerMovementRow3KeyboardOptions}
      value={`${currentFingerMovementOptionIndex}`}
      onChange={(nextValue: string | undefined) => {
        setMovement((priorMovement) =>
          getUpdateFingerMovementAction(
            priorMovement,
            nextValue ? { ...movement, ...fingerMovementRow3Options[parseInt(nextValue)] } : undefined
          )
        );
      }}
    />
  );
};

export const KeyboardRow3 = ({ glyph, setGlyph }: { glyph: Glyph; setGlyph: Dispatch<Glyph> }) => {
  switch (glyph.glyphType) {
    case "handshape":
      return (
        <FingerVariantSelectionKeyboardRow
          sign={glyph}
          setSign={(newSign) => (typeof newSign === "function" ? setGlyph(() => newSign(glyph)) : setGlyph(newSign))}
        />
      );
    case "contact":
      return (
        <ContactRow3
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
      return <EmptyKeyboardRow row={3} />;
  }
};
