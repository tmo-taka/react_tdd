import { useCallback } from 'react';
import { getJapanesesByWordAtom } from '../store/englishStore';
import { useAtomValue, useSetAtom } from 'jotai';

export const useQuestions = () => {
  const getJapanesesByWord = useAtomValue(getJapanesesByWordAtom);

  const judgeCorrectFlag = useCallback(
    (word: string, inputtedText: string) => {
      const japaneseList = getJapanesesByWord(word);
      if ((japaneseList as string[]).length === 0) {
        throw new Error('this word is not correct data');
      }
      const onlyOneSymbol =
        /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]$/;
      const isCorrect =
        !onlyOneSymbol.test(inputtedText) &&
        (japaneseList as string[]).some((japanese: string) =>
          japanese.includes(inputtedText),
        );
      return isCorrect;
    },
    [getJapanesesByWord],
  );

  return { judgeCorrectFlag };
};
