import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import Detail from "./Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
