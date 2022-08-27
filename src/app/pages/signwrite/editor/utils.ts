import {Glyph} from './types';
const centerCoord = 121094;

export const wordToSwu = (
  glyphs: {character: string; x: number; y: number}[]
): string => {
  const glyphCharacters = glyphs.map(({character}) => character);
  const glyphPosition = glyphs.map(({character, x, y}) => {
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
  splitIntoGroups(
    characters.slice(spatialMarkerIndex + 3, characters.length),
    3
  ).forEach(([glyph, xString, yString]) => {
    console.log([glyph, xString, yString]);
    const x = xString.codePointAt(0);
    const y = yString.codePointAt(0);
    if (x && y) {
      glyphPositions[glyph] = {x: x - centerCoord, y: centerCoord - y};
    }
  });

  const glyphObjects = glyphs.map((character) => {
    const position = glyphPositions[character];
    const partial = {
      character,
      x: position?.x || 0,
      y: position?.y || 0,
    };
    return {...partial, selection: getSelection(partial)};
  });
  console.log(glyphObjects);
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
