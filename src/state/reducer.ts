import { State, Action } from './types';
import { LOGIN, LOGOUT, UPDATE_USER } from './actions';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        ...(action.payload.cognito && { cognito: action.payload.cognito }),
      };
    case LOGOUT:
      return { ...state, user: undefined };
    case UPDATE_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
