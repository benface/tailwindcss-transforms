const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const transformsPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            'sm': '640px',
          },
        },
        corePlugins: (function() {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          transformsPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin generates some utilities and responsive variants by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .transform-t {
        transform-origin: top;
      }
      .transform-tr {
        transform-origin: top right;
      }
      .transform-r {
        transform-origin: right;
      }
      .transform-br {
        transform-origin: bottom right;
      }
      .transform-b {
        transform-origin: bottom;
      }
      .transform-bl {
        transform-origin: bottom left;
      }
      .transform-l {
        transform-origin: left;
      }
      .transform-tl {
        transform-origin: top left;
      }
      @media (min-width: 640px) {
        .sm\\:transform-none {
          transform: none;
        }
        .sm\\:transform-t {
          transform-origin: top;
        }
        .sm\\:transform-tr {
          transform-origin: top right;
        }
        .sm\\:transform-r {
          transform-origin: right;
        }
        .sm\\:transform-br {
          transform-origin: bottom right;
        }
        .sm\\:transform-b {
          transform-origin: bottom;
        }
        .sm\\:transform-bl {
          transform-origin: bottom left;
        }
        .sm\\:transform-l {
          transform-origin: left;
        }
        .sm\\:transform-tl {
          transform-origin: top left;
        }
      }
    `);
  });
});

test('utilities can be customized', () => {
  return generatePluginCss({
    theme: {
      transform: {
        'none': 'none',
        'custom': 'translate(-100%, -100%)',
      },
      transformOrigin: {
        't': '50% 0%',
        'r': '100% 50%',
        'b': '50% 100%',
        'l': '0% 50%',
      },
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
      negativeScale: {
        '100': '1',
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
      perspective: {
        'none': 'none',
      },
      perspectiveOrigin: {
        't': 'top',
      },
    },
    variants: {
      transform: [],
      transformOrigin: [],
      translate: [],
      negativeTranslate: [],
      scale: [],
      negativeScale: [],
      rotate: [],
      negativeRotate: [],
      skew: [],
      negativeSkew: [],
      perspective: [],
      perspectiveOrigin: [],
      transformStyle: [],
      backfaceVisibility: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .transform-custom {
        transform: translate(-100%, -100%);
      }
      .transform-t {
        transform-origin: 50% 0%;
      }
      .transform-r {
        transform-origin: 100% 50%;
      }
      .transform-b {
        transform-origin: 50% 100%;
      }
      .transform-l {
        transform-origin: 0% 50%;
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
      .-scale-90 {
        transform: scale(-0.9);
      }
      .-scale-x-90 {
        transform: scaleX(-0.9);
      }
      .-scale-y-90 {
        transform: scaleY(-0.9);
      }
      .-scale-100 {
        transform: scale(-1);
      }
      .-scale-x-100 {
        transform: scaleX(-1);
      }
      .-scale-y-100 {
        transform: scaleY(-1);
      }
      .-scale-110 {
        transform: scale(-1.1);
      }
      .-scale-x-110 {
        transform: scaleX(-1.1);
      }
      .-scale-y-110 {
        transform: scaleY(-1.1);
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
    `);
  });
});

