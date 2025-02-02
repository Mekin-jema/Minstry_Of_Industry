import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: "Useful Links",
      links: [
        "Home",
        "About us",
        "Services",
        "Terms of service",
        "Privacy policy",
      ],
    },
    {
      title: "Our Services",
      links: [
        "Manufacturing",
        "Industrial Services",
        "Investment Facilitation",
        "Policy Development:",
        "Infrastructure Development",
      ],
    },
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
    {
      icon: <FaInstagram size={20} className="text-white" />,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer className="text-white bg-[#214394] py-12 rounded-lg ml-1">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-xl font-bold">Minstry of Industry</h4>
          <p className="mt-2">
            Arat killo , Addis Ababa, At the back of Abrihot
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>
            +251955488 55
          </p>
          <p>
            <strong>Email:</strong> ministryOf@industry.com
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
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

        {/* Footer Links */}
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-bold pb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center border-t border-white mt-8 pt-4">
        <p>&copy; 2025 Minstry Of Industry. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
