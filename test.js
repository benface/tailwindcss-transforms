const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig')();
const transformsPlugin = require('./index.js');

const disabledModules = {};
Object.keys(defaultConfig.modules).forEach(module => {
  disabledModules[module] = false;
});

const generatePluginCss = (options = {}) => {
  return postcss(tailwindcss({
    modules: disabledModules,
    plugins: [transformsPlugin(options)],
  })).process('@tailwind utilities;', {
    from: undefined,
  }).then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('options are not required', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
    `);
  });
});

test('all the options are working as they should', () => {
  return generatePluginCss({
    translate: {
      '1/2': '50%',
      'full': '100%',
    },
    negativeTranslate: {
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
    },
    skew: {
      '5': '5deg',
    },
    negativeSkew: {
      '10': '10deg',
    },
    origins: {
      't': '50% 0%',
      'r': '100% 50%',
      'b': '50% 100%',
      'l': '0% 50%',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .translate-x-1\\/2 {
        transform: translateX(50%);
      }
      .translate-y-1\\/2 {
        transform: translateY(50%);
      }
      .translate-x-full {
        transform: translateX(100%);
      }
      .translate-y-full {
        transform: translateY(100%);
      }
      .-translate-x-full {
        transform: translateX(-100%);
      }
      .-translate-y-full {
        transform: translateY(-100%);
      }
      .scale-90 {
        transform: scale(.9);
      }
      .scale-x-90 {
        transform: scaleX(.9);
      }
      .scale-y-90 {
        transform: scaleY(.9);
      }
      .scale-100 {
        transform: scale(1);
      }
      .scale-x-100 {
        transform: scaleX(1);
      }
      .scale-y-100 {
        transform: scaleY(1);
      }
      .scale-110 {
        transform: scale(1.1);
      }
      .scale-x-110 {
        transform: scaleX(1.1);
      }
      .scale-y-110 {
        transform: scaleY(1.1);
      }
      .rotate-90 {
        transform: rotate(90deg);
      }
      .rotate-180 {
        transform: rotate(180deg);
      }
      .rotate-270 {
        transform: rotate(270deg);
      }
      .-rotate-90 {
        transform: rotate(-90deg);
      }
      .skew-x-5 {
        transform: skewX(5deg);
      }
      .skew-y-5 {
        transform: skewY(5deg);
      }
      .-skew-x-10 {
        transform: skewX(-10deg);
      }
      .-skew-y-10 {
        transform: skewY(-10deg);
      }
      .transform-origin-t {
        transform-origin: 50% 0%;
      }
      .transform-origin-r {
        transform-origin: 100% 50%;
      }
      .transform-origin-b {
        transform-origin: 50% 100%;
      }
      .transform-origin-l {
        transform-origin: 0% 50%;
      }
    `);
  });
});

test('variants are supported', () => {
  return generatePluginCss({
    variants: ['hover', 'active'],
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .hover\\:transform-none:hover {
        transform: none;
      }
      .active\\:transform-none:active {
        transform: none;
      }
    `);
  });
});
