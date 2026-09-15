"use client";

import React from "react";

export function FloralDecorations() {
  return (
    <div className="floral-decorations-container" aria-hidden="true">
      {/* Top Left Floral Branch */}
      <svg
        className="corner-floral corner-floral-tl"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="tl-petal-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2DFE8" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#D8CBEA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#EEE8F5" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="tl-leaf-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D7E5F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D8CBEA" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Stem 1 */}
        <path
          d="M-10,-10 C40,50 60,110 50,170 C45,200 30,225 15,245"
          stroke="#8C7F9F"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Stem 2 */}
        <path
          d="M-10,-10 C60,40 120,65 180,60 C215,55 240,40 260,25"
          stroke="#8C7F9F"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Branchlet */}
        <path
          d="M50,110 C85,120 125,115 155,95"
          stroke="#8C7F9F"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Leaves */}
        <path
          d="M25,75 C20,55 45,50 50,70 C55,90 30,95 25,75 Z"
          fill="url(#tl-leaf-grad)"
          stroke="#766A85"
          strokeWidth="1"
          opacity="0.75"
        />
        <path
          d="M90,55 C105,40 120,55 110,70 C100,85 75,70 90,55 Z"
          fill="url(#tl-leaf-grad)"
          stroke="#766A85"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M52,145 C70,140 80,160 65,170 C50,180 35,160 52,145 Z"
          fill="url(#tl-leaf-grad)"
          stroke="#766A85"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M135,100 C155,85 165,105 150,118 C135,130 115,115 135,100 Z"
          fill="url(#tl-leaf-grad)"
          stroke="#766A85"
          strokeWidth="1"
          opacity="0.7"
        />

        {/* Flower 1 - Main blossom */}
        <g transform="translate(68, 90)">
          <path
            d="M0,-24 C10,-32 24,-24 20,-10 C16,4 4,6 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M20,-8 C34,-4 32,14 18,18 C4,22 2,8 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M14,16 C10,30 -6,32 -16,20 C-26,8 -10,2 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M-15,18 C-30,12 -30,-6 -16,-16 C-2,-26 0,-8 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M-12,-16 C-8,-32 8,-32 10,-18 C12,-4 0,0 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <circle cx="1" cy="1" r="5" fill="#E9E1F2" stroke="#8C7F9F" strokeWidth="1" />
          <circle cx="1" cy="1" r="2.2" fill="#9D8EC2" opacity="0.6" />
        </g>

        {/* Flower 2 - Smaller blossom */}
        <g transform="translate(180, 56) scale(0.68)">
          <path
            d="M0,-20 C8,-28 20,-20 16,-8 C12,4 4,5 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M16,-6 C28,-2 26,12 14,16 C2,20 2,6 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M12,14 C8,26 -6,28 -14,16 C-22,4 -8,2 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M-12,14 C-26,10 -26,-6 -14,-14 C-2,-22 0,-6 0,0 Z"
            fill="url(#tl-petal-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <circle cx="1" cy="1" r="4" fill="#E9E1F2" stroke="#8C7F9F" strokeWidth="1" />
        </g>

        {/* Small buds */}
        <circle cx="230" cy="36" r="3.5" fill="#F2DFE8" stroke="#8C7F9F" strokeWidth="0.9" opacity="0.8" />
        <circle cx="28" cy="210" r="3" fill="#F2DFE8" stroke="#8C7F9F" strokeWidth="0.9" opacity="0.8" />
      </svg>

      {/* Top Right Sprigs & Lavender */}
      <svg
        className="corner-floral corner-floral-tr"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tr-lav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9E1F2" />
            <stop offset="60%" stopColor="#D8CBEA" />
            <stop offset="100%" stopColor="#9D8EC2" />
          </linearGradient>
        </defs>

        <path
          d="M270,-10 C210,40 160,90 120,160 C100,195 85,230 75,260"
          stroke="#8C7F9F"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M270,-10 C230,60 200,120 180,180"
          stroke="#8C7F9F"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {[
          { cx: 160, cy: 105, rx: 7, ry: 4, rot: -30 },
          { cx: 150, cy: 118, rx: 7, ry: 4, rot: 35 },
          { cx: 140, cy: 130, rx: 6.5, ry: 4, rot: -25 },
          { cx: 132, cy: 145, rx: 6.5, ry: 4, rot: 40 },
          { cx: 122, cy: 160, rx: 6, ry: 3.5, rot: -20 },
          { cx: 115, cy: 175, rx: 6, ry: 3.5, rot: 30 },
          { cx: 105, cy: 195, rx: 5.5, ry: 3.5, rot: -15 },
          { cx: 98, cy: 210, rx: 5, ry: 3, rot: 25 },
        ].map((floret, i) => (
          <ellipse
            key={i}
            cx={floret.cx}
            cy={floret.cy}
            rx={floret.rx}
            ry={floret.ry}
            transform={`rotate(${floret.rot} ${floret.cx} ${floret.cy})`}
            fill="url(#tr-lav-grad)"
            stroke="#8C7F9F"
            strokeWidth="0.9"
            opacity="0.75"
          />
        ))}

        <path
          d="M205,115 C215,95 235,105 225,120 C215,135 195,125 205,115 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.65"
        />
        <path
          d="M175,170 C160,155 175,140 188,150 C200,160 190,185 175,170 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.65"
        />

        <circle cx="165" cy="80" r="3" fill="#F2DFE8" stroke="#8C7F9F" strokeWidth="0.8" opacity="0.8" />
        <circle cx="195" cy="65" r="2.5" fill="#EEE8F5" stroke="#8C7F9F" strokeWidth="0.8" opacity="0.8" />
      </svg>

      {/* Bottom Left Wildflowers */}
      <svg
        className="corner-floral corner-floral-bl"
        viewBox="0 0 270 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bl-flower-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EEE8F5" />
            <stop offset="65%" stopColor="#D8CBEA" />
            <stop offset="100%" stopColor="#bfa9df" />
          </radialGradient>
        </defs>

        <path
          d="M-10,280 C40,220 80,170 100,110 C110,80 115,50 118,20"
          stroke="#8C7F9F"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M-10,280 C60,240 120,210 180,185 C215,170 245,160 270,155"
          stroke="#8C7F9F"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />

        <path
          d="M45,210 C30,195 50,180 65,195 C80,210 60,225 45,210 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.7"
        />
        <path
          d="M85,150 C95,130 115,140 108,158 C100,175 75,165 85,150 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.7"
        />
        <path
          d="M135,198 C145,180 165,190 155,208 C145,225 125,215 135,198 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.7"
        />

        <g transform="translate(118, 55)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-14"
              rx="4.5"
              ry="11"
              transform={`rotate(${angle} 0 0)`}
              fill="url(#bl-flower-grad)"
              stroke="#8C7F9F"
              strokeWidth="0.85"
              opacity="0.85"
            />
          ))}
          <circle cx="0" cy="0" r="5.5" fill="#F2DFE8" stroke="#8C7F9F" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.5" fill="#9D8EC2" opacity="0.6" />
        </g>

        <g transform="translate(210, 172) scale(0.65)">
          <path
            d="M0,-16 C6,-24 16,-18 12,-6 C8,4 2,4 0,0 Z"
            fill="url(#bl-flower-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
          />
          <path
            d="M12,-6 C20,-2 18,10 10,12 C2,14 2,4 0,0 Z"
            fill="url(#bl-flower-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
          />
          <path
            d="M-10,10 C-18,6 -18,-4 -10,-10 C-2,-16 0,-4 0,0 Z"
            fill="url(#bl-flower-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="3.5" fill="#F2DFE8" stroke="#8C7F9F" strokeWidth="0.9" />
        </g>
      </svg>

      {/* Bottom Right Petal Spray */}
      <svg
        className="corner-floral corner-floral-br"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="br-rose-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2DFE8" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#D8CBEA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EEE8F5" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <path
          d="M290,290 C230,230 180,180 140,110 C120,75 110,40 105,10"
          stroke="#8C7F9F"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M290,290 C235,250 180,225 120,215 C85,208 50,210 20,215"
          stroke="#8C7F9F"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />

        <path
          d="M210,195 C195,180 205,160 220,175 C235,190 225,210 210,195 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.7"
        />
        <path
          d="M150,140 C135,125 145,105 162,120 C175,135 165,155 150,140 Z"
          fill="#D7E5F3"
          stroke="#8C7F9F"
          strokeWidth="0.9"
          opacity="0.7"
        />

        <g transform="translate(195, 205)">
          <path
            d="M0,-22 C10,-30 24,-22 18,-8 C12,4 4,4 0,0 Z"
            fill="url(#br-rose-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M18,-6 C28,-2 26,14 14,18 C2,20 2,6 0,0 Z"
            fill="url(#br-rose-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M10,16 C6,28 -8,28 -16,16 C-22,6 -8,2 0,0 Z"
            fill="url(#br-rose-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <path
            d="M-14,14 C-26,8 -24,-8 -12,-16 C-2,-22 0,-6 0,0 Z"
            fill="url(#br-rose-grad)"
            stroke="#8C7F9F"
            strokeWidth="1"
            opacity="0.8"
          />
          <circle cx="0" cy="0" r="4.5" fill="#E9E1F2" stroke="#8C7F9F" strokeWidth="1" />
        </g>

        <path
          d="M85,160 C92,150 102,155 98,166 C94,174 80,172 85,160 Z"
          fill="#F2DFE8"
          stroke="#8C7F9F"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <path
          d="M125,75 C132,65 142,70 138,80 C134,88 120,86 125,75 Z"
          fill="#D8CBEA"
          stroke="#8C7F9F"
          strokeWidth="0.8"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}
