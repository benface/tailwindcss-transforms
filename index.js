const _ = require('lodash');

const prefixNegativeModifiers = function(base, modifier) {
  return _.startsWith(modifier, '-') ? `-${base}-${modifier.slice(1)}` : `${base}-${modifier}`;
};

module.exports = function(options = {}) {
  return ({ theme, variants, e, addUtilities }) => {
    const defaultOptions = {
      '3d': false,
    };
    options = _.defaults({}, options, defaultOptions);
    
    const defaultTransformTheme = {
      'none': 'none',
    };
    const defaultTransformVariants = ['responsive'];
    const defaultTransformOriginTheme = {
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    };
    const defaultTransformOriginVariants = ['responsive'];
    const defaultTranslateTheme = {};
    const defaultTranslateVariants = ['responsive'];
    const defaultScaleTheme = {};
    const defaultScaleVariants = ['responsive'];
    const defaultRotateTheme = {};
    const defaultRotateVariants = ['responsive'];
    const defaultSkewTheme = {};
    const defaultSkewVariants = ['responsive'];
    const defaultPerspectiveTheme = {};
    const defaultPerspectiveVariants = ['responsive'];
    const defaultPerspectiveOriginTheme = {
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    };
    const defaultPerspectiveOriginVariants = ['responsive'];
    const defaultTransformStyleVariants = ['responsive'];
    const defaultBackfaceVisibilityVariants = ['responsive'];
    const defaultTransformBoxVariants = ['responsive'];

    const transformTheme = theme('transform', defaultTransformTheme);
    const transformVariants = variants('transform', defaultTransformVariants);
    const transformOriginTheme = theme('transformOrigin', defaultTransformOriginTheme);
    const transformOriginVariants = variants('transformOrigin', defaultTransformOriginVariants);
    const translateTheme = theme('translate', defaultTranslateTheme);
    const translateVariants = variants('translate', defaultTranslateVariants);
    const scaleTheme = theme('scale', defaultScaleTheme);
    const scaleVariants = variants('scale', defaultScaleVariants);
    const rotateTheme = theme('rotate', defaultRotateTheme);
    const rotateVariants = variants('rotate', defaultRotateVariants);
    const skewTheme = theme('skew', defaultSkewTheme);
    const skewVariants = variants('skew', defaultSkewVariants);
    const perspectiveTheme = theme('perspective', defaultPerspectiveTheme);
    const perspectiveVariants = variants('perspective', defaultPerspectiveVariants);
    const perspectiveOriginTheme = theme('perspectiveOrigin', defaultPerspectiveOriginTheme);
    const perspectiveOriginVariants = variants('perspectiveOrigin', defaultPerspectiveOriginVariants);
    const transformStyleVariants = variants('transformStyle', defaultTransformStyleVariants);
    const backfaceVisibilityVariants = variants('backfaceVisibility', defaultBackfaceVisibilityVariants);
    const transformBoxVariants = variants('transformBox', defaultTransformBoxVariants);

    const transformUtilities = _.fromPairs(
      _.map(transformTheme, (value, modifier) => {
        return [
          `.${e(`transform-${modifier}`)}`,
          {
            transform: value,
          },
        ];
      })
    );

    const transformOriginUtilities = _.fromPairs(
      _.map(transformOriginTheme, (value, modifier) => {
        return [
          `.${e(`transform-${modifier}`)}`,
          {
            transformOrigin: value,
          },
        ];
      })
    );

    const translateUtilities = _.fromPairs(
      _.concat(
        ..._.map(translateTheme, (value, modifier) => {
          if (_.isArray(value)) {
            if (value.length === 0) {
              return [];
            }
            if (value.length >= 3) {
              return [
                [
                  `.${e(prefixNegativeModifiers('translate', modifier))}`,
                  {
                    transform: `translate3d(${value[0]}, ${value[1]}, ${value[2]})`,
                  },
                ],
              ];
            }
            if (value.length >= 2) {
              return [
                [
                  `.${e(prefixNegativeModifiers('translate', modifier))}`,
                  {
                    transform: `translate(${value[0]}, ${value[1]})`,
                  },
                ],
              ];
            }
            value = value[0];
          }
          return [
            [
              `.${e(prefixNegativeModifiers('translate-x', modifier))}`,
              {
                transform: `translateX(${value})`,
              },
            ],
            [
              `.${e(prefixNegativeModifiers('translate-y', modifier))}`,
              {
                transform: `translateY(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(prefixNegativeModifiers('translate-z', modifier))}`,
                {
                  transform: `translateZ(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const scaleUtilities = _.fromPairs(
      _.concat(
        ..._.map(scaleTheme, (value, modifier) => {
          if (_.isArray(value)) {
            if (value.length === 0) {
              return [];
            }
            if (value.length >= 3) {
              return [
                [
                  `.${e(prefixNegativeModifiers('scale', modifier))}`,
                  {
                    transform: `scale3d(${value[0]}, ${value[1]}, ${value[2]})`,
                  },
                ],
              ];
            }
            if (value.length >= 2) {
              return [
                [
                  `.${e(prefixNegativeModifiers('scale', modifier))}`,
                  {
                    transform: `scale(${value[0]}, ${value[1]})`,
                  },
                ],
              ];
            }
            value = value[0];
          }
          return [
            [
              `.${e(prefixNegativeModifiers('scale', modifier))}`,
              {
                transform: `scale(${value})`,
              },
            ],
            [
              `.${e(prefixNegativeModifiers('scale-x', modifier))}`,
              {
                transform: `scaleX(${value})`,
              },
            ],
            [
              `.${e(prefixNegativeModifiers('scale-y', modifier))}`,
              {
                transform: `scaleY(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(prefixNegativeModifiers('scale-z', modifier))}`,
                {
                  transform: `scaleZ(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const rotateUtilities = _.fromPairs(
      _.concat(
        ..._.map(rotateTheme, (value, modifier) => {
          if (_.isArray(value)) {
            if (value.length === 0) {
              return [];
            }
            if (value.length >= 4) {
              return [
                [
                  `.${e(prefixNegativeModifiers('rotate', modifier))}`,
                  {
                    transform: `rotate3d(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`,
                  },
                ],
              ];
            }
            value = value[0];
          }
          return [
            [
              `.${e(prefixNegativeModifiers('rotate', modifier))}`,
              {
                transform: `rotate(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(prefixNegativeModifiers('rotate-x', modifier))}`,
                {
                  transform: `rotateX(${value})`,
                },
              ],
              [
                `.${e(prefixNegativeModifiers('rotate-y', modifier))}`,
                {
                  transform: `rotateY(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const skewUtilities = _.fromPairs(
      _.concat(
        ..._.map(skewTheme, (value, modifier) => {
          return [
            [
              `.${e(prefixNegativeModifiers('skew-x', modifier))}`,
              {
                transform: `skewX(${value})`,
              },
            ],
            [
              `.${e(prefixNegativeModifiers('skew-y', modifier))}`,
              {
                transform: `skewY(${value})`,
              },
            ],
          ];
        })
      )
    );

    const perspectiveUtilities = _.fromPairs(
      _.map(perspectiveTheme, (value, modifier) => {
        return [
          `.${e(`perspective-${modifier}`)}`,
          {
            perspective: value,
          },
        ];
      })
    );

    const perspectiveOriginUtilities = _.fromPairs(
      _.map(perspectiveOriginTheme, (value, modifier) => {
        return [
          `.${e(`perspective-${modifier}`)}`,
          {
            perspectiveOrigin: value,
          },
        ];
      })
    );

    const transformStyleUtilities = {
      '.transform-flat': {
        transformStyle: 'flat',
      },
      '.transform-preserve-3d': {
        transformStyle: 'preserve-3d',
      },
    };

    const backfaceVisibilityUtilities = {
      '.backface-visible': {
        backfaceVisibility: 'visible',
      },
      '.backface-hidden': {
        backfaceVisibility: 'hidden',
      },
    };

    const transformBoxUtilities = {
      '.transform-border': {
        transformBox: 'border-box',
      },
      '.transform-fill': {
        transformBox: 'fill-box',
      },
      '.transform-view': {
        transformBox: 'view-box',
      },
    };

    addUtilities(transformUtilities, transformVariants);
    addUtilities(transformOriginUtilities, transformOriginVariants);
    addUtilities(translateUtilities, translateVariants);
    addUtilities(scaleUtilities, scaleVariants);
    addUtilities(rotateUtilities, rotateVariants);
    addUtilities(skewUtilities, skewVariants);
    if (options['3d']) {
      addUtilities(perspectiveUtilities, perspectiveVariants);
      addUtilities(perspectiveOriginUtilities, perspectiveOriginVariants);
      addUtilities(transformStyleUtilities, transformStyleVariants);
      addUtilities(backfaceVisibilityUtilities, backfaceVisibilityVariants);
    }
    addUtilities(transformBoxUtilities, transformBoxVariants);
  };
};
