
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UploadCSVFile, Home,Navbar,Footer,Services,ContactPage, Signup, Login, AboutMinistry, Logout,ReadCSVFile} from './router/Router.js';
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/data" element={<ReadCSVFile />} />
          <Route path="/upload" element={<UploadCSVFile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
