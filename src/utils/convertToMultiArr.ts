export const convertToMultiArr = (csvData: string): string[][] => {
  const lines = csvData.trim().split('\n');
  const result = lines
    .slice(1)
    .map((line) =>
      line.split(',').map((word) => word.trim().replace(/[『』]/g, '')),
    );
  return result;
};
