"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
    const iMake = useRef<HTMLDivElement>(null);
    const dope = useRef<HTMLDivElement>(null);
    const web = useRef<HTMLDivElement>(null);
    const sites = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);

    const [image, setImage] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((prevImage) => (prevImage === 3 ? 1 : prevImage + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        if (
            !iMake.current ||
            !dope.current ||
            !web.current ||
            !sites.current ||
            !imageRef.current ||
            !blockRef.current
        )
            return;

        tl.set(blockRef.current, {
            scaleY: 0,
            transformOrigin: "center top",
        });

        tl.set(imageRef.current, {
            opacity: 0,
        });

        tl.from(iMake.current.childNodes, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
        })
            .from(
                dope.current,
                {
                    y: -50,
                    opacity: 0,
                    duration: 1.3,
                    ease: "power3.in",
                },
                "-=1",
            )
            .from(
                web.current,
                {
                    y: -50,
                    opacity: 0,
                    duration: 1.3,
                    ease: "power3.in",
                },
                "-=0.95",
            )
            .from(
                sites.current,
                {
                    y: -50,
                    opacity: 0,
                    duration: 1.3,
                    ease: "power3.in",
                },
                "-=0.9",
            )
            .to(
                blockRef.current,
                {
                    scaleY: 1,
                    duration: 1,
                    ease: "power3.inOut",
                },
                "-=0.5",
            )
            .set(imageRef.current, {
                opacity: 1,
                onComplete: () => {
                    console.log("Animation complete!");
                },
            })
            .set(blockRef.current, {
                transformOrigin: "center bottom",
            })
            .to(blockRef.current, {
                scaleY: 0,
                duration: 1,
                ease: "power3.inOut",
            });

        tl.play();
    });

    return (
        <div className="text-cream flex h-svh w-full flex-col items-center justify-between bg-black">
            <div className="font-main relative mb-auto flex w-full flex-col items-center justify-center pt-[5.5rem] text-[1rem] font-extralight uppercase lg:pt-[11rem]">
                <div ref={iMake} className="flex gap-[8.5rem] lg:text-[1.5rem]">
                    <span>I</span>
                    <span>Make</span>
                </div>
                <h1
                    ref={dope}
                    className="text-[5rem] leading-tight lg:text-[7.5rem]"
                >
                    Dope
                </h1>
                <h1
                    ref={web}
                    className="z-3 text-[5rem] leading-tight lg:text-[7.5rem]"
                >
                    Web
                </h1>
                <h1
                    ref={sites}
                    className="text-[5rem] leading-tight lg:text-[7.5rem]"
                >
                    Sites
                </h1>

                <div
                    ref={blockRef}
                    className="bg-red pointer-events-none absolute top-[58%] left-[50%] z-2 h-[944px] w-[419px] -translate-x-1/2 -translate-y-1/2 rounded-[1rem] will-change-transform"
                ></div>
                <div
                    ref={imageRef}
                    className="absolute top-[58%] left-[50%] flex h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                    <Image
                        className="clippy w-[14.5rem] object-cover lg:w-[20rem]"
                        src={`/portfolio-${image}.png`}
                        loading="eager"
                        alt="Myself as the hero to these local businesses!"
                        width={419}
                        height={944}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-[1.5rem] px-[1.5rem] py-[2rem] md:w-full md:flex-row md:justify-between">
                <p className="font-body w-[70%] max-w-[25ch] text-[1rem] leading-none font-thin lg:text-[1.5rem]">
                    Digital experiences for businesses that show up for their
                    community
                </p>
                <div className="flex w-full flex-col items-center justify-center gap-[1rem] md:items-end">
                    <Link
                        href={"#"}
                        className="bg-red font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase"
                    >
                        work with me!
                    </Link>
                    <p className="font-body w-[70%] text-center text-[1rem] leading-none font-thin md:w-auto">
                        or keep scrolling ↓
                    </p>
                </div>
            </div>
        </div>
    );
}
