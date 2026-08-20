import React from "react";
import "./BottleIcon.css";

// Simple stand-in illustration so the storefront looks complete without
// real product photography. Swap the <svg> below for an <img> once
// product images are available — the pink circle wrapper can stay.
export default function BottleIcon({ size = 64, className = "" }) {
  return (
    <div
      className={`bottle-icon-wrap ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 64 80" width="60%" height="90%">
        <rect x="26" y="4" width="12" height="10" rx="2" fill="#8B1E2E" />
        <rect x="24" y="0" width="16" height="6" rx="2" fill="#5C1420" />
        <path
          d="M24 14 H40 V24 C46 30 48 36 48 46 V70 C48 74.4 44.4 78 40 78 H24 C19.6 78 16 74.4 16 70 V46 C16 36 18 30 24 24 Z"
          fill="#7A1E1E"
        />
        <path
          d="M24 14 H40 V24 C46 30 48 36 48 46 V70 C48 74.4 44.4 78 40 78 H24 C19.6 78 16 74.4 16 70 V46 C16 36 18 30 24 24 Z"
          fill="url(#bottleGrad)"
          opacity="0.55"
        />
        <rect x="19" y="40" width="26" height="18" rx="2" fill="#FBF4E4" opacity="0.9" />
        <path
          d="M8 66 C14 58 18 62 22 66 C26 70 30 64 34 68"
          stroke="#4F8A3E"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="bottleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A83232" />
            <stop offset="1" stopColor="#5C1010" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
