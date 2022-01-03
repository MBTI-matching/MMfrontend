import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

import { getMyinfoDB, getChemyDB } from '../../api/modules/chemy';

const GET_LIST = 'GET_LIST';
const CHEMY_LIST = 'CHEMY_LIST';
const RESET = 'RESET';
const SET_KATEGORIE = 'SET_KATEGORIE';
const RESET_KATEGORIE = 'RESET_KATEGORIE';

const getList = createAction(GET_LIST, data => ({ data }));
const chemyList = createAction(CHEMY_LIST, data => ({ data }));
const reset = createAction(RESET, () => ({}));
const setKategorie = createAction(SET_KATEGORIE, name => ({ name }));
const kategorieReset = createAction(RESET_KATEGORIE, () => ({}));

const initialState = {
  list: {
    gps: null,
    lat: null,
    lng: null,
    result: [],
  },
  kategorie: null,
};

const getListDB = (data = null) => {
  return async function (dispatch, getState, { history }) {
    getMyinfoDB()
      .then(res => {
        dispatch(getList(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const chemyListDB = locationID => {
  return async function (dispatch, getState, { history }) {
    getChemyDB(locationID)
      .then(res => {
        dispatch(chemyList(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_LIST]: (state, action) =>
      produce(state, draft => {
        const data = action.payload.data;
        draft.list.result = data.userList;
      }),
    [CHEMY_LIST]: (state, action) =>
      produce(state, draft => {
        const data = action.payload.data;
        draft.list.result = data.userList;

        draft.list.gps = data.location;
        draft.list.lat = data.latitude;
        draft.list.lng = data.longitude;
      }),
    [RESET]: (state, action) =>
      produce(state, draft => {
        draft.list.result = null;
        draft.list.gps = null;
        draft.list.lat = null;
        draft.list.lng = null;
      }),
    [SET_KATEGORIE]: (state, action) =>
      produce(state, draft => {
        draft.kategorie = action.payload.name;
      }),
    [RESET_KATEGORIE]: (state, action) =>
      produce(state, draft => {
        draft.kategorie = null;
      }),
  },
  initialState,
);

const actionCreators = {
  getListDB,
  getList,
  chemyListDB,
  reset,
  setKategorie,
  kategorieReset,
};

export { actionCreators };
