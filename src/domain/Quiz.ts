import type { Question } from './Question';

export type Quiz = {
  id: string;
  questions: Question[];
  score?: number;
};
