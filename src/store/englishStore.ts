import { atom, useAtom } from 'jotai';
import type { EnglishArr, EnglishObj } from '../domain/englishArr';

// 基本的なatom
export const englishArrAtom = atom<EnglishArr>([]);

// カスタムフックとして使いやすくラップ
export const useEnglishStore = () => {
  const [englishArr, setEnglishArr] = useAtom(englishArrAtom);

  const getJapanesesByWord = (word: string) => {
    const targetObj: EnglishObj | undefined = englishArr.find(
      (english) => english.word === word,
    );
    if (!targetObj) {
      throw new Error('this word is not included in EnglishArr');
    }
    return targetObj.japanese;
  };

  return {
    englishArr,
    setEnglishArr,
    getJapanesesByWord,
  };
};
