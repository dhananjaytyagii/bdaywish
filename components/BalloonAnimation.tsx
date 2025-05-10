"use client"

import { FC, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BalloonData {
  x: number
  size: number
  delay: number
  duration: number
  color: string
  xOffset: number
  rotation: number
  repeatDelay: number
}

const BalloonAnimation: FC = () => {
  const [balloons, setBalloons] = useState<BalloonData[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
  const balloonColors = [
    "bg-birthday-pink",
    "bg-birthday-purple",
    "bg-birthday-orange",
    "bg-birthday-lightPurple",
    "bg-birthday-blue",
  ]
    
    // Generate the balloon data only on the client side
    const generatedBalloons = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 100,
      size: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      xOffset: Math.sin(i) * 30,
      rotation: i % 2 === 0 ? 10 : -10,
      repeatDelay: Math.random() * 5
    }))
    
    setBalloons(generatedBalloons)
  }, [])

  // Don't render anything during SSR to avoid hydration issues
  if (!isClient) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {balloons.map((balloon, i) => (
          <motion.div
            key={i}
          className={`absolute ${balloon.color} rounded-full`}
            style={{
            left: `${balloon.x}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
              bottom: "-50px",
            transform: "none", // Fix for hydration error
            }}
            initial={{ y: 0 }}
            animate={{
              y: [0, -1000],
            x: [0, balloon.xOffset],
            rotate: [0, balloon.rotation],
            }}
            transition={{
            duration: balloon.duration,
            delay: balloon.delay,
              repeat: Number.POSITIVE_INFINITY,
            repeatDelay: balloon.repeatDelay,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute bottom-0 left-1/2 w-1 h-8 bg-gray-300"
              style={{ transform: "translateX(-50%)" }}
            />
          </motion.div>
      ))}
    </div>
  )
}

export default BalloonAnimation
