const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
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
        corePlugins: false,
        plugins: [
          transformsPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities', {
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
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
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
        .sm\\:transform-border {
          transform-box: border-box;
        }
        .sm\\:transform-fill {
          transform-box: fill-box;
        }
        .sm\\:transform-view {
          transform-box: view-box;
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
      skew: {
        '5': '5deg',
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
      scale: [],
      rotate: [],
      skew: [],
      perspective: [],
      perspectiveOrigin: [],
      transformStyle: [],
      backfaceVisibility: [],
      transformBox: [],
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
      .scale-90 {
        transform: scale(0.9);
      }
      .scale-x-90 {
        transform: scaleX(0.9);
      }
      .scale-y-90 {
        transform: scaleY(0.9);
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
      .skew-x-5 {
        transform: skewX(5deg);
      }
      .skew-y-5 {
        transform: skewY(5deg);
      }
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
      }
    `);
  });
});

test('negative translate, scale, rotate, and skew utilities can be generated', () => {
  return generatePluginCss({
    theme: {
      transformOrigin: {},
      translate: {
        'full': '100%',
        '-full': '-100%',
      },
      scale: {
        '100': '1',
        '-100': '-1',
      },
      rotate: {
        '90': '90deg',
        '-90': '-90deg',
      },
      skew: {
        '5': '5deg',
        '-5': '-5deg',
      },
      perspectiveOrigin: {},
    },
    variants: {
      transform: [],
      translate: [],
      scale: [],
      rotate: [],
      skew: [],
      transformBox: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
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
      .scale-100 {
        transform: scale(1);
      }
      .scale-x-100 {
        transform: scaleX(1);
      }
      .scale-y-100 {
        transform: scaleY(1);
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
      .rotate-90 {
        transform: rotate(90deg);
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
      .-skew-x-5 {
        transform: skewX(-5deg);
      }
      .-skew-y-5 {
        transform: skewY(-5deg);
      }
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
      }
    `);
  });
});

test('third-axis translate, scale, and rotate utilities can be generated', () => {
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
        '-full': '-100%',
      },
      scale: {
        '100': '1',
        '-100': '-1',
      },
      rotate: {
        '90': '90deg',
        '-90': '-90deg',
      },
      skew: {
        '5': '5deg',
        '-5': '-5deg',
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
      scale: [],
      rotate: [],
      skew: [],
      perspective: [],
      perspectiveOrigin: [],
      transformStyle: [],
      backfaceVisibility: [],
      transformBox: [],
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
      .-skew-x-5 {
        transform: skewX(-5deg);
      }
      .-skew-y-5 {
        transform: skewY(-5deg);
      }
      .perspective-none {
        perspective: none;
      }
      .perspective-t {
        perspective-origin: top;
      }
      .transform-flat {
        transform-style: flat;
      }
      .transform-preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-visible {
        backface-visibility: visible;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
      }
    `);
  });
});

test('multi-axis translate, scale, and rotate utilities can be generated', () => {
  return generatePluginCss({
    theme: {
      transformOrigin: {},
      translate: {
        'full': '100%',
        '1/2': ['50%'],
        'right-up': ['100%', '-100%'],
        '3d': ['40px', '-60px', '-130px'],
      },
      scale: {
        '100': '1',
        '-100': ['-1'],
        'stretched-x': ['2', '0.5'],
        'stretched-y': ['0.5', '2'],
        '3d': ['0.5', '1', '2'],
      },
      rotate: {
        '90': '90deg',
        '180': ['180deg'],
        '3d': ['0', '1', '0.5', '45deg'],
      },
      perspectiveOrigin: {},
    },
    variants: {
      transform: [],
      translate: [],
      scale: [],
      rotate: [],
      skew: [],
      transformBox: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transform-none {
        transform: none;
      }
      .translate-x-full {
        transform: translateX(100%);
      }
      .translate-y-full {
        transform: translateY(100%);
      }
      .translate-x-1\\/2 {
        transform: translateX(50%);
      }
      .translate-y-1\\/2 {
        transform: translateY(50%);
      }
      .translate-right-up {
        transform: translate(100%, -100%);
      }
      .translate-3d {
        transform: translate3d(40px, -60px, -130px);
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
      .-scale-100 {
        transform: scale(-1);
      }
      .-scale-x-100 {
        transform: scaleX(-1);
      }
      .-scale-y-100 {
        transform: scaleY(-1);
      }
      .scale-stretched-x {
        transform: scale(2, 0.5);
      }
      .scale-stretched-y {
        transform: scale(0.5, 2);
      }
      .scale-3d {
        transform: scale3d(0.5, 1, 2);
      }
      .rotate-90 {
        transform: rotate(90deg);
      }
      .rotate-180 {
        transform: rotate(180deg);
      }
      .rotate-3d {
        transform: rotate3d(0, 1, 0.5, 45deg);
      }
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
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
      scale: {},
      rotate: {
        '90': '90deg',
      },
      skew: {
        '5': '5deg',
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
      scale: [],
      rotate: ['group-hover'],
      skew: [],
      perspective: ['hover'],
      perspectiveOrigin: ['hover', 'active'],
      transformStyle: ['hover'],
      backfaceVisibility: ['active'],
      transformBox: [],
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
      .rotate-90 {
        transform: rotate(90deg);
      }
      .group:hover .group-hover\\:rotate-90 {
        transform: rotate(90deg);
      }
      .skew-x-5 {
        transform: skewX(5deg);
      }
      .skew-y-5 {
        transform: skewY(5deg);
      }
      .transform-border {
        transform-box: border-box;
      }
      .transform-fill {
        transform-box: fill-box;
      }
      .transform-view {
        transform-box: view-box;
      }
    `);
  });
});
