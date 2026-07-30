"use client";
import Logo from "./Logo";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navigation() {
    const menuRef = useRef<HTMLDivElement>(null);
    const ellipseRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const anim = gsap.to(ellipseRef.current, {
            scale: 1.25,
            duration: 0.3,
            paused: true,
        });

        menuRef.current?.addEventListener("mouseenter", () => {
            anim.play();
        });

        menuRef.current?.addEventListener("mouseleave", () => {
            anim.reverse();
        });
    });

    return (
        <nav className="fixed top-0 left-0 z-1000 flex w-screen items-center justify-between px-[1.25rem] py-[1rem] lg:px-[1.75rem]">
            <Logo />
            <div ref={menuRef} className="relative">
                <div className="font-main font-thin text-black lowercase">
                    menu
                </div>
                <div className="font-main font-thin text-black lowercase opacity-0">
                    open
                </div>
                <div
                    ref={ellipseRef}
                    className="bg-cream absolute top-[-5.5rem] right-[-5rem] z-[-1] aspect-square w-[10rem] origin-center rounded-full"
                ></div>
            </div>
        </nav>
    );
}
