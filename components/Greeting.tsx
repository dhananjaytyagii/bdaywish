"use client"

import { type FC, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const Greeting: FC<{ text: string }> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="text-4xl md:text-5xl font-bold text-birthday-orange mb-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 70, damping: 12 }}
    >
      {isVisible ? (
        <>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 25, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.05 * i, 
                type: "spring", 
                stiffness: 120, 
                damping: 10 
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}

          <motion.div
            className="absolute -right-8 -top-2"
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2, 
              delay: 0.8, 
              type: "spring"
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
                ease: "easeInOut"
              }}
          >
              <Sparkles className="text-birthday-purple h-10 w-10 inline-block" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -left-8 -top-2"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2, 
              delay: 0.9, 
              type: "spring"
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
                ease: "easeInOut"
              }}
          >
              <Sparkles className="text-birthday-pink h-10 w-10 inline-block" />
            </motion.div>
          </motion.div>
        </>
      ) : (
        <span className="blinking-cursor">&nbsp;</span>
      )}
    </motion.div>
  )
}

export default Greeting
