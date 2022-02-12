import { Dispatch } from './types';

const APP_NAME = 'mailejoe';

export const LOGIN = `${APP_NAME}/user/login`;
export const LOGOUT = `${APP_NAME}/user/logout`;
export const UPDATE_USER = `${APP_NAME}/app/update-user`;

const createAction = (type: string, payload?: any) => ({
  type,
  payload,
});

export const login = (dispatch: Dispatch) => async (user: any, cognito?: any) => {
  dispatch(
    createAction(LOGIN, {
      user,
      ...(cognito && { cognito })
    })
  );
};

export const logout = (dispatch: Dispatch) => async () => {
  dispatch(createAction(LOGOUT));
};

export const updateUser = (dispatch: Dispatch) => async (user: any) => {
  dispatch(
    createAction(UPDATE_USER, {
      user
    })
  );
};
