import { renderHook, act } from '@testing-library/react';
import { useEnglishStore, englishArrAtom } from './englishStore';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import { Provider, useAtom, createStore } from 'jotai';
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

  it('should get initial current is false from word', () => {
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
        const [currentStatus] = useAtom(
          useEnglishStore().currentStatusAtomFamily('memory'),
        );
        return { currentStatus };
      },
      { wrapper },
    );

    expect(result.current.currentStatus).toBe(false);
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
          console.log(useEnglishStore().englishArr);
          const [currentStatus] = useAtom(
            useEnglishStore().currentStatusAtomFamily('test'),
          );
          return { currentStatus };
        },
        { wrapper },
      );
    }).toThrow(new Error('this word is not included in EnglishArr'));
  });

  it('should be able to set currentStatus created from currentAtomFamily', () => {
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
        const [currentStatus, toggleCurrentStatus] = useAtom(
          useEnglishStore().currentStatusAtomFamily('memory'),
        );
        const englishArr = useEnglishStore().englishArr;
        return { currentStatus, toggleCurrentStatus, englishArr };
      },
      { wrapper },
    );

    expect(result.current.currentStatus).toBe(false);
    act(() => {
      result.current.toggleCurrentStatus();
    });
    expect(result.current.currentStatus).toBe(true);
    const memoryWordObj = result.current.englishArr.find(
      (obj) => obj.word === 'memory',
    ) as EnglishObj;
    expect(memoryWordObj).toHaveProperty('current', true);
  });
});
