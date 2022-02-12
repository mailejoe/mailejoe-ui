import { createContext, useContext } from 'react';
import { User } from '../types';

export const CurrentUserContext = createContext(null as User | null);

export const useCurrentUser = () => {
  const user = useContext(CurrentUserContext);

  const hasOneOfRoles = (roles: Array<string>) => {
    if (!user?.profileCommunicationPreference) {
      return null;
    }

    if (!user.roles) {
      return false;
    }

    return user.roles.reduce((prev, role) => {
      return roles.includes(role.name) || prev;
    }, false);
  };

  return {
    ...(user || {}),
    hasOneOfRoles,
  };
};
