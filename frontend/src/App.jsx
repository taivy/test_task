import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/form">Go to Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  );
}
