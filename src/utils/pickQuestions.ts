import { DEFAULT_OUTPUT_QUESTIONS_COUNT } from '../const';
import type { Question } from '../domain/Question';
import type { Quiz } from '../domain/Quiz';

const generateRandom = (max: number) => Math.floor(Math.random() * max);

export const pickQuestions = (allQuestions: Question[]): Question[] => {
  if (allQuestions.length < DEFAULT_OUTPUT_QUESTIONS_COUNT) {
    throw new Error(
      `An array with less than ${DEFAULT_OUTPUT_QUESTIONS_COUNT} items was passed`,
    );
  }

  const questionsCopy = [...allQuestions];
  const selectedQuestions: Question[] = [];

  for (let i = 0; i < DEFAULT_OUTPUT_QUESTIONS_COUNT; i++) {
    const randomNumber = generateRandom(questionsCopy.length);
    const targetQuestion = questionsCopy[randomNumber];
    questionsCopy.splice(randomNumber, 1);
    selectedQuestions.push(targetQuestion);
  }

  return selectedQuestions;
};

export const createQuiz = (questions: Question[]): Quiz => {
  return {
    id: `quiz-${Date.now()}`,
    questions,
    score: 0,
  };
};
