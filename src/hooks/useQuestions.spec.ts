import { renderHook } from '@testing-library/react';
import { useQuestions } from './useQuestions';

describe('test useEnglishArr', () => {
  it('should return an array of English words', () => {
    const { result } = renderHook(() => useQuestions());
    expect(result.current.englishArr).toBeDefined();
  });
});
