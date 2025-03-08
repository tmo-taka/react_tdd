export type User = {
  id: string;
  quizHistory: QuizHistory[];
};

export type QuizHistory = {
  quizId: string;
  score: number;
};
