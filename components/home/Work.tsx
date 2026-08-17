"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import proof from "@/data";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Work() {
    const track = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!track.current) return;

        const trackEl = track.current;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 64rem)", () => {
            const scrollTween = gsap.to(trackEl, {
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
            const sections = gsap.utils.toArray<HTMLElement>(
                "[data-work-section]",
                trackEl,
            );

            sections.forEach((section) => {
                const image = section.querySelector("[data-work-image]");
                const header = section.querySelector("[data-work-header]");
                const description = section.querySelector(
                    "[data-work-description]",
                );
                const cta = section.querySelector("[data-work-cta]");

                const workTimeline = gsap
                    .timeline({ paused: true })
                    .from(image, {
                        x: -600,
                        y: -100,
                        width: "70rem",
                        transformOrigin: "center center",
                        duration: 1.5,
                        ease: "power4.inOut",
                    })
                    .from(header, {
                        y: -50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.inOut",
                    })
                    .from(description, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.inOut",
                    })
                    .from(cta, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.inOut",
                    });

                ScrollTrigger.create({
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left 30%",
                    onEnter: () => workTimeline.play(),
                });
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <div
            ref={track}
            className="flex h-screen w-full flex-col items-center justify-start bg-black lg:w-[450vw] lg:flex-row lg:overflow-hidden"
        >
            <h1 className="font-main text-cream text-[5rem] font-thin lg:pl-[2rem] lg:text-[7.5rem]">
                Work
            </h1>

            {proof.map((item) => {
                return (
                    <section
                        data-work-section
                        key={item.id}
                        className={`flex h-screen flex-col items-center justify-center gap-[5rem] pt-[5rem] lg:w-[110%] lg:pt-0 ${item.id === 1 ? "lg:ml-[40rem]" : "lg:ml-[25rem]"}`}
                    >
                        <h1
                            data-work-header
                            className="font-main text-cream z-2 w-fit text-center text-[3rem] font-thin lg:text-[7.5rem]"
                        >
                            {item.name}
                        </h1>
                        <div className="-mt-[3.5rem] flex flex-col items-center justify-center gap-[2rem] lg:flex-row">
                            <Image
                                data-work-image
                                src={"/work/athp-2.png"}
                                alt="One of the many pictures for the At The Helm Productions Project"
                                width={1000}
                                height={1000}
                                className="w-[50rem] rounded-[2rem] object-cover opacity-80 lg:opacity-100"
                            />
                            <div className="flex h-full flex-col items-start justify-between gap-[2rem] px-[1.5rem] pt-[5rem]">
                                <p
                                    data-work-description
                                    className="font-body text-cream w-[70%] text-[1rem] leading-[1] font-thin"
                                >
                                    An astonishing website put together to
                                    promote a budding film company with their
                                    first short film
                                </p>
                                <Link
                                    data-work-cta
                                    href={"mailto:noah@noahdarcy.dev"}
                                    className="bg-green text-cream font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase"
                                >
                                    work with me!
                                </Link>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
