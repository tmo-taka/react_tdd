import { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { getJapanesesByWordAtom } from '../store/englishStore';
import { useAtomValue } from 'jotai';

type Props = {
  word: string;
};

export const QuestionForm = (props: Props): JSX.Element => {
  const [text, setText] = useState('');
  const { correctFlag, judgeCorrectFlag } = useQuestions();
  const getJapanesesByWord = useAtomValue(getJapanesesByWordAtom);
  const japaneseList = getJapanesesByWord(props.word);
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
        onBlur={() => judgeCorrectFlag(props.word, text)}
      />
      {!correctFlag && text.length > 0 && (
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        <div role="region" aria-expanded={correctFlag}>
          回答が間違っています
          <br />
          正しくは以下です。
          <br />
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
