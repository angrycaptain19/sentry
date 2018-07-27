import React from 'react';
import styled, {css} from 'react-emotion';
import {Flex} from 'grid-emotion';
import space from 'app/styles/space';

const inlineStyle = p =>
  p.inline
    ? css`
        align-items: center;
      `
    : css`
        flex-direction: column;
        align-items: stretch;
      `;

const highlightedStyle = p =>
  p.highlighted
    ? css`
        outline: 1px solid ${p.theme.purple};
      `
    : '';

const borderStyle = p =>
  p.stacked
    ? ''
    : css`
        border-bottom: 1px solid ${p.theme.borderLight};
      `;

const getPadding = p =>
  p.stacked && !p.inline
    ? css`
        padding: 0 ${p.hasControlState ? 0 : space(2)} ${space(1)} 0;
      `
    : css`
        padding: ${space(2)} ${p.hasControlState ? 0 : space(2)} ${space(2)} ${space(2)};
      `;

/**
 * `hasControlState` - adds padding to right if this is false
 */
const FieldWrapper = styled(({highlighted, inline, hasControlState, p, ...props}) => (
  <Flex {...props} />
))`
  ${getPadding};
  transition: background 0.15s;

  ${borderStyle};
  ${inlineStyle};
  ${highlightedStyle};

  &:last-child {
    border-bottom: none;
    ${p => (p.stacked ? 'padding-bottom: 0' : '')};
  }
`;

export default FieldWrapper;
