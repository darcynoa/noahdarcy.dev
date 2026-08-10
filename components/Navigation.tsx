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
    const ellipseRef = useRef<HTMLDivElement>(null);
    const menuTextRef = useRef<HTMLDivElement>(null);
    const openTextRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const menuText = SplitText.create(menuTextRef.current, {
            type: "chars",
        });
        const openText = SplitText.create(openTextRef.current, {
            type: "chars",
            wordsClass: "opacity-100",
        });

        const anim = gsap.timeline();
        gsap.set(openText.chars, { opacity: 0 });
        anim.to(ellipseRef.current, {
            scale: 1.25,
            duration: 0.3,
            cursor: "pointer",
        })
            .to(
                menuText.chars,
                {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    ease: "power3.out",
                    stagger: 0.1,
                },
                "<",
            )
            .to(
                openText.chars,
                {
                    opacity: 1,
                    y: -20,
                    duration: 0.3,
                    ease: "power3.out",
                    stagger: 0.1,
                },
                "<",
            );

        menuRef.current?.addEventListener("mouseenter", () => {
            if (isMenuOpen) return;
            anim.play();
        });

        menuRef.current?.addEventListener("mouseleave", () => {
            if (isMenuOpen) return;
            anim.reverse();
        });
    });

    // resizeObserver to use when the menu is open and the screen changes size, to make sure the ellipse is always big enough to cover the screen

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(max-width: 768px)", () => {
                gsap.to(ellipseRef.current, {
                    scale: isMenuOpen ? 10 : 1,
                    duration: 0.8,
                    ease: "power3.inOut",
                    overwrite: "auto",
                });
            });

            mm.add("(min-width: 769px)", () => {
                gsap.to(ellipseRef.current, {
                    scale: isMenuOpen ? 15 : 1,
                    duration: 0.8,
                    ease: "power3.inOut",
                    cursor: isMenuOpen ? "default" : "pointer",
                    overwrite: "auto",
                });
            });
        },
        { dependencies: [isMenuOpen] },
    );

    return (
        <nav className="fixed top-0 left-0 z-1000 flex w-screen items-center justify-between px-[1.25rem] py-[1rem] lg:px-[1.75rem]">
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
                    className="font-main font-thin text-black lowercase"
                >
                    menu
                </p>
                <p
                    ref={openTextRef}
                    className="font-main font-thin text-black lowercase"
                >
                    open
                </p>
                <div
                    ref={ellipseRef}
                    className="bg-cream absolute top-[-5.5rem] right-[-5rem] z-[-1] aspect-square w-[10rem] origin-center rounded-full"
                ></div>
            </div>
            <div
                className={`pointer-events-none absolute top-0 left-0 z-30 h-screen w-screen`}
            >
                <div
                    className={`relative flex h-full w-full ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
                >
                    <ul className="font-main pointer-events-auto absolute top-[10vh] right-0 flex w-full flex-col items-center justify-center text-[5rem] leading-[1.2] font-thin text-black">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#work">Work</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
