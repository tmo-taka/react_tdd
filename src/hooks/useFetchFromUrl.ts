import { useQuery } from '@tanstack/react-query';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fetchData = async (url: string): Promise<any> => {
  try {
    const res = await fetch(url);
    return res;
  } catch (error) {
    throw new Error('Fetch failed');
  }
};

export const useFetchFromUrl = (
  key: string,
  url: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fetchFunction: (url: string) => Promise<any>,
) => {
  const { data, error, isSuccess, refetch } = useQuery({
    queryKey: [key],
    queryFn: () => fetchFunction(url),
  });

  return { data, error, isSuccess, refetch };
};
