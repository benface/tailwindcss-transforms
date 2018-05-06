const _ = require('lodash');

module.exports = ({
  variants = {},
  translateX = {},
  negativeTranslateX = {},
  translateY = {},
  negativeTranslateY = {},
  scale = {},
  rotate = {},
  negativeRotate = {},
} = {}) =>
  ({ e, addUtilities }) => {
    addUtilities(
      {
        '.transform-none': { transform: 'none' },
        ...Object.assign(
          {},
          ..._.map(translateX, (value, name) => ({
            [`.translate-x-${e(name)}`]: { transform: `translate(${value}, 0)` },
          })),
          ..._.map(negativeTranslateX, (value, name) => ({
            [`.-translate-x-${e(name)}`]: { transform: `translate(-${value}, 0)` },
          })),
          ..._.map(translateY, (value, name) => ({
            [`.translate-y-${e(name)}`]: { transform: `translate(0, ${value})` },
          })),
          ..._.map(negativeTranslateY, (value, name) => ({
            [`.-translate-y-${e(name)}`]: { transform: `translate(0, -${value})` },
          })),
          ..._.map(scale, (value, name) => ({
            [`.scale-${e(name)}`]: { transform: `scale(${value})` },
          })),
          ..._.map(rotate, (value, name) => ({
            [`.rotate-${e(name)}`]: { transform: `rotate(${value})` },
          })),
          ..._.map(negativeRotate, (value, name) => ({
            [`.-rotate-${e(name)}`]: { transform: `rotate(-${value})` },
          })),
        ),
      },
      variants,
    );
  };
