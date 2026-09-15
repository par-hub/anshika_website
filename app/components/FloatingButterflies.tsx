"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingButterflies() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="butterflies-container" aria-hidden="true">
      {/* Butterfly 1 - Gentle upper-left to center drift */}
      <motion.div
        className="floating-butterfly butterfly-one"
        initial={{ x: -10, y: 0, opacity: 0.6 }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 35, 15, 45, 10, 0],
                y: [0, -25, -45, -15, -30, 0],
                rotate: [0, 8, -4, 6, -2, 0],
                opacity: [0.55, 0.75, 0.6, 0.7, 0.55],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ left: "14%", top: "22%" }}
      >
        <svg width="34" height="28" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bf1-wing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2DFE8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#D8CBEA" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#D7E5F3" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Left Forewing */}
          <path
            d="M17,14 C13,6 4,4 3,10 C2,16 10,18 17,15 Z"
            fill="url(#bf1-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.8"
          />
          {/* Left Hindwing */}
          <path
            d="M17,15 C13,19 6,24 8,27 C10,29 15,22 17,17 Z"
            fill="url(#bf1-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.75"
          />
          {/* Right Forewing */}
          <path
            d="M19,14 C23,6 32,4 33,10 C34,16 26,18 19,15 Z"
            fill="url(#bf1-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.8"
          />
          {/* Right Hindwing */}
          <path
            d="M19,15 C23,19 30,24 28,27 C26,29 21,22 19,17 Z"
            fill="url(#bf1-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.75"
          />
          {/* Body & Antennae */}
          <ellipse cx="18" cy="15" rx="1.1" ry="5.5" fill="#766A85" />
          <path d="M17.5,10 C16,7 13.5,6 12,6.5" stroke="#766A85" strokeWidth="0.65" strokeLinecap="round" />
          <path d="M18.5,10 C20,7 22.5,6 24,6.5" stroke="#766A85" strokeWidth="0.65" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Butterfly 2 - Gentle lower-right drift */}
      <motion.div
        className="floating-butterfly butterfly-two"
        initial={{ x: 0, y: 0, opacity: 0.5 }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -30, -10, -40, -15, 0],
                y: [0, 20, 40, 15, 30, 0],
                rotate: [0, -6, 5, -8, 3, 0],
                opacity: [0.5, 0.7, 0.55, 0.68, 0.5],
              }
        }
        transition={{
          duration: 28,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ right: "16%", bottom: "25%" }}
      >
        <svg width="28" height="24" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bf2-wing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9E1F2" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#D8CBEA" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F2DFE8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M17,14 C13,6 4,4 3,10 C2,16 10,18 17,15 Z"
            fill="url(#bf2-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.8"
          />
          <path
            d="M17,15 C13,19 6,24 8,27 C10,29 15,22 17,17 Z"
            fill="url(#bf2-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.75"
          />
          <path
            d="M19,14 C23,6 32,4 33,10 C34,16 26,18 19,15 Z"
            fill="url(#bf2-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.8"
          />
          <path
            d="M19,15 C23,19 30,24 28,27 C26,29 21,22 19,17 Z"
            fill="url(#bf2-wing)"
            stroke="#8C7F9F"
            strokeWidth="0.75"
          />
          <ellipse cx="18" cy="15" rx="1" ry="5" fill="#766A85" />
          <path d="M17.5,10 C16,7 13.5,6 12,6.5" stroke="#766A85" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M18.5,10 C20,7 22.5,6 24,6.5" stroke="#766A85" strokeWidth="0.6" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}
