import {Enum, EnumType} from './objects/enum';

const TrafficLight = new Enum('red', 'yellow', 'green');
type TrafficLight = EnumType<typeof TrafficLight>;

describe('Enum', () => {
  it('constructor', () => {
    expect(TrafficLight.keys).toEqual(['red', 'yellow', 'green']);
  });

  it('subset', () => {
    expect(TrafficLight.subset('green', 'yellow')).toEqual(['yellow', 'green']);
  });
});
