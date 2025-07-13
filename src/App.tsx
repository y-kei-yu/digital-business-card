import { Link, Route, Routes, useLocation } from "react-router";
import { UserCard } from "./pages/UserCard";
import { Test } from "./pages/Test";
import { RegisterCard } from "./pages/RegisterCard";

function App() {
  const location = useLocation();

  return (
    <>
      {/* パスが "/" のときだけナビゲーション表示 */}
      {location.pathname === "/" && (
        <nav>
          <ul>
            <li><Link to="/cards/usercard">UserCard</Link></li>
            <li><Link to="/cards/test">Test</Link></li>
            <li><Link to="/cards/register">RegisterCard</Link></li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/cards/usercard" element={<UserCard />} />
        <Route path="/cards/test" element={<Test />} />
        <Route path="/cards/register" element={<RegisterCard />} />
      </Routes>
    </>
  );
}
export default App;