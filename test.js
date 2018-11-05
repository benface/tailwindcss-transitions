const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig')();
const transitionsPlugin = require('./index.js');

const disabledModules = {};
Object.keys(defaultConfig.modules).forEach(module => {
  disabledModules[module] = false;
});

const generatePluginCss = (options = {}) => {
  return postcss(tailwindcss({
    modules: disabledModules,
    plugins: [transitionsPlugin(options)],
  })).process('@tailwind utilities;', {
    from: undefined,
  }).then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('options are not required', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition: none;
      }
    `);
  });
});

test('there is a default duration value', () => {
  return generatePluginCss({
    properties: {
      'transform': 'transform',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition: none;
      }
      .transition-transform {
        transition: transform 500ms;
      }
    `);
  });
});

test('the default duration can be changed', () => {
  return generatePluginCss({
    properties: {
      'transform': 'transform',
    },
    durations: {
      'default': '100ms',
    }
  }).then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition: none;
      }
      .transition-transform {
        transition: transform 100ms;
      }
    `);
  });
});

test('a default timing function and a default delay can be set', () => {
  return generatePluginCss({
    properties: {
      'transform': 'transform',
    },
    durations: {
      'default': '100ms',
    },
    timingFunctions: {
      'default': 'linear',
    },
    delays: {
      'default': '200ms',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition: none;
      }
      .transition-transform {
        transition: transform 100ms linear 200ms;
      }
    `);
  });
});

test('all the options are working together as they should', () => {
  return generatePluginCss({
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
  }).then(css => {
    expect(css).toMatchCss(`
      .transition-none {
        transition: none;
      }
      .transition-opacity {
        transition: opacity 100ms linear;
      }
      .transition-opacity-and-color {
        transition: opacity 100ms linear, color 100ms linear;
      }
      .transition-duration-200 {
        transition-duration: 200ms;
      }
      .transition-duration-300 {
        transition-duration: 300ms;
      }
      .transition-duration-400 {
        transition-duration: 400ms;
      }
      .transition-duration-500 {
        transition-duration: 500ms;
      }
      .transition-timing-ease {
        transition-timing-function: ease;
      }
      .transition-delay-none {
        transition-delay: 0s;
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
