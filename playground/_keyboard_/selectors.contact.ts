import { ContactIndicator } from "./types";

const startId = 0x461e1;

const contactIndicators: Record<string, number> = {
  ...["񆇡", "񆌁", "񆐡", "񆕁", "񆙡"].reduce(
    (prior, next, index) => ({
      ...prior,
      [next]: startId + 288 * index,
    }),
    {}
  ),
  "񆞁": 0x46781,
};

export const getRootContactIndicatorOptions = () => Object.keys(contactIndicators);

export const resolveContactIndicator = (contact: ContactIndicator): string => {
  if (!contact.selectedRoot) {
    return "";
  }

  if (!contact.between && !contact.frequency && !contact.angle) {
    return contact.selectedRoot || "";
  }

  const isBetweenable = !["񆞁"].includes(contact.selectedRoot);
  const isRootAtDouble = !["񆞁"].includes(contact.selectedRoot);
  const isDoubled = isRootAtDouble ? contact.frequency === "triple" : contact.frequency === "double";

  return String.fromCodePoint(
    contactIndicators[contact.selectedRoot] +
      (isBetweenable ? (contact.between ? 96 * 2 : 96) : contact.between ? 96 : 0) +
      (isDoubled ? 16 : 0) +
      contact.angle
  );
};

const requiredKeysForMatch: Array<keyof ContactIndicator> = ["selectedRoot", "between", "frequency", "angle"];
export const isEqualContactIndicator = (a: Partial<ContactIndicator>, b: Partial<ContactIndicator>): boolean =>
  requiredKeysForMatch.every((key) => a[key] === b[key]);

export const getContactRow1Options = (selectedRoot: string): Partial<ContactIndicator>[] => {
  switch (selectedRoot) {
    case "񆞁":
      return [...Array(8).keys()].map(
        (index) =>
          ({
            selectedRoot,
            between: undefined,
            frequency: undefined,
            angle: index,
          } as ContactIndicator)
      );
    default:
      return [...Array(8).keys()].map(
        (index) =>
          ({
            selectedRoot,
            between: index < 4 ? false : true,
            frequency: "double",
            angle: index % 4,
          } as ContactIndicator)
      );
  }
};

export const getContactRow2Options = (selectedRoot: string): Partial<ContactIndicator>[] => {
  switch (selectedRoot) {
    case "񆞁":
      return [...Array(8).keys()].map(
        (index) =>
          ({
            selectedRoot,
            between: undefined,
            frequency: "double",
            angle: index,
          } as ContactIndicator)
      );
    default:
      return [...Array(8).keys()].map(
        (index) =>
          ({
            selectedRoot,
            between: index < 4 ? false : true,
            frequency: "triple",
            angle: index % 4,
          } as ContactIndicator)
      );
  }
};

export const getContactRow3Options = (selectedRoot: string): Partial<ContactIndicator>[] => {
  switch (selectedRoot) {
    case "񆞁":
      return [...Array(8).keys()].map(
        (index) =>
          ({
            selectedRoot,
            between: true,
            frequency: index < 4 ? undefined : "double",
            angle: index % 4,
          } as ContactIndicator)
      );
    default:
      return [];
  }
};
