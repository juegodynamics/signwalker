export const getNestedGroupedElementAt = <ElementT,>(
  arr: ElementT[][][],
  rowIndex: number,
  entryIndex: number
): ElementT | undefined => {
  if (rowIndex < arr.length) {
    const flatGroup = arr[rowIndex].flatMap((group) => group);
    if (entryIndex < flatGroup.length) {
      return flatGroup[entryIndex];
    }
  }
};
