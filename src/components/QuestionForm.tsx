import { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { getJapanesesByWordAtom } from '../store/englishStore';
import { useAtomValue } from 'jotai';

type Props = {
  word: string;
};

export const QuestionForm = (props: Props): JSX.Element => {
  const [text, setText] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const { correctFlag, judgeCorrectFlag } = useQuestions();
  const getJapanesesByWord = useAtomValue(getJapanesesByWordAtom);
  const japaneseList = getJapanesesByWord(props.word);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    judgeCorrectFlag(props.word, text);
    setIsSubmit(true);
  };
  const judgeTextFromCorrectFlag = correctFlag
    ? '正解です。他にも以下の意味があります。'
    : '回答が間違っています。正しくは以下です。';

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor={`word-${props.word}`}>{props.word}</label>
      <br />
      <input
        id={`word-${props.word}`}
        type="text"
        value={text}
        aria-label={`Enter translation for ${props.word}`}
        onChange={(e) => setText(e.target.value)}
      />

      {isSubmit && (
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        <div role="region" aria-expanded={isSubmit}>
          {judgeTextFromCorrectFlag}
          <ul>
            {japaneseList.map((japanese) => (
              <li key={japanese}>{japanese}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
