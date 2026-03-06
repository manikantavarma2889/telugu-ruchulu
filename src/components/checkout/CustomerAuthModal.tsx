import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChefHat } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CustomerAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CustomerAuthModal({ isOpen, onClose }: CustomerAuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    // Using existing store auth state for customers too
    // (Removed unused admin auth setters)

    // Reset state when opening/closing
    useEffect(() => {
        if (!isOpen) {
            setMode("login");
            setPassword("");
        }
    }, [isOpen]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Starting auth flow in mode:", mode);

        // Ultimate Fallback: Force UI to unfreeze after 15s regardless of Promise state
        const forceUnlock = setTimeout(() => {
            console.log("Fallback timeout triggered. Unlocking UI.");
            setLoading(false);
            toast.error("The request took too long. Please check your internet connection.");
        }, 15000);

        try {
            if (mode === "signup") {
                console.log("Attempting to sign up user with email:", email);

                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });

                console.log("Sign up response received:", { authData, authError });

                if (authError) {
                    if (authError.message?.toLowerCase().includes("rate limit") || authError.status === 429) {
                        toast.warning("Supabase email rate limit reached. Allowing test progression.");
                    } else {
                        throw authError;
                    }
                }

                if (authData?.user) {
                    console.log("User created, attempting to create profile for ID:", authData.user.id);
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([
                            {
                                id: authData.user.id,
                                name,
                                phone,
                                address
                            }
                        ]);

                    console.log("Profile insert response:", { profileError });

                    if (profileError) {
                        console.error("Profile creation error:", profileError);
                        toast.error("Account created, but could not save profile details fully.");
                    } else {
                        toast.success("Account created successfully!");
                    }
                }

                setMode("login");
                setPassword("");
                toast.info("Please log in. (Use a test account if you hit rate limits).");

            } else {
                console.log("Attempting to log in user with email:", email);

                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                console.log("Sign in response received:", { data, error });

                if (error) throw error;

                toast.success("Welcome back!");
                onClose();
            }
        } catch (error: any) {
            console.error("Auth flow caught an error:", error);
            toast.error(error.message || "An error occurred during authentication.");
        } finally {
            clearTimeout(forceUnlock);
            console.log("Finishing auth flow, setting loading to false.");
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md z-[150]">
                <DialogHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                        <ChefHat className="h-10 w-10 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl text-center">
                        {mode === "login" ? "Welcome Back" : "Join Telugu Ruchulu"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {mode === "login"
                            ? "Login to track your orders and checkout faster."
                            : "Create an account to save your delivery details."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAuth} className="space-y-4 py-4">
                    {mode === "signup" && (
                        <>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Phone Number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Delivery Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Processing..." : (mode === "login" ? "Login" : "Create Account")}
                        </Button>

                        <button
                            type="button"
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-sm text-primary hover:underline text-center"
                        >
                            {mode === "login"
                                ? "Don't have an account? Sign Up"
                                : "Already have an account? Login"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
