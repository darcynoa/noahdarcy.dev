"use client";
import Logo from "./Logo";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const menuTextRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const menuText = SplitText.create(menuTextRef.current, {
            type: "chars",
        });

        gsap.from(gsap.utils.toArray(navRef.current?.children ?? []), {
            y: -100,
            duration: 2,
            stagger: 0.2,
            ease: "power4.inOut",
        });
    });

    // resizeObserver to use when the menu is open and the screen changes size, to make sure the ellipse is always big enough to cover the screen

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 z-1000 flex w-screen items-center justify-between px-[1.25rem] py-[1rem] lg:px-[1.75rem]"
        >
            <Logo />
            <div
                ref={menuRef}
                className="relative"
                onClick={() => {
                    setIsMenuOpen((isOpen) => !isOpen);
                }}
            >
                <p
                    ref={menuTextRef}
                    className="font-main text-cream font-thin uppercase"
                >
                    menu
                </p>
            </div>
        </nav>
    );
}
