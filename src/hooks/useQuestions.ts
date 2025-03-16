import { useCallback } from 'react';
import { checkerSimilarity } from '../utils/checkJASimilarity';
import { SIMILARITY_THRESHOLD } from '../const';
import { useQuizStore } from '../store/quizStore';
import type { Question } from '../domain/Question';

export const useQuestions = () => {
  const { getQuestionById, updateQuestionStatus } = useQuizStore();

  const judgeAnswer = useCallback(
    (questionId: string, inputtedText: string): boolean => {
      const question = getQuestionById(questionId);

      if (!question || question.answers.length === 0) {
        throw new Error('Question not found or has no answers');
      }

      const onlyOneSymbol =
        /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]$/;

      const isCorrect =
        !onlyOneSymbol.test(inputtedText) &&
        question.answers.some((answer) => {
          const similarity = checkerSimilarity(inputtedText, answer);
          console.log(similarity);
          return similarity >= SIMILARITY_THRESHOLD;
        });

      // 正解状態を更新
      updateQuestionStatus(questionId, isCorrect ? 'correct' : 'incorrect');

      return isCorrect;
    },
    [getQuestionById, updateQuestionStatus],
  );

  return { judgeAnswer };
};
