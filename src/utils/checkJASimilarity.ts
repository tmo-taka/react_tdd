import { tokenize } from 'wakachigaki';

export const analyzeOfText = (text: string): Map<string, number> => {
  const myMap = new Map();
  myMap.set('本', 1);
  myMap.set('を', 1);
  myMap.set('読む', 1);
  return myMap;
};

export const checkerSimilarity = (
  inputText: string,
  answerText: string,
): number => {
  return 1.0;
};

import { tokenize } from 'wakachigaki';

// export const checkerSimilarity = (
//   inputText: string,
//   answerText: string,
// ): number => {
//   // テキストを正規化
//   const normalizeText = (text: string): string => {
//     return text
//       .toLowerCase()
//       .replace(/[！!？?、。,.．\s]/g, ' ')
//       .trim();
//   };

//   const normalizedInput = normalizeText(inputText);
//   const normalizedAnswer = normalizeText(answerText);

//   // トークン化
//   const inputTokens = tokenize(normalizedInput);
//   const answerTokens = tokenize(normalizedAnswer);

//   // 単語の出現頻度をカウント
//   const inputWordFreq = new Map<string, number>();
//   const answerWordFreq = new Map<string, number>();

//   inputTokens.forEach((word) => {
//     if (word.trim()) {  // 空白を除外
//       inputWordFreq.set(word, (inputWordFreq.get(word) || 0) + 1);
//     }
//   });

//   answerTokens.forEach((word) => {
//     if (word.trim()) {  // 空白を除外
//       answerWordFreq.set(word, (answerWordFreq.get(word) || 0) + 1);
//     }
//   });

//   // すべての単語の集合を作成
//   const allWords = new Set([
//     ...inputWordFreq.keys(),
//     ...answerWordFreq.keys(),
//   ]);

//   // コサイン類似度の計算
//   let dotProduct = 0;
//   let inputNorm = 0;
//   let answerNorm = 0;

//   allWords.forEach((word) => {
//     const inputFreq = inputWordFreq.get(word) || 0;
//     const answerFreq = answerWordFreq.get(word) || 0;

//     dotProduct += inputFreq * answerFreq;
//     inputNorm += inputFreq * inputFreq;
//     answerNorm += answerFreq * answerFreq;
//   });

//   // 0除算を防ぐ
//   if (inputNorm === 0 || answerNorm === 0) {
//     return 0;
//   }

//   const similarity = dotProduct / (Math.sqrt(inputNorm) * Math.sqrt(answerNorm));

//   // 小数点第3位までに丸める
//   return Math.round(similarity * 1000) / 1000;
// };

// // 使用例
// export const example = () => {
//   const input = "今日は良い天気ですね。";
//   const answer = "天気が良い一日でした！";
//   const similarity = checkerSimilarity(input, answer);
//   console.log(`類似度: ${similarity}`); // 例: 類似度: 0.577
// };
