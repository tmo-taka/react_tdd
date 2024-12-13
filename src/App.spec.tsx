import { render, screen } from '@testing-library/react';
import App from './App';
import { useFetchFromUrl } from './hooks/useFetchFromUrl';
jest.mock('./hooks/useFetchFromUrl');

const dummyCsvData: string = `a,英語アルファベットの第1字 / (音階の)イ音,イ調
ability,『能力』,力量 / 特殊な才能,優れた手腕
able,(…することが)『できる』 / 『有能な』,腕ききの,並々ならない`;

const mockFetchData = {
  data: {
    text: () => Promise.resolve(dummyCsvData),
  },
  isSuccess: true,
};

describe('test App.tsx', () => {
  beforeEach(() =>
    (useFetchFromUrl as jest.Mock).mockReturnValue(mockFetchData),
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render when isSuccess is true', () => {
    render(<App />);
    expect(screen.queryByText('ローディング')).not.toBeInTheDocument();
    expect(screen.getByText('テスト')).toBeInTheDocument();
  });

  it('should not render yet when isSuccess is false', () => {
    (useFetchFromUrl as jest.Mock).mockReturnValue({
      ...mockFetchData,
      isSuccess: false,
    });
    render(<App />);
    expect(screen.queryByText('テスト')).not.toBeInTheDocument();
    expect(screen.getByText('ローディング')).toBeInTheDocument();
  });
});
