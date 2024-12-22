import { QuestionForm } from './QuestionForm';
import * as hooks from '../hooks/useQuestions';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formattedEnglishArr } from '../__test__/formattedEnglishArr';

jest.mock('../hooks/useQuestions', () => {
  const actual = jest.requireActual('../hooks/useQuestions');
  return {
    ...actual,
    useQuestions: jest.fn(),
    _test_: {
      ...actual._test_,
      // checkedAnswerは実際の関数を使用
      checkedAnswer: actual._test_.checkedAnswer,
    },
  };
});
const user = userEvent.setup();

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

    type ArgsOfCheckedAnswer = Parameters<typeof hooks._test_.checkedAnswer>;

    mockJudgeCorrectFlag = jest
      .fn()
      .mockImplementation(
        (
          word: ArgsOfCheckedAnswer[0],
          inputtedText: ArgsOfCheckedAnswer[1],
          englishArr: ArgsOfCheckedAnswer[2],
        ) => {
          const isCorrectedFlag = hooks._test_.checkedAnswer(
            word,
            inputtedText,
            englishArr,
          );
          mockSetCorrectFlag(isCorrectedFlag);
        },
      );

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
    render(<QuestionForm {..._defaultProps} />);
    const textForm = screen.getByRole('textbox');
    const label = screen.getByLabelText('tip');
    const alertDivElement = screen.queryByRole('region');

    expect(textForm).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(textForm).toHaveValue('');
    expect(alertDivElement).not.toBeInTheDocument();
  });

  it('should update value when typing in textForm', async () => {
    render(<QuestionForm {..._defaultProps} />);
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
    expect(mockJudgeCorrectFlag).toHaveBeenCalledWith(
      'tip',
      inputText,
      formattedEnglishArr,
    );
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
    expect(mockJudgeCorrectFlag).toHaveBeenCalledWith(
      'tip',
      inputText,
      formattedEnglishArr,
    );
    expect(mockSetCorrectFlag).toHaveBeenCalledWith(false);
  });
});
