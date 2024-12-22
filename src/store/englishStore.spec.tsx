import { renderHook, act } from '@testing-library/react';
import { useEnglishStore } from './englishStore';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import { Provider } from 'jotai';

describe('test englishStore', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should initial englishArr state is empty', () => {
    const { result } = renderHook(() => useEnglishStore(), { wrapper });
    expect(result.current.englishArr).toEqual([]);
  });

  it('should able to set englishArr when new array is passed', () => {
    const { result } = renderHook(() => useEnglishStore(), { wrapper });
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });
    expect(result.current.englishArr).toEqual(formattedEnglishArr);
  });

  it('get Japanese when word in englishArr is passed ', () => {
    const { result } = renderHook(() => useEnglishStore(), { wrapper });
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });
    expect(result.current.getJapanesesByWord('insurance')).toEqual([
      '保険保険契約 / 保険金',
      '保険料',
    ]);
  });

  it('throw Error when word is not in englishArr is passed ', () => {
    const { result } = renderHook(() => useEnglishStore(), { wrapper });
    act(() => {
      result.current.setEnglishArr(formattedEnglishArr);
    });
    expect(() => {
      act(() => {
        result.current.getJapanesesByWord('test');
      });
    }).toThrow(new Error('this word is not included in EnglishArr'));
  });
});
