import { convertToQuestions } from './convertToQuestions';

const dummyCsvData = `a,英語アルファベットの第1字 / (音階の)イ音,イ調
ability,『能力』,力量 / 特殊な才能,優れた手腕`;

describe('test toJson', () => {
  it('should return output from convertJson is not header and remove mark', () => {
    const result = convertToQuestions(dummyCsvData);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'question-0',
      word: 'ability',
      answers: ['能力', '力量 / 特殊な才能', '優れた手腕'],
      status: 'unanswered',
    });
    expect(result[0].answers[0]).toBe('能力');
  });

  it('should return output not array when empty csv', () => {
    const result = convertToQuestions('');
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
