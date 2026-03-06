import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { PaymentModal } from "@/components/checkout/PaymentModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CartSheet() {
    const { cart, removeFromCart, addToCart, getCartTotal } = useCart();
    const { customerProfile } = useStore();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        name: customerProfile?.name || '',
        phone: customerProfile?.phone || '',
        address: customerProfile?.address || '',
        notes: ''
    });

    // Update if profile loads after sheet is mounted
    useEffect(() => {
        if (customerProfile) {
            setCustomerInfo(prev => ({
                ...prev,
                name: customerProfile.name || prev.name,
                phone: customerProfile.phone || prev.phone,
                address: customerProfile.address || prev.address,
            }));
        }
    }, [customerProfile]);

    const cartTotal = getCartTotal();
    const deliveryFee = 30;
    const tax = Math.round(cartTotal * 0.05);
    const finalTotal = cartTotal + deliveryFee + tax;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col h-full items-center justify-center space-y-4">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Your cart is empty.</p>
                    <p className="text-sm text-muted-foreground">Add some delicious food!</p>
                </div>
            </div>
        );
    }

    if (isPaymentOpen) {
        return (
            <PaymentModal
                onBack={() => setIsPaymentOpen(false)}
                total={finalTotal}
                customerInfo={customerInfo}
            />
        );
    }

    return (
        <div className="flex flex-col h-full">
            <SheetHeader className="pb-4">
                <SheetTitle>Your Cart ({cart.length} items)</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                            />
                            <div className="flex-1 space-y-1">
                                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Rs. {item.price}</p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => addToCart({ ...item, description: '', category: '', rating: 0, isVeg: true } as any)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">Rs. {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4 pb-4">
                    <h4 className="font-medium">Delivery Details</h4>
                    <Input
                        placeholder="Name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                    <Input
                        placeholder="Phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                    <Textarea
                        placeholder="Address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                    <Input
                        placeholder="Notes (optional)"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t mt-auto">
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rs. {cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>Rs. {deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (5%)</span>
                        <span>Rs. {tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Rs. {finalTotal}</span>
                    </div>
                </div>

                <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsPaymentOpen(true)}
                    disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
                >
                    Proceed to Payment
                </Button>
            </div>
        </div>
    );
}
