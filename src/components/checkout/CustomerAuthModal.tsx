import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChefHat } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CustomerAuthModalProps { isOpen: boolean; onClose: () => void; }

export function CustomerAuthModal({ isOpen, onClose }: CustomerAuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
    const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [address, setAddress] = useState(""); const [loading, setLoading] = useState(false);

    useEffect(() => { if (!isOpen) { setMode("login"); setPassword(""); } }, [isOpen]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        const forceUnlock = setTimeout(() => { setLoading(false); toast.error("The request took too long. Please try again."); }, 15000);
        try {
            if (mode === "signup") {
                const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
                if (authError) throw authError;
                if (authData.user) {
                    const { error: profileError } = await supabase.from("profiles").insert([{ id: authData.user.id, name, phone, address }]);
                    if (profileError) toast.error("Account created, but profile details could not be saved."); else toast.success("Account created successfully!");
                }
                setMode("login"); setPassword(""); toast.info("Please log in to continue.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                toast.success("Welcome back!"); onClose();
            }
        } catch (error: any) { toast.error(error.message || "Authentication failed."); }
        finally { clearTimeout(forceUnlock); setLoading(false); }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md z-[150]" aria-describedby="auth-description">
                <DialogHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-2"><ChefHat className="h-10 w-10 text-primary" aria-hidden="true" /></div>
                    <DialogTitle className="text-2xl text-center">{mode === "login" ? "Welcome Back" : "Join Telugu Ruchulu"}</DialogTitle>
                    <DialogDescription id="auth-description" className="text-center">{mode === "login" ? "Login to track your orders and checkout faster." : "Create an account to save your delivery details."}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAuth} className="space-y-4 py-4" aria-label={mode === "login" ? "Login form" : "Sign up form"}>
                    {mode === "signup" && <>
                        <Input aria-label="Full name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                        <Input aria-label="Phone number" placeholder="Phone Number" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="tel" />
                        <Input aria-label="Delivery address" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete="street-address" />
                    </>}
                    <Input aria-label="Email address" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                    <Input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={mode === "login" ? "current-password" : "new-password"} />
                    <div className="pt-2 flex flex-col gap-3">
                        <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>{loading ? "Processing..." : mode === "login" ? "Login" : "Create Account"}</Button>
                        <button type="button" aria-label={mode === "login" ? "Switch to sign up form" : "Switch to login form"} onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-primary hover:underline text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">{mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
