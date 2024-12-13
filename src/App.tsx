import { useEffect } from 'react';
import './App.css';
import { fetchData, useFetchFromUrl } from './hooks/useFetchFromUrl';
import { convertToEnglishArr } from './utils/convertToEnglishArr';

function App() {
  const { data, isSuccess } = useFetchFromUrl('english', '/api', fetchData);
  useEffect(() => {
    if (isSuccess && data) {
      data.text().then((textData: string) => {
        const data = convertToEnglishArr(textData);
        console.log(data);
      });
    }
  }, [isSuccess, data]);
  return <>{isSuccess ? <div>テスト</div> : <div>ローディング</div>}</>;
}

export default App;
