import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationItem from "@/components/molecules/NavigationItem";
import ProgressRing from "@/components/atoms/ProgressRing";
import ApperIcon from "@/components/ApperIcon";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { guideService } from "@/services/api/guideService";

const StickyNavigation = () => {
  const [steps, setSteps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const sectionIds = ["prerequisites", "step-1", "step-2", "step-3", "step-4", "pro-tips"];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const data = await guideService.getSteps();
        setSteps(data);
      } catch (err) {
        console.error("Error loading steps for navigation:", err);
      }
    };

    loadSteps();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completedSteps = steps.filter(step => step.isCompleted).length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
        >
          <ApperIcon name={isOpen ? "X" : "Menu"} size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
<div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Quick Start Guide
              </h3>
              <button
                onClick={() => setShowVideoModal(true)}
                className="p-2 text-primary hover:bg-surface rounded-lg transition-all duration-200 hover:scale-105"
                title="Watch Quick Start Video"
              >
                <ApperIcon name="Play" size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <ProgressRing 
                progress={progressPercentage}
                size={40}
                strokeWidth={4}
                showPercentage={true}
              />
              <div className="text-sm text-gray-600">
                {completedSteps} of {totalSteps} steps completed
              </div>
            </div>
          </div>
          {/* Navigation Items */}
          <div className="space-y-2">
            {/* Prerequisites */}
            <button
              onClick={() => {
                document.getElementById("prerequisites")?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-200
                ${activeSection === "prerequisites" 
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" 
                  : "text-gray-600 hover:bg-surface hover:text-primary"
                }
              `}
            >
              <ApperIcon 
                name="CheckSquare" 
                size={20} 
                className={activeSection === "prerequisites" ? "text-white" : "text-gray-400"}
              />
              <span className="font-medium">Prerequisites</span>
            </button>

            {/* Steps */}
            {steps.map((step) => (
              <NavigationItem
                key={step.id}
                step={step}
                isActive={activeSection === `step-${step.id}`}
                onClick={() => setIsOpen(false)}
              />
            ))}

            {/* Pro Tips */}
            <button
              onClick={() => {
                document.getElementById("pro-tips")?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-200
                ${activeSection === "pro-tips" 
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" 
                  : "text-gray-600 hover:bg-surface hover:text-primary"
                }
              `}
            >
              <ApperIcon 
                name="Lightbulb" 
                size={20} 
                className={activeSection === "pro-tips" ? "text-white" : "text-gray-400"}
              />
              <span className="font-medium">Pro Tips</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Install Extension
              </button>
              <button className="w-full p-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200">
                View Docs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
          >
            <ApperIcon name="ArrowUp" size={24} />
          </motion.button>
)}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Quick Start Video Tutorial
                </h2>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>
              
              {/* Video Container */}
              <div className="relative bg-black">
                <div className="aspect-video w-full">
                  {/* Placeholder for video player - replace with actual video */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <ApperIcon name="Play" size={48} className="text-white ml-2" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Getting Started in 3 Minutes
                      </h3>
                      <p className="text-white/80 text-lg">
                        Learn how to set up and use our tool quickly
                      </p>
                    </div>
                  </div>
                  
                  {/* Video would go here - example with iframe */}
                  {/* 
                  <iframe
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="Quick Start Guide Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  */}
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Prefer reading? 
                    </h4>
                    <p className="text-sm text-gray-600">
                      Follow our step-by-step written guide below
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowVideoModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowVideoModal(false);
                        document.getElementById("prerequisites")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Start Guide
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyNavigation;