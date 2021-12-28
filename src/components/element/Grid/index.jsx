import React from 'react';
import styled from 'styled-components';
import { RowGridStyle } from './module';

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
    borderTop,
    borderBot,
  } = props;

  const styles = {
    width,
    height,
    color,
    padding,
    margin,
    justify,
    align,
    gap,
    border,
    borderTop,
    borderBot,
  };

  if (row) {
    return (
      <RowGridStyle {...styles} onClick={_onClick}>
        {children}
      </RowGridStyle>
    );
  }

  return (
    <GridStyle {...styles} onClick={_onClick}>
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
};

const GridStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: ${props => props.border};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => (props.color ? props.color : props.theme.colors.white)};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: ${props => (props.align ? props.align : 'stretch ')};
  gap: ${props => (props.gap ? props.gap : '0')};
`;

export default Grid;
