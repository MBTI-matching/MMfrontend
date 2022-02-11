import React from 'react';
import styled from 'styled-components';

import Header from '../layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as profileAction } from '../../../redux/modules/profile';
import { UserInfoPage, UserButton } from './index';

const UserPage = () => {
  const dispatch = useDispatch();
  const ListHeadClick = () => {
    dispatch(profileAction.resetAction());
  };
  const loading = useSelector(state => state.profile.loading);
  const hostInfo = useSelector(state => state.profile.list);
  return (
    <PageShadows className={loading ? 'open' : ''}>
      <Header point="absolute" Page _onClick={ListHeadClick}>
        {hostInfo.nickname}
      </Header>
      <UserInfoPage></UserInfoPage>
      <UserButton />
    </PageShadows>
  );
};

const PageShadows = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: -100%;
  top: 0px;
  z-index: 99;
  padding-top: 85px;
  transition: ease-out 0.2s;
  &.open {
    left: 0px;
  }
`;

export default UserPage;
