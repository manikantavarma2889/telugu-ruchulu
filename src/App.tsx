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
        if (!isAdminLoggedIn && !isCustomerLoggedIn) {
            const hasSeenPrompt = sessionStorage.getItem('hasSeenAuthPrompt');
            if (!hasSeenPrompt) {
                const timer = setTimeout(() => {
                    setShowAuthModal(true);
                    sessionStorage.setItem('hasSeenAuthPrompt', 'true');
                }, 6000);
                return () => clearTimeout(timer);
            }
        }
    }, [isAdminLoggedIn, isCustomerLoggedIn, setShowAuthModal]);

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
                Skip to main content
            </a>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard /> : <AdminAuth />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <div aria-live="polite" aria-atomic="true" className="sr-only" id="accessibility-announcements" />
            <CustomerAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash) setShowSplash(false);
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
    };

    return (
        <StoreProvider>
            <CartProvider>
                <BrowserRouter>
                    {showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : <AppContent />}
                    <Toaster position="top-center" richColors />
                </BrowserRouter>
            </CartProvider>
        </StoreProvider>
    );
}

export default App;
