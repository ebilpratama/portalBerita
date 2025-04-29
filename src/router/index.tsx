import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import News from "../pages/News.tsx";
import NewsList from "../pages/NewsList.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;