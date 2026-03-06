import { ChefHat } from "lucide-react";

interface FooterProps {
    onAboutClick: () => void;
}

export function Footer({ onAboutClick }: FooterProps) {
    return (
        <footer className="bg-white border-t py-12 px-4">
            <div className="sm:container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b pb-8 mb-8">
                    <div className="flex items-center gap-2">
                        <ChefHat className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold tracking-tight text-[#3d4152]">Telugu Ruchulu</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-8">
                        <button
                            onClick={onAboutClick}
                            className="text-[#3d4152] font-semibold hover:text-primary transition-colors uppercase text-sm tracking-widest"
                        >
                            About Us
                        </button>
                        <button className="text-[#3d4152] font-semibold hover:text-primary transition-colors uppercase text-sm tracking-widest">
                            Menu
                        </button>
                        <button className="text-[#3d4152] font-semibold hover:text-primary transition-colors uppercase text-sm tracking-widest">
                            Contact
                        </button>
                        <button className="text-[#3d4152] font-semibold hover:text-primary transition-colors uppercase text-sm tracking-widest font-bold text-primary">
                            Hyderabad | Chennai | Guntur
                        </button>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#686b78]">
                    <p>2026 @ Telugu Ruchulu. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-[#3d4152] cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-[#3d4152] cursor-pointer">Terms of Service</span>
                        <span className="hover:text-[#3d4152] cursor-pointer">Accessibility</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
