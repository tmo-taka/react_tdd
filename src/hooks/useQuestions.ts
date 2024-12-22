import { useCallback, useState } from 'react';
import type { EnglishArr } from '../domain/englishArr';

const checkedAnswer = (
  word: string,
  inputtedText: string,
  englishArr: EnglishArr,
) => {
  console.log(word);
  const targetIndex = englishArr.findIndex((english) => english.word === word);
  console.log(targetIndex);
  if (targetIndex === -1) {
    throw new Error('this word is not included in EnglishArr');
  }
  for (const correctText of englishArr[targetIndex].japanese) {
    if (inputtedText.length >= 2 && correctText.includes(inputtedText)) {
      return true;
    }
  }
  return false;
};

export const useQuestions = () => {
  const [englishArr, setEnglishArr] = useState<EnglishArr>([]);
  const [correctFlag, setCorrectFlag] = useState(false);

  const judgeCorrectFlag = useCallback(
    (word: string, inputtedText: string, englishArr: EnglishArr) => {
      const isCorrect = checkedAnswer(word, inputtedText, englishArr);
      setCorrectFlag(isCorrect);
    },
    [],
  );
  return { englishArr, correctFlag, setEnglishArr, judgeCorrectFlag };
};

export const _test_ = {
  checkedAnswer,
};
