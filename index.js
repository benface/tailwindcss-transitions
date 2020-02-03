const _ = require('lodash');

const time = time => _.isNumber(time) ? `${time}ms` : time;

module.exports = function() {
  return ({ theme, variants, e, addBase, addUtilities }) => {
    const defaultPropertyTheme = {
      'none': 'none',
      'all': 'all',
      'default': ['background-color', 'border-color', 'color', 'fill', 'stroke', 'opacity', 'box-shadow', 'transform'],
      'colors': ['background-color', 'border-color', 'color', 'fill', 'stroke'],
      'bg': 'background-color',
      'border': 'border-color',
      'color': 'color',
      'opacity': 'opacity',
      'shadow': 'box-shadow',
      'transform': 'transform',
    };
    const defaultPropertyVariants = ['responsive'];
    const defaultDurationTheme = {
      'default': '250ms',
      '0': '0ms',
      '50': '50ms',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '250': '250ms',
      '300': '300ms',
      '400': '400ms',
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

    const defaultDuration = time(_.defaults({}, durationTheme, defaultDurationTheme).default);
    const defaultTimingFunction = _.defaults({}, timingFunctionTheme, defaultTimingFunctionTheme).default;
    const defaultDelay = time(_.defaults({}, delayTheme, defaultDelayTheme).default);

    const baseDuration = _.includes(['0', '0s', '0ms'], defaultDuration) ? null : defaultDuration;
    const baseTimingFunction = defaultTimingFunction === 'ease' ? null : defaultTimingFunction;
    const baseDelay = _.includes(['0', '0s', '0ms'], defaultDelay) ? null : defaultDelay;

    const baseStyles = {
      ...(function() {
        if (baseDuration === null && baseTimingFunction === null && baseDelay === null) {
          return {};
        }
        return {
          '*, *::before, *::after': {
            '--transition-duration': baseDuration,
            '--transition-timing-function': baseTimingFunction,
            '--transition-delay': baseDelay,
          }
        };
      })(),
    };

    const durationStyles = value => {
      if (baseDuration === null) {
        return {
          transitionDuration: time(value),
        };
      }
      return {
        '--transition-duration': time(value),
        transitionDuration: [time(value), 'var(--transition-duration)'],
      };
    };

    const timingFunctionStyles = value => {
      if (baseTimingFunction === null) {
        return {
          transitionTimingFunction: value,
        };
      }
      return {
        '--transition-timing-function': value,
        transitionTimingFunction: [value, 'var(--transition-timing-function)'],
      };
    };

    const delayStyles = value => {
      if (baseDelay === null) {
        return {
          transitionDelay: time(value),
        };
      }
      return {
        '--transition-delay': time(value),
        transitionDelay: [time(value), 'var(--transition-delay)'],
      };
    };

    const defaultDurationStyles = {
      transitionDuration: baseDuration === null ? null : [baseDuration, 'var(--transition-duration)'],
    };

    const defaultTimingFunctionStyles = {
      transitionTimingFunction: baseTimingFunction === null ? null : [baseTimingFunction, 'var(--transition-timing-function)'],
    };

    const defaultDelayStyles = {
      transitionDelay: baseDelay === null ? null : [baseDelay, 'var(--transition-delay)'],
    };

    const propertyUtilities = _.fromPairs(
      _.map(propertyTheme, (value, modifier) => {
        return [
          `.${e(`transition${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            transitionProperty: _.isArray(value) ? value.join(', ') : value,
            ...defaultDurationStyles,
            ...defaultTimingFunctionStyles,
            ...defaultDelayStyles,
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
            ...durationStyles(value),
            ...defaultTimingFunctionStyles,
            ...defaultDelayStyles,
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
            ...timingFunctionStyles(value),
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
            ...delayStyles(value),
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
