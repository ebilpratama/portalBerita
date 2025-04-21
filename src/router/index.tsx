import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import News from "../pages/News.tsx";
import NewsList from "../pages/NewsList.tsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/newslist" element={<NewsList />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;