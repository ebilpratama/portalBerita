import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import News from "../pages/News.tsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;