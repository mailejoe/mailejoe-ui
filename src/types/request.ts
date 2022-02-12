export type RequestState = 'loading' | 'error' | 'success';

export interface MetaData {
  total: number;
  offset: number;
  limit: number;
}

export interface IApiProps {
  url: string;
  variables?: any;
  shouldPushLogin?: any;
}

export interface RequestVariables {
  offset?: number;
  limit?: number;
  filter?: string;
}
