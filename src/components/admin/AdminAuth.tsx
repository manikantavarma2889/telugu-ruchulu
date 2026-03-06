import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ChefHat, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

import { Link } from "react-router-dom";

import { supabase } from "@/lib/supabase";

export function AdminAuth() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setIsAdminLoggedIn, setUserRole } = useStore();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (mode === "signup") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            toast.success("Account created! You can now log in.");
            setMode("login");
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            setIsAdminLoggedIn(true);
            setUserRole("admin");
            toast.success("Welcome back, Admin!");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                        <ChefHat className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                        Admin {mode === "login" ? "Login" : "Sign Up"}
                    </CardTitle>
                    <CardDescription>
                        {mode === "login"
                            ? "Enter your credentials to access the dashboard"
                            : "Create a new admin account"}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleAuth}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Email"
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
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Processing..." : (mode === "login" ? "Login" : "Sign Up")}
                        </Button>

                        <button
                            type="button"
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-sm text-primary hover:underline"
                        >
                            {mode === "login"
                                ? "Don't have an account? Sign Up"
                                : "Already have an account? Login"}
                        </button>

                        <Link to="/" className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 py-2">
                            <ArrowLeft className="h-3 w-3" /> Back to Store
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
