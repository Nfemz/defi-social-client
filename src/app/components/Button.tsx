import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "danger";
  children: ReactNode;
}

export const Button = ({
  onClick,
  disabled = false,
  isLoading = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 text-sm font-medium text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-500",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:ring-red-500",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed grayscale brightness-75";

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${
        disabled || isLoading ? disabledStyles : ""
      }`}
    >
      <div className="flex items-center justify-center gap-2 relative h-[20px]">
        <span
          className={`absolute inset-0 flex items-center justify-center ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        </span>
        <span className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
          {children}
        </span>
      </div>
    </button>
  );
};
