import { Route, Routes } from "react-router";
import { Hello } from "./cards/Hello";
import { Test } from "./cards/Test";
import { Hoge } from "./cards/Hoge";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/cards/hello"} element={<Hello />} />
        <Route path={"cards/test"} element={<Test />} />
        <Route path={"cards/hoge"} element={<Hoge />} />
      </Routes>
    </>
  );
}

export default App;