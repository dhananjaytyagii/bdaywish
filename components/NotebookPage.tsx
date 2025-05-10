"use client"

import { type FC, type ReactNode, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface NotebookPageProps {
  children: ReactNode
  index: number
  isActive: boolean
  onNextPage: () => void
  autoTurn?: boolean
  autoTurnDelay?: number
}

const NotebookPage: FC<NotebookPageProps> = ({
  children,
  index,
  isActive,
  onNextPage,
  autoTurn = false,
  autoTurnDelay = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isActive])

  useEffect(() => {
    if (isActive && autoTurn && isVisible) {
      const autoTimer = setTimeout(() => {
        onNextPage()
      }, autoTurnDelay)
      return () => clearTimeout(autoTimer)
    }
  }, [isActive, autoTurn, isVisible, onNextPage, autoTurnDelay])

  return (
    <motion.div
      className={`notebook-page rounded-md p-4 md:p-8 w-full mx-auto my-4 min-h-[70vh] md:min-h-[80vh] ${
        isActive ? "block" : "hidden"
      }`}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{
        opacity: isActive ? 1 : 0,
        rotateY: isActive ? 0 : 90,
        zIndex: isActive ? 10 : 0,
      }}
      transition={{ 
        duration: 1.2, 
        type: "spring", 
        stiffness: 60, 
        damping: 15 
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow">
          {isVisible ? (
            children
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-32 mt-16"
            >
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default NotebookPage
