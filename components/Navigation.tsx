"use client";
import Logo from "./Logo";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Navigation() {
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
            anim.play();
        });

        menuRef.current?.addEventListener("mouseleave", () => {
            anim.reverse();
        });

        menuRef.current?.addEventListener("mousedown", () => {
            console.log("Ellipse clicked");
        });
    });

    return (
        <nav className="fixed top-0 left-0 z-1000 flex w-screen items-center justify-between px-[1.25rem] py-[1rem] lg:px-[1.75rem]">
            <Logo />
            <div ref={menuRef} className="relative">
                <div
                    ref={menuTextRef}
                    className="font-main font-thin text-black lowercase"
                >
                    menu
                </div>
                <div
                    ref={openTextRef}
                    className="font-main font-thin text-black lowercase"
                >
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
