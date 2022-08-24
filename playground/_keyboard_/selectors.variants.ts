import { fingerCombos, getSelectedCombination, getSelectedFingerOptions } from "./selectors.fingers";
import { equalNestedArr, FingerMap, Handshape, VariantOption, VariantSignature } from "./types";

const fingerVariants = {
  cupped: "񅊡񅢡",
  circled: "񅊡񅡁",
  hooked: "񅊡񅙡",
  hinged: "񀀡񀑁",
  bent: "񀀡񀉡",
  raised_knuckle: "񀀡񀎁",
  open: "񂇡񁲡",
  under: "񁁁񁂡",
  forward: "񅊡񅖡",
  conjoined: "񀕡񀠁",
  crossed: "񀕡񀧡",
};

export const isEqualSignature = (a: VariantSignature, b: VariantSignature): boolean => equalNestedArr(a, b);
export const getSignatureWeight = (signature: VariantSignature): number => {
  return signature.map((variantKeys, index) => (index + 1) * variantKeys.length).reduce((part, next) => part + next, 0);
};

export const fingerMapToVariantSignature = (fingerMap: Partial<FingerMap<string[]>>): VariantSignature => [
  fingerMap.thumb || [],
  fingerMap.index || [],
  fingerMap.middle || [],
  fingerMap.ring || [],
  fingerMap.little || [],
];

export const variantSignatureToFingerMap = ([thumb, index, middle, ring, little]: VariantSignature): Partial<
  FingerMap<string[]>
> => ({
  thumb,
  index,
  middle,
  ring,
  little,
});

export const extractVariantsInSignature = (signature: VariantSignature): string[] =>
  signature.reduce((prior, nextKeys) => [...prior, ...nextKeys.filter((key) => !prior.includes(key))], []);

export const extractVariantsInFingerMap = (fingerMap: Partial<FingerMap<string[]>>): string[] =>
  extractVariantsInSignature(fingerMapToVariantSignature(fingerMap));

export const getSelectedVariantSignature = (sign: Handshape): VariantSignature =>
  fingerMapToVariantSignature(sign.selectedFingerVariants);

export const getSelectedVariantOption = (sign: Handshape): VariantOption | undefined => {
  const selectedVariantSignature = getSelectedVariantSignature(sign);
  return getVariantOptions(sign).find((option) => isEqualSignature(option.signature, selectedVariantSignature));
};

export const getVariantSelectors = () => Object.entries(fingerVariants).map(([label, key]) => ({ key, label }));

export const getPossibleVariants = (sign: Handshape): string[] => {
  const { combination } = getSelectedCombination(sign);
  if (!combination) {
    return [];
  }

  let possibleVariants: VariantOption[] = Object.entries(combination?.variants || {})
    .map(([key, signature]) => ({
      key,
      signature,
    }))
    .sort((a, b) => getSignatureWeight(a.signature) - getSignatureWeight(b.signature));

  if (sign.currentRevealedVariants.length) {
    possibleVariants = possibleVariants.filter((variant) => {
      return sign.currentRevealedVariants.every((currentVariant) =>
        variant.signature
          .flatMap<string>((signature) => signature)
          .flatMap((signature) => signature.split(":")[0])
          .includes(currentVariant)
      );
    });
  }

  return possibleVariants
    .flatMap((variant) => variant.signature)
    .flatMap((signatures) => signatures)
    .flatMap((signatures) => signatures.split(":")[0]);
};

export const getVariantOptions = (sign: Handshape): Array<VariantOption> => {
  if (!sign.selectedRoot) {
    return [];
  }

  const selectedOptions = getSelectedFingerOptions(sign);

  const comboKey = selectedOptions.map((option) => option.key).join("");

  const possibleVariants = Object.entries(fingerCombos[sign.selectedRoot]?.combinations[comboKey]?.variants || {}).map(
    ([key, signature]) => ({
      key,
      signature,
    })
  );

  return possibleVariants.filter((variant) => {
    const uniqueKeys = Object.keys(
      variant.signature
        .flatMap((v) => v)
        .reduce(
          (part, nextModifier) => ({
            ...part,
            [nextModifier.split(":")[0]]: true,
          }),
          {}
        )
    );
    return (
      !sign.currentRevealedVariants.length ||
      (sign.currentRevealedVariants.every((currentVariant) => uniqueKeys.includes(currentVariant)) &&
        Math.abs(sign.currentRevealedVariants.length - uniqueKeys.length) <= 1)
    );
  });
};
