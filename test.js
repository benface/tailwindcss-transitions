const plugin = require('./index.js');

let generatedUtilities = {};

plugin({
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
})({
  e: value => value,
  addUtilities: (utilities) => {
    generatedUtilities = utilities;
  },
});

console.log('generatedUtilities', generatedUtilities);
