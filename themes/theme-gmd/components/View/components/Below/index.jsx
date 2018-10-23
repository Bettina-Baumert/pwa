import React from 'react';
import Consume from '@shopgate/pwa-common/components/Consume';
import { ViewContext } from '@shopgate/pwa-common/providers';

const map = {
  bottom: 'bottom',
};

/**
 * @returns {JSX}
 */
const ViewBelow = () => (
  <Consume context={ViewContext} props={map}>
    {({ bottom }) => <div aria-hidden style={{ flexShrink: 0, height: `${bottom}px` }} />}
  </Consume>
);

export default ViewBelow;

