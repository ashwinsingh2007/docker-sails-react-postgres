import * as types from '../actions';
const initialState = {
  loginDetails: {
    token: localStorage.getItem('token'),
    auth: !!localStorage.getItem('token')
  },
};
export default function (state = initialState, action) {
  const response = action.response;
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...state, loginDetails: response };
    case types.LOGIN_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
};