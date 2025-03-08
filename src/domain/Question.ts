import type { Answer } from './Answer';

export type Question = {
  id: string;
  word: string;
  answers: Answers;
  status: QuestionStatus;
};

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect';
