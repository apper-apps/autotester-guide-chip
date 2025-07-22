import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const ProgressRing = forwardRef(({ 
  progress = 0, 
  size = 40, 
  strokeWidth = 4,
  className,
  showPercentage = false,
  ...props 
}, ref) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className={cn("relative inline-flex items-center justify-center", className)} {...props}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B47E0" />
            <stop offset="100%" stopColor="#8B7FFF" />
          </linearGradient>
        </defs>
      </svg>
      {showPercentage && (
        <span className="absolute text-sm font-semibold text-gray-700">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
});

ProgressRing.displayName = "ProgressRing";

export default ProgressRing;