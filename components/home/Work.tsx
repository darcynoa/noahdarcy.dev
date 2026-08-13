"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

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
            className="flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black lg:w-[450vw] lg:flex-row"
        >
            <h1 className="font-main text-cream text-[5rem] font-thin lg:pl-[2rem] lg:text-[7.5rem]">
                Work
            </h1>
            <section className="flex h-screen flex-col items-center justify-center gap-[5rem] pt-[5rem] lg:ml-[25rem] lg:w-[110%] lg:pt-0">
                <h1 className="font-main text-cream z-2 w-fit text-center text-[3rem] font-thin lg:text-[7.5rem]">
                    At The Helm Productions
                </h1>
                <div className="-mt-[3.5rem] flex flex-col items-center justify-center gap-[2rem] lg:flex-row">
                    <Image
                        src={"/work/athp-2.png"}
                        alt="One of the many pictures for the At The Helm Productions Project"
                        width={1000}
                        height={1000}
                        className="w-[50rem] rounded-[2rem] object-cover opacity-80"
                    />
                    <div className="flex h-full flex-col items-start justify-between gap-[2rem] px-[1.5rem] pt-[5rem]">
                        <p className="font-body text-cream w-[70%] text-[1rem] leading-[1] font-thin">
                            An astonishing website put together to promote a
                            budding film company with their first short film
                        </p>
                        <Link
                            href={"mailto:noah@noahdarcy.dev"}
                            className="bg-red text-cream font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase"
                        >
                            work with me!
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex h-screen flex-col items-center justify-center gap-[5rem] pt-[5rem] lg:ml-[25rem] lg:w-[110%] lg:pt-0">
                <h1 className="font-main text-cream z-2 w-fit text-center text-[3rem] font-thin lg:text-[7.5rem]">
                    At The Helm Productions
                </h1>
                <div className="-mt-[3.5rem] flex flex-col items-center justify-center gap-[2rem] lg:flex-row">
                    <Image
                        src={"/work/athp-2.png"}
                        alt="One of the many pictures for the At The Helm Productions Project"
                        width={1000}
                        height={1000}
                        className="w-[50rem] rounded-[2rem] object-cover opacity-80"
                    />
                    <div className="flex h-full flex-col items-start justify-between gap-[2rem] px-[1.5rem] pt-[5rem]">
                        <p className="font-body text-cream w-[70%] text-[1rem] leading-[1] font-thin">
                            An astonishing website put together to promote a
                            budding film company with their first short film
                        </p>
                        <Link
                            href={"mailto:noah@noahdarcy.dev"}
                            className="bg-red text-cream font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase"
                        >
                            work with me!
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex h-screen flex-col items-center justify-center gap-[5rem] pt-[5rem] lg:ml-[25rem] lg:w-[110%] lg:pt-0">
                <h1 className="font-main text-cream z-2 w-fit text-center text-[3rem] font-thin lg:text-[7.5rem]">
                    At The Helm Productions
                </h1>
                <div className="-mt-[3.5rem] flex flex-col items-center justify-center gap-[2rem] lg:flex-row">
                    <Image
                        src={"/work/athp-2.png"}
                        alt="One of the many pictures for the At The Helm Productions Project"
                        width={1000}
                        height={1000}
                        className="w-[50rem] rounded-[2rem] object-cover opacity-80"
                    />
                    <div className="flex h-full flex-col items-start justify-between gap-[2rem] px-[1.5rem] pt-[5rem]">
                        <p className="font-body text-cream w-[70%] text-[1rem] leading-[1] font-thin">
                            An astonishing website put together to promote a
                            budding film company with their first short film
                        </p>
                        <Link
                            href={"mailto:noah@noahdarcy.dev"}
                            className="bg-red text-cream font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase"
                        >
                            work with me!
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
