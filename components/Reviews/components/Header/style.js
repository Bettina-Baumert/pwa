/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

const container = css({
  fontWeight: 500,
  margin: 0,
}).toString();

const reviewsLine = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `0 0 ${variables.gap.big}px`,
}).toString();

const averageRatingNumber = css({
  color: colors.primary,
  marginLeft: variables.gap.small,
}).toString();

const averageRatingText = css({
  marginLeft: variables.gap.big,
}).toString();

const noReviews = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: variables.gap.small,
}).toString();

export default {
  container,
  reviewsLine,
  averageRatingNumber,
  averageRatingText,
  noReviews,
};