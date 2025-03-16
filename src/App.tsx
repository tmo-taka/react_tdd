import { useEffect } from 'react';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { useQuizStore } from './store/quizStore';
import { convertToQuestions } from './utils/convertToQuestions';
import { pickQuestions } from './utils/pickQuestions';
import { QuestionForm } from './components/QuestionForm';

function App() {
  const { data, isSuccess, refetch } = useFetchFromUrl(
    'english',
    '/api',
    fetchData,
  );
  const {
    questions,
    createQuiz: initializeQuiz,
    getCorrectCount,
    getTotalQuestionsCount,
  } = useQuizStore();

  const reGenerateQuestion = () => {
    refetch();
  };

  useEffect(() => {
    if (!isSuccess || !data) return;
    data.text().then((textData: string) => {
      const allQuestions = convertToQuestions(textData);
      const selectedQuestions = pickQuestions(allQuestions);
      initializeQuiz(selectedQuestions);
    });
  }, [isSuccess, data, initializeQuiz]);

  return (
    <>
      {isSuccess && questions.length > 0 ? (
        <>
          <button type="button" onClick={() => reGenerateQuestion()}>
            問題を再生成する
          </button>
          <ul>
            {questions.map((question) => {
              return (
                <li key={question.id}>
                  <QuestionForm question={question} />
                </li>
              );
            })}
          </ul>
          <div
            role="meter"
            aria-label="正答率"
            aria-valuemin={0}
            aria-valuemax={getTotalQuestionsCount}
            aria-valuenow={getCorrectCount}
          >
            {`正答率：${getCorrectCount}/${getTotalQuestionsCount}`}
          </div>
        </>
      ) : (
        <div>ローディング</div>
      )}
    </>
  );
}

export default App;
