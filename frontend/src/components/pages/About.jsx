import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Image4 from "../../assets/image4.jpg";
import Image5 from "../../assets/image5.jpg";
import Image6 from "../../assets/image6.jpg";
import Image7 from "../../assets/image7.jpg";
import Image8 from "../../assets/image8.jpg";

const AboutMinistry = () => {
  const content = `
## 2.1 History of the Ethiopian Ministry of Industry

The **Ethiopian Ministry of Industry (MoI)** has experienced significant transformations since its establishment. Below is a historical timeline of key events:

- **Pre-1974 (Imperial Era):**
  - Focused on import-substituting light industries.
  - Several five-year development plans introduced.
  - Industrial growth encouraged through foreign investment.
  
- **1974-1991 (Derg Regime):**
  - Command economy implemented.
  - Nationalization of industries, limiting private sector participation.
  - Decline in manufacturing due to financial struggles.
  
- **1991-Present (EPRDF & Beyond):**
  - Market-oriented reforms introduced.
  - Economic liberalization and private sector promotion.
  - **2018:** Ministry of Trade and Industry (MoTI) established by merging Trade and Industry ministries.
  - Focus on industrial modernization, investment promotion, and compliance with quality standards.
`;

  const images = [Image6, Image7, Image8, Image4, Image5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-8 bg-gray-100 text-gray-800 rounded-lg shadow-lg max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          About the Ministry of Industry
        </h1>

        {/* History Section */}
        <div id="history" className="flex flex-col md:flex-row gap-8 mb-12">
          <ReactMarkdown className="prose lg:prose-xl text-gray-700 flex-1">
            {content}
          </ReactMarkdown>
          <div className="flex-1 relative">
            <motion.img
              src={images[currentImageIndex]}
              alt="Ethiopian Ministry of Industry"
              className="rounded-lg shadow-md w-full h-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition duration-300"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition duration-300"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Mission, Vision, and Objectives Section */}
        <div id="mission" className="mt-12">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Mission, Vision, and Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mission",
                text: "To create a transparent, fair, and competitive industrial system that promotes social benefits and generates foreign exchange earnings.",
                color: "blue",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Vision",
                text: "To establish a globally competitive industrial sector built on sustainable development principles.",
                color: "green",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Objectives",
                text: "Enhancing industrial competitiveness, facilitating investment, promoting technological advancement, and ensuring environmental sustainability.",
                color: "purple",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                details: [
                  "Promote industrial diversification.",
                  "Enhance export competitiveness.",
                  "Foster innovation and technology transfer.",
                  "Ensure sustainable industrial practices.",
                ],
              },
            ].map(({ title, text, color, icon, details }, index) => {
              let colorClass;
              switch (color) {
                case "blue":
                  colorClass = "text-blue-600";
                  break;
                case "green":
                  colorClass = "text-green-600";
                  break;
                case "purple":
                  colorClass = "text-purple-600";
                  break;
                default:
                  colorClass = "text-gray-600";
              }

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: index === 0 ? -20 : index === 2 ? 20 : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  className={`p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center border-t-4 border-${color}-600 hover:shadow-2xl hover:transition duration-300 cursor-pointer`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 ${colorClass} mb-4`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={icon}
                    />
                  </svg>
                  <h2 className={`text-xl font-bold ${colorClass} mb-2`}>
                    {title}
                  </h2>
                  <p className="text-gray-700">{text}</p>
                  {details && (
                    <div className="mt-4 text-left">
                      <ul className="list-disc list-inside">
                        {details.map((detail, i) => (
                          <li key={i} className="text-gray-700">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMinistry;
