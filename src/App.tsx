import { CartProvider } from "@/context/CartContext";
import { StoreProvider, useStore } from "@/context/StoreContext";
import { Home } from "@/pages/Home";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { useState, useEffect } from "react";

import { CustomerAuthModal } from "@/components/checkout/CustomerAuthModal";

function AppContent() {
    const { isAdminLoggedIn, isCustomerLoggedIn, showAuthModal, setShowAuthModal } = useStore();

    useEffect(() => {
        // Only trigger the auto-prompt if not an admin and not logged in as a customer
        if (!isAdminLoggedIn && !isCustomerLoggedIn) {
            const hasSeenPrompt = sessionStorage.getItem('hasSeenAuthPrompt');
            if (!hasSeenPrompt) {
                const timer = setTimeout(() => {
                    setShowAuthModal(true);
                    sessionStorage.setItem('hasSeenAuthPrompt', 'true');
                }, 6000); // 6 seconds after splash screen
                return () => clearTimeout(timer);
            }
        }
    }, [isAdminLoggedIn, isCustomerLoggedIn]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/admin"
                    element={
                        isAdminLoggedIn ? <AdminDashboard /> : <AdminAuth />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <CustomerAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

    // Check if the user is loading the site for the first time in this session
    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash) {
            setShowSplash(false);
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
    };

    return (
        <StoreProvider>
            <CartProvider>
                <BrowserRouter>
                    {showSplash ? (
                        <SplashScreen onComplete={handleSplashComplete} />
                    ) : (
                        <AppContent />
                    )}
                    <Toaster position="top-center" richColors />
                </BrowserRouter>
            </CartProvider>
        </StoreProvider>
    );
}

export default App;
