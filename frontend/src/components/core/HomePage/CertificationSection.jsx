import React from "react";
import { motion } from "framer-motion";
import { fadeIn, scaleUp } from "../../common/motionFrameVarients";
import HighlightText from "./HighlightText";
import styles from "./CertificationSection.module.css";

import Google from "../../../assets/Images/certification img/Google-certificate-img.png";
import IBM from "../../../assets/Images/certification img/ibm-certification-img.png";
import Meta from "../../../assets/Images/certification img/meta-certification-img.png";
import Oracle from "../../../assets/Images/certification img/oracle-certification-img.png";
import Walmart from "../../../assets/Images/certification img/walmart-certification-img.png";
import Sony from "../../../assets/Images/certification img/sony-certificate-img.png";

const certifications = [
  {
    id: 1,
    name: "Google",
    image: Google,
    color: "from-blue-500 to-green-500"
  },
  {
    id: 2,
    name: "IBM",
    image: IBM,
    color: "from-blue-600 to-blue-800"
  },
  {
    id: 3,
    name: "Meta",
    image: Meta,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 4,
    name: "Oracle",
    image: Oracle,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 5,
    name: "Walmart",
    image: Walmart,
    color: "from-blue-600 to-yellow-500"
  },
  {
    id: 6,
    name: "Sony",
    image: Sony,
    color: "from-gray-700 to-black"
  }
];

const CertificationSection = () => {
  return (
    <div className={`w-full py-20 ${styles.certificationContainer}`}>
      {/* Section Header */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.1 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl lg:text-4xl font-semibold text-white mb-4'>
          We provide
          <HighlightText text={" Certification"} />
        </h2>
        <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
          Get industry-recognized certifications from top technology companies and boost your career prospects
        </p>
      </motion.div>

      {/* Certification Grid */}
      <div className={`${styles.certGrid} max-w-6xl mx-auto px-4`}>
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={scaleUp}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            {/* Card */}
            <div className={`${styles.certCard} relative bg-[#1a1d217a] rounded-2xl p-4 sm:p-6 border border-richblack-700 hover:border-yellow-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-50/10 group-hover:-translate-y-2`}>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Logo Container */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`${styles.logoContainer} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 flex items-center justify-center bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <img
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Certification Name */}
                <h3 className="text-white font-semibold text-sm md:text-base text-center group-hover:text-yellow-50 transition-colors duration-300">
                  {cert.name}
                </h3>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-caribbeangreen-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.1 }}
        className="text-center mt-12"
      >
        <div className="flex flex-wrap justify-center items-center gap-4 text-richblack-300">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-yellow-50 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Industry Recognized</span>
          </span>
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-caribbeangreen-300 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Career Boost</span>
          </span>
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-blue-400 rounded-full ${styles.floatingDot}`}></div>
            <span className={styles.shimmerText}>Global Standards</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificationSection;
