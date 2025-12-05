"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-linear-to-br from-purple-300 to-white flex items-center justify-center z-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
          }
          70% {
            box-shadow: 0 0 0 30px rgba(168, 85, 247, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .pulse-ring-animation {
          animation: pulse-ring 2s infinite;
        }
        .spin-animation {
          animation: spin 3s linear infinite;
        }
      `}</style>

      <div className="text-center">
        {/* Main Loading Icon */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full pulse-ring-animation" />

          {/* Rotating spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 spin-animation" />

          {/* Inner floating circle */}
          <div className="absolute inset-3 rounded-full bg-linear-to-br from-purple-500 to-cyan-400 flex items-center justify-center float-animation">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Eventora</h2>
        <p className="text-gray-500 text-sm tracking-widest">LOADING AMAZING EVENTS</p>

        {/* Progress bar */}
        <div className="mt-8 w-48">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-cyan-400 rounded-full"
              style={{
                animation: "slideIn 1.5s ease-in-out forwards",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes slideIn {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>

      {/* Floating dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
