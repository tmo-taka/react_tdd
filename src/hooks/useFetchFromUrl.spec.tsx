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
            gcTime: 0,
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
      jest.resetAllMocks();
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
    it('throw Error when current fetch ', async () => {
      (hooks.fetchData as jest.Mock).mockImplementation((url) => {
        throw new Error('Fetch failed');
      });
      const { result } = renderHook(
        () => hooks.useFetchFromUrl('key', testUrl, hooks.fetchData),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
        expect(result.current.error?.message).toBe('Fetch failed');
      });

      expect(result.current.data).toBeUndefined();
    });

    //refetchした場合
    it('should called fetchFunction is 2 times and data returned return data when current refetch ', async () => {
      const { result } = renderHook(
        () => hooks.useFetchFromUrl('key', testUrl, hooks.fetchData),
        { wrapper },
      );

      await waitFor(async () => {
        return result.current.isSuccess;
      });

      await result.current.refetch();

      await waitFor(async () => {
        return result.current.isSuccess;
      });

      expect(hooks.fetchData).toHaveBeenCalledTimes(2);
      expect(result.current.data).toEqual(testUrl);
    });
  });
});
