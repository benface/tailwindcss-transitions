const _ = require('lodash');

module.exports = function() {
  return ({ theme, variants, e, addBase, addUtilities }) => {
    const defaultPropertyTheme = {
      'none': 'none',
      'all': 'all',
      'color': 'color',
      'bg': 'background-color',
      'border': 'border-color',
      'colors': ['color', 'background-color', 'border-color'],
      'opacity': 'opacity',
      'transform': 'transform',
    };
    const defaultPropertyVariants = ['responsive'];
    const defaultDurationTheme = {
      'default': '250ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    };
    const defaultDurationVariants = ['responsive'];
    const defaultTimingFunctionTheme = {
      'default': 'ease',
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    };
    const defaultTimingFunctionVariants = ['responsive'];
    const defaultDelayTheme = {
      'default': '0ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    };
    const defaultDelayVariants = ['responsive'];
    const defaultWillChangeTheme = {
      'auto': 'auto',
      'scroll': 'scroll-position',
      'contents': 'contents',
      'opacity': 'opacity',
      'transform': 'transform',
    };
    const defaultWillChangeVariants = ['responsive'];

    const propertyTheme = theme('transitionProperty', defaultPropertyTheme);
    const propertyVariants = variants('transitionProperty', defaultPropertyVariants);
    const durationTheme = theme('transitionDuration', defaultDurationTheme);
    const durationVariants = variants('transitionDuration', defaultDurationVariants);
    const timingFunctionTheme = theme('transitionTimingFunction', defaultTimingFunctionTheme);
    const timingFunctionVariants = variants('transitionTimingFunction', defaultTimingFunctionVariants);
    const delayTheme = theme('transitionDelay', defaultDelayTheme);
    const delayVariants = variants('transitionDelay', defaultDelayVariants);
    const willChangeTheme = theme('willChange', defaultWillChangeTheme);
    const willChangeVariants = variants('willChange', defaultWillChangeVariants);

    const defaultDuration = _.defaults({}, durationTheme, defaultDurationTheme).default;
    const defaultTimingFunction = _.defaults({}, timingFunctionTheme, defaultTimingFunctionTheme).default;
    const defaultDelay = _.defaults({}, delayTheme, defaultDelayTheme).default;

    const baseStyles = {
      '*, *::before, *::after': {
        transitionProperty: 'none',
        transitionDuration: _.includes(['0', '0s', '0ms'], defaultDuration) ? null : defaultDuration,
        transitionTimingFunction: defaultTimingFunction === 'ease' ? null : defaultTimingFunction,
        transitionDelay: _.includes(['0', '0s', '0ms'], defaultDelay) ? null : defaultDelay,
      }
    };

    const propertyUtilities = _.fromPairs(
      _.map(propertyTheme, (value, modifier) => {
        return [
          `.${e(`transition-${modifier}`)}`,
          {
            transitionProperty: _.isArray(value) ? value.join(', ') : value,
          },
        ];
      })
    );

    const durationUtilities = _.fromPairs(
      _.map(durationTheme, (value, modifier) => {
        if (modifier === 'default') {
          return [];
        }
        return [
          `.${e(`transition-${modifier}`)}`,
          {
            transitionDuration: _.isNumber(value) ? `${value}ms` : value,
          },
        ];
      })
    );

    const timingFunctionUtilities = _.fromPairs(
      _.map(timingFunctionTheme, (value, modifier) => {
        if (modifier === 'default') {
          return [];
        }
        return [
          `.${e(`transition-${modifier}`)}`,
          {
            transitionTimingFunction: value,
          },
        ];
      })
    );

    const delayUtilities = _.fromPairs(
      _.map(delayTheme, (value, modifier) => {
        if (modifier === 'default') {
          return [];
        }
        return [
          `.${e(`transition-delay-${modifier}`)}`,
          {
            transitionDelay: _.isNumber(value) ? `${value}ms` : value,
          },
        ];
      })
    );

    const willChangeUtilities = _.fromPairs(
      _.map(willChangeTheme, (value, modifier) => {
        return [
          `.${e(`will-change-${modifier}`)}`,
          {
            willChange: value,
          },
        ];
      })
    );

    addBase(baseStyles);
    addUtilities(propertyUtilities, propertyVariants);
    addUtilities(durationUtilities, durationVariants);
    addUtilities(timingFunctionUtilities, timingFunctionVariants);
    addUtilities(delayUtilities, delayVariants);
    addUtilities(willChangeUtilities, willChangeVariants);
  };
};
