import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { useEnglishStore } from '../store/englishStore';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import type { EnglishObj } from '../domain/englishArr';
import { getJapanesesByWordAtom } from '../../src/store/englishStore';

jest.mock('jotai', () => ({
  useAtomValue: jest.fn((atom) => {
    if (atom === getJapanesesByWordAtom) {
      return (word: string) => {
        const targetObj: EnglishObj | undefined = formattedEnglishArr.find(
          (english) => english.word === word,
        );
        return (targetObj as EnglishObj).japanese;
      };
    }
  }),
}));

jest.mock('../store/englishStore', () => ({
  useEnglishStore: jest.fn(),
}));

describe('test useQuestions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useEnglishStore as jest.Mock).mockReturnValue({
      englishArr: formattedEnglishArr,
    });
  });

  it('should mark answer as correct when exact match is provided', () => {
    const { result } = renderHook(() => useQuestions());

    expect(
      result.current.judgeCorrectFlag('get', '得る(受動態にできない)'),
    ).toBe(true);
  });

  it('should mark answer as correct when partial match is provided', () => {
    const { result } = renderHook(() => useQuestions());

    expect(result.current.judgeCorrectFlag('get', '得る')).toBe(true);
  });

  it('should mark answer as correct when partial match and even single character is provided', () => {
    const { result } = renderHook(() => useQuestions());

    expect(result.current.judgeCorrectFlag('get', '得')).toBe(true);
  });

  it('should mark answer as incorrect  when only symbol is provided', () => {
    const { result } = renderHook(() => useQuestions());
    expect(result.current.judgeCorrectFlag('get', '(')).toBe(false);
  });

  it('should keep correctFlag as false when incorrect answer is provided', () => {
    const { result } = renderHook(() => useQuestions());
    expect(result.current.judgeCorrectFlag('get', 'ご飯')).toBe(false);
  });

  it('should throw an error when list of japanese is empty', () => {
    const { result } = renderHook(() => useQuestions());

    (useEnglishStore as jest.Mock).mockReturnValue({
      ...useEnglishStore(),
      englishArr: [],
    });

    expect(() => {
      act(() => {
        result.current.judgeCorrectFlag('do', 'ご飯');
      });
    }).toThrow(new Error('this word is not correct data'));
  });
});
