import { atom, type Getter, useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type { EnglishArr, EnglishObj } from '../domain/englishArr';

// 基本的なatom
export const englishArrAtom = atom<EnglishArr>([]);

const searchEnglishObjByWord = (
  word: string,
  get: Getter,
): EnglishObj | undefined => {
  const englishArr = get(englishArrAtom);
  const targetObj: EnglishObj | undefined = englishArr.find((english) => {
    return english.word === word;
  });
  if (!targetObj) {
    throw new Error('this word is not included in EnglishArr');
  }
  return targetObj;
};

export const getJapanesesByWordAtom = atom((get) => {
  return (word: string) => {
    const targetObj = searchEnglishObjByWord(word, get);
    if (!targetObj) return;
    return targetObj.japanese;
  };
});

export const getNumberOfCorrectAtom = atom((get) => {
  return () => {
    const englishArr = get(englishArrAtom);
    const copyEnglishArr = [...englishArr];
    const correctEnglishArr = copyEnglishArr.filter((english) => {
      return english.correct === true;
    });
    return correctEnglishArr.length;
  };
});

export const correctStatusAtomFamily = atomFamily((word: string) =>
  atom(
    (get) => {
      const targetObj = searchEnglishObjByWord(word, get);
      if (!targetObj) return;
      return targetObj.correct;
    },
    (get, set) => {
      const targetObj = searchEnglishObjByWord(word, get);
      if (!targetObj) return;
      const newTargetObj: EnglishObj = {
        ...targetObj,
        correct: !targetObj.correct,
      };
      const englishArr = get(englishArrAtom);
      set(
        englishArrAtom,
        englishArr.map((obj) =>
          obj.word === newTargetObj.word ? newTargetObj : obj,
        ),
      );
    },
  ),
);

export const useEnglishStore = () => {
  const [englishArr, setEnglishArr] = useAtom(englishArrAtom);
  const [getJapanesesByWord] = useAtom(getJapanesesByWordAtom);
  const [getNumberOfCorrect] = useAtom(getNumberOfCorrectAtom);

  return {
    englishArr,
    setEnglishArr,
    getJapanesesByWord,
    getNumberOfCorrect,
    correctStatusAtomFamily,
  };
};
