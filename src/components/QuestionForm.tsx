import { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';

type Props = {
  word: string;
};

export const QuestionForm = (props: Props): JSX.Element => {
  const [text, setText] = useState('');
  const { correctFlag, judgeCorrectFlag, englishArr } = useQuestions();
  return (
    <form action="">
      <label htmlFor={`word-${props.word}`}>{props.word}</label>
      <br />
      <input
        id={`word-${props.word}`}
        type="text"
        value={text}
        aria-label={`Enter translation for ${props.word}`}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => judgeCorrectFlag(props.word, text, englishArr)}
      />
      {correctFlag && (
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        <div role="region" aria-expanded={correctFlag}>
          回答が間違っています
        </div>
      )}
    </form>
  );
};
