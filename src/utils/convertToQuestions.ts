import type { Question } from '../domain/Question';
import type { Answer } from '../domain/Answer';

export const convertToQuestions = (csvData: string): Question[] => {
  const lines = csvData.trim().split('\n');
  const result: Question[] = lines.slice(1).map((line, index) => {
    const answers: Answer[] = [];
    let word = '';

    line.split(',').forEach((text, index) => {
      const convertWord = text.trim().replace(/[『』]/g, '');
      if (index === 0) {
        word = convertWord;
      } else {
        answers.push(convertWord);
      }
    });

    return {
      id: `question-${index}`,
      word,
      answers,
      status: 'unanswered',
    };
  });

  return result;
};
