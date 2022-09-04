import {Glyph} from './types';
const centerCoord = 121094;

export const wordToSwu = (
  glyphs: {character: string; x: number; y: number}[]
): string => {
  if (glyphs.length === 0) return '';
  const glyphCharacters = glyphs.map(({character}) => character);
  const glyphPosition = glyphs.map(({character, x, y}) => {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return '';
    }
    return [
      character,
      String.fromCodePoint(x + centerCoord),
      String.fromCodePoint(y + centerCoord),
    ].join('');
  });

  return `𝠀${glyphCharacters.join('')}𝠃𝤆𝤆${glyphPosition.join('')}`;
};

export const swuToWord = <SelectionT>(
  text: string,
  getSelection: (glyph: Omit<Glyph<SelectionT>, 'selection'>) => SelectionT
): Glyph<SelectionT>[] => {
  const characters = [...text];
  const temporalMarkerIndex = characters.findIndex((char) => char === '𝠀');
  const spatialMarkerIndex = characters.findIndex((char) => char === '𝠃');
  if (temporalMarkerIndex < 0 || spatialMarkerIndex < 0) return [];

  const glyphs: string[] = characters
    .slice(temporalMarkerIndex + 1, spatialMarkerIndex)
    .map((char) => char);
  const glyphPositions: Record<string, {x: number; y: number}> = {};
  const maxOffset = {
    x: characters[spatialMarkerIndex + 1].codePointAt(0),
    y: characters[spatialMarkerIndex + 2].codePointAt(0),
  };

  let calculatedXMin: number | undefined = undefined;
  let calculatedXMax: number | undefined = undefined;
  let calculatedYMin: number | undefined = undefined;
  let calculatedYMax: number | undefined = undefined;

  splitIntoGroups(
    characters.slice(spatialMarkerIndex + 3, characters.length),
    3
  ).forEach(([glyph, xString, yString]) => {
    const x = xString.codePointAt(0);
    const y = yString.codePointAt(0);
    if (x && y) {
      // const xOffset = x - (netOffset.x || 0);
      // const yOffset = y - (netOffset.y || 0);
      const xOffset = x - (maxOffset.x ? maxOffset.x - 25 : centerCoord);
      const yOffset = (maxOffset.y ? maxOffset.y - 25 : centerCoord) - y;

      if (calculatedXMin === undefined || xOffset < calculatedXMin) {
        calculatedXMin = xOffset;
      }
      if (calculatedXMax === undefined || xOffset > calculatedXMax) {
        calculatedXMax = xOffset;
      }
      if (calculatedYMin === undefined || yOffset < calculatedYMin) {
        calculatedYMin = yOffset;
      }
      if (calculatedYMax === undefined || yOffset < calculatedYMax) {
        calculatedYMax = yOffset;
      }

      glyphPositions[glyph] = {x: xOffset, y: yOffset};
    }
  });

  const xCenteringOffset = ((calculatedXMax || 0) + (calculatedXMin || 0)) / 2;
  const yCenteringOffset = ((calculatedYMax || 0) + (calculatedYMin || 0)) / 2;

  // [...Object.entries(glyphPositions)].forEach(([glyph, position]) => {
  //   glyphPositions[glyph] = {
  //     x: position.x - xCenteringOffset,
  //     y: position.y - yCenteringOffset,
  //   };
  // });

  const glyphObjects = glyphs.map((character) => {
    const position = glyphPositions[character];
    const partial = {
      character,
      x: Math.floor(position.x - xCenteringOffset),
      y: Math.floor(position.y - yCenteringOffset),
    };
    return {...partial, selection: getSelection(partial)};
  });
  return glyphObjects;
};

export const splitIntoGroups = <T>(arr: T[], groupSize: number): T[][] => {
  const arrGroups: T[][] = [];

  let currentArr: T[] = [];
  for (let index = 0; index < arr.length; index++) {
    if (index !== 0 && index % groupSize === 0) {
      arrGroups.push(currentArr);
      currentArr = [];
    }
    currentArr.push(arr[index]);
  }
  arrGroups.push(currentArr);
  return arrGroups;
};
