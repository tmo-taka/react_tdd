import { useCallback, useState } from 'react';
import type { EnglishArr } from '../domain/englishArr';

export const useQuestions = () => {
  const [englishArr, setEnglishArr] = useState<EnglishArr>([]);
  const [correctFlag, setCorrectFlag] = useState(false);

  const checkedAnswer = useCallback(
    (word: string, inputtedText: string) => {
      const targetIndex = englishArr.findIndex(
        (english) => english.word === word,
      );
      for (const correctText of englishArr[targetIndex].japanese) {
        if (correctText === inputtedText) {
          setCorrectFlag(true);
        }
      }
    },
    [englishArr],
  );
  return { englishArr, correctFlag, setEnglishArr, checkedAnswer };
};
