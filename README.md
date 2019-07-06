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
      'right-up': ['100%', '-100%'],
      '3d': ['40px', '-60px', '-130px'],
    },
    scale: { // defaults to {}
      '90': '0.9',
      '100': '1',
      '110': '1.1',
      '-100': '-1',
      'stretched-x': ['2', '0.5'],
      'stretched-y': ['0.5', '2'],
      '3d': ['0.5', '1', '2'],
    },
    rotate: { // defaults to {}
      '90': '90deg',
      '180': '180deg',
      '270': '270deg',
      '3d': ['0', '1', '0.5', '45deg'],
    },
    skew: { // defaults to {}
      '-5': '-5deg',
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
    scale: ['responsive'],
    rotate: ['responsive'],
    skew: ['responsive'],
    perspective: ['responsive'],
    perspectiveOrigin: ['responsive'],
    transformStyle: ['responsive'],
    backfaceVisibility: ['responsive'],
    transformBox: ['responsive'],
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
.translate-z-[key] { /* only if the "3d" option is true */
  transform: translateZ([value]);
}
/* when the key starts with a minus sign: */
.-translate-x-[key] {
  transform: translateX([value]);
}
.-translate-y-[key] {
  transform: translateY([value]);
}
.-translate-z-[key] { /* only if the "3d" option is true */
  transform: translateZ([value]);
}
/* when the value is an array with two values: */
.translate-[key] {
  transform: translate([value-1], [value-2]);
}
/* when the value is an array with three values: */
.translate-[key] {
  transform: translate3d([value-1], [value-2], [value-3]);
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
.scale-z-[key] { /* only if the "3d" option is true */
  transform: scaleZ([value]);
}
/* when the key starts with a minus sign: */
.-scale-[key] {
  transform: scale([value]);
}
.-scale-x-[key] {
  transform: scaleX([value]);
}
.-scale-y-[key] {
  transform: scaleY([value]);
}
.-scale-z-[key] { /* only if the "3d" option is true */
  transform: scaleZ([value]);
}
/* when the value is an array with two values: */
.scale-[key] {
  transform: scale([value-1], [value-2]);
}
/* when the value is an array with three values: */
.scale-[key] {
  transform: scale3d([value-1], [value-2], [value-3]);
}

/* configurable with the "rotate" theme object */
.rotate-[key] {
  transform: rotate([value]);
}
.rotate-x-[key] { /* only if the "3d" option is true */
  transform: rotateX([value]);
}
.rotate-y-[key] { /* only if the "3d" option is true */
  transform: rotateY([value]);
}
/* when the key starts with a minus sign: */
.-rotate-[key] {
  transform: rotate([value]);
}
.-rotate-x-[key] { /* only if the "3d" option is true */
  transform: rotateX([value]);
}
.-rotate-y-[key] { /* only if the "3d" option is true */
  transform: rotateY([value]);
}
/* when the value is an array: */
.rotate-[key] {
  transform: rotate3d([value-1], [value-2], [value-3], [value-4]);
}

/* configurable with the "skew" theme object */
.skew-x-[key] {
  transform: skewX([value]);
}
.skew-y-[key] {
  transform: skewY([value]);
}
/* when the key starts with a minus sign: */
.-skew-x-[key] {
  transform: skewX([value]);
}
.-skew-y-[key] {
  transform: skewY([value]);
}

/* configurable with the "perspective" theme object (only if the "3d" option is true) */
.perspective-[key] {
  perspective: [value]
}

/* configurable with the "perspectiveOrigin" theme object (only if the "3d" option is true) */
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

/* not configurable (except for variants) */
.transform-border {
  transform-box: border-box;
}
.transform-fill {
  transform-box: fill-box;
}
.transform-view {
  transform-box: view-box;
}
```
