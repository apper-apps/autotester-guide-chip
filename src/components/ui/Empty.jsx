import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available", 
  message = "There's nothing to show here yet.", 
  actionText = "Get Started",
  onAction,
  icon = "Inbox",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 ${className}`}>
      <div className="text-center max-w-md">
        {/* Empty Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-surface to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={40} className="text-primary/60" />
        </div>
        
        {/* Empty Title */}
        <h3 className="text-2xl font-bold font-display text-gray-900 mb-3">
          {title}
        </h3>
        
        {/* Empty Message */}
        <p className="text-gray-600 font-body mb-8 leading-relaxed">
          {message}
        </p>
        
        {/* Action Button */}
        {onAction && (
          <Button 
            onClick={onAction}
            size="lg"
            className="shadow-xl"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;