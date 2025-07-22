import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <div className="relative">
        {/* Spinning Icon */}
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"></div>
        </div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Rocket" size={20} className="text-primary" />
        </div>
      </div>
      
      <p className="mt-4 text-gray-600 font-medium">
        Loading your guide...
      </p>
      
      {/* Skeleton Content */}
      <div className="mt-8 w-full max-w-4xl space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-32 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;