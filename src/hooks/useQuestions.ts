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
      if (targetIndex === -1) {
        throw new Error('this word is not included in EnglishArr');
      }
      for (const correctText of englishArr[targetIndex].japanese) {
        if (inputtedText.length >= 2 && correctText.includes(inputtedText)) {
          setCorrectFlag(true);
        }
      }
    },
    [englishArr],
  );
  return { englishArr, correctFlag, setEnglishArr, checkedAnswer };
};
