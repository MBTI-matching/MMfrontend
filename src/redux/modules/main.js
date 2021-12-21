import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const GET_LIST = 'GET_LIST';

const getList = createAction(GET_LIST, () => ({}));

const initialState = {
  list: [],
};

const getListDB = (post_id = null) => {
  return function (dispatch, getState, { history }) {};
};

export default handleActions(
  {
    [GET_LIST]: (state, action) => produce(state, draft => {}),
  },
  initialState,
);

const actionCreators = {
  getListDB,
};

export { actionCreators };
