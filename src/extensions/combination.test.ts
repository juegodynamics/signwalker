import {CombinationSet} from './combination';

describe('CombinationSet', () => {
  const cones = new CombinationSet('red', 'green', 'blue');

  const combos: Array<Parameters<typeof cones['add']>> = [
    [cones.subset(), 'black'],
    [cones.subset('red'), 'red'],
    [cones.subset('green'), 'green'],
    [cones.subset('blue'), 'blue'],
    [cones.subset('red', 'green'), 'yellow'],
    [cones.subset('red', 'blue'), 'magenta'],
    [cones.subset('green', 'blue'), 'cyan'],
    [cones.subset('red', 'green', 'blue'), 'white'],
  ];

  combos.forEach(([subset, value]) => {
    cones.add(subset, value);
  });

  // .add(cones.subset(), 'black')

  it('data structure is correct', () => {
    expect(JSON.parse(JSON.stringify(cones))).toStrictEqual({
      keys: ['red', 'green', 'blue'],
      root: {
        value: 'black',
        combinations: {
          red: {
            value: 'red',
            combinations: {
              green: {
                value: 'yellow',
                combinations: {
                  blue: {
                    value: 'white',
                  },
                },
              },
              blue: {
                value: 'magenta',
              },
            },
          },
          green: {
            value: 'green',
            combinations: {
              blue: {
                value: 'cyan',
              },
            },
          },
          blue: {
            value: 'blue',
          },
        },
      },
    });
  });

  it('getting works correctly', () => {
    combos.forEach(([subset, value]) => {
      expect(cones.get(subset)).toEqual(value);
    });
  });
});
