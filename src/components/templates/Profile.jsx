import React, { useState } from 'react';
import { history } from '../../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { actionCreators as profileActions } from '../../redux/modules/profile.js';
import { actionCreators as matchingActions } from '../../redux/modules/matching.js';
import { actionCreators as ChatAction } from '../../redux/modules/chat';
import { getMatchingDB } from '../../api/modules/chemy';

// component
import { ProfileBootoms, ProfileAlert, ProfileHead } from '../modules/Profile';
import Spiner from '../../shared/Spiner';

const Profile = () => {
  const dispatch = useDispatch();

  // 주소에서 유저 ID를 받아옵니다
  const pathName = history.location.pathname;
  const name = pathName.split('/');

  //redux 요청 컴퍼넌트 생산 시 요청
  React.useEffect(() => {
    dispatch(profileActions.getProfileDB(name[name.length - 1]));
    dispatch(matchingActions.getMatchingListCheckDB());
    dispatch(ChatAction.getChatRoomListDB());
    return () => {
      dispatch(matchingActions.resetAction());
      dispatch(profileActions.resetAction());
      dispatch(ChatAction.resetList());
    };
  }, [name[3]]);

  // 스토어 데이터 관리
  const profile = useSelector(state => state.profile.list);
  const status = useSelector(state => state.matching.status);
  const MatchingLists = useSelector(state => state.matching.matchingLists);
  const RoomListNum = useSelector(state => state.chat.RoomNumbers);
  const State = status ? status : '';

  // 모달창 관리
  const [modal, setModal] = useState(false);
  const [connect, setConnect] = useState(false);
  const [Disconnect, setDisconnect] = useState(false);

  // 빠른 매칭 스피너
  const [loading, setLoading] = useState(false);
  const [Classification, setClassification] = useState(false);
  const [roomList, setroomList] = useState(false);

  const MadalOn = () => {
    setDisconnect(true);
  };

  const MadalSet = () => {
    setConnect(true);
  };

  const exit = () => {
    setConnect(false);
    setDisconnect(false);
  };

  const next = profileId => {
    dispatch(matchingActions.postMatchingDB(profileId));
    setModal(true);
    exit();
  };

  const After = () => {
    setDisconnect(true);
    dispatch(matchingActions.deleteMatchingChatDB(profile.userId));
    setModal(false);
    exit();
  };

  // 빠른매칭 재시작 관리
  const reTry = async () => {
    setLoading(true);
    await getMatchingDB().then(res => {
      setTimeout(function () {
        dispatch(matchingActions.resetAction());
        dispatch(profileActions.resetAction());
        dispatch(ChatAction.resetList());
        history.replace(`/profile/fast/${res.data.userId}`);
        setLoading(false);
      }, 1500);
    });
  };

  // React.useEffect(() => {
  //   history.puah('/');
  // }, [IdName]);

  //변경시 요청
  React.useEffect(() => {
    // 요청 받은 리스트의 patnerId 값에 지금 profile에 userId이 있는지 확인 한다.
    setClassification(MatchingLists.includes(profile.userId));
    return () => {
      setClassification(false);
    };
  }, [MatchingLists, profile]);

  React.useEffect(() => {
    setroomList(RoomListNum.includes(profile.userId));
    return () => {
      setroomList(false);
    };
  }, [RoomListNum, profile]);

  // 자동 사용자 선태
  React.useEffect(() => {
    if (profile.userId) {
      if (Classification) {
        next(profile.userId);
      }
      if (roomList) {
        next(profile.userId);
      }
    }
  }, [Classification, roomList, profile.userId]);

  return (
    <React.Fragment>
      <ProfileHead
        name={name}
        reTry={reTry}
        modal={modal}
        nickname={profile.nickname}
        State={State}
      />
      <ProfileBootoms modal={modal} MadalSet={MadalSet} MadalOn={MadalOn} />

      {/* 모달창 및 스피너 관리 */}
      {connect ? <ProfileAlert _type="connect" After={After} exit={exit} next={next} /> : null}
      {Disconnect ? (
        <ProfileAlert _type="disconnect" After={After} exit={exit} next={next} />
      ) : null}
      {loading ? <Spiner /> : null}
    </React.Fragment>
  );
};

export default Profile;
