import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';

afterEach(() => {
  jest.clearAllMocks();
});

describe('test useEnglishArr', () => {
  it('should initialize englishArr with the correct structure when set', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });
    expect(result.current.englishArr).toBeDefined();
    expect(result.current.englishArr).toHaveLength(10);
    expect(Object.keys(result.current.englishArr[1])).toEqual(
      expect.arrayContaining(['word', 'japanese']),
    );
  });

  it('should mark answer as correct when exact match is provided', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    act(() => {
      result.current.checkedAnswer(
        'get',
        '得る(受動態にできない)',
        result.current.englishArr,
      );
    });
    expect(result.current.correctFlag).toBe(true);
  });

  it('should mark answer as correct when partial match is provided', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    act(() => {
      result.current.checkedAnswer('get', '得る', result.current.englishArr);
    });
    expect(result.current.correctFlag).toBe(true);
  });

  it('should keep correctFlag as false when incorrect answer is provided', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    act(() => {
      result.current.checkedAnswer('get', 'ご飯', result.current.englishArr);
    });
    expect(result.current.correctFlag).toBe(false);
  });

  it('should throw an error when checking an answer for non-existent word', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    expect(() => {
      act(() => {
        result.current.checkedAnswer('test', 'ご飯', result.current.englishArr);
      });
    }).toThrow(new Error('this word is not included in EnglishArr'));
  });
});
