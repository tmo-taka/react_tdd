import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';

afterEach(() => {
  jest.clearAllMocks();
});

describe('test useEnglishArr', () => {
  it('should return state of EnglishArr when set EnglishArr', () => {
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

  it('should set correctFlag is true if given inputted text is current', () => {
    const { result } = renderHook(() => useQuestions());
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });

    act(() => {
      result.current.checkedAnswer('get', '得る(受動態にできない)');
    });
    expect(result.current.correctFlag).toBe(true);
  });
});
