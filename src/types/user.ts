export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  profileCommunicationPreference?: Array<any>;
}
