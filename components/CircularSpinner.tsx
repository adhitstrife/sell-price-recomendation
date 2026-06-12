"use client";

interface CircularSpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

const CircularSpinner = ({
  size = 32,
  color = "#2d6a4f",
  strokeWidth = 3,
  className = "",
  label = "Loading",
}: CircularSpinnerProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin-slow"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.7}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default CircularSpinner;
