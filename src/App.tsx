import { useCallback, useEffect } from 'react';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { useEnglishStore } from './store/englishStore';
import { convertToEnglishArr } from './utils/convertToEnglishArr';
import { pickQuestions } from './utils/pickQuestions';
import { QuestionForm } from './components/QuestionForm';

function App() {
  const { data, isSuccess, refetch } = useFetchFromUrl(
    'english',
    '/api',
    fetchData,
  );
  const { englishArr, setEnglishArr } = useEnglishStore();
  const processData = useCallback(async () => {
    if (!isSuccess || !data) return;
    data.text().then((textData: string) => {
      const formatToEnglishArr = convertToEnglishArr(textData);
      const question = pickQuestions(formatToEnglishArr);
      console.log('何回?');
      setEnglishArr(question);
    });
  }, [isSuccess, data, setEnglishArr]);
  const reGenerateQuestion = () => {
    refetch();
  };
  useEffect(() => {
    processData();
  }, [processData]);
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
        </>
      ) : (
        <div>ローディング</div>
      )}
    </>
  );
}

export default App;
