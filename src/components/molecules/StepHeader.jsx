import React, { useState, useEffect, useRef } from "react";
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
  const [timeLeft, setTimeLeft] = useState(timeEstimate * 60); // Convert minutes to seconds
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Reset timer when step changes or is completed
  useEffect(() => {
    setTimeLeft(timeEstimate * 60);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [stepNumber, timeEstimate]);

  // Auto-pause timer when step is completed
  useEffect(() => {
    if (isCompleted && isActive) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isCompleted, isActive]);

  // Timer countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0 && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isCompleted]);

  const startTimer = () => {
    if (!isCompleted && timeLeft > 0) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (isCompleted) return "text-success";
    if (isActive) return "text-primary";
    return "text-gray-500";
  };

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
            <div className="flex items-center gap-3">
              <div className={cn("flex items-center gap-2 text-sm font-medium", getTimerColor())}>
                <ApperIcon name="Clock" size={16} />
                <span>{formatTime(timeLeft)}</span>
                {timeLeft < timeEstimate * 60 && !isCompleted && (
                  <span className="text-xs text-gray-400">
                    / {timeEstimate}min
                  </span>
                )}
              </div>
              {!isCompleted && (
                <button
                  onClick={isActive ? pauseTimer : startTimer}
                  disabled={timeLeft === 0}
                  className={cn(
                    "p-1 rounded-full transition-colors duration-200",
                    timeLeft === 0 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "text-gray-400 hover:text-primary hover:bg-surface"
                  )}
                >
                  <ApperIcon 
                    name={isActive ? "Pause" : "Play"} 
                    size={14}
                  />
                </button>
              )}
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