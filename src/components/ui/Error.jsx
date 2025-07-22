import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 ${className}`}>
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertTriangle" size={32} className="text-error" />
        </div>
        
        {/* Error Message */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        {/* Retry Button */}
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            size="lg"
            className="mb-4"
          >
            <ApperIcon name="RotateCcw" size={20} className="mr-2" />
            Try Again
          </Button>
        )}
        
        {/* Help Text */}
        <p className="text-sm text-gray-500">
          If the problem persists, please refresh the page or contact support.
        </p>
      </div>
    </div>
  );
};

export default Error;