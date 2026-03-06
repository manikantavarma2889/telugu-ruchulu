import { Button } from "@/components/ui/button";
import { CustomerInfo, Order } from "@/types";
import { useState } from "react";
import { CheckCircle, CreditCard, Banknote, Smartphone, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";


interface PaymentModalProps {
    onBack: () => void;
    total: number;
    customerInfo: CustomerInfo;
}

export function PaymentModal({ onBack, total, customerInfo }: PaymentModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const { clearCart, cart } = useCart();
    const { addOrder, customerProfile } = useStore();

    const handlePayment = async () => {
        if (paymentMethod === 'cod') {
            setProcessing(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            createOrder('COD');
            return;
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
            toast.error("Razorpay Key is missing. Please check .env.local");
            return;
        }

        const options = {
            key: razorpayKey,
            amount: total * 100, // Amount is in currency subunits (paise)
            currency: "INR",
            name: "Telugu Ruchulu",
            description: "Authentic Food Order",
            image: "/logo.png",
            handler: function (response: any) {
                // Payment successful
                createOrder(paymentMethod.toUpperCase(), response.razorpay_payment_id);
            },
            prefill: {
                name: customerInfo.name,
                contact: customerInfo.phone,
            },
            theme: {
                color: "#f97316", // Tailwind orange-500
            },
            modal: {
                ondismiss: function () {
                    setProcessing(false);
                }
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setProcessing(true);
    };

    const createOrder = async (method: string, paymentId?: string) => {
        const newOrder: Order = {
            id: `ORD-${Date.now().toString().slice(-4)}`,
            userId: customerProfile?.id, // Link to authenticated customer
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            items: cart.map(item => `${item.name} (${item.quantity})`),
            total: total,
            status: 'pending',
            orderTime: new Date().toISOString(),
            deliveryAddress: customerInfo.address,
            paymentMethod: method === 'COD' ? 'Cash on Delivery' : `${method} (${paymentId || 'Paid'})`,
            isNew: true
        };

        await addOrder(newOrder);
        setSuccess(true);
        setProcessing(false);
        clearCart();
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center h-full animate-in fade-in zoom-in">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-green-700">Order Placed!</h2>
                    <p className="text-muted-foreground">Thank you for ordering with Telugu Ruchulu.</p>
                </div>
                <p className="text-sm">Your delicious food will be with you shortly.</p>
                <Button onClick={() => window.location.reload()} className="mt-4">Back to Home</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div
                    className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'hover:bg-accent'}`}
                    onClick={() => setPaymentMethod('card')}
                >
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                    </div>
                    {paymentMethod === 'card' && <div className="h-4 w-4 rounded-full bg-primary" />}
                </div>

                <div
                    className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'hover:bg-accent'}`}
                    onClick={() => setPaymentMethod('upi')}
                >
                    <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">UPI / PhonePe / GPay</p>
                        <p className="text-sm text-muted-foreground">Instant payment</p>
                    </div>
                    {paymentMethod === 'upi' && <div className="h-4 w-4 rounded-full bg-primary" />}
                </div>

                <div
                    className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'hover:bg-accent'}`}
                    onClick={() => setPaymentMethod('cod')}
                >
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                    </div>
                    {paymentMethod === 'cod' && <div className="h-4 w-4 rounded-full bg-primary" />}
                </div>
            </div>

            <div className="pt-4">
                <Button
                    className="w-full h-12 text-lg"
                    onClick={handlePayment}
                    disabled={processing}
                >
                    {processing ? "Processing..." : `Pay Rs.${total}`}
                </Button>
            </div>
        </div>
    );
}
