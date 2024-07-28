import React from "react";

const ConnectWalletButton = ({ text, width = "236", height = "33", style, className }) => {
  return (
    <div>
      <svg width="236" height="33" viewBox="0 0 236 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
        <g filter="url(#filter0_di_10_53)">
          <path
            d="M5.43066 31.3127L1.00878 26.9048C0.362945 26.261 0 25.387 0 24.4755V9.67265C0 8.76114 0.36295 7.8871 1.00878 7.24327L7.26954 1.00228C7.91339 0.36045 8.78575 0 9.69526 0L150.444 1.25793e-05L161.592 1.31589e-05L199.059 1.6602e-05L210.092 1.7727e-05L225.595 1.88861e-05C226.488 1.88861e-05 227.346 0.347353 227.986 0.968407L234.219 7.00866C234.885 7.65501 235.262 8.54369 235.262 9.47195V22.9623C235.262 24.6529 234.03 26.0917 232.358 26.3528L229.089 26.8632C228.914 26.8905 228.737 26.9043 228.559 26.9043L225.298 26.9049L219.867 26.9043H131.914C131.188 26.9043 130.48 27.1344 129.893 27.5614L124.258 31.6586C123.672 32.0856 122.964 32.3156 122.238 32.3156L7.85638 32.315C6.94687 32.315 6.07451 31.9546 5.43066 31.3127Z"
            fill="black"
          />
          <path
            d="M5.43066 31.3127L1.00878 26.9048C0.362945 26.261 0 25.387 0 24.4755V9.67265C0 8.76114 0.36295 7.8871 1.00878 7.24327L7.26954 1.00228C7.91339 0.36045 8.78575 0 9.69526 0L150.444 1.25793e-05L161.592 1.31589e-05L199.059 1.6602e-05L210.092 1.7727e-05L225.595 1.88861e-05C226.488 1.88861e-05 227.346 0.347353 227.986 0.968407L234.219 7.00866C234.885 7.65501 235.262 8.54369 235.262 9.47195V22.9623C235.262 24.6529 234.03 26.0917 232.358 26.3528L229.089 26.8632C228.914 26.8905 228.737 26.9043 228.559 26.9043L225.298 26.9049L219.867 26.9043H131.914C131.188 26.9043 130.48 27.1344 129.893 27.5614L124.258 31.6586C123.672 32.0856 122.964 32.3156 122.238 32.3156L7.85638 32.315C6.94687 32.315 6.07451 31.9546 5.43066 31.3127Z"
            stroke="#01ff02"
            strokeWidth="2"
          />
        </g>
        <text
          x="118" // Half of the width to center the text
          y="16.5" // Half of the height to roughly center the text, this may need adjusting
          fill="white"
          fontSize="14" // Adjust the font size as needed
          fontFamily="'Segoe UI', Arial, sans-serif" // Adjust the font family as needed
          textAnchor="middle"
          alignmentBaseline="central" // This attribute may vary by browser, consider using dominantBaseline if necessary
        >
          {text}
        </text>
        <path
          d="M230.16 32.3151H130.511C129.961 32.3151 129.727 31.6154 130.168 31.2856L132.075 29.8557C132.175 29.7815 132.295 29.7413 132.419 29.7413H231.591C232.101 29.7413 232.357 30.3574 231.996 30.7177L230.565 32.1475C230.457 32.2548 230.312 32.3151 230.16 32.3151Z"
          fill="#01ff02"
          stroke="#01ff02"
          strokeWidth="2"
        />
        <defs>
          <filter id="filter0_di_10_53" x="-1" y="-1" width="258.562" height="56.6157" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="13" dy="14" />
            <feGaussianBlur stdDeviation="4.15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_53" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_53" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="10.6" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.126 0 0 0 0 1 0 0 0 0 0.01 0 0 0 0.7 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_10_53" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default ConnectWalletButton;