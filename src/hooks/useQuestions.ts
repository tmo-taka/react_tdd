import { useCallback, useState } from 'react';
import { getJapanesesByWordAtom } from '../store/englishStore';
import { useAtomValue } from 'jotai';

export const useQuestions = () => {
  const getJapanesesByWord = useAtomValue(getJapanesesByWordAtom);
  const [correctFlag, setCorrectFlag] = useState(false);

  const judgeCorrectFlag = useCallback(
    (word: string, inputtedText: string) => {
      const japaneseList = getJapanesesByWord(word);
      if (japaneseList.length === 0) {
        throw new Error('this word is not correct data');
      }
      const isCorrect =
        inputtedText.length >= 2 &&
        japaneseList.some((japanese: string) =>
          japanese.includes(inputtedText),
        );
      setCorrectFlag(isCorrect);
    },
    [getJapanesesByWord],
  );
  return { correctFlag, judgeCorrectFlag };
};
