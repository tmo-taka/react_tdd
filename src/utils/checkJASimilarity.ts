import { tokenize } from 'wakachigaki';

export const analyzeOfText = (text: string): Map<string, number> => {
  const textTokens = tokenize(text);
  const mapFreq = new Map<string, number>();

  for (const word of textTokens) {
    if (word.trim()) {
      mapFreq.set(word, (mapFreq.get(word) || 0) + 1);
    }
  }
  return mapFreq;
};

export const splitText = (text: string) => {
  const parts = text.split('/');

  return parts.flatMap((part) => {
    const matches = part.trim().match(/^(.+?)\((.+?)\)$/);
    if (matches) {
      return [matches[1].trim(), matches[2].trim()];
    }
    const trimmedPart = part.trim();
    return trimmedPart ? [trimmedPart] : [];
  });
};

export const computedOfSimilarity = (
  inputFreq: Map<string, number>,
  answerFreq: Map<string, number>,
): number => {
  const allWords = new Set([...inputFreq.keys(), ...answerFreq.keys()]);

  let dotProduct = 0;
  let inputNorm = 0;
  let answerNorm = 0;

  for (const word of allWords) {
    const input = inputFreq.get(word) || 0;
    const answer = answerFreq.get(word) || 0;

    dotProduct += input * answer;
    inputNorm += input * input;
    answerNorm += answer * answer;
  }

  // 0除算を防ぐ
  if (inputNorm === 0 || answerNorm === 0) {
    return 0;
  }

  const similarity =
    dotProduct / (Math.sqrt(inputNorm) * Math.sqrt(answerNorm));

  // 小数点第3位までに丸める
  return Math.round(similarity * 1000) / 1000;
};

export const checkerSimilarity = (
  inputText: string,
  answerText: string,
): number => {
  const answerArr = splitText(answerText);
  const inputFreq = analyzeOfText(inputText);
  const answersFreq = answerArr.map((answer) => analyzeOfText(answer));
  const similarityArr = answersFreq.map((answerFreq) =>
    computedOfSimilarity(inputFreq, answerFreq),
  );
  const maxOfSimilarity = Math.max(...similarityArr);
  return maxOfSimilarity;
};
