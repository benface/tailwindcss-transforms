const _ = require('lodash');

module.exports = function(options = {}) {
  return ({ config, e, addUtilities }) => {
    const defaultOptions = {
      '3d': false,
    };
    options = _.merge({}, defaultOptions, options);
    
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
    const defaultNegativeTranslateTheme = {};
    const defaultNegativeTranslateVariants = ['responsive'];
    const defaultScaleTheme = {};
    const defaultScaleVariants = ['responsive'];
    const defaultNegativeScaleTheme = {};
    const defaultNegativeScaleVariants = ['responsive'];
    const defaultRotateTheme = {};
    const defaultRotateVariants = ['responsive'];
    const defaultNegativeRotateTheme = {};
    const defaultNegativeRotateVariants = ['responsive'];
    const defaultSkewTheme = {};
    const defaultSkewVariants = ['responsive'];
    const defaultNegativeSkewTheme = {};
    const defaultNegativeSkewVariants = ['responsive'];
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

    const transformUtilities = _.fromPairs(
      _.map(config('theme.transform', defaultTransformTheme), (value, modifier) => {
        return [
          `.${e(`transform-${modifier}`)}`,
          {
            transform: value,
          },
        ];
      })
    );

    const transformOriginUtilities = _.fromPairs(
      _.map(config('theme.transformOrigin', defaultTransformOriginTheme), (value, modifier) => {
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
        ..._.map(config('theme.translate', defaultTranslateTheme), (value, modifier) => {
          return [
            [
              `.${e(`translate-x-${modifier}`)}`,
              {
                transform: `translateX(${value})`,
              },
            ],
            [
              `.${e(`translate-y-${modifier}`)}`,
              {
                transform: `translateY(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`translate-z-${modifier}`)}`,
                {
                  transform: `translateZ(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const negativeTranslateUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.negativeTranslate', defaultNegativeTranslateTheme), (value, modifier) => {
          return [
            [
              `.${e(`-translate-x-${modifier}`)}`,
              {
                transform: `translateX(-${value})`,
              },
            ],
            [
              `.${e(`-translate-y-${modifier}`)}`,
              {
                transform: `translateY(-${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`-translate-z-${modifier}`)}`,
                {
                  transform: `translateZ(-${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const scaleUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.scale', defaultScaleTheme), (value, modifier) => {
          return [
            [
              `.${e(`scale-${modifier}`)}`,
              {
                transform: `scale(${value})`,
              },
            ],
            [
              `.${e(`scale-x-${modifier}`)}`,
              {
                transform: `scaleX(${value})`,
              },
            ],
            [
              `.${e(`scale-y-${modifier}`)}`,
              {
                transform: `scaleY(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`scale-z-${modifier}`)}`,
                {
                  transform: `scaleZ(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const negativeScaleUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.scale', defaultNegativeScaleTheme), (value, modifier) => {
          return [
            [
              `.${e(`-scale-${modifier}`)}`,
              {
                transform: `scale(-${value})`,
              },
            ],
            [
              `.${e(`-scale-x-${modifier}`)}`,
              {
                transform: `scaleX(-${value})`,
              },
            ],
            [
              `.${e(`-scale-y-${modifier}`)}`,
              {
                transform: `scaleY(-${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`-scale-z-${modifier}`)}`,
                {
                  transform: `scaleZ(-${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const rotateUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.rotate', defaultRotateTheme), (value, modifier) => {
          return [
            [
              `.${e(`rotate-${modifier}`)}`,
              {
                transform: `rotate(${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`rotate-x-${modifier}`)}`,
                {
                  transform: `rotateX(${value})`,
                },
              ],
              [
                `.${e(`rotate-y-${modifier}`)}`,
                {
                  transform: `rotateY(${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const negativeRotateUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.negativeRotate', defaultNegativeRotateTheme), (value, modifier) => {
          return [
            [
              `.${e(`-rotate-${modifier}`)}`,
              {
                transform: `rotate(-${value})`,
              },
            ],
            ...(!options['3d'] ? [] : [
              [
                `.${e(`-rotate-x-${modifier}`)}`,
                {
                  transform: `rotateX(-${value})`,
                },
              ],
              [
                `.${e(`-rotate-y-${modifier}`)}`,
                {
                  transform: `rotateY(-${value})`,
                },
              ],
            ]),
          ];
        })
      )
    );

    const skewUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.skew', defaultSkewTheme), (value, modifier) => {
          return [
            [
              `.${e(`skew-x-${modifier}`)}`,
              {
                transform: `skewX(${value})`,
              },
            ],
            [
              `.${e(`skew-y-${modifier}`)}`,
              {
                transform: `skewY(${value})`,
              },
            ],
          ];
        })
      )
    );

    const negativeSkewUtilities = _.fromPairs(
      _.concat(
        ..._.map(config('theme.negativeSkew', defaultNegativeSkewTheme), (value, modifier) => {
          return [
            [
              `.${e(`-skew-x-${modifier}`)}`,
              {
                transform: `skewX(-${value})`,
              },
            ],
            [
              `.${e(`-skew-y-${modifier}`)}`,
              {
                transform: `skewY(-${value})`,
              },
            ],
          ];
        })
      )
    );

    const perspectiveUtilities = _.fromPairs(
      _.map(config('theme.perspective', defaultPerspectiveTheme), (value, modifier) => {
        return [
          `.${e(`perspective-${modifier}`)}`,
          {
            perspective: value,
          },
        ];
      })
    );

    const perspectiveOriginUtilities = _.fromPairs(
      _.map(config('theme.perspectiveOrigin', defaultPerspectiveOriginTheme), (value, modifier) => {
        return [
          `.${e(`perspective-${modifier}`)}`,
          {
            perspectiveOrigin: value,
          },
        ];
      })
    );

    const transformStyleUtilities = {
      'transform-flat': {
        transformStyle: 'flat',
      },
      'transform-preserve-3d': {
        transformStyle: 'preserve-3d',
      },
    };

    const backfaceVisibilityUtilities = {
      'backface-visible': {
        backfaceVisibility: 'visible',
      },
      'backface-hidden': {
        backfaceVisibility: 'hidden',
      },
    };

    addUtilities(transformUtilities, config('variants.transform', defaultTransformVariants));
    addUtilities(transformOriginUtilities, config('variants.transformOrigin', defaultTransformOriginVariants));
    addUtilities(translateUtilities, config('variants.translate', defaultTranslateVariants));
    addUtilities(negativeTranslateUtilities, config('variants.negativeTranslate', defaultNegativeTranslateVariants));
    addUtilities(scaleUtilities, config('variants.scale', defaultScaleVariants));
    addUtilities(negativeScaleUtilities, config('variants.negativeScale', defaultNegativeScaleVariants));
    addUtilities(rotateUtilities, config('variants.rotate', defaultRotateVariants));
    addUtilities(negativeRotateUtilities, config('variants.negativeRotate', defaultNegativeRotateVariants));
    addUtilities(skewUtilities, config('variants.skew', defaultSkewVariants));
    addUtilities(negativeSkewUtilities, config('variants.negativeSkew', defaultNegativeSkewVariants));
    if (options['3d']) {
      addUtilities(perspectiveUtilities, config('variants.perspective', defaultPerspectiveVariants));
      addUtilities(perspectiveOriginUtilities, config('variants.perspectiveOrigin', defaultPerspectiveOriginVariants));
      addUtilities(transformStyleUtilities, config('variants.transformStyle', defaultTransformStyleVariants));
      addUtilities(backfaceVisibilityUtilities, config('variants.backfaceVisibility', defaultBackfaceVisibilityVariants));
    }
  };
};
