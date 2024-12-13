import type { EnglishArr, EnglishObj } from '../domain/englishArr';

export const convertToEnglishArr = (csvData: string): EnglishArr => {
  console.log(csvData);
  const lines = csvData.trim().split('\n');
  const result: EnglishArr = lines.slice(1).map((line) => {
    const obj: EnglishObj = {
      word: '',
      japanese: [],
    };
    line.split(',').map((word, index) => {
      const convertWord = word.trim().replace(/[『』]/g, '');
      if (index === 0) {
        obj.word = convertWord;
      } else {
        obj.japanese.push(convertWord);
      }
    });
    return obj;
  });

  return result;
};
