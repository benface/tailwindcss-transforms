# Transforms Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-transforms
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    transform: { // defaults to this value
      'none': 'none',
    },
    transformOrigin: { // defaults to these values
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
    translate: { // defaults to {}
      '1/2': '50%',
      'full': '100%',
    },
    negativeTranslate: { // defaults to {}
      '1/2': '50%',
      'full': '100%',
    },
    scale: { // defaults to {}
      '90': '0.9',
      '100': '1',
      '110': '1.1',
    },
    negativeScale: { // defaults to {}
      '100': '1',
    },
    rotate: { // defaults to {}
      '90': '90deg',
      '180': '180deg',
      '270': '270deg',
    },
    negativeRotate: { // defaults to {}
      '90': '90deg',
      '180': '180deg',
      '270': '270deg',
    },
    skew: { // defaults to {}
      '5': '5deg',
    },
    negativeSkew: { // defaults to {}
      '5': '5deg',
    },
    perspective: { // defaults to {}
      'none': 'none',
      '250': '250px',
      '500': '500px',
      '750': '750px',
      '1000': '1000px',
    },
    perspectiveOrigin: { // defaults to these values
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
  },
  variants: { // all the following default to ['responsive']
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    translate: ['responsive'],
    negativeTranslate: ['responsive'],
    scale: ['responsive'],
    negativeScale: ['responsive'],
    rotate: ['responsive'],
    negativeRotate: ['responsive'],
    skew: ['responsive'],
    negativeSkew: ['responsive'],
    perspective: ['responsive'],
    perspectiveOrigin: ['responsive'],
    transformStyle: ['responsive'],
    backfaceVisibility: ['responsive'],
  },
  plugins: [
    require('tailwindcss-transforms')({
      '3d': false, // defaults to false
    }),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "transform" theme object */
.transform-none {
  transform: none;
}

/* configurable with the "transformOrigin" theme object */
.transform-[key] {
  transform-origin: [value];
}

/* configurable with the "translate" theme object */
.translate-x-[key] {
  transform: translateX([value]);
}
.translate-y-[key] {
  transform: translateY([value]);
}
.translate-z-[key] { /* only if "3d" is true */
  transform: translateZ([value]);
}

/* configurable with the "negativeTranslate" theme object */
.-translate-x-[key] {
  transform: translateX(-[value]);
}
.-translate-y-[key] {
  transform: translateY(-[value]);
}
.-translate-z-[key] { /* only if "3d" is true */
  transform: translateZ(-[value]);
}

/* configurable with the "scale" theme object */
.scale-[key] {
  transform: scale([value]);
}
.scale-x-[key] {
  transform: scaleX([value]);
}
.scale-y-[key] {
  transform: scaleY([value]);
}
.scale-z-[key] { /* only if "3d" is true */
  transform: scaleZ([value]);
}

/* configurable with the "negativeScale" theme object */
.-scale-[key] {
  transform: scale(-[value]);
}
.-scale-x-[key] {
  transform: scaleX(-[value]);
}
.-scale-y-[key] {
  transform: scaleY(-[value]);
}
.-scale-z-[key] { /* only if "3d" is true */
  transform: scaleZ(-[value]);
}

/* configurable with the "rotate" theme object */
.rotate-[key] {
  transform: rotate([value]);
}
.rotate-x-[key] { /* only if "3d" is true */
  transform: rotateX([value]);
}
.rotate-y-[key] { /* only if "3d" is true */
  transform: rotateY([value]);
}

/* configurable with the "negativeRotate" theme object */
.-rotate-[key] {
  transform: rotate(-[value]);
}
.-rotate-x-[key] { /* only if "3d" is true */
  transform: rotateX(-[value]);
}
.-rotate-y-[key] { /* only if "3d" is true */
  transform: rotateY(-[value]);
}

/* configurable with the "skew" theme object */
.skew-x-[key] {
  transform: skewX([value]);
}
.skew-y-[key] {
  transform: skewY([value]);
}

/* configurable with the "negativeSkew" theme object */
.-skew-x-[key] {
  transform: skewX(-[value]);
}
.-skew-y-[key] {
  transform: skewY(-[value]);
}

/* configurable with the "perspective" theme object (only if "3d" is true) */
.perspective-[key] {
  perspective: [value]
}

/* configurable with the "perspectiveOrigin" theme object (only if "3d" is true) */
.perspective-[key] {
  perspective-origin: [value]
}

/* generated when the "3d" option is set to true */
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
```
