import React from 'react';
import styled from 'styled-components';
import { history } from '../../../redux/configureStore';

//컴포넌트
import { Button, Alert } from '../../element/index';
import EndAlert from '../../modules/Tutorial/EndAlert';

// 이미지
import main from '../../../img/Icon/main.svg';
import main_area from '../../../img/Icon/main_area.svg';
import main_list from '../../../img/Icon/main_list.svg';
import profile from '../../../img/Icon/profile.svg';
import request from '../../../img/Icon/request.svg';
import chat_list from '../../../img/Icon/chat_list.svg';
import chat_room from '../../../img/Icon/chat_room.svg';

// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

const Tutorial = props => {
  const [Bye, setBye] = React.useState(false);

  const exit = () => {
    setBye(false);
  };

  const start = () => {
    history.push('/');
  };

  return (
    <SwiperBox>
      <ButtonBox>
        <Button
          size="10px"
          BtnAdd
          _onClick={() => {
            setBye(true);
          }}
        >
          나가기
        </Button>
        {Bye ? (
          <Alert isButton yes={start} no={exit}>
            <EndAlert />
          </Alert>
        ) : null}
      </ButtonBox>
      <Swiper
        style={{ height: '90%' }}
        navigation
        pagination
        keyboard
        mousewheel
        spaceBetween={15}
        slidesPerView={1}
      >
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${main})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${main_area})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${main_list})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${profile})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${request})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${chat_list})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
        <SwiperSlide>
          <ImageBOX
            style={{ backgroundImage: `url(${chat_room})`, width: '100%', height: '100%' }}
          ></ImageBOX>
        </SwiperSlide>
      </Swiper>
    </SwiperBox>
  );
};
const SwiperBox = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(22, 22, 22);
  z-index: 9999;
  transition: all 0.2s;
  .swiper-button-next {
    color: white;
    padding: 0px 0px 0px 13px;
  }
  .swiper-button-prev {
    color: white;
    padding: 0px 13px 0px 0px;
  }
  .swiper-pagination {
    color: white;
  }
`;

const ImageBOX = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  background-position: center;
  background-repeat: no-repeat;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5% 10% 3% 0px;
`;

export default Tutorial;
