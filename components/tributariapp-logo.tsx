"use client"

import { motion } from "framer-motion"

export default function TributariAppLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width="32" // Adjusted size for mobile header
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {/* Outer circle - can be styled for light/dark mode if needed, or kept simple */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-petrol dark:text-petrol-light"
        />
        {/* Inner decorative element - example: a stylized 'T' or abstract shape */}
        <path
          d="M15 15 H 25 M20 15 V 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-petrol-light dark:text-petrol"
        />
        {/* You can replace the path above with a more complex design if desired */}
      </motion.svg>
      <span className="text-xl font-semibold text-petrol dark:text-petrol-light">
        Tributari<span className="text-petrol-light dark:text-petrol">App</span>
      </span>
    </div>
  )
}
