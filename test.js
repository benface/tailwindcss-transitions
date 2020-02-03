const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const transitionsPlugin = require('./index.js');

const generatePluginCss = (config) => {
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
          transitionsPlugin(),
        ],
      }, config)
    )
  )
  .process('@tailwind base; @tailwind utilities', {
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
      *, *::before, *::after {
        --transition-duration: 250ms;
      }
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
      .transition-colors {
        transition-property: background-color, border-color, color, fill, stroke;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-bg {
        transition-property: background-color;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-border {
        transition-property: border-color;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-color {
        transition-property: color;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-opacity {
        transition-property: opacity;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-shadow {
        transition-property: box-shadow;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-transform {
        transition-property: transform;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
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
      .transition-75 {
        --transition-duration: 75ms;
        transition-duration: 75ms;
        transition-duration: var(--transition-duration);
      }
      .transition-100 {
        --transition-duration: 100ms;
        transition-duration: 100ms;
        transition-duration: var(--transition-duration);
      }
      .transition-150 {
        --transition-duration: 150ms;
        transition-duration: 150ms;
        transition-duration: var(--transition-duration);
      }
      .transition-200 {
        --transition-duration: 200ms;
        transition-duration: 200ms;
        transition-duration: var(--transition-duration);
      }
      .transition-250 {
        --transition-duration: 250ms;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-300 {
        --transition-duration: 300ms;
        transition-duration: 300ms;
        transition-duration: var(--transition-duration);
      }
      .transition-400 {
        --transition-duration: 400ms;
        transition-duration: 400ms;
        transition-duration: var(--transition-duration);
      }
      .transition-500 {
        --transition-duration: 500ms;
        transition-duration: 500ms;
        transition-duration: var(--transition-duration);
      }
      .transition-750 {
        --transition-duration: 750ms;
        transition-duration: 750ms;
        transition-duration: var(--transition-duration);
      }
      .transition-1000 {
        --transition-duration: 1000ms;
        transition-duration: 1000ms;
        transition-duration: var(--transition-duration);
      }
      .transition-linear {
        transition-timing-function: linear;
      }
      .transition-ease {
        transition-timing-function: ease;
      }
      .transition-ease-in {
        transition-timing-function: ease-in;
      }
      .transition-ease-out {
        transition-timing-function: ease-out;
      }
      .transition-ease-in-out {
        transition-timing-function: ease-in-out;
      }
      .transition-delay-0 {
        transition-delay: 0ms;
      }
      .transition-delay-100 {
        transition-delay: 100ms;
      }
      .transition-delay-250 {
        transition-delay: 250ms;
      }
      .transition-delay-500 {
        transition-delay: 500ms;
      }
      .transition-delay-750 {
        transition-delay: 750ms;
      }
      .transition-delay-1000 {
        transition-delay: 1000ms;
      }
      .will-change-auto {
        will-change: auto;
      }
      .will-change-scroll {
        will-change: scroll-position;
      }
      .will-change-contents {
        will-change: contents;
      }
      .will-change-opacity {
        will-change: opacity;
      }
      .will-change-transform {
        will-change: transform;
      }
      @media (min-width: 640px) {
        .sm\\:transition-none {
          transition-property: none;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-all {
          transition-property: all;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-colors {
          transition-property: background-color, border-color, color, fill, stroke;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-bg {
          transition-property: background-color;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-border {
          transition-property: border-color;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-color {
          transition-property: color;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-opacity {
          transition-property: opacity;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-shadow {
          transition-property: box-shadow;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-transform {
          transition-property: transform;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-0 {
          --transition-duration: 0ms;
          transition-duration: 0ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-50 {
          --transition-duration: 50ms;
          transition-duration: 50ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-75 {
          --transition-duration: 75ms;
          transition-duration: 75ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-100 {
          --transition-duration: 100ms;
          transition-duration: 100ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-150 {
          --transition-duration: 150ms;
          transition-duration: 150ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-200 {
          --transition-duration: 200ms;
          transition-duration: 200ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-250 {
          --transition-duration: 250ms;
          transition-duration: 250ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-300 {
          --transition-duration: 300ms;
          transition-duration: 300ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-400 {
          --transition-duration: 400ms;
          transition-duration: 400ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-500 {
          --transition-duration: 500ms;
          transition-duration: 500ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-750 {
          --transition-duration: 750ms;
          transition-duration: 750ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-1000 {
          --transition-duration: 1000ms;
          transition-duration: 1000ms;
          transition-duration: var(--transition-duration);
        }
        .sm\\:transition-linear {
          transition-timing-function: linear;
        }
        .sm\\:transition-ease {
          transition-timing-function: ease;
        }
        .sm\\:transition-ease-in {
          transition-timing-function: ease-in;
        }
        .sm\\:transition-ease-out {
          transition-timing-function: ease-out;
        }
        .sm\\:transition-ease-in-out {
          transition-timing-function: ease-in-out;
        }
        .sm\\:transition-delay-0 {
          transition-delay: 0ms;
        }
        .sm\\:transition-delay-100 {
          transition-delay: 100ms;
        }
        .sm\\:transition-delay-250 {
          transition-delay: 250ms;
        }
        .sm\\:transition-delay-500 {
          transition-delay: 500ms;
        }
        .sm\\:transition-delay-750 {
          transition-delay: 750ms;
        }
        .sm\\:transition-delay-1000 {
          transition-delay: 1000ms;
        }
        .sm\\:will-change-auto {
          will-change: auto;
        }
        .sm\\:will-change-scroll {
          will-change: scroll-position;
        }
        .sm\\:will-change-contents {
          will-change: contents;
        }
        .sm\\:will-change-opacity {
          will-change: opacity;
        }
        .sm\\:will-change-transform {
          will-change: transform;
        }
      }
    `);
  });
});

test('the default duration, timing function and delay can be changed', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {
        'none': 'none',
        'all': 'all',
      },
      transitionDuration: {
        'default': '500ms',
        'fast': '250ms',
      },
      transitionTimingFunction: {
        'default': 'linear',
        'ease': 'ease',
      },
      transitionDelay: {
        'default': '100ms',
        'none': '0ms',
      },
      willChange: {},
    },
    variants: {
      transitionProperty: [],
      transitionDuration: [],
      transitionTimingFunction: [],
      transitionDelay: [],
      willChange: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      *, *::before, *::after {
        --transition-duration: 500ms;
        --transition-timing-function: linear;
        --transition-delay: 100ms;
      }
      .transition-none {
        transition-property: none;
        transition-duration: 500ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
        transition-delay: 100ms;
        transition-delay: var(--transition-delay);
      }
      .transition-all {
        transition-property: all;
        transition-duration: 500ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
        transition-delay: 100ms;
        transition-delay: var(--transition-delay);
      }
      .transition-fast {
        --transition-duration: 250ms;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
        transition-delay: 100ms;
        transition-delay: var(--transition-delay);
      }
      .transition-ease {
        --transition-timing-function: ease;
        transition-timing-function: ease;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-delay-none {
        --transition-delay: 0ms;
        transition-delay: 0ms;
        transition-delay: var(--transition-delay);
      }
    `);
  });
});

test('the default duration can be removed', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {
        'none': 'none',
        'all': 'all',
      },
      transitionDuration: {
        'default': '0ms',
        'fast': '250ms',
        'medium': '500ms',
        'slow': '1000ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
      transitionDelay: {
        '0': '0ms',
      },
      willChange: {},
    },
    variants: {
      transitionProperty: [],
      transitionDuration: [],
      transitionTimingFunction: [],
      transitionDelay: [],
      willChange: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition-property: none;
      }
      .transition-all {
        transition-property: all;
      }
      .transition-fast {
        transition-duration: 250ms;
      }
      .transition-medium {
        transition-duration: 500ms;
      }
      .transition-slow {
        transition-duration: 1000ms;
      }
      .transition-ease {
        transition-timing-function: ease;
      }
      .transition-delay-0 {
        transition-delay: 0ms;
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {
        'none': 'none',
        'all': 'all',
        'bg': 'background-color',
      },
      transitionDuration: {
        '500': '500ms',
      },
      transitionTimingFunction: {
        'default': 'linear',
        'ease': 'ease',
        'linear': 'linear',
      },
      transitionDelay: {
        '500': '500ms',
      },
      willChange: {
        'contents': 'contents',
      },
    },
    variants: {
      transitionProperty: ['hover'],
      transitionDuration: ['active'],
      transitionTimingFunction: ['group-hover', 'focus'],
      transitionDelay: ['responsive'],
      willChange: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      *, *::before, *::after {
        --transition-duration: 250ms;
        --transition-timing-function: linear;
      }
      .transition-none {
        transition-property: none;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-all {
        transition-property: all;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-bg {
        transition-property: background-color;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .hover\\:transition-none:hover {
        transition-property: none;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .hover\\:transition-all:hover {
        transition-property: all;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .hover\\:transition-bg:hover {
        transition-property: background-color;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-500 {
        --transition-duration: 500ms;
        transition-duration: 500ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .active\\:transition-500:active {
        --transition-duration: 500ms;
        transition-duration: 500ms;
        transition-duration: var(--transition-duration);
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-ease {
        --transition-timing-function: ease;
        transition-timing-function: ease;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-linear {
        --transition-timing-function: linear;
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .group:hover .group-hover\\:transition-ease {
        --transition-timing-function: ease;
        transition-timing-function: ease;
        transition-timing-function: var(--transition-timing-function);
      }
      .group:hover .group-hover\\:transition-linear {
        --transition-timing-function: linear;
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .focus\\:transition-ease:focus {
        --transition-timing-function: ease;
        transition-timing-function: ease;
        transition-timing-function: var(--transition-timing-function);
      }
      .focus\\:transition-linear:focus {
        --transition-timing-function: linear;
        transition-timing-function: linear;
        transition-timing-function: var(--transition-timing-function);
      }
      .transition-delay-500 {
        transition-delay: 500ms;
      }
      .will-change-contents {
        will-change: contents;
      }
      @media (min-width: 640px) {
        .sm\\:transition-delay-500 {
          transition-delay: 500ms;
        }
      }
    `);
  });
});

test('durations and delays defined as numbers are translated to ms', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {},
      transitionDuration: {
        'default': 500,
        '250': 250,
      },
      transitionTimingFunction: {},
      transitionDelay: {
        '500': 500,
      },
      willChange: {},
    },
    variants: {
      transitionProperty: [],
      transitionDuration: [],
      transitionTimingFunction: [],
      transitionDelay: [],
      willChange: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      *, *::before, *::after {
        --transition-duration: 500ms;
      }
      .transition-250 {
        --transition-duration: 250ms;
        transition-duration: 250ms;
        transition-duration: var(--transition-duration);
      }
      .transition-delay-500 {
        transition-delay: 500ms;
      }
    `);
  });
});
