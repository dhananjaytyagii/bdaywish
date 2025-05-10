"use client"

import { type FC, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  text: string
  delay?: number
  startDelay?: number
  className?: string
}

const TypewriterEffect: FC<TypewriterEffectProps> = ({ text, delay = 50, startDelay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Initial delay before starting to type
    const initialTimeout = setTimeout(() => {
      setIsTyping(true)
    }, startDelay)

    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)
    }

    return () => {
      clearTimeout(timeout)
      clearTimeout(initialTimeout)
    }
  }, [text, delay, currentIndex, isTyping, startDelay])

  return (
    <div className={`${className}`}>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </div>
  )
}

export default TypewriterEffect
