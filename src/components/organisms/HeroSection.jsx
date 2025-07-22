import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const scrollToPrerequisites = () => {
    const element = document.getElementById("prerequisites");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
              <span className="block text-gray-900">AutoTester:</span>
              <span className="gradient-text">Quick Start Guide</span>
            </h1>
          </motion.div>

          {/* Rocket Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold text-lg mb-8"
          >
            <ApperIcon name="Rocket" size={24} />
            Get Testing in 4 Clicks
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-600 font-body mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your testing from days to minutes with AI-powered automation
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={scrollToPrerequisites}
              className="text-xl px-12 py-6 shadow-2xl"
            >
              Start Your Testing Journey
              <ApperIcon name="ArrowRight" size={24} className="ml-2" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
          >
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">15</div>
              <div className="text-gray-600">Minutes to First Test</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">4</div>
              <div className="text-gray-600">Simple Steps</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">0</div>
              <div className="text-gray-600">Coding Required</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;