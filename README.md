# Transitions Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-transitions
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    transitionProperty: { // defaults to these values
      'none': 'none',
      'all': 'all',
      'color': 'color',
      'bg': 'background-color',
      'border': 'border-color',
      'colors': ['color', 'background-color', 'border-color'],
      'opacity': 'opacity',
      'transform': 'transform',
    },
    transitionDuration: { // defaults to these values
      'default': '250ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
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
}
```

This plugin generates the following utilities:

```css
/* configurable with the "transitionProperty" theme object */
.transition {
  transition-property: all;
}
.transition-none {
  transition-property: none;
}
.transition-[key] {
  transition-property: [value];
}

/* configurable with the "transitionDuration" theme object */
.transition-0 {
  transition-duration: 0ms;
}
.transition-100 {
  transition-duration: 100ms;
}
.transition-[key] {
  transition-duration: [value];
}

/* configurable with the "transitionTimingFunction" theme object */
.transition-linear {
  transition-timing-function: linear;
}
.transition-ease {
  transition-timing-function: ease;
}
.transition-[key] {
  transition-timing-function: [value];
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

Note: The `transitionDuration`, `transitionTimingFunction`, and `transitionDelay` theme objects optionally accept a `default` key that doesn’t generate any class; it is used to generate base styles applied to all elements (`*`) so that you can use one of the `transition-[property]` classes without having to define a duration, timing function, or delay every time.
