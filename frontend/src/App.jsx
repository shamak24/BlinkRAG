// Import necessary modules from react-router-dom and local components
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import QA from "./pages/QA";
import NotFound from "./pages/404";

function App() {
  return (
    // Set up the router for the application
    <Router>
      {/* Main container with minimum height and background color */}
      <div className="min-h-screen bg-gray-100">
        {/* Navigation bar displayed on all pages */}
        <Navbar />
        {/* Define application routes */}
        <Routes>
          {/* Redirect root path to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* Dashboard page route */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Upload page route */}
          <Route path="/upload" element={<Upload />} />
          {/* QA page route with dynamic id parameter */}
          <Route path="/ask/:id" element={<QA />} />
          {/* 404 Not Found page route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
