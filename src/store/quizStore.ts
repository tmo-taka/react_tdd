import { atom, type useAtom, useAtomValue } from 'jotai';
import type { Question } from '../domain/Question';
import type { Quiz } from '../domain/Quiz';
import type { QuestionStatus } from '../domain/Question';

export const quizAtom = atom<Quiz | null>(null);
export const questionsAtom = atom<Question[]>([]);

// クイズの作成
export const createQuizAtom = atom(null, (get, set, questions: Question[]) => {
  const quiz: Quiz = {
    id: `quiz-${Date.now()}`,
    questions,
    score: 0,
  };
  set(quizAtom, quiz);
  set(questionsAtom, questions);
});

// 質問IDから質問を取得
export const getQuestionByIdAtom = atom((get) => {
  return (questionId: string): Question | undefined => {
    const questions = get(questionsAtom);
    const targetQuestion = questions.find(
      (question) => question.id === questionId,
    );
    if (!targetQuestion) {
      throw new Error('target question is not in data of current questions');
    }
    return targetQuestion;
  };
});

// 質問の状態を更新
export const updateQuestionStatusAtom = atom(
  null,
  (get, set, questionId: string, status: QuestionStatus) => {
    const questions = get(questionsAtom);
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, status };
      }
      return question;
    });
    set(questionsAtom, updatedQuestions);

    // スコアの更新
    const correctCount = updatedQuestions.filter(
      (question) => question.status === 'correct',
    ).length;

    const quiz = get(quizAtom);
    if (quiz) {
      set(quizAtom, { ...quiz, score: correctCount });
    }
  },
);

export const getCorrectCountAtom = atom((get) => {
  const questions = get(questionsAtom);
  return questions.filter((question) => question.status === 'correct').length;
});

export const getTotalQuestionsCountAtom = atom((get) => {
  const questions = get(questionsAtom);
  return questions.length;
});

export const useQuizStore = () => {
  const [quiz, setQuiz] = useAtom(quizAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [, createQuiz] = useAtom(createQuizAtom);
  const [getQuestionById] = useAtom(getQuestionByIdAtom);
  const [, updateQuestionStatus] = useAtom(updateQuestionStatusAtom);
  const getCorrectCount = useAtomValue(getCorrectCountAtom);
  const getTotalQuestionsCount = useAtomValue(getTotalQuestionsCountAtom);

  return {
    quiz,
    questions,
    createQuiz,
    getQuestionById,
    updateQuestionStatus,
    getCorrectCount,
    getTotalQuestionsCount,
  };
};
