import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { useEnglishStore } from '../store/englishStore';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import type { EnglishObj } from '../domain/englishArr';

jest.mock('../store/englishStore', () => ({
  useEnglishStore: jest.fn(),
}));

describe('test useEnglishArr', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useEnglishStore as jest.Mock).mockReturnValue({
      englishArr: formattedEnglishArr,
      setEnglishArr: jest.fn(),
      getJapanesesByWord: jest.fn((word: string) => {
        const targetObj: EnglishObj | undefined = formattedEnglishArr.find(
          (english) => english.word === word,
        );
        return (targetObj as EnglishObj).japanese;
      }),
    });
  });

  it('should mark answer as correct when exact match is provided', () => {
    const { result } = renderHook(() => useQuestions());

    act(() => {
      result.current.judgeCorrectFlag('get', '得る(受動態にできない)');
    });
    expect(result.current.correctFlag).toBe(true);
  });

  it('should mark answer as correct when partial match is provided', () => {
    const { result } = renderHook(() => useQuestions());

    act(() => {
      result.current.judgeCorrectFlag('get', '得る');
    });
    expect(result.current.correctFlag).toBe(true);
  });

  it('should keep correctFlag as false when incorrect answer is provided', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.judgeCorrectFlag('get', 'ご飯');
    });
    expect(result.current.correctFlag).toBe(false);
  });

  it('should throw an error when list of japanese is empty', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    expect(() => {
      act(() => {
        result.current.judgeCorrectFlag('do', 'ご飯');
      });
    }).toThrow(new Error('this word is not correct dat'));
  });
});
