import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { FoodCard } from "@/components/menu/FoodCard";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { MobileCartBar } from "@/components/cart/MobileCartBar";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { AboutUs } from "@/components/layout/AboutUs";
import { CustomerOrders } from "@/components/checkout/CustomerOrders";

export function Home() {
    const { menuItems, location, isCustomerLoggedIn } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showSplash, setShowSplash] = useState(true);
    const [showAbout, setShowAbout] = useState(false);

    const filteredMenuItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white min-h-screen">
            <AnimatePresence>
                {showSplash && (
                    <SplashScreen onComplete={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            <div className={`transition-all duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
                <Header
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <main className="px-4 sm:container pb-24">
                    {/* Customer Dashboard / Orders */}
                    {isCustomerLoggedIn && (
                        <div className="mt-6 mb-12">
                            <CustomerOrders />
                        </div>
                    )}
                    {/* Category Carousel / Filter (Sticky) */}
                    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur py-4 -mx-4 px-4 md:px-0 mb-6">
                        <div className="sm:container">
                            <h2 className="text-lg sm:text-2xl font-bold text-[#3d4152] mb-4">What's on your mind?</h2>
                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </div>
                    </div>

                    <div className="sm:container">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg sm:text-2xl font-bold text-[#3d4152]">
                                {selectedCategory === 'all' ? `Restaurants with online food delivery in ${location}` : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Recommendations`}
                            </h2>
                        </div>

                        {/* Menu Grid */}
                        <AnimatePresence mode="wait">
                            {filteredMenuItems.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-12"
                                >
                                    {filteredMenuItems.map((item) => (
                                        <FoodCard key={item.id} item={item} />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 text-muted-foreground"
                                >
                                    No dishes found matching your criteria.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>

                {/* Floating Cart Bar for Mobile */}
                <MobileCartBar />

                <Footer onAboutClick={() => setShowAbout(true)} />

                <AboutUs
                    isOpen={showAbout}
                    onClose={() => setShowAbout(false)}
                />
            </div>
        </div>
    );
}
