import styled from 'styled-components';

export const TagBlack = styled.div`
  display: inline-block;
  padding: ${props => (props.padding ? props.padding : '4px 9px')};
  background-color: ${props => (props.bg ? props.bg : props.theme.colors.gray_2)};
  border: ${props => props.border};
  color: ${props => props.color};
  font-size: ${props => (props.size ? props.size : props.theme.fontSizes.maxSmall)};
  border-radius: ${props => props.theme.radius.tag};
`;

export const TagStyle = styled.div`
  display: inline-block;
  padding: ${props => (props.padding ? props.padding : '7px 20px')};
  border: 1px solid #000;
  text-align: center;
  border-color: ${props => props.color};
  color: ${props => props.color};
  font-size: ${props => (props.size ? props.size : props.theme.fontSizes.extraSmall)};
  border-radius: ${props => props.theme.radius.tag};
  height: ${props => props.height};
  background-color: ${props => (props.bg ? props.bg : '')};
  box-shadow: ${props => (props.shadow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '')};
`;
