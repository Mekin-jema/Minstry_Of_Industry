import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Ethio from "../assets/ethiopia.svg";
import { useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  const location = useLocation(); // Get current path
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook size={20} className="text-white" />,
      url: "https://facebook.com",
    },
    {
      icon: <FaLinkedin size={20} className="text-white" />,
      url: "https://linkedin.com",
    },
    {
      icon: <FaTwitter size={20} className="text-white" />,
      url: "https://twitter.com",
    },
    {
      icon: <FaInstagram size={20} className="text-white" />,
      url: "https://instagram.com",
    },
  ];

  return (
    <div className="ml-1 sticky top-0 z-30 w-full">
      <div className="w-full h-[52px] bg-[#214394] flex">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center justify-start w-full text-white text-sm font-medium px-4 gap-2">
            <img
              src={Ethio}
              alt="Ethiopian Flag"
              className="w-[30px] h-[15px]"
            />
            <span>የኢትዮጳያ ፈዴራላዊ ሪፐብሊክ</span>
          </div>
          <div className="flex items-center gap-3 text-white mr-[100px]">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[102px] bg-white flex items-center justify-between px-4">
        <div className="flex items-center h-full">
          <Link to="/">
            <img
              src={Logo} // Change the path to the logo image
              alt="logo"
              className="w-[120px] h-[80px] cursor-pointer"
            />
          </Link>
          <p className="text-[#2E2F7A] font-bold text-[25px]">
            Ministry Of Industry
          </p>
        </div>

        {/* Search Box */}
        <div className="relative flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 py-1 w-40 text-sm"
          />
          <FaSearch size={18} className="absolute right-2 text-gray-500" />
        </div>
      </div>
      <div className="w-full h-[45px] bg-[#6DB269] flex items-center justify-end px-4">
        <nav className="flex space-x-4 ml-[76px] justify-between items-center md:flex mr-[300px]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-white text-sm font-medium hover:text-gray-200 transition duration-300 
              after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white 
              after:bottom-[-2px] after:left-0 after:transition-transform after:duration-300 
              hover:after:scale-x-100 
              ${
                location.pathname === item.path
                  ? "after:scale-x-100 font-bold text-gray-300"
                  : "after:scale-x-0"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
