"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
    const track = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!track.current) return;

        const trackEl = track.current;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 64rem)", () => {
            gsap.to(trackEl, {
                x: () => -(trackEl.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: trackEl,
                    start: "top top",
                    end: () => `+=${trackEl.scrollWidth - window.innerWidth}`,
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });
        });
    });

    return (
        <div
            ref={track}
            className="flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black lg:w-[300vw] lg:flex-row"
        >
            <h1 className="font-main text-cream text-[5rem] font-thin lg:pl-[2rem] lg:text-[7.5rem]">
                Work
            </h1>
            <section className="flex h-screen w-[110%] items-center justify-center pl-[5rem] text-amber-300">
                Section 1
            </section>
            <section className="flex h-screen w-[110%] items-center justify-center text-amber-500">
                Section 2
            </section>
            <section className="flex h-screen w-[110%] items-center justify-center text-amber-600">
                Section 3
            </section>
        </div>
    );
}
