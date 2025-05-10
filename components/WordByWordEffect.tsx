"use client"

import { type FC, useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WordByWordEffectProps {
  text: string
  delay?: number
  startDelay?: number
  className?: string
  onComplete?: () => void
}

const WordByWordEffect: FC<WordByWordEffectProps> = ({ 
  text, 
  delay = 100, 
  startDelay = 0, 
  className = "",
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const textLength = useRef(text.length)
  const completionReported = useRef(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let initialTimeout: NodeJS.Timeout

    // Initial delay before starting to type
    initialTimeout = setTimeout(() => {
      setIsTyping(true)
    }, startDelay)

    if (isTyping && charIndex < textLength.current) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          return prev + text[charIndex]
        })
        setCharIndex((prev) => prev + 1)
      }, delay)
    } else if (isTyping && charIndex >= textLength.current && !completionReported.current) {
      // Typing has completed
      if (onComplete) {
        completionReported.current = true
        onComplete()
      }
    }

    return () => {
      clearTimeout(timeout)
      clearTimeout(initialTimeout)
    }
  }, [delay, charIndex, isTyping, startDelay, onComplete, text])

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: startDelay * 0.001 }}
      >
      {displayedText}
        {isTyping && charIndex < textLength.current && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
      </motion.div>
    </div>
  )
}

export default WordByWordEffect
