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
      'default': 'auto', // 'auto' resolves to 'all' if the 'default' transition duration is '0s' or '0ms' (like it is by default), otherwise it resolves to 'none'
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
      'default': '0ms',
      'fast': '200ms',
      'medium': '400ms',
      'slow': '600ms',
      'slower': '800ms',
      'slowest': '1000ms',
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
      '200': '200ms',
      '400': '400ms',
      '600': '600ms',
      '800': '800ms',
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
.transition-none {
  transition-property: none;
}
.transition-all {
  transition-property: all;
}
.transition-[key] {
  transition-property: [value];
}

/* configurable with the "transitionDuration" theme object */
.transition-fast {
  transition-duration: 200ms;
}
.transition-medium {
  transition-duration: 400ms;
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
.transition-delay-200 {
  transition-delay: 200ms;
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

Note: The `transitionProperty`, `transitionDuration`, `transitionTimingFunction`, and `transitionDelay` theme objects optionally accept a `default` key that doesn’t generate any class; it is used to generate base styles applied to all elements and pseudo-elements (`*, *::before, *::after`) if the value is different from the CSS default. For instance, the default values for CSS’s `transition-property` and `transition-duration` properties are, respectively, `all` and `0s`, which are the same as the `default` `transitionProperty` (actually `auto` but it resolves to `all` in this case) and the `default` `transitionDuration`. If you set the `default` `transitionDuration` to `400ms`, then the `default` `transitionProperty` (still `auto`) will resolve to `none`, and base styles will be generated to apply `transition-property: none` and `transition-duration: 400ms` to all elements. As a result, you can use one of the `transition-[property]` classes without having to define a duration every time. The same is true if you set a `default` `transitionTimingFunction` other than `ease` or a `default` `transitionDelay` other than `0s`/`0ms`, although those are generally less useful.
