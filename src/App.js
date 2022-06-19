import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Join from "./pages/Join";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/userReducer";

function App() {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/join"
        element={currentUser ? <Navigate to="/" /> : <Join />}
      />
    </Routes>
  );
}

export default App;
