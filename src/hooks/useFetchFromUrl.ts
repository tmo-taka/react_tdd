import { useQuery } from '@tanstack/react-query';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fetchData = async (url: string): Promise<any> => {
  const res = await fetch(url);
  return res;
};

export const useFetchFromUrl = (
  key: string,
  url: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fetchFunction: (url: string) => Promise<any>,
) => {
  const { data, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: () => fetchFunction(url),
  });

  return { data, isSuccess };
};
