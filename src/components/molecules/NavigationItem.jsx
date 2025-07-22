import React from "react";
import { cn } from "@/utils/cn";
import ProgressRing from "@/components/atoms/ProgressRing";

const NavigationItem = ({ 
  step,
  isActive,
  onClick,
  className 
}) => {
  const { id, title, isCompleted } = step;
  const progress = isCompleted ? 100 : 0;

  const scrollToStep = () => {
    const element = document.getElementById(`step-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (onClick) onClick();
  };

  return (
    <button
      onClick={scrollToStep}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
          : "text-gray-600 hover:bg-surface hover:text-primary",
        className
      )}
    >
      {/* Progress Ring */}
      <ProgressRing 
        progress={progress}
        size={32}
        strokeWidth={3}
        className={cn(
          "shrink-0",
          isActive ? "text-white/30" : "text-gray-200"
        )}
      />

      {/* Title */}
      <div className="flex-1 min-w-0">
        <span className="block font-medium text-sm leading-tight">
          Step {id}: {title.split(" ").slice(0, 3).join(" ")}...
        </span>
      </div>
    </button>
  );
};

export default NavigationItem;