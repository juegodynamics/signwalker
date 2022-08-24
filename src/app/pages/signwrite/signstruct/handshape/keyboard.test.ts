// import {ExclusiveKeyboardGroup} from '../../keyboard/configurators/implementations';
// import {Selection, VariantSelectorKeyboard} from './keyboard';

// const keyboard = new VariantSelectorKeyboard();
// const currentSelection: Selection = {root: ['񆅁']};

// describe('Updating keys', () => {
//   ['񂱡', '񂰁', '񂙡', '񂡁', '񂤁', '񂳁', '񂼁', '񃈁', '񂇡'].forEach((nextSelected) => {
//     it.skip(`Updating the root hand shape to ${nextSelected}`, () => {
//       expect(
//         keyboard.getNextSelectedKeys(currentSelection, nextSelected)
//       ).toStrictEqual([nextSelected]);
//     });
//   });
// });

// describe('Internal abstract methods', () => {
//   it('getSelectedGroup', () => {
//     const nextSelected = '񂱡';
//     expect(
//       keyboard.getSelectedGroup(currentSelection, nextSelected)
//     ).toBeInstanceOf(ExclusiveKeyboardGroup);
//   });
// });
