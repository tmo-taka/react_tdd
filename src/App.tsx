import { useEffect } from 'react';
import './App.css';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { useQuestions } from './hooks/useQuestions';
import { convertToEnglishArr } from './utils/convertToEnglishArr';
import { pickQuestions } from './utils/pickQuestions';

function App() {
  const { data, isSuccess } = useFetchFromUrl('english', '/api', fetchData);
  const { englishArr, setEnglishArr } = useQuestions();
  useEffect(() => {
    const processData = async () => {
      if (!isSuccess || !data) return;
      data.text().then((textData: string) => {
        const formatToEnglishArr = convertToEnglishArr(textData);
        const question = pickQuestions(formatToEnglishArr);
        setEnglishArr(question);
      });
    };
    processData();
  }, [isSuccess, data]);
  return (
    <>
      {isSuccess && englishArr ? (
        <ul>
          {englishArr.map((item) => {
            return <li key={item.word}>{item.word}</li>;
          })}
        </ul>
      ) : (
        <div>ローディング</div>
      )}
    </>
  );
}

export default App;
