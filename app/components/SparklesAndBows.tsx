"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function LittleBow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`inline-bow ${className}`}
      width="28"
      height="18"
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2DFE8" />
          <stop offset="50%" stopColor="#D8CBEA" />
          <stop offset="100%" stopColor="#bfa9df" />
        </linearGradient>
      </defs>
      {/* Left Loop */}
      <path
        d="M16,10 C13,4 3,3 4,9 C5,15 14,12 16,10 Z"
        fill="url(#bow-grad)"
        stroke="#8C7F9F"
        strokeWidth="0.85"
      />
      {/* Right Loop */}
      <path
        d="M16,10 C19,4 29,3 28,9 C27,15 18,12 16,10 Z"
        fill="url(#bow-grad)"
        stroke="#8C7F9F"
        strokeWidth="0.85"
      />
      {/* Left Ribbon Tail */}
      <path
        d="M15,11 C13,14 10,17 7,18 C10,16 12,14 14,11 Z"
        fill="url(#bow-grad)"
        stroke="#8C7F9F"
        strokeWidth="0.75"
      />
      {/* Right Ribbon Tail */}
      <path
        d="M17,11 C19,14 22,17 25,18 C22,16 20,14 18,11 Z"
        fill="url(#bow-grad)"
        stroke="#8C7F9F"
        strokeWidth="0.75"
      />
      {/* Center Knot */}
      <ellipse cx="16" cy="10" rx="2.5" ry="2" fill="#E9E1F2" stroke="#8C7F9F" strokeWidth="0.85" />
    </svg>
  );
}

const sparklesList = [
  { left: "18%", top: "18%", delay: 0, size: 14 },
  { left: "82%", top: "24%", delay: 1.8, size: 12 },
  { left: "24%", top: "78%", delay: 2.7, size: 13 },
  { left: "76%", top: "72%", delay: 0.9, size: 15 },
  { left: "10%", top: "54%", delay: 3.2, size: 11 },
  { left: "90%", top: "45%", delay: 1.4, size: 11 },
];

export function AmbientSparkles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="ambient-sparkles-container" aria-hidden="true">
      {sparklesList.map((sp, idx) => (
        <motion.div
          key={idx}
          className="soft-sparkle"
          style={{
            position: "absolute",
            left: sp.left,
            top: sp.top,
            width: sp.size,
            height: sp.size,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.15, 0.75, 0.15],
                  scale: [0.8, 1.15, 0.8],
                  rotate: [0, 45, 90],
                }
          }
          transition={{
            duration: 4.5,
            delay: sp.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12,0 C12,7 17,12 24,12 C17,12 12,17 12,24 C12,17 7,12 0,12 C7,12 12,7 12,0 Z"
              fill="#F6F1F8"
              stroke="#8C7F9F"
              strokeWidth="0.6"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
