import { QuestionForm } from './QuestionForm';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';
import * as hooks from '../hooks/useQuestions';
import { Provider } from 'jotai';
import { useEnglishStore } from '../store/englishStore';
import type { EnglishArr } from '../domain/englishArr';

jest.mock('../hooks/useQuestions', () => {
  return {
    useQuestions: jest.fn(),
  };
});
const user = userEvent.setup();

type ArgsOfProvider = {
  englishArr: EnglishArr;
  children: React.ReactNode;
};

const HydrateAtoms = ({ englishArr, children }: ArgsOfProvider) => {
  useEnglishStore().setEnglishArr(englishArr);
  return children;
};

const TestProvider = ({ englishArr, children }: ArgsOfProvider) => (
  <Provider>
    <HydrateAtoms englishArr={englishArr}>{children}</HydrateAtoms>
  </Provider>
);

describe('test QuestionForm.tsx', () => {
  let _defaultProps: {
    word: string;
  };
  let mockSetCorrectFlag: jest.Mock;
  let mockJudgeCorrectFlag: jest.Mock;
  beforeEach(() => {
    _defaultProps = {
      word: 'tip',
    };

    mockSetCorrectFlag = jest.fn();

    mockJudgeCorrectFlag = jest
      .fn()
      .mockImplementation((word: string, inputtedText: string) => {
        const targetIndex = formattedEnglishArr.findIndex(
          (obj) => obj.word === word,
        );
        const japaneseList = formattedEnglishArr[targetIndex].japanese;
        const isCorrect =
          inputtedText.length >= 2 &&
          japaneseList.some((japanese: string) =>
            japanese.includes(inputtedText),
          );
        mockSetCorrectFlag(isCorrect);
      });

    (hooks.useQuestions as jest.Mock).mockReturnValue({
      englishArr: formattedEnglishArr,
      correctFlag: false,
      setEnglishArr: jest.fn(),
      judgeCorrectFlag: mockJudgeCorrectFlag,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should have a textForm and value is empty', () => {
    render(
      <TestProvider englishArr={formattedEnglishArr}>
        <QuestionForm {..._defaultProps} />
      </TestProvider>,
    );
    const textForm = screen.getByRole('textbox');
    const label = screen.getByLabelText('tip');
    const alertDivElement = screen.queryByRole('region');

    expect(textForm).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(textForm).toHaveValue('');
    expect(alertDivElement).not.toBeInTheDocument();
  });

  it('should update value when typing in textForm', async () => {
    render(
      <TestProvider englishArr={formattedEnglishArr}>
        <QuestionForm {..._defaultProps} />
      </TestProvider>,
    );
    const inputText = 'test';
    const textForm = screen.getByRole('textbox', {
      name: 'Enter translation for tip',
    });
    await user.type(textForm, inputText);
    expect(screen.getByRole('textbox')).toHaveValue(inputText);
  });

  it('should set true with setCorrectFlag when inputted correct answer', async () => {
    render(<QuestionForm {..._defaultProps} />);
    const inputText = 'はし';
    const textForm = screen.getByRole('textbox', {
      name: 'Enter translation for tip',
    });
    await user.type(textForm, inputText);
    await user.tab();
    expect(mockJudgeCorrectFlag).toHaveBeenCalledWith('tip', inputText);
    expect(mockSetCorrectFlag).toHaveBeenCalledWith(true);
  });

  it('should set true with setCorrectFlag when inputted correct answer', async () => {
    render(<QuestionForm {..._defaultProps} />);
    const inputText = '間違い';
    const textForm = screen.getByRole('textbox', {
      name: 'Enter translation for tip',
    });
    await user.type(textForm, inputText);
    await user.tab();
    expect(mockJudgeCorrectFlag).toHaveBeenCalledWith('tip', inputText);
    expect(mockSetCorrectFlag).toHaveBeenCalledWith(false);
  });
});
