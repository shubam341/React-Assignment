import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500",
  outlined: "border border-gray-300 focus:ring-2 focus:ring-blue-500",
  ghost: "bg-transparent border-b border-gray-400 focus:border-blue-500",
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4">
      {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}

      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-md focus:outline-none transition
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? "border-red-500 focus:ring-red-500" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
        {/* Optional Password Toggle */}
        {variant !== "ghost" && (
          <button
            type="button"
            className="absolute right-2 text-sm text-blue-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <span className="text-sm text-gray-500 mt-1">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
