const _ = require('lodash');

module.exports = ({
  variants = {},
  properties = {},
  durations = {},
  timingFunctions = {},
  delays = {},
  willChange = {},
} = {}) =>
  ({ e, addUtilities }) => {
    const defaultDuration = durations.default || '500ms';
    addUtilities(
      {
        '.transition-none': { transition: 'none' },
        ...Object.assign(
          {},
          ..._.map(properties, (values, name) => ({
            [`.transition-${e(name)}`]: {
              transition: (() => {
                if (!_.isArray(values)) {
                  values = [values];
                }
                return values.map(value => 
                  `${value} ${defaultDuration}` + 
                  (timingFunctions.default ? ' ' + timingFunctions.default : '') +
                  (delays.default ? ' ' + delays.default : '')
                ).join(', ');
              })(),
            }
          })),
          ..._.map(durations, (value, name) => {
            if (name === 'default') {
              return null;
            }
            return {
              [`.transition-duration-${e(name)}`]: { transitionDuration: value },
            };
          }),
          ..._.map(timingFunctions, (value, name) => {
            if (name === 'default') {
              return null;
            }
            return {
              [`.transition-timing-${e(name)}`]: { transitionTimingFunction: value },
            };
          }),
          ..._.map(delays, (value, name) => {
            if (name === 'default') {
              return null;
            }
            return {
              [`.transition-delay-${e(name)}`]: { transitionDelay: value },
            };
          }),
          ..._.map(willChange, (value, name) => ({
            [`.will-change-${e(name)}`]: { willChange: value },
          })),
        ),
      },
      variants,
    );
  };
