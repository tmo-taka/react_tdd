import { analyzeOfText, checkerSimilarity } from './checkJASimilarity';

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
});

describe('test checkerSimilarity', () => {
  it('should similarity is 1.00 when inputText and answerText is same word', () => {
    const similarity = checkerSimilarity('本を読む', '本を読む');
    expect(similarity).toBe(1.0);
  });
});
