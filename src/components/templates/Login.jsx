import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Grid } from '../element/index';
import Header from '../modules/layout/Header';
import Start from '../modules/Start';
import { WeIpdress } from '../../shared/Ipadress';
import { actionCreators as userAction } from '../../redux/modules/user';
import { history } from '../../redux/configureStore.js';
const Login = props => {
  const dispatch = useDispatch();
  const we = WeIpdress();
  const kakaoclick = () => {
    dispatch(userAction.logInDB());
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=5d14d9239c0dbefee951a1093845427f&redirect_uri=${we}/user/kakao/callback&response_type=code`;
  };
  const [open, setopen] = React.useState(false);

  React.useEffect(() => {
    setopen(true);
  }, []);

  const no = () => {
    setopen(false);
  };

  return (
    <>
      <Header main login>
        로그인
      </Header>
      {open ? <Start No={no} /> : null}
      <Point>
        <Grid margin="53px 0px 0px 0px">
          <LoginBox>
            <p>카카오톡으로 간편로그인을 진행해주세요!</p>
            <KaKaoBtn onClick={kakaoclick}>카카오톡 간편로그인</KaKaoBtn>
            <SampleBtn
              onClick={() => {
                history.push('/sample');
              }}
            >
              비즈케미 둘러보기
            </SampleBtn>
          </LoginBox>
        </Grid>
      </Point>
    </>
  );
};
const Point = styled.div`
  position: absolute;
  left: 50%;
  top: 41%;
  transform: translate(-50%, -50%);
  width: 100%;
`;
const KaKaoBtn = styled.button`
  background-color: #fde500;
  padding: 0;
  margin: 0;
  width: 300px;
  height: 45px;
  border: 1px solid transparent;
  border-radius: 90px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 37%;
  gap: 12px;
  transform: translateX(-50%);
`;
const SampleBtn = styled.button`
  padding: 0;
  margin: 0;
  width: 300px;
  height: 45px;
  border: 1px solid transparent;
  border-radius: 90px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
export default Login;
