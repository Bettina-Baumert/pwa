/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

const button = css({
  color: 'inherit',
  outline: 0,
  marginLeft: 10,
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  textOverflow: 'ellipsis',
  justifyContent: 'center',
  height: variables.filterbar.height,
  whiteSpace: 'nowrap',
}).toString();

const selection = css({
  fontSize: 17,
  lineHeight: 1,
  paddingTop: 1,
  alignSelf: 'center',
}).toString();

const icon = css({
  fontSize: '1.5rem',
  marginRight: 2,
}).toString();

const dropdown = css({
  position: 'absolute',
  width: '100%',
  zIndex: 2,
  top: variables.filterbar.height,
  left: 0,
  backgroundColor: colors.light,
  boxShadow: `inset 0 -1px ${colors.dividers}`,
}).toString();

const selectItem = css({
  padding: 0,
  outline: 0,
  overflow: 'hidden',
  margin: '0 20px',
  textAlign: 'left',
  width: 'calc(100% - 40px)',
  ':last-child': {
    marginBottom: variables.gap.big,
  },
  ':not(:last-child)': {
    boxShadow: `inset 0 -1px ${colors.dividers}`,
  },
}).toString();

const selectBox = css({
  flexGrow: 2,
}).toString();

export default {
  button,
  selection,
  icon,
  dropdown,
  selectItem,
  selectBox,
};