import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  size = "md",
  className,
  disabled = false,
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50",
        sizes[size],
        checked
          ? "bg-gradient-to-r from-primary to-secondary border-primary text-white"
          : "border-gray-300 hover:border-primary bg-white",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:scale-110 cursor-pointer",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={iconSizes[size]}
          className="animate-scale-in"
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;