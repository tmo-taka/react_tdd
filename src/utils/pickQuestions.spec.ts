import type { Question } from '../domain/Question';
import { createQuiz, pickQuestions } from './pickQuestions';

const generateMockEnglishArr = (n: number): Question[] => {
  const mock: Question[] = [];
  for (let i = 0; i < n; i++) {
    const dummyObj: Question = {
      id: `${i}`,
      word: `test${i}`,
      answers: [`テスト${i}`],
      status: 'unanswered',
    };
    mock.push(dummyObj);
  }
  return mock;
};

describe('test pickQuestions', () => {
  let args: Question[] = [];
  beforeEach(() => {
    args = generateMockEnglishArr(200);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return arr has 10 items', () => {
    const requiredProperties = ['id', 'word', 'answers', 'status'];
    const questions = pickQuestions(args);
    expect(questions.length).toBe(10);
    for (const obj of questions) {
      for (const prop of requiredProperties) {
        expect(obj).toHaveProperty(prop);
      }
    }
  });

  it('should throw error when input empty array', () => {
    expect(() => {
      pickQuestions([]);
    }).toThrow(Error('An array with less than 10 items was passed'));
  });

  it('should throw error when input array has less than 10 items', () => {
    const mock = generateMockEnglishArr(9);
    expect(() => {
      pickQuestions(mock);
    }).toThrow(Error('An array with less than 10 items was passed'));
  });
});

describe('test createQuiz', () => {
  let mockQuestion: Question[] = [];
  beforeEach(() => {
    mockQuestion = generateMockEnglishArr(10);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return Quiz has requiredProperties', () => {
    const requiredProperties = ['id', 'questions', 'score'];
    const data = createQuiz(mockQuestion);
    for (const prop of requiredProperties) {
      expect(data).toHaveProperty(prop);
    }
    expect(data.score).toBe(0);
  });
});
