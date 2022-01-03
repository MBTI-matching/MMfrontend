import React from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import { Input, Grid, Button } from '../../element';
import { MyPartBox, Mymbtibtn, Myinterests, MyBottom } from './index';

function MyEdit(props) {
  const { Open, _onClick } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [nickname, setNickname] = React.useState(userInfo.nickname);
  const [textarea, setTextarea] = React.useState(userInfo.intro);

  const [Mbti, SetMbti] = React.useState(userInfo.mbti);
  const SetEmit = e => {
    SetMbti(e);
  };

  return (
    <Body className={Open ? 'Open' : 'Close'}>
      {' '}
      <Header point="relative" _on={_onClick}>
        내 정보 수정하기
      </Header>
      <Grid padding="20px 30px" gap="20px">
        <MyPartBox title="나의 이름">
          <Input
            _borderColor="#ECECEC"
            _bg="#ECECEC"
            _padding="8px 14px"
            _value={nickname}
            _onChange={e => {
              setNickname(e.target.value);
            }}
          />
        </MyPartBox>
        <MyPartBox title="나의 MBTI">
          <Mymbtibtn mbti={Mbti} emit={SetEmit}></Mymbtibtn>
        </MyPartBox>
        <MyPartBox title="관심사 설정">
          <Myinterests></Myinterests>
        </MyPartBox>
        <MyPartBox title="한줄 소개">
          <Input
            _type="textarea"
            _value={textarea}
            _onChange={e => {
              setTextarea(e.target.value);
            }}
          />
        </MyPartBox>
      </Grid>
      <MyBottom>내 정보 수정하기</MyBottom>
    </Body>
  );
}
const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: -100%;
  top: 0px;
  z-index: 999;
  opacity: 0;
  transition: all ease 0.3s;
  .swiper-container {
    padding: 2px;
  }
  &.Open {
    opacity: 1;
    left: 0px;
  }
`;
export default MyEdit;
