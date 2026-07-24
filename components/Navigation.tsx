"use client";
import Logo from "./Logo";

export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 z-1000 flex w-screen items-center justify-between px-[1.25rem] py-[1rem] lg:px-[1.75rem]">
            <Logo />
            <div className="font-main text-cream font-thin lowercase">menu</div>
        </nav>
    );
}
