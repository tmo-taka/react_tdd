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
      <input
        type="text"
        value={text}
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
