import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import * as styles from './style';

/**
* @param {Object} props The component props.
* @returns {JSX}
*/
const TabBarItem = ({
  badge: Badge, color, icon: Icon, onClick, label,
}) => (
  <button
    className={styles.button}
    onClick={onClick}
    style={{ color }}
  >
    <div className={styles.icon}>{Icon}</div>
    <I18n.Text className={styles.label} string={label} />
    {Badge && <Badge />}
  </button>
);

TabBarItem.propTypes = {
  icon: PropTypes.shape().isRequired,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  badge: PropTypes.func,
  color: PropTypes.string,
};

TabBarItem.defaultProps = {
  badge: null,
  color: null,
};

export default TabBarItem;
