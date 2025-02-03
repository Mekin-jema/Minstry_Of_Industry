import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Ethio from "../../assets/ethiopia.svg";
import { LoginContext } from "../helpers/LoginContext";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: <FaFacebook size={20} className="text-white" />, url: "https://facebook.com" },
  { icon: <FaLinkedin size={20} className="text-white" />, url: "https://linkedin.com" },
  { icon: <FaTwitter size={20} className="text-white" />, url: "https://twitter.com" },
  { icon: <FaInstagram size={20} className="text-white" />, url: "https://instagram.com" },
];

const Header = () => {
  const { isLogin } = useContext(LoginContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dynamicNavItems = isLogin
    ? [...navItems,{ name: "Upload", path: "/upload" }, { name: "Data", path: "/data" }]
    : navItems;

  return (
    <div className="sticky top-0 z-30 w-full px-1">
      <div className="w-full h-[52px] bg-[#214394] flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img src={Ethio} alt="Ethiopian Flag" className="w-[30px] h-[15px]" />
          <span className="text-white text-sm font-medium hidden sm:block">የኢትዮጳያ ፈዴራላዊ ሪፐብሊክ</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300">
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="w-full h-[102px] bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-[100px] h-[70px] sm:w-[120px] sm:h-[80px] cursor-pointer" />
          </Link>
          <p className="text-[#2E2F7A] font-bold text-xl sm:text-2xl">Ministry Of Industry</p>
        </div>
        <div className="relative flex items-center border border-gray-300 rounded-lg px-2 sm:px-4 py-1 sm:py-2">
          <input type="text" placeholder="Search..." className="outline-none px-2 py-1 w-32 sm:w-40 text-sm" />
          <FaSearch size={18} className="absolute right-2 text-gray-500" />
        </div>
      </div>

      <div className="w-full h-[45px] bg-[#214394] flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white">{isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
        </div>
        <nav className={`${isMenuOpen ? "block" : "hidden"} sm:flex sm:space-x-4 absolute sm:static top-[199px] left-0 w-full bg-[#214394] sm:bg-transparent z-20 sm:justify-center`}>
          {dynamicNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative text-white text-sm font-medium transition duration-300 block sm:inline-flex sm:items-center sm:mx-4 
              after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white 
              after:bottom-[-4px] after:left-0 after:transition-transform after:duration-300 after:scale-x-0
              hover:text-gray-300 hover:after:scale-x-100 
              ${location.pathname === item.path ? "after:scale-x-100 font-bold text-gray-300" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex p-3 border-none rounded-lg text-white">
          {isLogin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default Header;
