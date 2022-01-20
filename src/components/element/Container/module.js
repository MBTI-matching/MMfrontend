import styled from 'styled-components';
import Phone from '../../../img/Icon/phone.png';

// 크롬 ios 주소창까지 포함한 height값
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
export const ImgBg = styled.div`
  background-image: url(${Phone});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 858px;
  width: 427px;
  position: absolute;
  left: 58%;
  top: 54%;
  margin: -429px 0 0 -213px;
  z-index: 99;
  overflow: hidden;
  @media only screen and (max-width: 1050px) {
    left: 50%;
    top: 50%;
    background-image: none;
    height: 100vh;
    transform: translate(-50%, -50%);
    margin: 0px;
  }
  @media only screen and (max-width: 450px) {
    background-image: none;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    transform: none;
  }
`;
export const ContainerStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 372px;
  max-height: 812px;
  height: 100%;
  padding-top: 82px;
  padding-bottom: 89px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 43px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 21px;
  transform: translateX(-50%);
  @media only screen and (max-width: 1050px) {
    height: 100vh;
    max-height: 100%;
    left: 0px;
    transform: none;
    top: 0px;
    max-width: 100%;
    border-radius: 0px;
    padding: 47px 0 87px 0;
  }
  @media only screen and (max-width: 450px) {
    position: absolute;
    max-width: 100%;
    max-height: 100vh;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    height: calc(var(--vh, 1vh) * 100);
    transform: none;
    border-radius: 0px;
  }
`;

export const BgImg = styled.img`
  position: absolute;
  left: 57%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
