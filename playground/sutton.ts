const baseCode = 0x40001;

const sample = '񀋁';

const currentCode = sample.codePointAt(0) || 0;

const diff = (currentCode - baseCode) % 0x60;

console.log(diff.toString(16));
