import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";

import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.jpg";
import AboutMinistry from "./About";
import Services from "./Services";
import ContactPage from "./Contact";

const images = [image4, image5, image6, image7, image8, image9, image10];

const Home = () => {
  const [textVisible, setTextVisible] = useState(true); // Track if the text is visible

  const handleLoopDone = () => {
    setTextVisible(false); // Hide the text after the loop finishes
  };

  return (
    <div className="relative w-full h-full ">
      <section className="relative w-full h-[600px] flex flex-col justify-center items-center text-white overflow-hidden left-0 ">
        {/* Image Slider with text on top */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000} // Adjust interval for smooth transitions
            showThumbs={false}
            showStatus={false}
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
        <div className="absolute z-10 w-full text-center px-6 md:px-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Typewriter Effect with react-simple-typewriter */}
            {textVisible && (
              <Typewriter
                words={[
                  "Welcome to the Ministry of Industry, driving growth, innovation, and sustainability in Ethiopia's industrial sector.",
                ]}
                loop={1} // Set loop to 1 for one-time only
                cursor
                cursorStyle=""
                typeSpeed={90} // Slower typing speed for a more dramatic effect
                deleteSpeed={50} // Adjusted delete speed for smoother transitions
                delaySpeed={1500} // Delay between each phrase
                onLoopDone={handleLoopDone} // Callback to hide the text after finishing
              />
            )}
          </motion.h2>
        </div>
      </section>
      <section>
        <AboutMinistry />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <ContactPage />
      </section>
    </div>
  );
};

export default Home;
