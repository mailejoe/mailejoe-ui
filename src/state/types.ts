export interface Action {
  type: string;
  payload?: any;
}

export interface DynamicBag {
  [key: string]: any;
}

interface StrongUser {
  profileAvatar?: string;
  id?: string;
}
interface StrongContext {}

export type WeakUser = StrongUser & DynamicBag;
export type WeakContext = StrongContext & DynamicBag;

export interface State {
  user?: WeakUser;
  cognito?: WeakContext;
}

export type Dispatch = (action: Action) => void;
