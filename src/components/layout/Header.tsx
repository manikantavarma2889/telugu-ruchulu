import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ShoppingCart, Search, MapPin, ChevronDown, Navigation, LocateFixed } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { CartSheet } from "@/components/cart/CartSheet";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CustomerAuthModal } from "@/components/checkout/CustomerAuthModal";

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const cities = ["Chennai", "Vishakapatnam", "Hyderabad", "Guntur", "Vijayawada", "Nellore"];

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
    const { getCartItemCount } = useCart();
    const { location, setLocation, detectLocation, isCustomerLoggedIn, customerProfile, logoutCustomer } = useStore();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const itemCount = getCartItemCount();


    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 shrink-0">
                        <ChefHat className="h-8 w-8 text-primary" />
                        <div className="hidden lg:block">
                            <h1 className="text-xl font-bold tracking-tight">Telugu Ruchulu</h1>
                            <p className="text-xs text-muted-foreground">Authentic Flavors</p>
                        </div>
                    </div>

                    {/* Location Selector (Swiggy Style) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-1.5 hover:text-primary transition-colors min-w-0 truncate group py-1">
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                <span className="text-sm font-bold border-b border-[#3d4152] group-hover:border-primary truncate">
                                    {location}
                                </span>
                                <ChevronDown className="h-4 w-4 text-primary shrink-0" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full sm:max-w-md p-0">
                            <SheetHeader className="p-6 border-b">
                                <SheetTitle className="text-xl font-bold">Select Location</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-6 space-y-6">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-12 gap-3 border-dashed hover:border-primary hover:text-primary"
                                    onClick={() => {
                                        detectLocation();
                                    }}
                                >
                                    <LocateFixed className="h-5 w-5" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold">Detect current location</span>
                                        <span className="text-[10px] text-muted-foreground font-normal italic">Using GPS</span>
                                    </div>
                                </Button>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Popular Cities</h3>
                                    <div className="grid grid-cols-1 gap-1">
                                        {cities.map(city => (
                                            <button
                                                key={city}
                                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location === city
                                                    ? "bg-primary/5 text-primary font-bold"
                                                    : "hover:bg-accent text-gray-700"
                                                    }`}
                                                onClick={() => setLocation(city)}
                                            >
                                                <Navigation className={`h-4 w-4 ${location === city ? "text-primary fill-primary" : "text-gray-400"}`} />
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
                    <div className="relative w-full max-w-[150px] sm:max-w-xs md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search dishes..."
                            className="pl-8 bg-secondary/50 border-none focus-visible:ring-1 h-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        {isCustomerLoggedIn ? (
                            <>
                                <div className="flex items-center gap-2 px-2 hidden sm:flex">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {customerProfile?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground truncate max-w-[100px]">
                                        Hi, {customerProfile?.name?.split(' ')[0] || 'User'}
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50" onClick={logoutCustomer}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)} className="text-sm font-medium">
                                Sign In
                            </Button>
                        )}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative hover:bg-secondary/80 shrink-0 h-9 w-9">
                                    <ShoppingCart className="h-5 w-5" />
                                    {itemCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                                            {itemCount}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-lg">
                                <CartSheet />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <CustomerAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </motion.header>
    );
}

