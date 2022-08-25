import {Enum, EnumType} from 'extensions';

export const Indicator = new Enum('񆇡', '񆌁', '񆐡', '񆕁', '񆙡', '񆞁');
export type Indicator = EnumType<typeof Indicator>;

export const Frequency = new Enum('single', 'double', 'triple');
export type Frequency = EnumType<typeof Frequency>;