test('3d utilities can be generated', () => {
  return generatePluginCss({
    theme: {
      transform: {
        'none': 'none',
      },
      transformOrigin: {
        't': 'top',
      },
      translate: {
        'full': '100%',
      },
      negativeTranslate: {
        'full': '100%',
      },
      scale: {
        '100': '1',
      },
      negativeScale: {
        '100': '1',
      },
      rotate: {
        '90': '90deg',
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
      perspective: {
        'none': 'none',
      },
      perspectiveOrigin: {
        't': 'top',
      },
    },
    variants: {
      transform: [],
      transformOrigin: [],
      translate: [],
      negativeTranslate: [],
      scale: [],
      negativeScale: [],
      rotate: [],
      negativeRotate: [],
      skew: [],
      negativeSkew: [],
      perspective: [],
      perspectiveOrigin: [],
      transformStyle: [],
      backfaceVisibility: [],
    },
  }, {
    '3d': true,
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .transform-t {
        transform-origin: top;
      }
      .translate-x-full {
        transform: translateX(100%);
      }
      .translate-y-full {
        transform: translateY(100%);
      }
      .translate-z-full {
        transform: translateZ(100%);
      }
      .-translate-x-full {
        transform: translateX(-100%);
      }
      .-translate-y-full {
        transform: translateY(-100%);
      }
      .-translate-z-full {
        transform: translateZ(-100%);
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
      .scale-z-100 {
        transform: scaleZ(1);
      }
      .-scale-100 {
        transform: scale(-1);
      }
      .-scale-x-100 {
        transform: scaleX(-1);
      }
      .-scale-y-100 {
        transform: scaleY(-1);
      }
      .-scale-z-100 {
        transform: scaleZ(-1);
      }
      .rotate-90 {
        transform: rotate(90deg);
      }
      .rotate-x-90 {
        transform: rotateX(90deg);
      }
      .rotate-y-90 {
        transform: rotateY(90deg);
      }
      .-rotate-90 {
        transform: rotate(-90deg);
      }
      .-rotate-x-90 {
        transform: rotateX(-90deg);
      }
      .-rotate-y-90 {
        transform: rotateY(-90deg);
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
      .perspective-none {
        perspective: none;
      }
      .perspective-t {
        perspective-origin: top;
      }
      transform-flat {
        transform-style: flat;
      }
      transform-preserve-3d {
        transform-style: preserve-3d;
      }
      backface-visible {
        backface-visibility: visible;
      }
      backface-hidden {
        backface-visibility: hidden;
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      transform: {
        'none': 'none',
      },
      transformOrigin: {
        't': 'top',
      },
      translate: {
        'full': '100%',
      },
      negativeTranslate: {
        'full': '100%',
      },
      scale: {},
      negativeScale: {},
      rotate: {
        '90': '90deg',
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
      perspective: {
        'none': 'none',
      },
      perspectiveOrigin: {
        't': 'top',
      },
    },
    variants: {
      transform: ['hover', 'active', 'group-hover'],
      transformOrigin: ['hover'],
      translate: ['active'],
      negativeTranslate: ['responsive'],
      scale: [],
      negativeScale: [],
      rotate: ['group-hover'],
      negativeRotate: ['active'],
      skew: [],
      negativeSkew: ['responsive'],
      perspective: ['hover'],
      perspectiveOrigin: ['hover', 'active'],
      transformStyle: ['hover'],
      backfaceVisibility: ['active'],
    },
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
      .group:hover .group-hover\\:transform-none {
        transform: none;
      }
      .transform-t {
        transform-origin: top;
      }
      .hover\\:transform-t:hover {
        transform-origin: top;
      }
      .translate-x-full {
        transform: translateX(100%);
      }
      .translate-y-full {
        transform: translateY(100%);
      }
      .active\\:translate-x-full:active {
        transform: translateX(100%);
      }
      .active\\:translate-y-full:active {
        transform: translateY(100%);
      }
      .-translate-x-full {
        transform: translateX(-100%);
      }
      .-translate-y-full {
        transform: translateY(-100%);
      }
      .rotate-90 {
        transform: rotate(90deg);
      }
      .group:hover .group-hover\\:rotate-90 {
        transform: rotate(90deg);
      }
      .-rotate-90 {
        transform: rotate(-90deg);
      }
      .active\\:-rotate-90:active {
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
      @media (min-width: 640px) {
        .sm\\:-translate-x-full {
          transform: translateX(-100%);
        }
        .sm\\:-translate-y-full {
          transform: translateY(-100%);
        }
        .sm\\:-skew-x-10 {
          transform: skewX(-10deg);
        }
        .sm\\:-skew-y-10 {
          transform: skewY(-10deg);
        }
      }
    `);
  });
});
