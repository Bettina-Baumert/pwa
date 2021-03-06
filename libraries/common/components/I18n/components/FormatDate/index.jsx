import React from 'react';
import PropTypes from 'prop-types';

/**
 * Formats a date.
 * @param {Object} props The component props.
 * @param {Object} context The component context.
 * @returns {JSX}
 */
const FormatDate = (props, context) => (
  <span>
    {FormatDate.format(props, context)}
  </span>
);

FormatDate.format = (props, context) => {
  if (!context.i18n) {
    return props.timestamp;
  }

  const { _d } = context.i18n();

  return _d(props.timestamp, props.format);
};

FormatDate.propTypes = {
  timestamp: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  format: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

FormatDate.defaultProps = {
  format: 'medium',
};

FormatDate.contextTypes = {
  i18n: PropTypes.func,
};

export default FormatDate;
