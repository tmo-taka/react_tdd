import { useEffect } from 'react';
import './App.css';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { useEnglishStore } from './store/englishStore';
import { convertToEnglishArr } from './utils/convertToEnglishArr';
import { pickQuestions } from './utils/pickQuestions';
import { QuestionForm } from './components/QuestionForm';

function App() {
  const { data, isSuccess } = useFetchFromUrl('english', '/api', fetchData);
  const { englishArr, setEnglishArr } = useEnglishStore();
  useEffect(() => {
    const processData = async () => {
      if (!isSuccess || !data) return;
      data.text().then((textData: string) => {
        const formatToEnglishArr = convertToEnglishArr(textData);
        const question = pickQuestions(formatToEnglishArr);
        console.log('何回?');
        setEnglishArr(question);
      });
    };
    processData();
  }, [isSuccess, data, setEnglishArr]);
  return (
    <>
      {isSuccess && englishArr ? (
        <ul>
          {englishArr.map((item) => {
            return (
              <li key={item.word}>
                <QuestionForm word={item.word} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>ローディング</div>
      )}
    </>
  );
}

export default App;
