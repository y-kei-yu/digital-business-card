import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard } from "../pages/UserCard";
import { renderWithRouter } from "../test-utils/renderWithRouter";


//モックデータ作成
const mockUser = {
    user_id: "testUser",
    name: "テスト",
    description: "<p style={{color:\"red\"}}>こんばんは</p>",
    skill: "Github",
    qiita_id: "testUser1",
    github_id: "testUser2",
    x_id: "testUser3"
}
//データ取得モック関数
const mockFetchUser = jest.fn().mockResolvedValue(mockUser);
//useNavigateをモック化
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockedNavigator,
}));

//モックの実装
jest.mock("../services/fetchUser.ts", () => {
    return {
        FetchUser: () => mockFetchUser()
    }
})


describe("表示確認", () => {
    test("名前が表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })

        const name = await screen.findByTestId("testName");
        expect(name).toHaveTextContent("テスト");
    });

    test("自己紹介が表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })

        const description = await screen.findByTestId("test-description");
        expect(description).toHaveTextContent("こんばんは");
    });

    test("好きな技術が表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })
        const skill = await screen.findByTestId("test-skill");
        expect(skill).toHaveTextContent("Github");
    });

    test("Qiitaのアイコンが表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })
        const qiitaIcon = await screen.findByTestId("testQiitaIcon");
        expect(qiitaIcon).toBeInTheDocument()
    });

    test("GitHubのアイコンが表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })
        const githubIcon = await screen.findByTestId("testGithubIcon");
        expect(githubIcon).toBeInTheDocument()
    });

    test("Xのアイコンが表示できること", async () => {
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })
        const xIcon = await screen.findByTestId("testXIcon");
        expect(xIcon).toBeInTheDocument()
    });
})

describe("画面遷移", () => {
    test("戻るボタンを押すことで\"/\"に画面遷移できること", async () => {
        const user = userEvent.setup();
        renderWithRouter(<UserCard />, { route: "/cards/usercard/testUser" })
        const backButton = await screen.findByRole("button", { name: "戻る" });
        await user.click(backButton);
        expect(mockedNavigator).toHaveBeenCalledWith('/');
    })
})
