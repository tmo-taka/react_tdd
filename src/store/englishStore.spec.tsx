import { renderHook, act } from '@testing-library/react';
import { useEnglishStore, englishArrAtom } from './englishStore';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import { Provider, useAtom, useSetAtom, createStore } from 'jotai';
import type { EnglishObj } from '../domain/englishArr';

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

  it('should throw Error when word is not in englishArr is passed ', () => {
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

  it('should get initial correct is false from word', () => {
    const createTestStore = () => {
      const store = createStore();
      store.set(englishArrAtom, formattedEnglishArr);
      return store;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>{children}</Provider>
    );

    const { result } = renderHook(
      () => {
        const [correctStatus] = useAtom(
          useEnglishStore().correctStatusAtomFamily('memory'),
        );
        return { correctStatus };
      },
      { wrapper },
    );

    expect(result.current.correctStatus).toBe(false);
  });

  it('should throw Error when word is not in englishArr is passed', () => {
    const createTestStore = () => {
      const store = createStore();
      store.set(englishArrAtom, formattedEnglishArr);
      return store;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>{children}</Provider>
    );

    expect(() => {
      renderHook(
        () => {
          const [correctStatus] = useAtom(
            useEnglishStore().correctStatusAtomFamily('test'),
          );
          return { correctStatus };
        },
        { wrapper },
      );
    }).toThrow(new Error('this word is not included in EnglishArr'));
  });

  it('should be able to set correctStatus created from correctAtomFamily', () => {
    const createTestStore = () => {
      const store = createStore();
      store.set(englishArrAtom, formattedEnglishArr);
      return store;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>{children}</Provider>
    );

    const { result } = renderHook(
      () => {
        const [correctStatus, toggleCorrectStatus] = useAtom(
          useEnglishStore().correctStatusAtomFamily('memory'),
        );
        const englishArr = useEnglishStore().englishArr;
        return { correctStatus, toggleCorrectStatus, englishArr };
      },
      { wrapper },
    );

    expect(result.current.correctStatus).toBe(false);
    act(() => {
      result.current.toggleCorrectStatus();
    });
    expect(result.current.correctStatus).toBe(true);
    const memoryWordObj = result.current.englishArr.find(
      (obj) => obj.word === 'memory',
    ) as EnglishObj;
    expect(memoryWordObj).toHaveProperty('correct', true);
  });

  it('should get initial number of correct is 0', () => {
    const createTestStore = () => {
      const store = createStore();
      store.set(englishArrAtom, formattedEnglishArr);
      return store;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>{children}</Provider>
    );

    const { result } = renderHook(
      () => {
        const englishArr = useEnglishStore().englishArr;
        const getNumberOfCorrect = useEnglishStore().getNumberOfCorrect;
        return { englishArr, getNumberOfCorrect };
      },
      { wrapper },
    );
    expect(result.current.getNumberOfCorrect()).toBe(0);
  });

  it('should get number of correct is 1 when after toggleCorrectStatus', () => {
    const createTestStore = () => {
      const store = createStore();
      store.set(englishArrAtom, formattedEnglishArr);
      return store;
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>{children}</Provider>
    );

    const { result } = renderHook(
      () => {
        const englishArr = useEnglishStore().englishArr;
        const toggleCorrectStatus = useSetAtom(
          useEnglishStore().correctStatusAtomFamily('memory'),
        );
        const getNumberOfCorrect = useEnglishStore().getNumberOfCorrect;
        return { englishArr, toggleCorrectStatus, getNumberOfCorrect };
      },
      { wrapper },
    );
    act(() => {
      result.current.toggleCorrectStatus();
    });
    expect(result.current.getNumberOfCorrect()).toBe(1);
  });
});
