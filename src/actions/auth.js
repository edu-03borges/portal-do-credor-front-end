import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from 'store/actions';

export const userSignInSuccess = (user) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user,
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};