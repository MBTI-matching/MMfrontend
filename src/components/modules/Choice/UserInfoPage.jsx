import React from 'react';
import Header from '../layout/Header';
import { Grid } from '../../element';
import { UserBox, UserPre, UserButton } from './index';

import { useSelector, useDispatch } from 'react-redux';

const UserInfoPage = () => {
  const hostInfo = useSelector(state => state.profile.list);
  return (
    <div>
      <Grid padding="18px 30px" gap="19px">
        <UserBox data={hostInfo} />
        <UserPre
          nickname={hostInfo.nickname}
          profileImg={hostInfo.profileImage}
          mbti={hostInfo.mbti}
        />
      </Grid>
    </div>
  );
};

export default UserInfoPage;
