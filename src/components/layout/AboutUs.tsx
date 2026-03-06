import { motion, AnimatePresence } from "framer-motion";
import { X, ChefHat, Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutUsProps {
    isOpen: boolean;
    onClose: () => void;
}

const cinematicScenes = [
    {
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80",
        title: "The Heritage of Taste",
        description: "Telugu Ruchulu brings you the authentic spice and soul of Andhra and Telangana, passed down through generations."
    },
    {
        image: "https://images.unsplash.com/photo-1589187151003-0dd476a00f9b?auto=format&fit=crop&q=80",
        title: "Crafted with Passion",
        description: "Our chefs use traditional stone-ground masalas and the freshest local ingredients to create magic on your plate."
    },
    {
        image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80",
        title: "A Culinary Journey",
        description: "From the fiery Guntur chilies to the aromatic Biryanis of Hyderabad, experience a festival of flavors."
    }
];

export function AboutUs({ isOpen, onClose }: AboutUsProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col"
                >
                    {/* Background Scenes Component (Simplified for one view but we can animate) */}
                    <div className="absolute inset-0">
                        {cinematicScenes.map((scene, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    scale: [1.1, 1.15, 1.2, 1.25]
                                }}
                                transition={{
                                    duration: 12,
                                    delay: index * 10,
                                    repeat: Infinity,
                                    repeatDelay: (cinematicScenes.length - 1) * 10
                                }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="absolute inset-0 bg-black/50 z-10" />
                                <img
                                    src={scene.image}
                                    alt="About Us Background"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white">
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className="mb-4"
                                    >
                                        <ChefHat className="h-16 w-16 text-primary mx-auto mb-6" />
                                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
                                            {scene.title}
                                        </h2>
                                        <div className="h-1 w-24 bg-primary mx-auto mb-6" />
                                        <p className="text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
                                            {scene.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation/Close */}
                    <div className="absolute top-6 right-6 z-[110]">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                        >
                            <X className="h-8 w-8" />
                        </Button>
                    </div>

                    {/* Bottom Branding */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[110] text-center text-white/60">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Heart className="h-5 w-5 fill-primary text-primary" />
                            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                            <Sparkles className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-sm tracking-widest uppercase font-bold">Telugu Ruchulu Heritage</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
