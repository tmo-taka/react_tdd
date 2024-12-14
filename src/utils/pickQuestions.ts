import { DEFAULT_OUTPUT_QUESTIONS_COUNT } from '../const';
import type { EnglishArr } from '../domain/englishArr';

const generateRandom = (max: number) => Math.floor(Math.random() * max);

export const pickQuestions = (englishArr: EnglishArr): EnglishArr => {
  if (englishArr.length < DEFAULT_OUTPUT_QUESTIONS_COUNT) {
    throw new Error(
      `An array with less than ${DEFAULT_OUTPUT_QUESTIONS_COUNT} items was passed`,
    );
  }

  const questions: EnglishArr = [];
  for (let i = 0; i < DEFAULT_OUTPUT_QUESTIONS_COUNT; i++) {
    const randomNumber = generateRandom(englishArr.length);
    const targetEnglish = englishArr[randomNumber];
    englishArr.splice(randomNumber, 1);
    questions.push(targetEnglish);
  }

  return questions;
};
