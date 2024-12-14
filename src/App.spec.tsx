import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useFetchFromUrl } from './hooks/useFetchFromUrl';
jest.mock('./hooks/useFetchFromUrl');

const dummyCsvData: string = `a,英語アルファベットの第1字 / (音階の)イ音,イ調
ability,『能力』,力量 / 特殊な才能,優れた手腕
able,(…することが)『できる』 / 『有能な』,腕ききの,並々ならない
about,…『について』,に関して / (また,おもに『around』)…『の回りに(を)』,の周囲を(で)
above,…『の上方へ』,より高いところへ / …『の上に』,の上方に,さらに高いところに(の)
abroad,『海外へ(で)』,『外国に(で)』 / 戸外へ
absence,『るす』,不在;『欠席』;不在期間;(…を)欠席すること / (…が)『ないこと』,(…の)欠如(lacking)
absent,『欠席した』,るすの,不在の / (物が)欠けている,ない
absolute,『まったくの』,完全な(complete) / 『絶対的な力を持った』,絶対の
accept,(喜んで)'を'『受け取る』,'を'受け入れる / 'を'受諾する,に従う;(特に)…‘に'しかたなく同意する
accident,『偶然』,偶発,めぐり合わせ / 『事故』,災難
accord,(…と)『一致する』,調和する / 'を'与える
account,『計算』,勘定 / 『計算書』,勘定書;簿記
accuse,(…の罪で)'を'『告発する』,告訴する / (…であると)'を'『非難する』,責める
accustom,(…に)'を'『慣らす』,習慣づける
across,(川・道路など幅があって長いもの)『を横断して』
act,『行い』,『行為』 / 法令,条令
action,『行動』,活動;精力的な活動 / 『行為』,行い;『日常の行動』,ふるまい
active,『活動的な』,活発な,活気のある / 『有効な』,(薬の効力などが)まだ働いている,機能している
actor,(男の)『俳優』,『男優』 / 行為者
actual,『現実の』,実際上の(real) / 現在の,現存の
add,1'を'『合計する』 / (…に)…'を'『加える』,足す,付け足す
address,『あて名』,住所 / 『演説』;(口頭・文書による)あいさつの言葉(speech)`;

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

  it('should not render yet when isSuccess is false', () => {
    (useFetchFromUrl as jest.Mock).mockReturnValue({
      ...mockFetchData,
      isSuccess: false,
    });
    render(<App />);
    expect(screen.getByText('ローディング')).toBeInTheDocument();
  });
});
