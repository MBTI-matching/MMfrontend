import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { kakaoLogin } from '../../api/modules/user';
import { setCookie } from '../../shared/Cookie';
import { editMyinfoDB, getMyMbitInfo, getMyPost } from '../../api/modules/user';

const GET_MBTIINFO = 'GET_MBTIINFO';
const GET_MYPOST = 'GET_MYPOST';
const RESET = 'RESET';

const UpMbtiInfo = createAction(GET_MBTIINFO, info => ({ info }));
const GetMypost = createAction(GET_MYPOST, (data, page) => ({ data, page }));
const reset = createAction(RESET, () => ({}));

const initialState = {
  mbti: {},
  MypostList: [],
  page: 0,
};

const logInDB = code => {
  return async function (dispatch, getState, { history }) {
    const res = await kakaoLogin(code);

    const token = res.headers.authorization;

    setCookie('authorization ', token);

    localStorage.setItem('userInfo', JSON.stringify(res.data));

    if (res.data.signStatus === false) {
      document.location.href = '/AddMyinfo';
    } else {
      document.location.href = '/';
    }
  };
};
const userInfoPut = multipartFile => {
  return async function (dispatch, getState, { history }) {
    const res = await editMyinfoDB(multipartFile);
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    history.push('/');
  };
};

const AddMyinfoDB = () => {
  return async function (dispatch, getState, { history }) {
    const res = await getMyMbitInfo();
    dispatch(UpMbtiInfo(res.data));
  };
};

const getMyPostDB = (page = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(reset());
      const data = await getMyPost(page);
      dispatch(GetMypost(data.data, page));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [GET_MBTIINFO]: (state, action) =>
      produce(state, draft => {
        draft.mbti = action.payload.info;
      }),
    [GET_MYPOST]: (state, action) =>
      produce(state, draft => {
        draft.MypostList = action.payload.data;
        draft.page = 0;
        draft.page = action.payload.page + 1;
      }),
    [RESET]: (state, action) =>
      produce(state, draft => {
        draft.postList = [];
        draft.page = 0;
      }),
  },
  initialState,
);

const actionCreators = {
  logInDB,
  AddMyinfoDB,
  userInfoPut,
  getMyPostDB,
};

export { actionCreators };
