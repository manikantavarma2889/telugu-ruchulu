import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface FoodCardProps {
    item: MenuItem;
}

export function FoodCard({ item }: FoodCardProps) {
    const { addToCart, removeFromCart, cart } = useCart();

    // Get current item quantity from cart
    const cartItem = cart.find(i => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white transition-all"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden mb-3">
                <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Veg/Non-Veg Indicator (Swiggy Style) */}
                <div className="absolute top-2 left-2 flex items-center justify-center p-0.5 bg-white border border-gray-100 rounded shadow-sm">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? "bg-[#60b246]" : "bg-red-500"}`} />
                </div>

                {/* Rating Badge Overlay */}
                <div className="absolute bottom-2 left-2 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow-sm">
                    <Star className="h-3 w-3 fill-[#60b246] text-[#60b246]" />
                    <span className="text-[11px] font-bold text-gray-800">{item.rating}</span>
                </div>

                {/* ADD Button Widget (Centered Overlapping) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 w-[80px] sm:w-[100px]">
                    {quantity === 0 ? (
                        <Button
                            onClick={() => addToCart(item)}
                            className="w-full h-8 sm:h-9 bg-white hover:bg-gray-50 text-[#60b246] border border-gray-100 shadow-md font-bold text-xs uppercase rounded-lg"
                        >
                            ADD
                        </Button>
                    ) : (
                        <div className="flex items-center justify-between w-full h-8 sm:h-9 bg-white text-[#60b246] border border-gray-100 shadow-md font-bold text-sm rounded-lg overflow-hidden">
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="h-3.5 w-3.5 rotate-45" />
                            </button>
                            <span className="px-1">{quantity}</span>
                            <button
                                onClick={() => addToCart(item)}
                                className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-0.5 px-1 mt-1">
                <h3 className="font-bold text-[15px] sm:text-[17px] text-[#3d4152] leading-tight line-clamp-1">
                    {item.name}
                </h3>
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm font-semibold text-[#3e4152]">Rs. {item.price}</span>
                </div>
                <p className="text-[#686b78] text-[12px] sm:text-[13px] line-clamp-2 leading-tight">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}
