import * as types from '../actions';
const initialState = {
  authDetails: {
    token: localStorage.getItem('token'),
    auth: !!localStorage.getItem('token')
  },
};
export default function(state = initialState, action) {
  let response = action.response;
  switch(action.type) {
    case types.USER_DATA:
      return { ...state, authDetails: response};
    case types.REGISTER_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}