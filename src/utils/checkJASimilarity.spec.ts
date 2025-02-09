import {
  analyzeOfText,
  checkerSimilarity,
  computedOfSimilarity,
} from './checkJASimilarity';

describe('test analyzeOfTex', () => {
  it('should crate map from text', () => {
    const map = analyzeOfText('本を読む');
    expect(map).toEqual(
      new Map([
        ['本', 1],
        ['を', 1],
        ['読む', 1],
      ]),
    );
  });

  it('should crate map remove empty from text includes empty', () => {
    const map = analyzeOfText(' 本を 読む');
    expect(map).toEqual(
      new Map([
        ['本', 1],
        ['を', 1],
        ['読む', 1],
      ]),
    );
  });

  it('should crate empty map from empty text', () => {
    const map = analyzeOfText('');
    expect(map).toEqual(new Map());
  });
});

describe('test computedOfSimilarity', () => {
  it('should similarity is 1.0 when inputFreq and answerFreq is same word', () => {
    const inputFreq = new Map([
      ['本', 1],
      ['を', 1],
      ['読む', 1],
    ]);
    const answerFreq = new Map([
      ['本', 1],
      ['を', 1],
      ['読む', 1],
    ]);
    const similarity = computedOfSimilarity(inputFreq, answerFreq);
    expect(similarity).toBe(1.0);
  });

  it('should similarity is 0 when inputFreq and answerFreq is different word', () => {
    const inputFreq = new Map([
      ['本', 1],
      ['を', 1],
      ['読む', 1],
    ]);
    const answerFreq = new Map([
      ['空', 1],
      ['で', 1],
      ['飛ぶ', 1],
    ]);
    const similarity = computedOfSimilarity(inputFreq, answerFreq);
    expect(similarity).toBe(0);
  });
});

describe('test checkerSimilarity', () => {
  it('should similarity is 1.00 when inputText and answerText is same word', () => {
    const similarity = checkerSimilarity('本を読む', '本を読む');
    expect(similarity).toBe(1.0);
  });
  it('should similarity is 0.00 when inputText and answerText is different word', () => {
    const similarity = checkerSimilarity('本を読む', '空で飛ぶ');
    expect(similarity).toBe(0.0);
  });
});
