"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

const BirthdayCap: FC = () => {
  return (
    <motion.div
      className="absolute -top-20 -left-14 z-30"
      initial={{ rotate: -20, scale: 0 }}
      animate={{ rotate: [-20, 0, -10, 0], scale: 1 }}
      transition={{
        duration: 1.5,
        scale: { duration: 0.5 },
        rotate: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 5 },
      }}
    >
      <div className="relative w-32 h-48 md:w-40 md:h-56">
        <div
          className="absolute w-full h-36 md:h-44 bg-birthday-orange rounded-b-full"
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        >
          <div
            className="absolute w-full h-full bg-birthday-purple"
            style={{ clipPath: "polygon(20% 100%, 50% 20%, 80% 100%)" }}
          ></div>
          <div className="absolute w-full h-full" style={{ clipPath: "polygon(35% 100%, 50% 40%, 65% 100%)" }}>
            <div className="w-full h-full bg-birthday-pink"></div>
          </div>
        </div>
        <motion.div
          className="absolute top-0 left-1/2 w-8 h-8 bg-yellow-300 rounded-full z-10"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          style={{ transform: "translateX(-50%) translateY(-50%)" }}
        />
        <div className="absolute bottom-14 left-0 w-full flex justify-center">
          <motion.div
            className="w-3 h-10 bg-birthday-blue"
            animate={{ scaleY: [1, 1.2, 0.8, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default BirthdayCap
