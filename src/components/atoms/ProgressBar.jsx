import React from "react";
import { motion } from "framer-motion";
import { ApperIcon } from "@/components/ApperIcon";

const ProgressBar = ({ 
  completedSteps = 0, 
  totalSteps = 4, 
  className = "",
  onClose
}) => {
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className={`fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
<div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">
            AutoTester Quick Start Guide
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">
              {completedSteps} of {totalSteps} steps completed
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                aria-label="Close progress bar"
              >
                <ApperIcon 
                  name="X" 
                  size={14} 
                  className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" 
                />
              </button>
            )}
          </div>
        </div>
        
        <div className="relative w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          
          {/* Step markers */}
          <div className="absolute top-0 left-0 w-full h-2 flex justify-between items-center">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-white -mt-0.5 transition-colors duration-300 ${
                  index < completedSteps
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : index === completedSteps
                    ? "bg-white border-primary"
                    : "bg-gray-300"
                }`}
                style={{
                  left: `${(index / Math.max(totalSteps - 1, 1)) * 100}%`,
                  transform: "translateX(-50%)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;