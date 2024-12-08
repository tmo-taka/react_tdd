import { useQuery } from '@tanstack/react-query';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fetchData = async (url: string): Promise<any> => {
  const res = await fetch(url);
  return { data: res };
};

export const useFetchFromUrl = (key: string, url: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    // queryFn: () => fetchData(url),
    queryFn: () => url,
  });

  return { data, isLoading };
};
