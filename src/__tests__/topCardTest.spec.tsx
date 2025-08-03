import { render, screen } from "@testing-library/react";
import { TopCard } from "../pages/TopCard";
import { renderWithRouter } from "../test-utils/renderWithRouter";
import userEvent from "@testing-library/user-event";
import { RegisterCard } from "../pages/RegisterCard";
import { MemoryRouter, Routes, Route } from "react-router-dom";

//Supabaseの警告回避とinsert/selectのモック設定
jest.mock("../utils/supabase.ts", () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockResolvedValue({ data: [], error: null })
        }))
    }
}));

// useNavigateをモック関数で差し替え 
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockedNavigator,
}));

// テストで使うユーザー操作イベントを定義
const user = userEvent.setup();


describe("初期表示", () => {
    test("タイトルが表示できること", async () => {
        renderWithRouter(<TopCard />, { route: "/", path: "/" })
        const title = await screen.findByTestId("testTopTitle");
        expect(title).toHaveTextContent("デジタル名刺アプリ");
    })

    test("IDを入力してボタンを押すと/cards/:idに遷移すること", async () => {
        renderWithRouter(<TopCard />, { route: "/", path: "/" })
        await user.type(screen.getByTestId("testTopId"), "testTopUser")
        const watchButton = await screen.findByRole("button", { name: "名刺を見る" })
        await user.click(watchButton);
        expect(mockedNavigator).toHaveBeenCalledWith("/cards/usercard/testTopUser")
    })
    test("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
        renderWithRouter(<TopCard />, { route: "/", path: "/" })
        const watchButton = await screen.findByRole("button", { name: "名刺を見る" })
        await user.click(watchButton);
        const errorMessage = await screen.getByTestId("userIdErrMsg")
        expect(errorMessage).toHaveTextContent("IDを入力してください。")
    })
    test("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
        //複数画面の遷移のため、renderWithRouterは使用できない
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<TopCard />} />
                    <Route path="/cards/register" element={<RegisterCard />} />
                </Routes>
            </MemoryRouter>
        );

        const registerLink = await screen.findByRole("link", { name: "新規登録はこちら" });
        await user.click(registerLink);
        const title = await screen.findByTestId("testRegisterTitle");
        expect(title).toHaveTextContent("名刺新規登録");
    })
})