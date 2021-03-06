import React from 'react';
import styled from 'styled-components';
import { RowGridStyle, RowGridList } from './module';

const Grid = props => {
  const {
    children,
    _onClick,
    // props Css
    width,
    height,
    color,
    padding,
    margin,
    row,
    justify,
    align,
    gap,
    border,
    // 추가 props
    borderTop,
    borderBot,
    _ref,
    list,
    Btop,
    pad,
    wrap,
    Zindex,
  } = props;

  const styles = {
    width,
    height,
    color,
    pad,
    padding,
    margin,
    justify,
    align,
    gap,
    border,
    // 추가 css
    Btop,
    borderTop,
    borderBot,
    wrap,
    Zindex,
  };

  // flex row grid
  if (row) {
    return (
      <RowGridStyle {...styles} onClick={_onClick}>
        {children}
      </RowGridStyle>
    );
  }

  if (list) {
    return (
      <RowGridList onClick={_onClick} {...styles}>
        {' '}
        {children}
      </RowGridList>
    );
  }

  // flex colum grid
  return (
    <GridStyle ref={_ref} {...styles} onClick={_onClick}>
      {children}
    </GridStyle>
  );
};

Grid.defaultProps = {
  width: '100%',
  height: 'auto',
  color: null,
  padding: '0',
  margin: '0',
  justify: null,
  align: null,
  gap: null,
  border: 'none',
  borderTop: '0px',
  borderBot: '0px',
  pad: '12px 33px',
  Zindex: 'auto',
};

const GridStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${props => props.border};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => (props.color ? props.color : 'transparent')};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.align ? props.align : 'stretch ')};
  gap: ${props => (props.gap ? props.gap : '0')};
  z-index: ${props => props.Zindex};
  border-bottom: ${props => props.borderBot};
  border-top: ${props => props.borderTop};
`;

export default Grid;
