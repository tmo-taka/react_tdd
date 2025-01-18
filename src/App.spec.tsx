import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useFetchFromUrl } from './hooks/useFetchFromUrl';
import { dummyCsvData } from './__test__/dummyCsvData';
import userEvent from '@testing-library/user-event';

jest.mock('./hooks/useFetchFromUrl');
const ue = userEvent.setup();

const mockFetchData = {
  data: {
    text: () => Promise.resolve(dummyCsvData),
  },
  isSuccess: true,
  refetch: () => (useFetchFromUrl as jest.Mock).mockReturnValue(mockFetchData),
};

describe('test App.tsx', () => {
  beforeEach(() =>
    (useFetchFromUrl as jest.Mock).mockReturnValue(mockFetchData),
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render when isSuccess is true', async () => {
    render(<App />);
    await waitFor(() => {
      const listElements = screen.queryAllByRole('listitem');
      expect(listElements).toHaveLength(10);
      expect(screen.queryByText('ローディング')).not.toBeInTheDocument();
    });
  });

  it('should render generateQuestion of button element when isSuccess is true', async () => {
    render(<App />);
    // NOTE: ここでuseFetchFromUrlのモックをクリアしておく
    (useFetchFromUrl as jest.Mock).mockClear();
    await waitFor(async () => {
      const buttonElement = screen.queryByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('問題を再生成する');
      await ue.click(buttonElement as HTMLButtonElement);
    });
    expect(useFetchFromUrl).toHaveBeenCalledTimes(1);
  });

  it('should render generateQuestion of button element when isSuccess is true', async () => {
    render(<App />);
    // NOTE: ここでuseFetchFromUrlのモックをクリアしておく
    (useFetchFromUrl as jest.Mock).mockClear();
    await waitFor(async () => {
      const buttonElement = screen.queryByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('問題を再生成する');
      await ue.click(buttonElement as HTMLButtonElement);
    });
    expect(useFetchFromUrl).toHaveBeenCalledTimes(1);
  });

  it('should render correctAnswerRateElement and initial render is 0', async () => {
    render(<App />);
    // NOTE: ここでuseFetchFromUrlのモックをクリアしておく
    (useFetchFromUrl as jest.Mock).mockClear();
    await waitFor(async () => {
      const correctAnswerRateElement = screen.queryByRole('meter', {
        name: '正答率',
      });
      expect(correctAnswerRateElement).toBeInTheDocument();
      expect(correctAnswerRateElement).toHaveTextContent('正答率：0/10');
    });
  });

  it('should not render yet when isSuccess is false', () => {
    (useFetchFromUrl as jest.Mock).mockReturnValue({
      ...mockFetchData,
      isSuccess: false,
    });
    render(<App />);
    expect(screen.getByText('ローディング')).toBeInTheDocument();
  });
});
