import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion } from "framer-motion";

const ContactPage = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://assets.vector.hereapi.com/styles/berlin/base/mapbox/tilezen?apikey=6ZKCmRwks4GRrsbzUG3Mey-Nq_eoGNklO7m13osVzmU", // Free MapLibre style
      center: [38.7441, 9.0352], // Coordinates of Abrhot Library, Addis Ababa
      zoom: 15,
    });

    new maplibregl.Marker().setLngLat([38.7441, 9.0352]).addTo(map); // Add marker

    map.addControl(new maplibregl.NavigationControl(), "top-right"); // Add navigation controls

    return () => map.remove(); // Cleanup map instance on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Contact page
        </h1>
        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="p-6 bg-white rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Email</h3>
                <p className="text-gray-700">info@ministryofindustry.gov.et</p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 bg-white rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-green-900">Phone</h3>
                <p className="text-gray-700">+251 11 123 4567</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 bg-white rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="flex flex-col w-full h-[300px]">
                <h3 className="text-xl font-bold text-purple-900">Address</h3>
                <p className="text-gray-700">
                  At the Back of Abrhot Library, Addis Ababa, Ethiopia
                </p>
                {/* Map Section */}
                <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
                  <div
                    ref={mapContainerRef}
                    className="w-full absolute bottom-0 h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
