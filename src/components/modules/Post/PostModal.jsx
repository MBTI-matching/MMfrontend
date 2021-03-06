import React from 'react';
import styled from 'styled-components';

// Redux
import { useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../../../redux/modules/post';

// Js
import { history } from '../../../redux/configureStore';

const PostModal = props => {
  const dispatch = useDispatch();

  // props값 관리
  const { boardId, out, commentState, commenttId } = props;

  // 게시물 삭제
  const deletePost = () => {
    dispatch(postActions.deletePostDB(boardId));
  };

  // 댓글 삭제
  const deleteComment = () => {
    dispatch(postActions.deleteCommentsDB(boardId, commenttId));
    out();
  };

  if (commentState) {
    return (
      <>
        <ModalBox>
          <BtnBox>
            <button style={{ color: 'red' }} onClick={deleteComment}>
              댓글 삭제하기
            </button>
          </BtnBox>
          <ExitBtn onClick={out}>취소</ExitBtn>
        </ModalBox>
      </>
    );
  }

  return (
    <>
      <ModalBox>
        <BtnBox>
          <button
            onClick={() => {
              history.push(`/postEdit/${boardId}`);
            }}
          >
            게시글 수정하기
          </button>
          <button onClick={deletePost}>게시글 삭제하기</button>
        </BtnBox>
        <ExitBtn onClick={out}>취소</ExitBtn>
      </ModalBox>
    </>
  );
};

const ModalBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110vh;
  z-index: 51;
  background-color: rgba(0, 0, 0, 0.5);
  animation: postModal-show 0.5s;
  @keyframes postModal-show {
    from {
      opacity: 0;
      margin-bottom: -5%;
    }
    to {
      opacity: 1;
      margin-bottom: 0%;
    }
  }
`;

const ExitBtn = styled.button`
  width: 90%;
  padding: 15px;
  z-index: 52;
  position: absolute;
  border: none;
  cursor: pointer;
  left: 50%;
  bottom: 30px;
  margin-left: -45%;
  border-radius: 15px;
  font-weight: 600;
  color: #007aff;
  font-size: 20px;
  background: #fff;
`;

const BtnBox = styled.div`
  width: 90%;
  position: absolute;
  border: none;
  cursor: pointer;
  background: #fff;
  left: 50%;
  bottom: 90px;
  margin-left: -45%;
  border-radius: 15px;
  font-size: 20px;
  opacity: 0.8;
  overflow: hidden;
  button {
    padding: 15px;
    font-size: 20px;
    width: 100%;
    border: none;
    background: #fff;
    color: blue;
    cursor: pointer;
    font-weight: 500;
    box-sizing: border-box;
  }
  button:nth-child(2) {
    border-top: 1px solid #333;
    color: red;
  }
`;

export default PostModal;
