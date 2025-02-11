import {
  analyzeOfText,
  checkerSimilarity,
  computedOfSimilarity,
  splitText,
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

describe('test splitText', () => {
  it('should split 2word and output type of array when passed text includes parentheses', () => {
    const text = '得る(受動態にできない)';
    const splittedWord = splitText(text);
    expect(splittedWord).toEqual(['得る', '受動態にできない']);
  });
  it('should not split word and output type of array when passed text not includes parentheses', () => {
    const text = 'と感じる';
    const splittedWord = splitText(text);
    expect(splittedWord).toEqual(['と感じる']);
  });
  it('should approve split word and output type of array when passed irregular text includes empty', () => {
    const text = '得る(受動態にできない) / ';
    const splittedWord = splitText(text);
    expect(splittedWord).toEqual(['得る', '受動態にできない']);
  });
  it('should output empty array when irregular text pattern', () => {
    const text = ' / ';
    const splittedWord = splitText(text);
    expect(splittedWord).toEqual([]);
  });
  it('should approve split word and output type of array when passed text includes parentheses', () => {
    const text = '得る(受動態にできない) /  もらう(受動態にできない)';
    const splittedWord = splitText(text);
    expect(splittedWord).toEqual([
      '得る',
      '受動態にできない',
      'もらう',
      '受動態にできない',
    ]);
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
  it('should similarity is 1.00 when inputText and answerText is different word', () => {
    const similarity = checkerSimilarity('得る', '得る(受動態にできない)');
    expect(similarity).toBe(1.0);
  });
});
