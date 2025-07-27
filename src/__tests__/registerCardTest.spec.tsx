import userEvent from "@testing-library/user-event";
import { RegisterCard } from "../pages/RegisterCard"
import { renderWithRouter } from "../test-utils/renderWithRouter"
import { screen, waitFor } from "@testing-library/react";
import { User } from "../domain/user";


//Worning対応
jest.mock("../utils/supabase.ts", () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockResolvedValue({ data: [], error: null }),
            insert: jest.fn().mockResolvedValue({ data: [], error: null }),

        }))
    }
}));

//モックの実装
jest.mock("../services/getAllSkills.ts", () => {
    return {
        getAllSkills: () => mockGetAllSkills(),
    }
})
jest.mock("../services/userInsertData.ts", () => {
    return {
        userInsertData: (data: User) => mockUserInsertData(data)
    }
})

//ユーザーイベント定義
const user = userEvent.setup();

//モックデータ作成
const mockSkill = [
    { skill_id: 1, skill_name: "React" },
    { skill_id: 2, skill_name: "TypeScript" },
    { skill_id: 3, skill_name: "Java" },
]

//モック関数
const mockGetAllSkills = jest.fn().mockResolvedValue(mockSkill);
const mockUserInsertData = jest.fn().mockResolvedValue(undefined);




//useNavigateをモック化
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockedNavigator,
}));


describe("初期表示", () => {
    test("タイトルが表示できること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        const title = await screen.findByTestId("testRegisterTitle");
        expect(title).toHaveTextContent("名刺新規登録");
    })
})

describe("全項目が正しく入力された場合", () => {
    test("登録処理が行われて'/'に遷移すること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.type(screen.getByTestId("testRegisterWord"), "testtesttest")
        //お名前
        await user.type(screen.getByTestId("testRegisterName"), "テストテスト")
        //自己紹介
        await user.type(screen.getByTestId("testRegisterDescription"), "こんばんは、テストです")
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "1");
        //GitHub ID
        await user.type(screen.getByTestId("testRegisterGithubId"), "test_test")
        //Qiita ID
        await user.type(screen.getByTestId("testRegisterQiitaId"), "test_test")
        //X ID
        await user.type(screen.getByTestId("testRegisterXId"), "test_test_test")
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);

        await waitFor(() => {
            expect(mockUserInsertData).toHaveBeenCalled()
        })
        expect(mockedNavigator).toHaveBeenCalledWith("/");
        //ユーザー入力確認
        //const input = screen.getByTestId("testRegisterXId") as HTMLInputElement;
        //console.log("入力されている値:", input.value);
        //ユーザーが選択したスキルIDと一致するか確認
        //expect((selectSkill as HTMLSelectElement).value).toBe("1");
    })

    test("IDがないときにエラーメッセージがでること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.clear(screen.getByTestId("testRegisterWord"))
        //お名前
        await user.type(screen.getByTestId("testRegisterName"), "テストテスト")
        //自己紹介
        await user.type(screen.getByTestId("testRegisterDescription"), "こんばんは、テストです")
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "1");
        //GitHub ID
        await user.type(screen.getByTestId("testRegisterGithubId"), "test_test")
        //Qiita ID
        await user.type(screen.getByTestId("testRegisterQiitaId"), "test_test")
        //X ID
        await user.type(screen.getByTestId("testRegisterXId"), "test_test_test")
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);
        const errorMessage = await screen.getByTestId("wordErrMsg")
        expect(errorMessage).toHaveTextContent("好きな英単語は必須です")
    })

    test("名前がないときにエラーメッセージがでること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.type(screen.getByTestId("testRegisterWord"), "testtesttest")
        //お名前
        await user.clear(screen.getByTestId("testRegisterName"))
        //自己紹介
        await user.type(screen.getByTestId("testRegisterDescription"), "こんばんは、テストです")
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "1");
        //GitHub ID
        await user.type(screen.getByTestId("testRegisterGithubId"), "test_test")
        //Qiita ID
        await user.type(screen.getByTestId("testRegisterQiitaId"), "test_test")
        //X ID
        await user.type(screen.getByTestId("testRegisterXId"), "test_test_test")
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);
        const errorMessage = await screen.getByTestId("nameErrMsg")
        expect(errorMessage).toHaveTextContent("お名前は必須です。")
    })

    test("紹介分がないときにエラーメッセージがでること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.type(screen.getByTestId("testRegisterWord"), "testtesttest")
        //お名前
        await user.type(screen.getByTestId("testRegisterName"), "テストテスト")
        //自己紹介
        await user.clear(screen.getByTestId("testRegisterDescription"))
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "1");
        //GitHub ID
        await user.type(screen.getByTestId("testRegisterGithubId"), "test_test")
        //Qiita ID
        await user.type(screen.getByTestId("testRegisterQiitaId"), "test_test")
        //X ID
        await user.type(screen.getByTestId("testRegisterXId"), "test_test_test")
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);
        const errorMessage = await screen.getByTestId("descriptionErrMsg")
        expect(errorMessage).toHaveTextContent("自己紹介は必須です。")
    })

    test("スキルがないときにエラーメッセージがでること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.type(screen.getByTestId("testRegisterWord"), "testtesttest")
        //お名前
        await user.type(screen.getByTestId("testRegisterName"), "テストテスト")
        //自己紹介
        await user.type(screen.getByTestId("testRegisterDescription"), "こんばんは、テストです")
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "");
        //GitHub ID
        await user.type(screen.getByTestId("testRegisterGithubId"), "test_test")
        //Qiita ID
        await user.type(screen.getByTestId("testRegisterQiitaId"), "test_test")
        //X ID
        await user.type(screen.getByTestId("testRegisterXId"), "test_test_test")
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);
        const errorMessage = await screen.getByTestId("skillErrMsg")
        expect(errorMessage).toHaveTextContent("好きな技術は必須です。")
    })

    test("オプションを入力しなくても登録ができること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        //好きな英単語
        await user.type(screen.getByTestId("testRegisterWord"), "testtesttest")
        //お名前
        await user.type(screen.getByTestId("testRegisterName"), "テストテスト")
        //自己紹介
        await user.type(screen.getByTestId("testRegisterDescription"), "こんばんは、テストです")
        //好きな技術
        const selectSkill = screen.getByTestId("testRegisterSkill")
        await user.selectOptions(selectSkill, "2");
        //登録ボタンをクリック
        const registerButton = await screen.findByRole("button", { name: "登録" })
        await user.click(registerButton);

        await waitFor(() => {
            expect(mockUserInsertData).toHaveBeenCalledWith({
                user_id: "testtesttest",
                name: "テストテスト",
                description: "こんばんは、テストです",
                skill: "2",
                github_id: "",
                qiita_id: "",
                x_id: ""
            });
        })
    })

})