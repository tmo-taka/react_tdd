import { useState } from 'react';
import type { EnglishArr } from '../domain/englishArr';

export const useQuestions = () => {
  const [englishArr, setEnglishArr] = useState<EnglishArr>([]);
  return { englishArr, setEnglishArr };
};
