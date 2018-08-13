# Transitions Tailwind CSS Plugin

## Installation

```bash
npm install tailwindcss-transitions
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwindcss-transitions')({
      variants: ['responsive'],
      properties: {
        'opacity': 'opacity',
        'opacity-and-color': ['opacity', 'color'],
      },
      durations: {
        'default': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      timingFunctions: {
        'default': 'linear',
        'ease': 'ease',
      },
      delays: {
        'none': '0s',
      },
      willChange: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
    }),
  ],
}
```

This plugin generates the following utilities:

```css
.transition-none {
  transition: none;
}

/* configurable with the "properties" option, taking into account the "default" key of "durations", "timingFunctions", and "delays" */
.transition-opacity {
  transition: opacity 100ms linear;
}
.transition-opacity-and-color {
  transition: opacity 100ms linear, color 100ms linear;
}

/* configurable with the "durations" option */
.transition-duration-[name] {
  transition-duration: [value];
}

/* configurable with the "timingFunctions" option */
.transition-timing-[name] {
  transition-timing-function: [value];
}

/* configurable with the "delays" option */
.transition-delay-[name] {
  transition-delay: [value];
}

/* configurable with the "willChange" option */
.will-change-[name] {
  will-change: [value];
}
```

Note: The `durations`, `timingFunctions`, and `delays` options optionally accept a `default` key but it doesn't generate any class; the default value is only used for the shorthand `transition` declarations in the `transition-[property]` utilities.