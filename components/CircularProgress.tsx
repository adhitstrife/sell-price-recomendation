"use client";

import { useMemo } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

const autoColor = (value: number): string => {
  if (value >= 70) return "#2d6a4f";
  if (value >= 50) return "#4a5568";
  return "#e67e22";
};

const CircularProgress = ({
  value,
  size = 96,
  strokeWidth = 8,
  color,
  bgColor = "#e6e8ea",
  showLabel = true,
  label,
  className = "",
}: CircularProgressProps) => {
  const safeValue = clamp(value, 0, 100);
  const resolvedColor = color ?? autoColor(safeValue);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - safeValue / 100);
  const display = useMemo(() => Math.round(safeValue), [safeValue]);

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(safeValue)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${display} percent`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 700ms ease-out, stroke 300ms ease" }}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-heading text-lg font-bold"
              style={{ color: resolvedColor }}
            >
              {display}%
            </span>
          </div>
        )}
      </div>
      {label && <span className="text-xs font-semibold text-onSurface-variant">{label}</span>}
    </div>
  );
};

export default CircularProgress;
