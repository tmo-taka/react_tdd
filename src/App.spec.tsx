import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useFetchFromUrl } from './hooks/useFetchFromUrl';
import { dummyCsvData } from './__test__/dummyCsvData';
import userEvent from '@testing-library/user-event';
import { Buttons } from '@testing-library/user-event/dist/types/system/pointer/buttons';

jest.mock('./hooks/useFetchFromUrl');
const ue = userEvent.setup();

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
    await waitFor(async () => {
      const buttonElement = screen.queryByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('問題を再生成する');
      await ue.click(buttonElement as HTMLButtonElement);
      // TODO: refetch Button
      // expect(useFetchFromUrl).toHaveBeenCalledTimes(2);
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
