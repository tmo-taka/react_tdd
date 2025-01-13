import type { EnglishArr, EnglishObj } from '../domain/englishArr';
import { pickQuestions } from './pickQuestions';

const generateMockEnglishArr = (n: number): EnglishArr => {
  const mock: EnglishArr = [];
  for (let i = 0; i < n; i++) {
    const dummyObj: EnglishObj = {
      word: `test${i}`,
      japanese: [`テスト${i}`],
      correct: false,
    };
    mock.push(dummyObj);
  }
  return mock;
};

describe('test pickQuestions', () => {
  let args: EnglishArr = [];
  beforeEach(() => {
    args = generateMockEnglishArr(200);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return arr has 10 items', () => {
    const requiredProperties = ['word', 'japanese'];
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
