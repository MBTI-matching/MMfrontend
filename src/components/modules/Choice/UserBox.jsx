import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Box, Grid, Image, Tag } from '../../element';
import fmd_good from '../../../img/Icon/fmd_good.svg';
import Bit from '../Bit';
import { Skeleton } from './index';
function UserBox(props) {
  const { interestList, intro, mbti, nickname, profileImage, location } = props.data;

  const myMbti = Bit.find(x => {
    return x.name === mbti;
  });
  const List = interestList ? interestList : [];
  const loading = useSelector(state => state.profile.loading);

  React.useEffect(() => {}, [myMbti]);
  if (loading) {
    return (
      <Box black>
        <Grid gap="19px">
          <Grid row gap="14px">
            <Image
              round
              src={profileImage}
              mbti={mbti}
              _border="1px solid #555"
              width="60px"
              margin="0px"
            />
            <Grid width="72.5%" gap="7px">
              <Grid row gap="7px">
                <Name>{nickname}</Name>
                <Grid align="center" width="auto" row gap="2px">
                  <img src={fmd_good} alt={location} />
                  <Date> {location}</Date>
                </Grid>
                <Grid row gap="7px">
                  <img
                    style={{ width: '16px', height: '16px' }}
                    src={myMbti ? myMbti.image : ''}
                    alt={myMbti ? myMbti.name : ''}
                  />
                  <p>{myMbti ? myMbti.title : ''}</p>
                  <p style={{ color: myMbti ? myMbti.color : '' }}>{myMbti ? myMbti.name : ''}</p>
                </Grid>
                <Grid row gap="4.5px">
                  {List.map((x, idx) => {
                    return (
                      <Tag mbti={myMbti.name} key={idx} padding="3px 15px">
                        {x}
                      </Tag>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box padding="5px 12px" fontColor="#000" fontSize="12px">
            {intro}
          </Box>
        </Grid>
      </Box>
    );
  } else {
    return <Skeleton type="box" />;
  }
}
UserBox.defaultProps = {
  data: {
    date: '',
    interestList: [],
    intro: '',
    mbti: '',
    nickname: '',
    profileImg: '',
    roomId: '',
    userId: '',
    location: '',
  },
};
// date, interestList, intro, mbti, nickname, profileImg, roomId, userId, location
const Date = styled.p`
  font-size: ${props => props.theme.fontSizes.extraSmall};
  color: #8a8a8a;
`;
const Name = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: bold;
`;
const Text = styled.div`
  font-size: ${props => props.theme.fontSizes.maxSmall};
  color: ${props => props.theme.colors.gray_2};
  height: ${props => props.theme.fontSizes.maxSmall};
  overflow: hidden;
  word-break: keep-all;
  word-wrap: break-word;
`;
const Tx = styled.p`
  font-size: 14px;
`;
export default UserBox;
