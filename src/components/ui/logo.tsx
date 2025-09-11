import * as React from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  gradient?: boolean;
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size = "md", animated = true, gradient = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
      xl: "h-20 w-20",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          "rounded-xl flex items-center justify-center relative overflow-hidden",
          gradient ? "bg-gradient-primary" : "bg-primary",
          sizeClasses[size],
          animated && "hover:shadow-glow hover:scale-110 transition-all duration-300 float",
          className
        )} 
        {...props}
      >
        <Bot className={cn("text-white", iconSizes[size])} />
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        )}
      </div>
    );
  }
);
Logo.displayName = "Logo";

export { Logo };