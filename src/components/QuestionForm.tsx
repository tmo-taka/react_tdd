import { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { useAtomValue } from 'jotai';
import { getQuestionByIdAtom } from '../store/quizStore';
import type { Question } from '../domain/Question';

type Props = {
  question: Question;
};

export const QuestionForm = (props: Props): JSX.Element => {
  const [text, setText] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const { judgeAnswer } = useQuestions();
  const getQuestionById = useAtomValue(getQuestionByIdAtom);

  const question = getQuestionById(props.question.id);
  const isCorrect = question?.status === 'correct';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    judgeAnswer(props.question.id, text);
    setIsSubmit(true);
  };

  const judgeTextFromCorrectFlag = isCorrect
    ? '正解です。他にも以下の意味があります。'
    : '回答が間違っています。正しくは以下です。';

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor={`word-${props.question.id}`}>{props.question.word}</label>
      <br />
      <input
        id={`word-${props.question.id}`}
        type="text"
        value={text}
        aria-label={`Enter translation for ${props.question.word}`}
        onChange={(e) => setText(e.target.value)}
      />

      {isSubmit && (
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        <div role="region" aria-expanded={isSubmit}>
          {judgeTextFromCorrectFlag}
          <ul>
            {props.question.answers.map((answer) => (
              <li key={answer}>{answer}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
