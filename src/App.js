import { Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}

export default App;
