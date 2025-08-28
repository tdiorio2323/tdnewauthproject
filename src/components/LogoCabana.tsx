import React from 'react';

const LogoCabana = () => {
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <defs>
          <linearGradient
            id="cabana-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#87e6ff" />
            <stop offset="50%" stopColor="#b48cff" />
            <stop offset="100%" stopColor="#f5cf7a" />
          </linearGradient>
        </defs>
        <path
          d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14"
          stroke="url(#cabana-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default LogoCabana;