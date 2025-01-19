import { useEffect } from 'react';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { useEnglishStore } from './store/englishStore';
import { convertToEnglishArr } from './utils/convertToEnglishArr';
import { pickQuestions } from './utils/pickQuestions';
import { QuestionForm } from './components/QuestionForm';
import { DEFAULT_OUTPUT_QUESTIONS_COUNT } from './const';

function App() {
  const { data, isSuccess, refetch } = useFetchFromUrl(
    'english',
    '/api',
    fetchData,
  );
  const { englishArr, setEnglishArr, getNumberOfCorrect } = useEnglishStore();
  console.log('App', data, isSuccess, englishArr);

  const reGenerateQuestion = () => {
    refetch();
  };
  useEffect(() => {
    if (!isSuccess || !data) return;
    data.text().then((textData: string) => {
      const formatToEnglishArr = convertToEnglishArr(textData);
      const question = pickQuestions(formatToEnglishArr);
      setEnglishArr(question);
    });
  }, [isSuccess, data, setEnglishArr]);
  return (
    <>
      {isSuccess && englishArr ? (
        <>
          <button type="button" onClick={() => reGenerateQuestion()}>
            問題を再生成する
          </button>
          <ul>
            {englishArr.map((item) => {
              return (
                <li key={item.word}>
                  <QuestionForm word={item.word} />
                </li>
              );
            })}
          </ul>
          <div
            role="meter"
            aria-label="わかった"
            aria-valuemin={0}
            aria-valuemax={DEFAULT_OUTPUT_QUESTIONS_COUNT}
            aria-valuenow={getNumberOfCorrect()}
          >
            {`正q率：${getNumberOfCorrect()}/${DEFAULT_OUTPUT_QUESTIONS_COUNT}`}
          </div>
        </>
      ) : (
        <div>ロー</div>
      )}
    </>
  );
}

export default App;
