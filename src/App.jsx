// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutMinistry from "./pages/About";
import Services from "./pages/Services";
import ContactPage from "./pages/Contact";

const App = () => {
  return (
    <Router className="pl-4">
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMinistry />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Add more routes as necessary */}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
