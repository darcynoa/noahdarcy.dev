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
    const workRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!track.current) return;

        const trackEl = track.current;

        const mm = gsap.matchMedia();

        mm.add("(max-width: 1023px", () => {
            gsap.set(workRef.current, {
                transformOrigin: "left center",
            });

            gsap.from(workRef.current, {
                x: -300,
                rotate: -30,
                duration: 1.5,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: trackEl,
                    start: "top center",
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

                const headerLines = SplitText.create(header, {
                    type: "words",
                });

                const descriptionLines = SplitText.create(description, {
                    type: "words",
                });

                gsap.set(cta, {
                    transformOrigin: "left center",
                });

                const workTimeline = gsap
                    .timeline({ paused: true })
                    .from(image, {
                        y: -300,
                        width: "150%",
                        transformOrigin: "center center",
                        opacity: 1,
                        duration: 1.5,
                        ease: "power4.inOut",
                    })
                    .from(
                        headerLines.words,
                        {
                            y: -50,
                            stagger: 0.15,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power4.inOut",
                        },
                        "-=0.5",
                    )
                    .from(
                        descriptionLines.words,
                        {
                            y: 50,
                            stagger: 0.05,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power4.inOut",
                        },
                        "-=0.5",
                    )
                    .from(cta, {
                        y: 50,
                        rotate: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.out",
                    });

                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    toggleActions: "play none none reset",
                    onEnter: () => workTimeline.play(),
                });
            });
        });

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

            gsap.set(workRef.current, {
                transformOrigin: "left center",
            });

            gsap.from(workRef.current, {
                x: -400,
                rotate: -30,
                duration: 1.5,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: trackEl,
                    start: "top center",
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

                const headerLines = SplitText.create(header, {
                    type: "words",
                });

                const descriptionLines = SplitText.create(description, {
                    type: "words",
                });

                gsap.set(cta, {
                    transformOrigin: "left center",
                });

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
                    .from(
                        headerLines.words,
                        {
                            y: -50,
                            stagger: 0.15,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power4.inOut",
                        },
                        "-=0.5",
                    )
                    .from(
                        descriptionLines.words,
                        {
                            y: 50,
                            stagger: 0.05,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power4.inOut",
                        },
                        "-=0.5",
                    )
                    .from(cta, {
                        y: 50,
                        rotate: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power4.out",
                    });

                ScrollTrigger.create({
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left 40%",
                    onEnter: () => workTimeline.play(),
                });
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <div
            ref={track}
            className="flex w-full flex-col items-center justify-start pt-[10rem] pb-[5rem] lg:w-[450vw] lg:flex-row lg:overflow-hidden lg:pt-0 lg:pb-0"
        >
            <h1
                ref={workRef}
                className="font-main text-cream text-[5rem] font-thin lg:pl-[2rem] lg:text-[7.5rem]"
            >
                Work
            </h1>

            {proof.map((item, index) => {
                return (
                    <section
                        data-work-section
                        key={item.id}
                        className={`flex h-screen flex-col items-center justify-center gap-[5rem] pt-[17.5rem] lg:w-[110%] lg:pt-0 ${index === 0 ? "lg:ml-[40rem]" : "lg:ml-[25rem]"}`}
                    >
                        <h1
                            data-work-header
                            className="font-main text-cream z-2 w-fit text-center text-[3rem] font-thin lg:text-[7.5rem]"
                        >
                            {item.name}
                        </h1>
                        <div className="-mt-[8rem] flex flex-col items-center justify-center gap-[2rem] lg:mt-0 lg:flex-row">
                            <Image
                                data-work-image
                                src={item.image[0]}
                                alt="One of the many pictures for the At The Helm Productions Project"
                                width={1000}
                                height={1000}
                                className="w-[90%] rounded-[4rem] object-cover opacity-60 lg:w-[50rem] lg:rounded-[2rem] lg:opacity-100"
                            />
                            <div className="flex h-full flex-col items-start justify-between gap-[2rem] px-[1.5rem] lg:pt-[5rem]">
                                <p
                                    data-work-description
                                    className="font-body text-cream text-[1rem] leading-[1] font-thin lg:w-[70%]"
                                >
                                    {item.description}
                                </p>
                                <Link
                                    data-work-cta
                                    href={item.ctaLink}
                                    target="_blank"
                                    className={`${item.ctaColor} text-cream font-main flex min-w-[20rem] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.5rem] font-thin uppercase`}
                                >
                                    {item.ctaText}
                                </Link>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
