import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";
import AboutMinistry from "./About";
import Services from "./Services";
import ContactPage from "./Contact";

import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";
import image7 from "../../assets/image7.jpg";
import image8 from "../../assets/image8.jpg";
import image9 from "../../assets/image9.jpg";
import image10 from "../../assets/image10.jpg";

const images = [image4, image5, image6, image7, image8, image9, image10];

const Home = () => {
  const [textVisible, setTextVisible] = useState(true);
  const [activeSlide, setActiveSlide] = useState(6); // Adjust to start from the first slide

  const handleLoopDone = () => {
    setTextVisible(false);
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative w-full h-full">
      <section className="relative w-full h-[300px] sm:h-[600px] flex flex-col justify-center items-center text-white overflow-hidden left-0">
        {/* Image Slider with text on top */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            onChange={handleSlideChange} // Detects slide change
            selectedItem={activeSlide} // Ensures correct slide is shown
          >
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="rounded-sm shadow-lg object-cover w-full h-full bg-cover bg-center"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Animated Text */}
        <div className="absolute z-10 w-full text-center px-6 md:px-12 top-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {textVisible && (
              <Typewriter
                words={[
                  "Welcome to the Ministry of Industry.",
                  "We are here to serve you.",
                  "Contact us for more information.",
                ]}
                loop={1}
                cursor
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1500}
                onLoopDone={handleLoopDone}
              />
            )}
          </motion.h2>
        </div>
      </section>

      {/* Render only the active slide component */}
      <div>
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <AboutMinistry />
        </motion.div>

        <motion.div
          key="services"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Services />
        </motion.div>

        <motion.div
          key="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <ContactPage />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;