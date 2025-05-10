"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Greeting from "@/components/Greeting"
import NotebookPage from "@/components/NotebookPage"
import BirthdayCap from "@/components/BirthdayCap"
import BalloonAnimation from "@/components/BalloonAnimation"
import { Music, ChevronRight, PartyPopper } from "lucide-react"
import Image from "next/image"
import WordByWordEffect from "@/components/WordByWordEffect"
import WaterColorEffect from "@/components/WaterColorEffect"
import SurpriseBox from "@/components/SurpriseBox"

export default function Home() {
  const [step, setStep] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [isWritingComplete, setIsWritingComplete] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showMusicConsent, setShowMusicConsent] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    // Mark as client-side rendering
    setIsClient(true)
    
    // Create audio element with Benson Boone song
    const audio = new Audio("/benson-boone-song.mp3")
    audio.loop = false // Don't loop the song
    audio.volume = 0.4 // Slightly lower volume for better experience
    
    // Add event listener to handle when the song ends
    audio.addEventListener('ended', () => {
      console.log("Song finished playing")
      setIsMusicPlaying(false)
    })
    
    // Just setup the audio but don't autoplay - this avoids browser restrictions
    setAudioElement(audio)
    audioRef.current = audio

    // Initial greeting
    setTimeout(() => {
      setStep(1)
    }, 4000)

    // Keep first greeting visible longer
    setTimeout(() => {
      setStep(2)
    }, 7000)

    // Show notebook after longer viewing time
    setTimeout(() => {
      setStep(3)
    }, 11000)

    return () => {
      if (audio) {
        audio.removeEventListener('ended', () => {})
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  // Reset writing completion when step changes
  useEffect(() => {
    setIsWritingComplete(false)
  }, [step])

  const handleWritingComplete = () => {
    console.log("Writing complete!")
    setIsWritingComplete(true)
    
    // Automatically switch to celebration page 
    setTimeout(() => {
      setStep(4)
    }, 2800)
  }

  const handleGoToCelebration = () => {
    // Go directly to the celebration page
    setStep(4)
  }

  const handleMusicConsent = (consent: boolean) => {
    setShowMusicConsent(false)
    if (consent) {
      setIsMusicPlaying(true)
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log("Error playing audio:", err)
        })
      }
    }
    // Start the animation sequence
    setTimeout(() => {
      setStep(1)
    }, 1000)
  }

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-4 px-4 overflow-hidden relative">
      {/* Background effects */}
      <WaterColorEffect />
      <BalloonAnimation />

      {/* Music consent dialog */}
      {showMusicConsent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center"
          >
            <h2 className="text-2xl font-script text-birthday-purple mb-4">
              Would you like to play background music?
            </h2>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-birthday-pink text-white rounded-full font-medium"
                onClick={() => handleMusicConsent(true)}
              >
                Yes, play music
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium"
                onClick={() => handleMusicConsent(false)}
              >
                No, continue without music
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Initial greeting */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="greeting1"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, damping: 15 }}
              className="text-center"
            >
              <Greeting text="Hi Trisheeta, Today's something special" />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="greeting2"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, damping: 15 }}
              className="text-center"
            >
              <Greeting text="It's your birthday today!" />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="notebook"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 15 }}
              className="w-full perspective-container"
            >
              {/* Single Notebook page */}
              <NotebookPage index={0} isActive={true} onNextPage={() => {}} autoTurn={false}>
                <div className="py-4 px-2 h-full flex flex-col justify-center">
                  <WordByWordEffect 
                    text="Dear Trisheeta," 
                    delay={70} 
                    className="text-5xl md:text-5xl font-script text-birthday-purple mb-8 text-center" 
                  />

                  <WordByWordEffect
                    text="As I'm writing this, all I can think about is how truly special you are and how much happiness you've brought into my life. On your birthday, I just want you to know that you mean more to me than you could ever imagine."
                    delay={45}
                    startDelay={1000}
                    className="text-2xl md:text-3xl font-script mb-6 leading-relaxed"
                  />

                  <WordByWordEffect
                    text="I really hope all your dreams come true,
                    You deserve all the happiness in the world. And I hope this year brings moments that make you smile for no reason, and everything your heart quietly hopes for."
                    delay={45}
                    startDelay={12000}
                    className="text-2xl md:text-3xl font-script mb-6 leading-relaxed"
                  />

                  <WordByWordEffect
                    text="No matter where life takes us, just know I'll always be there for you, quietly hoping you're doing okay even if we're not always in touch."
                    delay={45}
                    startDelay={22000}
                    className="text-2xl md:text-3xl font-script leading-relaxed"
                    onComplete={handleWritingComplete}
                  />
                </div>
              </NotebookPage>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="finalCelebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", stiffness: 70, damping: 12 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Party popper effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${100 + Math.random() * 20}%`,
                    }}
                    initial={{ y: 0, opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ 
                      y: `-${100 + Math.random() * 50}%`, 
                      opacity: [0, 1, 0],
                      scale: 0.5 + Math.random() * 0.5,
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 2.5 + Math.random() * 2,
                      delay: 0.5 + Math.random() * 0.5,
                      ease: "easeOut",
                      opacity: {
                        times: [0, 0.3, 1],
                        ease: "easeInOut"
                      },
                      type: "tween"
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      i % 4 === 0 ? "bg-birthday-pink" : 
                      i % 4 === 1 ? "bg-birthday-purple" : 
                      i % 4 === 2 ? "bg-birthday-orange" : 
                      "bg-birthday-blue"
                    }`}></div>
                  </motion.div>
                ))}
              </div>

              {/* Confetti explosions at corners */}
              <div className="fixed top-10 left-10 z-10">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <PartyPopper className="text-birthday-pink" size={30} />
                </motion.div>
              </div>
              <div className="fixed top-10 right-10 z-10">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <PartyPopper className="text-birthday-purple" size={30} />
                </motion.div>
              </div>
              <div className="fixed bottom-10 left-10 z-10">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <PartyPopper className="text-birthday-orange" size={30} />
                </motion.div>
              </div>
              <div className="fixed bottom-10 right-10 z-10">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <PartyPopper className="text-birthday-blue" size={30} />
                </motion.div>
              </div>

              <motion.h1
                className="text-5xl md:text-6xl font-script text-birthday-purple mb-10 text-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 12,
                  delay: 0.3
                }}
              >
                Happy Birthday Trisheeta!
              </motion.h1>
              
              <div className="relative mb-10">
                <motion.div
                  initial={{ scale: 0, rotate: -10, y: 50 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.6
                  }}
                >
                  {/* Simple clean circle container with larger size */}
                  <motion.div 
                    className="w-[256px] h-[256px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-6 border-birthday-pink relative"
                    animate={{
                      scale: [1, 1.05]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 1.2,
                      type: "tween"
                    }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src="/trisha.jpg"
                        alt="Trisheeta's Birthday"
                        fill
                        sizes="(max-width: 768px) 256px, 480px"
                        className="object-cover"
                        priority
                        quality={100}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center">
                      <BirthdayCap />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.p
                className="text-3xl md:text-4xl font-script text-birthday-orange text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: 1.2
                }}
                whileInView={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut", 
                    times: [0, 0.5, 1],
                    repeat: 0,
                    type: "tween"
                  }
                }}
              >
                Wishing you a day filled with laughter, love, and beautiful memories!
              </motion.p>
              
              {/* Surprise Box Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="w-full mt-16"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-script text-birthday-purple text-center mb-4">
                    One More Surprise...
                  </h2>
                </motion.div>
                <SurpriseBox 
                  correctPassword="i love you"
                  surpriseMessage="i love you 2"
                  hint="3 words"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
