import { extractVariantsInFingerMap, getRotation, getSelectedCombination, getSelectedVariantOption } from "./selectors";
import { Handshape } from "./types";

export const resolveHandshape = (sign: Handshape): string => {
  if (!sign.selectedRoot) {
    return "";
  }
  const { comboKey, combination: selectedCombo } = getSelectedCombination(sign);
  if (!selectedCombo || !selectedCombo.key) {
    return comboKey;
  }
  if (!selectedCombo.variants || extractVariantsInFingerMap(sign.selectedFingerVariants).length === 0) {
    return selectedCombo.key;
  }

  return getSelectedVariantOption(sign)?.key || selectedCombo.key;
};

export const resolveKey = (sign: Handshape): string => {
  const handShape = resolveHandshape(sign);
  if (!handShape) {
    return "";
  }
  return getRotation(handShape, sign);
};
