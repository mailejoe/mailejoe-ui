import { formatApiResult } from '../formatApiResult';

describe('Format API result', () => {
  it('Should make the result data an empty array even if we are still fetching', () => {
    const res = formatApiResult({
      isLoading: true,
    });

    expect(res.data).toEqual([]);
    expect(res.isLoading).toEqual(true);
    expect(res.metadata.total).toEqual(0);
    expect(res.metadata.limit).toEqual(0);
    expect(res.metadata.offset).toEqual(0);
    expect(res.state).toEqual('loading');
  });

  it('Should return the data at the top level', () => {
    const res = formatApiResult({
      isLoading: false,
      data: {
        metadata: {
          total: 1,
          offset: 0,
          limit: 10,
        },
        data: [
          {
            hello: 'hi',
          },
        ],
      },
    });

    expect(res.data[0].hello).toEqual('hi');
    expect(res.isLoading).toEqual(false);
    expect(res.metadata.total).toEqual(1);
    expect(res.metadata.limit).toEqual(10);
    expect(res.metadata.offset).toEqual(0);
    expect(res.error).toEqual(undefined);
    expect(res.state).toEqual('success');
  });

  it('Should handle errors', () => {
    const res = formatApiResult({
      isLoading: false,
      error: 'All is lost',
    });

    expect(res.error).toEqual('All is lost');
    expect(res.state).toEqual('error');
  });
});
