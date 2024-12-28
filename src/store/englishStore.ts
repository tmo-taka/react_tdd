import { atom, useAtom } from 'jotai';
import type { EnglishArr, EnglishObj } from '../domain/englishArr';

// 基本的なatom
export const englishArrAtom = atom<EnglishArr>([]);

export const getJapanesesByWordAtom = atom((get) => {
  const englishArr = get(englishArrAtom);
  return (word: string) => {
    const targetObj: EnglishObj | undefined = englishArr.find((english) => {
      return english.word === word;
    });
    if (!targetObj) {
      throw new Error('this word is not included in EnglishArr');
    }
    return targetObj.japanese;
  };
});

export const useEnglishStore = () => {
  const [englishArr, setEnglishArr] = useAtom(englishArrAtom);
  const [getJapanesesByWord] = useAtom(getJapanesesByWordAtom);

  return {
    englishArr,
    setEnglishArr,
    getJapanesesByWord,
  };
};
