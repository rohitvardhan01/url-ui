import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlForm from "./components/UrlForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlForm />} />
      </Routes>
    </Router>
  );
}
