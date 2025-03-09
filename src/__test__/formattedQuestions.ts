import type { Question } from '../domain/Question';

export const formattedQuestions: Question[] = [
  {
    id: 'question-0',
    word: 'memory',
    answers: ['記憶[力] / 思い出', '思い出の人(物', '事)'],
    status: 'unanswered',
  },
  {
    id: 'question-1',
    word: 'restaurant',
    answers: ['レストラン料理店', '(大ホテル・劇場などの)食堂'],
    status: 'unanswered',
  },
  {
    id: 'question-2',
    word: 'do',
    answers: [],
    status: 'unanswered',
  },
  {
    id: 'question-3',
    word: 'something',
    answers: [
      '何か',
      'あるもの',
      'あること / (…を)いくらか',
      '多少',
      'いささか',
    ],
    status: 'unanswered',
  },
  {
    id: 'question-4',
    word: 'get',
    answers: [
      "…'を'受け取る",
      "もらう(受動態にできない) / …'を'手に入れる",
      '得る(受動態にできない)',
    ],
    status: 'unanswered',
  },
  {
    id: 'question-5',
    word: 'destroy',
    answers: ["…'を'破壊する", "打ち壊す / 'を'くじく"],
    status: 'unanswered',
  },
  {
    id: 'question-6',
    word: 'package',
    answers: [
      '(あまり大きくない)包み',
      '梱包(こんぽう);詰め合わせ品 / (箱・ケースなど',
      '荷作り用の)容器',
    ],
    status: 'unanswered',
  },
  {
    id: 'question-7',
    word: 'tip',
    answers: ['(…の)先', 'はし', '先端 / 先端に付ける物(部分)'],
    status: 'unanswered',
  },
  {
    id: 'question-8',
    word: 'insurance',
    answers: ['保険保険契約 / 保険金', '保険料'],
    status: 'unanswered',
  },
  {
    id: 'question-9',
    word: 'tap',
    answers: [
      "…'の'(…を)軽く打つ;(…に)…'を'トントン(コツコツ)と打ちつける / …'を'トントン(コツコツ)とたたいて作る",
    ],
    status: 'unanswered',
  },
];
