"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
    const iMake = useRef<HTMLDivElement>(null);
    const dope = useRef<HTMLDivElement>(null);
    const web = useRef<HTMLDivElement>(null);
    const sites = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        if (!iMake.current || !dope.current || !web.current || !sites.current)
            return;

        tl.from(iMake.current.childNodes, {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
        })
            .from(
                dope.current,
                {
                    y: 50,
                    x: -100,
                    opacity: 0,
                    duration: 2,
                    ease: "power3.out",
                },
                "-=0.95",
            )
            .from(
                web.current,
                {
                    y: 50,
                    x: 100,
                    opacity: 0,
                    duration: 2,
                    ease: "power3.out",
                },
                "-=1.5",
            )
            .from(
                sites.current,
                {
                    y: 50,
                    x: -100,
                    opacity: 0,
                    duration: 2,
                    ease: "power3.out",
                },
                "-=1.5",
            );

        tl.play();
    });

    return (
        <div className="text-cream flex h-svh w-full flex-col items-center justify-between bg-black">
            <div className="font-main relative mb-auto flex w-full flex-col items-center justify-center pt-[5.5rem] text-[1rem] font-extralight uppercase">
                <div ref={iMake} className="flex gap-[8.5rem]">
                    <span>I</span>
                    <span>Make</span>
                </div>
                <h1 ref={dope} className="text-[5rem] leading-tight">
                    Dope
                </h1>
                <h1 ref={web} className="z-2 text-[5rem] leading-tight">
                    Web
                </h1>
                <h1 ref={sites} className="text-[5rem] leading-tight">
                    Sites
                </h1>
                <div className="absolute top-[58%] left-[50%] flex hidden h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <Image
                        className="w-[14.5rem] object-cover"
                        src="/hero.png"
                        loading="eager"
                        alt="Myself as the hero to these local businesses!"
                        width={419}
                        height={944}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-[1.5rem] py-[2rem]">
                <p className="font-body w-[70%] text-[1rem] leading-none font-thin">
                    Digital experiences for businesses that show up for their
                    community
                </p>
                <Link
                    href={"#"}
                    className="bg-red font-main flex w-[90%] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.68rem] font-thin uppercase"
                >
                    work with me!
                </Link>
                <p className="font-body w-[70%] text-center text-[1rem] leading-none font-thin">
                    or keep scrolling ↓
                </p>
            </div>
        </div>
    );
}
