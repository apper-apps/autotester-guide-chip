import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";

const StepHeader = ({ 
  stepNumber,
  title,
  description,
  isCompleted,
  isExpanded,
  timeEstimate,
  onToggleComplete,
  onToggleExpand,
  className 
}) => {
  return (
    <div className={cn("flex items-start gap-4 p-6", className)}>
      {/* Step Badge */}
      <Badge size="lg" className="shrink-0">
        {stepNumber}
      </Badge>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold font-display text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 font-body mb-3">
              {description}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ApperIcon name="Clock" size={16} />
              <span>{timeEstimate} minutes</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <Checkbox
              checked={isCompleted}
              onChange={onToggleComplete}
              size="lg"
            />
            <button
              onClick={onToggleExpand}
              className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-surface transition-colors duration-200"
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepHeader;