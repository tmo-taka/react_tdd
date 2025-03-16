import { renderHook, act } from '@testing-library/react';
import { formattedQuestions } from '../__test__/formattedQuestions';
import { Provider } from 'jotai';
import { useQuizStore } from './quizStore';

describe('test quizStore', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should initial quiz and question state is empty', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    expect(result.current.quiz).toEqual(null);
    expect(result.current.questions).toEqual([]);
  });

  it('should able to set approve quiz when new array is passed', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    act(() => {
      result.current.createQuiz(formattedQuestions);
    });
    expect(result.current.quiz?.questions).toEqual(formattedQuestions);
    expect(result.current.quiz?.score).toEqual(0);
  });

  it('should initialize setting is settled 10 questions and correctCount is 0', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    act(() => {
      result.current.createQuiz(formattedQuestions);
    });
    expect(result.current.getQuestionById('question-8')?.word).toEqual(
      'insurance',
    );
    expect(result.current.getQuestionById('question-8')?.answers).toEqual([
      '保険保険契約 / 保険金',
      '保険料',
    ]);
    expect(result.current.getCorrectCount).toEqual(0);
    expect(result.current.getTotalQuestionsCount).toEqual(10);
  });

  it('should throw Error when word is not in englishArr is passed ', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    act(() => {
      result.current.createQuiz(formattedQuestions);
    });
    expect(() => {
      act(() => {
        result.current.getQuestionById('test');
      });
    }).toThrow(
      new Error('target question is not in data of current questions'),
    );
  });

  it('should currentStatus is updated by updateQuestionStatus when current case', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    act(() => {
      result.current.createQuiz(formattedQuestions);
      result.current.updateQuestionStatus('question-8', 'correct');
    });
    expect(result.current.getCorrectCount).toEqual(1);
  });

  it('should currentStatus is not updated by updateQuestionStatus when inCurrent case', () => {
    const { result } = renderHook(() => useQuizStore(), { wrapper });
    act(() => {
      result.current.createQuiz(formattedQuestions);
      result.current.updateQuestionStatus('question-8', 'incorrect');
    });
    expect(result.current.getCorrectCount).toEqual(0);
  });
});
