import { lazy, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const LogIn = lazy(() => import("../pages/LogInPage/LogInPage"));
const Register = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const Library = lazy(() => import("../pages/LibraryPage/LibraryPage"));
const Recommendation = lazy(() => import("../pages/RecommendationPage/RecommendationPage"));
const Reading = lazy(() => import("../pages/ReadingPage/ReadingPage"));

function App() {
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/some-path" element={<LogIn />} />
        <Route path="/some-path" element={<Register/>} />
        <Route path="/some-path" element={<Reading />} />
        <Route path="/some-path" element={<Recommendation/>} />
        <Route path="/some-path" element={<Library />} />
      </Routes>
    </Suspense>
  </div>;
}

export default App;
