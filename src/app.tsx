import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Home";
import Detail from "./Detail";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
