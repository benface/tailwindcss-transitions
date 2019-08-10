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
        transition-property: none;
        transition-duration: 250ms;
      }
      .transition-none {
        transition-property: none;
      }
      .transition-all {
        transition-property: all;
      }
      .transition-color {
        transition-property: color;
      }
      .transition-bg {
        transition-property: background-color;
      }
      .transition-border {
        transition-property: border-color;
      }
      .transition-colors {
        transition-property: color, background-color, border-color;
      }
      .transition-opacity {
        transition-property: opacity;
      }
      .transition-transform {
        transition-property: transform;
      }
      .transition-0 {
        transition-duration: 0ms;
      }
      .transition-100 {
        transition-duration: 100ms;
      }
      .transition-250 {
        transition-duration: 250ms;
      }
      .transition-500 {
        transition-duration: 500ms;
      }
      .transition-750 {
        transition-duration: 750ms;
      }
      .transition-1000 {
        transition-duration: 1000ms;
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
        }
        .sm\\:transition-all {
          transition-property: all;
        }
        .sm\\:transition-color {
          transition-property: color;
        }
        .sm\\:transition-bg {
          transition-property: background-color;
        }
        .sm\\:transition-border {
          transition-property: border-color;
        }
        .sm\\:transition-colors {
          transition-property: color, background-color, border-color;
        }
        .sm\\:transition-opacity {
          transition-property: opacity;
        }
        .sm\\:transition-transform {
          transition-property: transform;
        }
        .sm\\:transition-0 {
          transition-duration: 0ms;
        }
        .sm\\:transition-100 {
          transition-duration: 100ms;
        }
        .sm\\:transition-250 {
          transition-duration: 250ms;
        }
        .sm\\:transition-500 {
          transition-duration: 500ms;
        }
        .sm\\:transition-750 {
          transition-duration: 750ms;
        }
        .sm\\:transition-1000 {
          transition-duration: 1000ms;
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
      },
      transitionTimingFunction: {
        'default': 'linear',
      },
      transitionDelay: {
        'default': '100ms',
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
        transition-property: none;
        transition-duration: 500ms;
        transition-timing-function: linear;
        transition-delay: 100ms;
      }
      .transition-none {
        transition-property: none;
      }
      .transition-all {
        transition-property: all;
      }
    `);
  });
});

test('utilities can be customized', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionDuration: {
        '1/2s': '0.5s',
        '1s': '1s',
        '2s': '2s',
      },
      transitionTimingFunction: {
        'ease': 'ease',
        'linear': 'linear',
      },
      transitionDelay: {
        '1/2s': '0.5s',
      },
      willChange: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
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
        transition-property: none;
        transition-duration: 250ms;
      }
      .transition-opacity {
        transition-property: opacity;
      }
      .transition-transform {
        transition-property: transform;
      }
      .transition-1\\/2s {
        transition-duration: 0.5s;
      }
      .transition-1s {
        transition-duration: 1s;
      }
      .transition-2s {
        transition-duration: 2s;
      }
      .transition-ease {
        transition-timing-function: ease;
      }
      .transition-linear {
        transition-timing-function: linear;
      }
      .transition-delay-1\\/2s {
        transition-delay: 0.5s;
      }
      .will-change-opacity {
        will-change: opacity;
      }
      .will-change-transform {
        will-change: transform;
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
      },
      transitionDuration: {
        '500': '500ms',
      },
      transitionTimingFunction: {
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
      transitionTimingFunction: ['hover', 'group-hover'],
      transitionDelay: ['responsive'],
      willChange: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      *, *::before, *::after {
        transition-property: none;
        transition-duration: 250ms;
      }
      .transition-none {
        transition-property: none;
      }
      .transition-all {
        transition-property: all;
      }
      .hover\\:transition-none:hover {
        transition-property: none;
      }
      .hover\\:transition-all:hover {
        transition-property: all;
      }
      .transition-500 {
        transition-duration: 500ms;
      }
      .active\\:transition-500:active {
        transition-duration: 500ms;
      }
      .transition-ease {
        transition-timing-function: ease;
      }
      .transition-linear {
        transition-timing-function: linear;
      }
      .hover\\:transition-ease:hover {
        transition-timing-function: ease;
      }
      .hover\\:transition-linear:hover {
        transition-timing-function: linear;
      }
      .group:hover .group-hover\\:transition-ease {
        transition-timing-function: ease;
      }
      .group:hover .group-hover\\:transition-linear {
        transition-timing-function: linear;
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

test('numbers are translated to ms for transitionDelay and transitionDuration', () => {
  return generatePluginCss({
    theme: {
      transitionProperty: {},
      transitionDuration: {
        '300': 300,
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
        transition-property: none;
        transition-duration: 250ms;
      }
      .transition-300 {
        transition-duration: 300ms;
      }
      .transition-delay-500 {
        transition-delay: 500ms;
      }
    `);
  });
});
