const plugin = require('./index.js');

let generatedUtilities = {};

plugin({
  translate: {
    '1/2': '50%',
    'full': '100%',
  },
  negativeTranslate: {
    '1/2': '50%',
    'full': '100%',
  },
  scale: {
    '90': '0.9',
    '100': '1',
    '110': '1.1',
  },
  rotate: {
    '90': '90deg',
    '180': '180deg',
    '270': '270deg',
  },
  negativeRotate: {
    '90': '90deg',
    '180': '180deg',
    '270': '270deg',
  },
  skew: {
    '5': '5deg',
  },
  origins: {
    't': '50% 0%',
    'r': '100% 50%',
    'b': '50% 100%',
    'l': '0% 50%',
  },
})({
  e: value => value,
  addUtilities: (utilities, variants) => {
    generatedUtilities = utilities;
  },
});

console.log("generatedUtilities", generatedUtilities);
