import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ProTipCard = ({ 
  proTip,
  className 
}) => {
  const { title, content, icon } = proTip;

  return (
    <div className={cn(
      "p-6 bg-gradient-to-br from-surface to-white rounded-xl border border-gray-200 hover-lift",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 p-3 bg-gradient-to-r from-primary to-secondary rounded-lg">
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-bold font-display text-gray-900 mb-2">
            {title}
          </h4>
          <p className="text-gray-600 font-body leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProTipCard;