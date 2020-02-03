# Transitions Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-transitions
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    transitionProperty: { // defaults to these values
      'none': 'none',
      'all': 'all',
      'default': ['background-color', 'border-color', 'color', 'fill', 'stroke', 'opacity', 'box-shadow', 'transform'],
      'colors': ['background-color', 'border-color', 'color', 'fill', 'stroke'],
      'bg': 'background-color',
      'border': 'border-color',
      'color': 'color',
      'opacity': 'opacity',
      'shadow': 'box-shadow',
      'transform': 'transform',
    },
    transitionDuration: { // defaults to these values
      'default': '250ms',
      '0': '0ms',
      '50': '50ms',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '250': '250ms',
      '300': '300ms',
      '400': '400ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    transitionTimingFunction: { // defaults to these values
      'default': 'ease',
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
    transitionDelay: { // defaults to these values
      'default': '0ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    willChange: { // defaults to these values
      'auto': 'auto',
      'scroll': 'scroll-position',
      'contents': 'contents',
      'opacity': 'opacity',
      'transform': 'transform',
    },
  },
  variants: { // all the following default to ['responsive']
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive'],
  },
  plugins: [
    require('tailwindcss-transitions')(),
  ],
};
```

The default configuration generates the following CSS:

```css
/* base styles for the default transition duration, timing function, and delay (when they differ from the CSS defaults) */
*, *::before, *::after {
  --transition-duration: 250ms;
  /* when the default timing function is a value other than "ease": */
  --transition-timing-function: [default-timing-function];
  /* when the default delay is a value other than zero: */
  --transition-delay: [default-delay];
}

/* configurable with the "transitionProperty" theme object */
.transition-none {
  transition-property: none;
  transition-duration: 250ms;
  transition-duration: var(--transition-duration);
}
.transition-all {
  transition-property: all;
  transition-duration: 250ms;
  transition-duration: var(--transition-duration);
}
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 250ms;
  transition-duration: var(--transition-duration);
}
.transition-[property-key] {
  transition-property: [property-value];
  /* when the default duration is a value other than zero: */
  transition-duration: [default-duration];
  transition-duration: var(--transition-duration);
  /* when the default timing function is a value other than "ease": */
  transition-timing-function: [default-timing-function];
  transition-timing-function: var(--transition-timing-function);
  /* when the default delay is a value other than zero: */
  transition-delay: [default-delay];
  transition-delay: var(--transition-delay);
}

/* configurable with the "transitionDuration" theme object */
.transition-0 {
  --transition-duration: 0ms;
  transition-duration: 0ms;
  transition-duration: var(--transition-duration);
}
.transition-50 {
  --transition-duration: 50ms;
  transition-duration: 50ms;
  transition-duration: var(--transition-duration);
}
.transition-[duration-key] {
  transition-duration: [duration-value];
  /* when the default duration is a value other than zero: */
  --transition-duration: [duration-value];
  transition-duration: var(--transition-duration);
  /* when the default timing function is a value other than "ease": */
  transition-timing-function: [default-timing-function];
  transition-timing-function: var(--transition-timing-function);
  /* when the default delay is a value other than zero: */
  transition-delay: [default-delay];
  transition-delay: var(--transition-delay);
}

/* configurable with the "transitionTimingFunction" theme object */
.transition-linear {
  transition-timing-function: linear;
}
.transition-ease {
  transition-timing-function: ease;
}
.transition-[timing-function-key] {
  transition-timing-function: [timing-function-value];
  /* when the default timing function is a value other than "ease": */
  --transition-timing-function: [timing-function-value];
  transition-timing-function: var(--transition-timing-function);
}

/* configurable with the "transitionDelay" theme object */
.transition-delay-0 {
  transition-delay: 0ms;
}
.transition-delay-100 {
  transition-delay: 100ms;
}
.transition-delay-[key] {
  transition-delay: [value];
  /* when the default delay is a value other than zero: */
  --transition-delay: [value];
  transition-delay: var(--transition-delay);
}

/* configurable with the "willChange" theme object */
.will-change {
  will-change: contents;
}
.will-change-auto {
  will-change: auto;
}
.will-change-[key] {
  will-change: [value];
}
```

Which you can then use in your HTML like this:

```html
<button class="bg-gray-600 hover:bg-gray-500 transition-bg">
  Hover me for a lighter background
</button>

<button class="bg-gray-200 hover:bg-gray-900 text-gray-900 hover:text-gray-200 transition-colors transition-500 transition-linear">
  Hover me to invert colors
</button>
```

Note: The `transitionProperty`, `transitionDuration`, `transitionTimingFunction`, and `transitionDelay` theme objects accept a `default` key. For `transitionProperty`, it generates a simple `transition` class (instead of `transition-default`), but for the other three, `default` doesn’t generate any class; it is used to define a custom property on all elements and pseudo-elements (`*, *::before, *::after`) if the value differs from the CSS-defined default. These custom properties are then used to set actual properties on elements that have a `transition-[property]` or `transition-[duration]` class, so that you don’t have to define a duration, timing function, or delay every time.
