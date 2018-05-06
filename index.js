const _ = require('lodash');

module.exports = ({
  variants = {},
  properties = {},
  durations = {},
  willChange = {},
} = {}) =>
  ({ e, addUtilities }) => {
    const defaultDuration = durations.default || '500ms';
    addUtilities(
      {
        ...Object.assign(
          {},
          ..._.map(properties, (values, name) => ({
            [`.transition-${e(name)}`]: {
              transition: _.isArray(values)
                ? values.map(value => `${value} ${defaultDuration}`).join(', ')
                : `values ${values !== 'none' ? ` ${defaultDuration}` : ''}`,
            },
          })),
          ..._.map(durations, (value, name) => {
            if (name === 'default') {
              return null;
            }
            return {
              [`.transition-duration-${e(name)}`]: { transitionDuration: value },
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
