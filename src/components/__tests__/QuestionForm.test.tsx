import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "jotai";
import { QuestionForm } from "../QuestionForm";
import { correctStatusAtomFamily } from "../../atoms/correctStatusAtom";
import { useAtom } from "jotai";

// テスト用のラッパーコンポーネントを作成
const TestComponent = ({ word }: { word: string }) => {
  const [isCorrect] = useAtom(correctStatusAtomFamily(word));
  return <div data-testid="test-status">{isCorrect ? "correct" : "incorrect"}</div>;
};

describe("QuestionForm", () => {
  it("should update correctStatusAtom when answer is correct", () => {
    const word = "test";
    
    render(
      <Provider>
        <QuestionForm word={word} />
        <TestComponent word={word} />
      </Provider>
    );

    // 初期状態は incorrect
    expect(screen.getByTestId("test-status")).toHaveTextContent("incorrect");

    // 正解を入力
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: word } });
    fireEvent.submit(screen.getByRole("form"));

    // 状態が correct に変更される
    expect(screen.getByTestId("test-status")).toHaveTextContent("correct");
  });

  it("should not update correctStatusAtom when answer is incorrect", () => {
    const word = "test";
    
    render(
      <Provider>
        <QuestionForm word={word} />
        <TestComponent word={word} />
      </Provider>
    );

    // 初期状態は incorrect
    expect(screen.getByTestId("test-status")).toHaveTextContent("incorrect");

    // 不正解を入力
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "wrong" } });
    fireEvent.submit(screen.getByRole("form"));

    // 状態は incorrect のまま
    expect(screen.getByTestId("test-status")).toHaveTextContent("incorrect");
  });
});