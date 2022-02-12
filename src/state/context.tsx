import React, { useContext, useReducer, createContext, useMemo, SFC } from 'react';
import { State, Action } from './types';
import reducer from './reducer';
import { login, logout, updateUser } from './actions';

export const initialState: State = {
  user: undefined,
  cognito: undefined,
};

const Context = createContext({
  state: initialState,
  dispatch: (_: Action) => {},
});

interface ProviderProps {
  initialState?: State;
}

export const Provider: SFC<ProviderProps> = props => {
  const [state, dispatch] = useReducer(reducer, props.initialState ? props.initialState : initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export function useGlobalState() {
  const { state, dispatch } = useContext(Context);
  const actions = useMemo(() => {
    return {
      login: login(dispatch),
      logout: logout(dispatch),
      updateUser: updateUser(dispatch),
    };
  }, [dispatch]);
  const globalState = useMemo(() => {
    return {
      state,
      ...actions,
    };
  }, [state, actions]);

  return globalState;
}
