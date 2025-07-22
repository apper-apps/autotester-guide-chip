import React from "react";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";

const PrerequisiteItem = ({ 
  prerequisite,
  onToggleCheck,
  className 
}) => {
  const { id, label, description, isChecked, icon } = prerequisite;

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200 hover:border-primary/30 transition-colors duration-200",
      className
    )}>
      {/* Icon */}
      <div className="shrink-0 p-2 bg-surface rounded-lg">
        <ApperIcon name={icon} size={20} className="text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 mb-1">
          {label}
        </h4>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>

      {/* Checkbox */}
      <Checkbox
        checked={isChecked}
        onChange={() => onToggleCheck(id, !isChecked)}
        size="md"
      />
    </div>
  );
};

export default PrerequisiteItem;