import { arrayOf, node, oneOfType } from 'prop-types';

export const childrenProps = oneOfType([
  arrayOf(node),
  node,
]);
