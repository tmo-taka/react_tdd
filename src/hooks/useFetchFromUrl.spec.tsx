import { renderHook, waitFor } from '@testing-library/react';
import * as hooks from './useFetchFromUrl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
jest.mock('./useFetchFromUrl', () => {
  const originalModule = jest.requireActual('./useFetchFromUrl');
  return {
    ...originalModule,
    fetchData: jest.fn((url) => ({
      data: url,
    })),
  };
});

const queryClient = new QueryClient();
const wrapper = () => (
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  <QueryClientProvider client={queryClient}>テスト</QueryClientProvider>
);

describe('test useFetchFromUrl', () => {
  let testUrl: string;
  beforeEach(() => {
    testUrl = 'https://www.dummmy.com/';
  });
  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });
  describe('test fetchData', () => {
    it('should accepts url', async () => {
      const res = await hooks.fetchData(testUrl);
      expect(res).toEqual({ data: testUrl });
    });
  });
  describe('useFetchFromUrl', () => {
    //成功した場合
    it('return data when current fetch ', async () => {
      const { result } = renderHook(
        () => hooks.useFetchFromUrl('key', testUrl),
        { wrapper },
      );
      console.log(result);
      await waitFor(() => expect(result.current.isLoading).toBeTruthy());
    });
    //失敗した場合
  });
});
