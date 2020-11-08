
import { requestAPI } from '../services/apiIntercepter';

export const registerUserService = (request) => {
  return requestAPI.post({
    url: 'Users/signup',
    body: request.user
  }).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};

export const loginUserService = (request) => {
  return requestAPI.post({
    url: 'Users/login',
    body: request.user
  }).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};

export const userDetailsService = (request) => {
  return requestAPI.get({
    url: 'Users/getCurrentUser',
  }).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};