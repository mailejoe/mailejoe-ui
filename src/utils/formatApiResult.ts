import { MetaData } from '../types';

interface ApiResponse {
  isLoading: boolean;
  error?: string;
  data?: {
    values?: Array<any>;
    metadata: MetaData;
  };
}

const defaultData = [] as Array<any>;

const defaultMetaData = {
  total: 0,
  offset: 0,
  limit: 0,
};

export const formatApiResult = (res: ApiResponse, refetch?: () => void) => {
  return {
    error: res.error,
    state: res.isLoading ? 'loading' : res.error ? 'error' : 'success',
    isLoading: res.isLoading,
    data: res.data?.values || defaultData,
    refetch,
    metadata: res.data?.metadata || defaultMetaData,
  };
};
