import type { Answer } from './Answer';

export type Question = {
  id: string;
  word: string;
  answers: Answer[];
  status: QuestionStatus;
};

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect';
