import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Gift } from "lucide-react";

interface SurpriseBoxProps {
  correctPassword: string;
  surpriseMessage: string;
  hint?: string;
}

export default function SurpriseBox({ 
  correctPassword = "i love you", 
  surpriseMessage = "i love you 2", 
  hint = "3 words" 
}: SurpriseBoxProps) {
  const [password, setPassword] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase().trim() === correctPassword.toLowerCase()) {
      setShowSurprise(true);
    } else {
      // Shake animation for incorrect password
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleReset = () => {
    setShowSurprise(false);
    setPassword("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.3
      }}
      className="w-full max-w-md mx-auto mt-12 mb-8"
    >
      <AnimatePresence mode="wait">
        {!showSurprise ? (
          <motion.div
            key="passwordBox"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-birthday-pink`}
          >
            <div className="text-center mb-4">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block"
              >
                <Gift className="w-12 h-12 mx-auto text-birthday-purple mb-2" />
              </motion.div>
              <h3 className="text-2xl font-script text-birthday-purple">Secret Surprise</h3>
              <p className="text-gray-600 mt-1">Enter the password to unlock</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <motion.input
                  ref={inputRef}
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-birthday-pink/50 focus:border-birthday-pink focus:outline-none font-medium"
                  placeholder="Enter password..."
                  animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] } : {}}
                  transition={isShaking ? { duration: 0.5 } : {}}
                  autoFocus
                />
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-sm text-birthday-purple hover:underline focus:outline-none"
                >
                  {showHint ? "Hide hint" : "Need a hint?"}
                </button>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-birthday-pink text-white rounded-full font-medium"
                >
                  Unlock
                </motion.button>
              </div>
              
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-birthday-purple/80 italic text-center py-2">
                      Hint: {hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="surpriseRevealed"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05, 1],
              rotate: 0
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ 
              duration: 0.6,
              scale: {
                times: [0, 0.5, 1],
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }
            }}
            className="bg-gradient-to-br from-birthday-pink to-birthday-purple p-8 rounded-2xl shadow-lg text-center relative overflow-hidden"
          >
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 0.7 + Math.random() * 0.3, 0],
                    y: [0, -30 - Math.random() * 50]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                >
                  <Heart 
                    className="text-white/30" 
                    fill="white" 
                    size={10 + Math.random() * 20} 
                  />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-3xl font-script text-white mb-4">
                {surpriseMessage}
              </h3>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.6, 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Heart className="w-16 h-16 mx-auto text-white fill-white" />
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleReset}
                className="mt-6 px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full font-medium text-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 