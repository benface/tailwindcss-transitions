const _ = require('lodash');

module.exports = function(options = {}) {
  return ({ config, e, addBase, addUtilities }) => {
    const defaultPropertyTheme = {
      'default': 'all',
      'none': 'none',
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
      'default': 'contents',
      'auto': 'auto',
      'scroll': 'scroll-position',
      'opacity': 'opacity',
      'transform': 'transform',
    };
    const defaultWillChangeVariants = ['responsive'];

    const defaultDuration = config('theme.transitionDuration.default', defaultDurationTheme.default);
    const defaultTimingFunction = config('theme.transitionTimingFunction.default', defaultTimingFunctionTheme.default);
    const defaultDelay = config('theme.transitionDelay.default', defaultDelayTheme.default);
    const baseStyles = {
      '*': {
        transitionProperty: 'none',
        transitionDuration: _.includes(['0', '0s', '0ms'], defaultDuration) ? null : defaultDuration,
        transitionTimingFunction: defaultTimingFunction === 'ease' ? null : defaultTimingFunction,
        transitionDelay: _.includes(['0', '0s', '0ms'], defaultDelay) ? null : defaultDelay,
      }
    };

    const propertyUtilities = _.fromPairs(
      _.map(config('theme.transitionProperty', defaultPropertyTheme), (value, modifier) => {
        return [
          `.${e(`transition${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            transitionProperty: _.isArray(value) ? value.join(', ') : value,
          },
        ];
      })
    );

    const durationUtilities = _.fromPairs(
      _.map(config('theme.transitionDuration', defaultDurationTheme), (value, modifier) => {
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
      _.map(config('theme.transitionTimingFunction', defaultTimingFunctionTheme), (value, modifier) => {
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
      _.map(config('theme.transitionDelay', defaultDelayTheme), (value, modifier) => {
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
      _.map(config('theme.willChange', defaultWillChangeTheme), (value, modifier) => {
        return [
          `.${e(`will-change${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            willChange: value,
          },
        ];
      })
    );

    addBase(baseStyles);
    addUtilities(propertyUtilities, config('variants.transitionProperty', defaultPropertyVariants));
    addUtilities(durationUtilities, config('variants.transitionDuration', defaultDurationVariants));
    addUtilities(timingFunctionUtilities, config('variants.transitionTimingFunction', defaultTimingFunctionVariants));
    addUtilities(delayUtilities, config('variants.transitionDelay', defaultDelayVariants));
    addUtilities(willChangeUtilities, config('variants.willChange', defaultWillChangeVariants));
  };
};
