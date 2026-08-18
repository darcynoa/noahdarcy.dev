"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Gift() {
    const gift = useRef<HTMLDivElement>(null);
    const blueprintRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLParagraphElement>(null);
    const desktopHeader1 = useRef<HTMLHeadingElement>(null);
    const desktopHeader2 = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!blueprintRef.current || !questionRef.current || !ctaRef.current)
            return;

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

        const blueprintPages = gsap.utils
            .toArray<HTMLElement>("[data-blueprint-page]", blueprintRef.current)
            .reverse();

        const questionLines = SplitText.create(questionRef.current, {
            type: "words,lines",
            mask: "words",
        });

        const mm = gsap.matchMedia();

        mm.add("(max-width: 1023px)", () => {
            const giftTimeline = gsap.timeline({ paused: true });
            giftTimeline
                .to(questionLines.words, {
                    yPercent: 100,
                    stagger: 0.05,
                    duration: 0.75,
                    ease: "power4.inOut",
                })
                .from(
                    blueprintPages,
                    {
                        y: -50,
                        autoAlpha: 0,
                        duration: 1.3,
                        stagger: 0.25,
                        ease: "power4.inOut",
                    },
                    "-=0.5",
                );

            ScrollTrigger.create({
                trigger: gift.current,
                start: "top top+=300px",
                onEnter: () => giftTimeline.play(),
            });
        });

        mm.add("(min-width: 64rem)", () => {
            const giftTimeline = gsap.timeline({ paused: true });
            giftTimeline
                .to(questionLines.words, {
                    yPercent: 100,
                    stagger: 0.05,
                    duration: 0.75,
                    delay: 0.5,
                    ease: "power4.inOut",
                })
                .from(
                    blueprintPages,
                    {
                        y: -50,
                        autoAlpha: 0,
                        duration: 1.3,
                        stagger: 0.25,
                        ease: "power4.inOut",
                    },
                    "-=0.75",
                );

            ScrollTrigger.create({
                trigger: gift.current,
                start: "top 10%",
                onEnter: () => giftTimeline.play(),
            });

            const giftContent = gsap.timeline({ paused: true });
            const ctaChildren = gsap.utils.toArray<HTMLElement>(
                ctaRef.current?.children || [],
            );

            giftContent
                .from(desktopHeader1.current, {
                    xPercent: -100,
                    rotate: -30,
                    transformOrigin: "left center",
                    duration: 1.5,
                    ease: "power4.inOut",
                })
                .from(
                    desktopHeader2.current,
                    {
                        xPercent: 100,
                        rotate: 30,
                        transformOrigin: "right center",
                        duration: 1.5,
                        ease: "power4.inOut",
                    },
                    "<",
                )
                .from(ctaChildren, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power4.inOut",
                });

            ScrollTrigger.create({
                trigger: gift.current,
                start: "center center+=10rem",
                onEnter: () => giftContent.play(),
            });
        });

        return () => mm.revert();
    });

    return (
        <section
            ref={gift}
            className="relative flex w-full flex-col gap-[2rem] py-[12.5rem] lg:gap-[5rem]"
        >
            <p
                ref={questionRef}
                className="font-body text-cream absolute top-1/4 left-1/2 -z-10 -translate-x-1/2 -translate-y-2/3 text-center text-[2rem]"
            >
                Wanna build your own website?
            </p>
            <div
                ref={blueprintRef}
                className="mx-auto flex items-center justify-center"
            >
                <div
                    data-blueprint-page
                    className="z-[1] w-[30rem] lg:w-[50rem]"
                >
                    <Image
                        src={"/gift/page1.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1000}
                        height={1136}
                        className="w-full translate-x-[75%] translate-y-[3rem]"
                    />
                </div>
                <div data-blueprint-page className="z-0 w-[30rem] lg:w-[50rem]">
                    <Image
                        src={"/gift/page2.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1000}
                        height={1136}
                        className="w-full"
                    />
                </div>
                <div
                    data-blueprint-page
                    className="-z-[1] w-[30rem] lg:w-[50rem]"
                >
                    <Image
                        src={"/gift/page3.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1000}
                        height={1136}
                        className="w-full -translate-x-[75%] -translate-y-[3rem]"
                    />
                </div>
            </div>
            <h1 className="font-main text-cream mx-auto w-[90%] text-center text-[3.5rem] leading-[1.3] font-thin lg:hidden lg:w-auto">
                Build your dope site!
            </h1>
            <div className="text-cream font-main z-[2] -mt-[15rem] hidden flex-col px-[12rem] text-[8.75rem] font-thin lg:flex">
                <h1 ref={desktopHeader1} className="leading-[1.2]">
                    Build your
                </h1>
                <h1 ref={desktopHeader2} className="text-right leading-[1.2]">
                    dope website!
                </h1>
            </div>
            <div
                ref={ctaRef}
                className="flex flex-col items-center justify-between gap-[2rem] px-0 lg:flex-row lg:px-[6vw]"
            >
                <p className="font-body text-cream w-[70%] text-center text-[0.935rem] leading-[1.2] font-thin lg:w-[30%] lg:text-left lg:text-[1rem]">
                    Your easy-to-follow curated videos on building your own
                    amazing website. Drop in your email to lock in your
                    download!
                </p>
                <form className="font-main flex gap-0 text-[0.935rem] font-thin lg:text-[1rem]">
                    <input
                        type="email"
                        className="bg-cream w-auto rounded-l-[4rem] py-[0.8rem] pl-[1rem] lg:w-[20rem]"
                        placeholder="Your Email!"
                    />
                    <input
                        type="submit"
                        className="bg-red text-cream w-[5rem] rounded-r-[4rem] py-[0.8rem]"
                    />
                </form>
            </div>
        </section>
    );
}
