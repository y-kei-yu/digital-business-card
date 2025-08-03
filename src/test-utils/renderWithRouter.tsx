import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";

//パスの設定共通化
export const renderWithRouter = (
    ui: ReactNode,
    options?: { route?: string; path?: string; },
) => {

    const route = options?.route || "/";
    const path = options?.path || "/";

    return (
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path={path} element={ui} />
                </Routes>
            </MemoryRouter>
        )
    )
}