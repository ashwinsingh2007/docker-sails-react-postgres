import { put, call } from 'redux-saga/effects';
import { registerUserService, loginUserService, userDetailsService } from '../services/authenticationService';

import * as types from '../actions'

export function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    if (response && response.token)
      localStorage.setItem('token', response.token);
    yield put({ type: types.USER_DATA, response })
    if(response.error) {
      yield put({ type: types.REGISTER_USER_ERROR, response: {message: response.error} });
    }
  } catch (error) {
    yield put({ type: types.REGISTER_USER_ERROR, response: {message: error} });
  }
}

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    if (response && response.token)
      localStorage.setItem('token', response.token);
    // yield put({ type: types.USER_DATA, response })
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

export function* logoutSaga(payload) {
  try {
    localStorage.removeItem('token');
    yield put({
      type: types.LOGIN_USER_SUCCESS, response: {
        auth: false
      }
    });
    yield put({
      type: types.USER_DATA, response: {
        auth: false
      }
    })
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

export function* userDetailsSaga(payload) {
  try {
    const response = yield call(userDetailsService);
    if (response && response.token)
      localStorage.setItem('token', response.token);
    // yield put({ type: types.USER_DATA, response })
    yield put({ type: types.LOGIN_USER_SUCCESS, response: {
      ...response,
      token: localStorage.getItem('token'),
      auth: !!localStorage.getItem('token')
    } });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}