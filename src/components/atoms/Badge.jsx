import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md", 
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold";
  
  const variants = {
    default: "bg-gradient-to-r from-primary to-secondary text-white",
    outline: "border-2 border-primary text-primary bg-white",
    secondary: "bg-surface text-primary",
    success: "bg-success text-white",
    warning: "bg-warning text-gray-800",
    error: "bg-error text-white",
  };
  
  const sizes = {
    sm: "text-xs px-2 py-1 rounded-md min-w-[20px] min-h-[20px]",
    md: "text-sm px-3 py-2 rounded-lg min-w-[32px] min-h-[32px]",
    lg: "text-base px-4 py-3 rounded-xl min-w-[40px] min-h-[40px]",
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;