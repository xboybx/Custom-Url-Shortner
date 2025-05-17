import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RedirectHandler from "./components/RedirectHandler";
import Layout from "./components/Layout";
import LinksPage from "./pages/LinksPage";
import "./index.css";

function App() {
  return (
    <Routes>
      {/* Handle redirects for shortened URLs */}
      <Route path="/:shortUrl" element={<RedirectHandler />} />

      {/* Main application routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
