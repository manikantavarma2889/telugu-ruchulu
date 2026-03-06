import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/CartSheet";

export function MobileCartBar() {
    const { getCartTotal, getCartItemCount } = useCart();
    const itemCount = getCartItemCount();
    const total = getCartTotal();

    return (
        <AnimatePresence>
            {itemCount > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 z-50 sm:hidden"
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="w-full bg-[#60b246] text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between font-bold animate-in fade-in slide-in-from-bottom-5">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-1 rounded">
                                        <ShoppingBag className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[13px]">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                                        <span className="text-[11px] opacity-90 font-medium">Extra charges may apply</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">VIEW CART (Rs. {total})</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
                            <CartSheet />
                        </SheetContent>
                    </Sheet>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
