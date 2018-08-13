const _ = require('lodash');

module.exports = ({
  variants = {},
  translate = {},
  negativeTranslate = {},
  scale = {},
  rotate = {},
  negativeRotate = {},
  skew = {},
  origins = {},
} = {}) =>
  ({ e, addUtilities }) => {
    addUtilities(
      {
        '.transform-none': { transform: 'none' },
        ...Object.assign(
          {},
          ..._.map(translate, (value, name) => ({
            [`.translate-x-${e(name)}`]: { transform: `translateX(${value})` },
            [`.translate-y-${e(name)}`]: { transform: `translateY(${value})` },
          })),
          ..._.map(negativeTranslate, (value, name) => ({
            [`.-translate-x-${e(name)}`]: { transform: `translateX(-${value})` },
            [`.-translate-y-${e(name)}`]: { transform: `translateY(-${value})` },
          })),
          ..._.map(scale, (value, name) => ({
            [`.scale-${e(name)}`]: { transform: `scale(${value})` },
            [`.scale-x-${e(name)}`]: { transform: `scaleX(${value})` },
            [`.scale-y-${e(name)}`]: { transform: `scaleY(${value})` },
          })),
          ..._.map(rotate, (value, name) => ({
            [`.rotate-${e(name)}`]: { transform: `rotate(${value})` },
          })),
          ..._.map(negativeRotate, (value, name) => ({
            [`.-rotate-${e(name)}`]: { transform: `rotate(-${value})` },
          })),
          ..._.map(skew, (value, name) => ({
            [`.skew-x-${e(name)}`]: { transform: `skewX(${value})` },
            [`.skew-y-${e(name)}`]: { transform: `skewY(${value})` },
          })),
          ..._.map(origins, (value, name) => ({
            [`.transform-origin-${e(name)}`]: { transformOrigin: value },
          })),
        ),
      },
      variants,
    );
  };
