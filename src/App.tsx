import { Route, Routes } from "react-router";
import { UserCard } from "./pages/UserCard";
import { TopCard } from "./pages/TopCard";
import { RegisterCard } from "./pages/RegisterCard";

function App() {

  return (
    <>

      <Routes>
        <Route path="/cards/usercard/:id" element={<UserCard />} />
        <Route path="/" element={<TopCard />} />
        <Route path="/cards/register" element={<RegisterCard />} />
      </Routes>
    </>
  );
}
export default App;