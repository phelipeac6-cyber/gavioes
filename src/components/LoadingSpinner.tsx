import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-red-600",
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export const LoadingScreen = ({ message = "Carregando...", className = "" }: LoadingScreenProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-black text-white", className)}>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-400">{message}</p>
    </div>
  );
};