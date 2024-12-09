import { renderHook, waitFor } from '@testing-library/react';
import * as hooks from './useFetchFromUrl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
jest.mock('./useFetchFromUrl', () => {
  const originalModule = jest.requireActual('./useFetchFromUrl');
  return {
    ...originalModule,
    fetchData: jest.fn((url) => url),
  };
});

describe('test useFetchFromUrl', () => {
  let testUrl: string;
  beforeEach(() => {
    testUrl = 'https://www.dummmy.com/';
  });
  afterEach(() => {
    jest.resetAllMocks();
    // queryClient.clear();
  });
  describe('test fetchData', () => {
    it('should accepts url', async () => {
      const res = await hooks.fetchData(testUrl);
      expect(res).toEqual(testUrl);
    });
  });
  describe('useFetchFromUrl', () => {
    let wrapper: React.FC<{ children: React.ReactNode }>;
    let queryClient: QueryClient;
    beforeEach(() => {
      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      wrapper = ({ children }: { children: React.ReactNode }) => (
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    });

    afterEach(() => {
      queryClient.clear();
    });
    //成功した場合
    it('return data when current fetch ', async () => {
      const { result } = renderHook(
        () => hooks.useFetchFromUrl('key', testUrl, hooks.fetchData),
        { wrapper },
      );

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(result.current.data).toEqual(testUrl);
    });

    //失敗した場合
  });
});
