# Transforms Tailwind CSS Plugin

## Installation

```bash
npm install tailwindcss-transforms
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwindcss-transforms')({
      variants: ['responsive'],
      translate: {
        '1/2': '50%',
        'full': '100%',
      },
      negativeTranslate: {
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
      negativeRotate: {
        '90': '90deg',
        '180': '180deg',
        '270': '270deg',
      },
      skew: {
        '5': '5deg',
      },
      origins: {
        't': '50% 0%',
        'r': '100% 50%',
        'b': '50% 100%',
        'l': '0% 50%',
      },
    }),
  ],
}
```

This plugin generates the following utilities:

```css
.transform-none {
  transform: none;
}

/* configurable with the "translate" option */
.translate-x-[name] {
  transform: translateX([value]);
}
.translate-y-[name] {
  transform: translateY([value]);
}

/* configurable with the "negativeTranslate" option */
.-translate-x-[name] {
  transform: translateX(-[value]);
}
.-translate-y-[name] {
  transform: translateY(-[value]);
}

/* configurable with the "scale" option */
.scale-[name] {
  transform: scale([value]);
}
.scale-x-[name] {
  transform: scaleX([value]);
}
.scale-y-[name] {
  transform: scaleY([value]);
}

/* configurable with the "rotate" option */
.rotate-[name] {
  transform: rotate([value]);
}

/* configurable with the "negativeRotate" option */
.-rotate-[name] {
  transform: rotate(-[value]);
}

/* configurable with the "skew" option */
.skew-x-[name] {
  transform: skewX([value]);
}
.skew-y-[name] {
  transform: skewY([value]);
}

/* configurable with the "origins" option */
.transform-origin-[name] {
  transform-origin: [value];
}
```