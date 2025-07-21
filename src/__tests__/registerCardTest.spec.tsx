import { RegisterCard } from "../pages/RegisterCard"
import { renderWithRouter } from "../test-utils/renderWithRouter"
import { screen } from "@testing-library/react";


//supabaseモック
jest.mock("../utils/supabase.ts", () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockResolvedValue({ data: [], error: null })
        }))
    }
}));
describe("表示確認", () => {
    test("タイトルが表示できること", async () => {
        renderWithRouter(<RegisterCard />, { route: "/cards/register", path: "/cards/register" })
        const title = await screen.findByTestId("testTitle");
        expect(title).toHaveTextContent("名刺新規登録");
    })
})