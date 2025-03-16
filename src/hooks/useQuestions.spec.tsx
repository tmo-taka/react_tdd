import { renderHook, act } from '@testing-library/react';
import { useQuestions } from './useQuestions';
import { formattedQuestions } from '../__test__/formattedQuestions';
import { Provider } from 'jotai';
import { createStore } from 'jotai/vanilla';
import { quizAtom, questionsAtom } from '../store/quizStore';

const store = createStore();

describe('test useQuizStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    store.set(questionsAtom, formattedQuestions);
    store.set(quizAtom, {
      id: 'test-quiz',
      questions: formattedQuestions,
      score: 0,
    });
  });

  it('should mark answer as correct when exact match is provided', () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      expect(
        result.current.judgeAnswer('question-4', '得る(受動態にできない)'),
      ).toBe(true);
    });
  });

  it('should mark answer as correct when partial match is provided', () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      expect(result.current.judgeAnswer('question-4', '得る')).toBe(true);
    });
  });

  it('should not mark answer as correct when partial match and even single character is provided', () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      expect(result.current.judgeAnswer('question-4', '得')).toBe(false);
    });
  });

  it('should mark answer as incorrect  when only symbol is provided', () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      expect(result.current.judgeAnswer('question-4', '(')).toBe(false);
    });
  });

  it('should keep correctFlag as false when incorrect answer is provided', () => {
    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      expect(result.current.judgeAnswer('question-4', 'ご飯')).toBe(false);
    });
  });

  it('should throw an error when list of japanese is empty', () => {
    store.set(questionsAtom, []);
    store.set(quizAtom, null);

    const { result } = renderHook(() => useQuestions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(() => {
      act(() => {
        result.current.judgeAnswer('question-4', 'ご飯');
      });
    }).toThrow(
      new Error('target question is not in data of current questions'),
    );
  });
});
