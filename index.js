const _ = require('lodash');

const timeIsZero = function(time) {
  return _.includes(['0', '0s', '0ms'], time);
};

module.exports = function() {
  return ({ theme, variants, e, addBase, addUtilities }) => {
    const defaultPropertyTheme = {
      'default': 'auto',
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
      'default': '0ms',
      'fast': '200ms',
      'medium': '400ms',
      'slow': '600ms',
      'slower': '800ms',
      'slowest': '1000ms',
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
      '200': '200ms',
      '400': '400ms',
      '600': '600ms',
      '800': '800ms',
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

    const defaultProperty = _.defaults({}, propertyTheme, defaultPropertyTheme).default;
    const defaultDuration = _.defaults({}, durationTheme, defaultDurationTheme).default;
    const defaultTimingFunction = _.defaults({}, timingFunctionTheme, defaultTimingFunctionTheme).default;
    const defaultDelay = _.defaults({}, delayTheme, defaultDelayTheme).default;

    const baseProperty = (function() {
      let baseProperty = defaultProperty;
      if (baseProperty === 'auto') {
        if (timeIsZero(defaultDuration)) {
          baseProperty = 'all';
        }
        else {
          baseProperty = 'none';
        }
      }
      if (baseProperty === 'all') {
        baseProperty = null;
      }
      return baseProperty;
    })();
    const baseDuration = timeIsZero(defaultDuration) ? null : defaultDuration;
    const baseTimingFunction = defaultTimingFunction === 'ease' ? null : defaultTimingFunction;
    const baseDelay = timeIsZero(defaultDelay) ? null : defaultDelay;

    const baseStyles = (function() {
      if (baseProperty === null && baseDuration === null && baseTimingFunction === null && baseDelay === null) {
        return null;
      }
      return {
        '*, *::before, *::after': {
          transitionProperty: _.isArray(baseProperty) ? baseProperty.join(', ') : baseProperty,
          transitionDuration: baseDuration,
          transitionTimingFunction: baseTimingFunction,
          transitionDelay: baseDelay,
        }
      };
    })();

    const propertyUtilities = _.fromPairs(
      _.map(propertyTheme, (value, modifier) => {
        if (modifier === 'default') {
          return [];
        }
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
            transitionDuration: value,
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
            transitionDelay: value,
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

    if (baseStyles) {
      addBase(baseStyles);
    }
    addUtilities(propertyUtilities, propertyVariants);
    addUtilities(durationUtilities, durationVariants);
    addUtilities(timingFunctionUtilities, timingFunctionVariants);
    addUtilities(delayUtilities, delayVariants);
    addUtilities(willChangeUtilities, willChangeVariants);
  };
};
