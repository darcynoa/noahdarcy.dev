"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gift() {
    const gift = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to("body", {
            backgroundColor: "#342d59",
            duration: 1,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: gift.current,
                start: "top center",
                toggleActions: "play none none reverse",
            },
        });
    });

    return (
        <section
            ref={gift}
            className="flex h-screen w-full items-center justify-center"
        >
            hi
        </section>
    );
}
