const _ = require('lodash');

module.exports = ({
  variants = {},
  translate = {},
  negativeTranslate = {},
  scale = {},
  rotate = {},
  negativeRotate = {},
  skew = {},
  negativeSkew = {},
  origins = {},
} = {}) => ({ e, addUtilities }) => {
  addUtilities(
    {
      '.transform-none': { transform: 'none' },
      ...Object.assign(
        {},
        ..._.map(translate, (value, name) => ({
          [`.${e(`translate-x-${name}`)}`]: { transform: `translateX(${value})` },
          [`.${e(`translate-y-${name}`)}`]: { transform: `translateY(${value})` },
        })),
        ..._.map(negativeTranslate, (value, name) => ({
          [`.${e(`-translate-x-${name}`)}`]: { transform: `translateX(-${value})` },
          [`.${e(`-translate-y-${name}`)}`]: { transform: `translateY(-${value})` },
        })),
        ..._.map(scale, (value, name) => ({
          [`.${e(`scale-${name}`)}`]: { transform: `scale(${value})` },
          [`.${e(`scale-x-${name}`)}`]: { transform: `scaleX(${value})` },
          [`.${e(`scale-y-${name}`)}`]: { transform: `scaleY(${value})` },
        })),
        ..._.map(rotate, (value, name) => ({
          [`.${e(`rotate-${name}`)}`]: { transform: `rotate(${value})` },
        })),
        ..._.map(negativeRotate, (value, name) => ({
          [`.${e(`-rotate-${name}`)}`]: { transform: `rotate(-${value})` },
        })),
        ..._.map(skew, (value, name) => ({
          [`.${e(`skew-x-${name}`)}`]: { transform: `skewX(${value})` },
          [`.${e(`skew-y-${name}`)}`]: { transform: `skewY(${value})` },
        })),
        ..._.map(negativeSkew, (value, name) => ({
          [`.${e(`-skew-x-${name}`)}`]: { transform: `skewX(-${value})` },
          [`.${e(`-skew-y-${name}`)}`]: { transform: `skewY(-${value})` },
        })),
        ..._.map(origins, (value, name) => ({
          [`.${e(`transform-origin-${name}`)}`]: { transformOrigin: value },
        })),
      ),
    },
    variants,
  );
};
