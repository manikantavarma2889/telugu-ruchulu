import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

interface SplashScreenProps {
    onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide splash screen after 2.5 seconds (gives time for animation)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Trigger completion after fade out
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex flex-col items-center justify-center"
                    >
                        {/* Glowing Background Effect */}
                        <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full h-64 w-64 -z-10" />

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <UtensilsCrossed className="h-24 w-24 text-orange-500 mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"
                            style={{ fontFamily: "'Cinzel', serif" }} // Optional: Looks great with a serif font
                        >
                            Telugu Ruchulu
                        </motion.h1>

                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="mt-4 text-zinc-400 text-lg md:text-xl font-medium tracking-wide"
                        >
                            Authentic Andhra Cuisine
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
