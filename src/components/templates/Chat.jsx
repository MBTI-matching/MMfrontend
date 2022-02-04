import React from 'react';
import styled from 'styled-components';
import { IPadress } from '../../shared/Ipadress';
import { useSelector } from 'react-redux';
import Footer from '../modules/layout/Footer';
import Header from '../modules/layout/Header';

import { Grid } from '../element';

import { ChatForm, ChatList, Announcement } from '../modules/Chat/';
import { useDispatch } from 'react-redux';
import { actionCreators as ChatAction } from '../../redux/modules/chat';

//통신
import { getCookie } from '../../shared/Cookie';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import moment from 'moment';

const Chat = () => {
  // 받은 요청 수
  const dispatch = useDispatch();
  const Room = useSelector(state => state.chat.Room);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [In, Inset] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [enter, SetEnter] = React.useState(false);
  const [Paging, setPaging] = React.useState(false);
  const [roomNum, setroomNum] = React.useState('');
  const [Data, setData] = React.useState({});
  const [EmitData, SetEmitData] = React.useState({});

  const IP = IPadress();
  const devTarget = `${IP}/ws-stomp`;
  const TOKEN = getCookie('authorization');
  const sock = new SockJS(devTarget);
  const ws = Stomp.over(sock);

  const date = `${moment().hours()}:${moment().minutes()}`;
  const Catchdata = data => {
    SetEmitData(data);
  };
  const BackHistory = () => {
    setPaging(!Paging);
    setData({});
    setroomNum('');
    SetEnter(false);
    dispatch(ChatAction.ms_resetList());
  };
  //스크롤 엑션
  const scrollTomBottom = () => {
    if (EmitData.current) {
      EmitData.current.scrollTop = EmitData.current.scrollHeight;
    }
  };

  const wsConnectSubscribe = Id => {
    try {
      ws.debug = null;
      ws.connect({ token: TOKEN }, () => {
        ws.subscribe(`/sub/chat/room/${Id}`, data => {
          let recv = JSON.parse(data.body);
          dispatch(ChatAction.PostChatting(recv));
          scrollTomBottom();
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(() => {
      // 통신망이 열려있을때 통신할 준비가 되었을때
      if (ws.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(ws, callback);
      }
    }, 0.001);
  };

  // 다른 방을 클릭하거나 뒤로가기 버튼 클릭시 연결해제 및 구독해제
  const wsDisConnectUnsubscribe = () => {
    try {
      ws.debug = null;
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
          clearTimeout(waitForConnection);
        },
        { token: TOKEN },
      );
    } catch (e) {
      console.log('연결 구독 해체 에러', e);
    }
  };

  // 채팅 보내기
  const sendMessage = ms => {
    try {
      waitForConnection(ws, () => {
        ws.debug = null;
        ws.send('/pub/chat/message', { token: TOKEN }, JSON.stringify(ms));
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 채팅방 완전히 나가기
  const sendStop = () => {
    try {
      const ms = {
        type: 'QUIT',
        roomId: roomNum,
        message: '매칭상대가 방을 나갔습니다.',
        date: date,
      };
      sendMessage(ms);
      BackHistory();
    } catch (e) {
      console.log('메세지전송 상태', ws.ws.readyState);
    }
  };

  // 채팅방 입장하기
  const sendStart = () => {
    try {
      const ms = {
        type: 'ENTER',
        roomId: roomNum,
        message: '방에 입장 하였습니다.',
        date: date,
      };
      sendMessage(ms);
    } catch (e) {
      console.log('메세지전송 상태', ws.ws.readyState);
    }
  };

  React.useEffect(() => {
    if (roomNum) {
      try {
        wsConnectSubscribe(roomNum);
        if (enter) {
          sendStart();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [roomNum, enter]);

  React.useEffect(() => {
    dispatch(ChatAction.getChatRoomListDB());
    return () => {
      dispatch(ChatAction.resetList());
      dispatch(ChatAction.ms_resetList());
      BackHistory();
    };
  }, []);

  return (
    <div>
      <Header>채팅</Header>
      <Announcement></Announcement>
      <Grid height="100%">
        <ScrollBox>
          <Boad className={open ? 'Open' : ''}>
            {Room.map((x, idx) => {
              return (
                <ChatList
                  OnClick={e => {
                    //api 요청 보내면서 유저 정보를 가지고 온다. redux에 저장 해서 userBox에서 가지고 온다.
                    setPaging(!Paging);
                    setData(x);
                    //입장한 채팅방 메세지 정보 가져 오기
                    setroomNum(x.roomId);
                    dispatch(ChatAction.getRecentlyMsListDB(x.roomId, 0));
                    //채팅방 입장 할때
                    SetEnter(true);
                    Inset(true);
                  }}
                  data={x}
                  key={idx + x.roomId}
                ></ChatList>
              );
            })}
          </Boad>
        </ScrollBox>
      </Grid>
      <ChatForm
        sendStop={sendStop}
        sendMessage={sendMessage}
        wsDisConnectUnsubscribe={wsDisConnectUnsubscribe}
        Emit={Catchdata}
        Boo={Paging}
        data={Data !== {} ? Data : ''}
        _onClick={BackHistory}
      ></ChatForm>
      <Footer />
    </div>
  );
};
const Boad = styled.div`
  height: 0px;
  overflow: hidden;
  position: relative;
  top: -100px;
  left: 0px;
  z-index: 1;
  opacity: 0;
  transition: all ease 0.3s;
  &.Open {
    height: auto;
    overflow: auto;
    opacity: 1;
    top: 0px;
  }
`;
const ScrollBox = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
`;

export default Chat;
