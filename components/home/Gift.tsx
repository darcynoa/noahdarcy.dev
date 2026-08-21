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
    const mobileHeaderRef = useRef<HTMLHeadingElement>(null);
    const desktopHeader1 = useRef<HTMLHeadingElement>(null);
    const desktopHeader2 = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

        console.log(blueprintPages);

        const questionLines = SplitText.create(questionRef.current, {
            type: "words,lines",
            mask: "words",
        });

        const mobileHeaderLines = SplitText.create(mobileHeaderRef.current, {
            type: "lines",
            autoSplit: true,
            mask: "lines",
        });

        const descriptionLines = SplitText.create(descriptionRef.current, {
            type: "lines",
            autoSplit: true,
            mask: "lines",
        });

        const mm = gsap.matchMedia();

        mm.add("(max-width: 1023px)", () => {
            const giftTimeline = gsap.timeline({ paused: true });
            giftTimeline.to(questionLines.words, {
                yPercent: 100,
                stagger: 0.05,
                duration: 0.75,
                ease: "power4.inOut",
            });
            //         .from(
            //             blueprintPages,
            //             {
            //                 y: -50,
            //                 autoAlpha: 0,
            //                 duration: 1.3,
            //                 stagger: 0.25,
            //                 ease: "power4.inOut",
            //             },
            //             "-=0.5",
            //         )
            //         .from(
            //             mobileHeaderLines.lines,
            //             {
            //                 yPercent: 100,
            //                 stagger: 0.1,
            //                 duration: 0.75,
            //                 ease: "power4.inOut",
            //             },
            //             "-=0.5",
            //         )
            //         .from(
            //             descriptionLines.lines,
            //             {
            //                 yPercent: 100,
            //                 stagger: 0.1,
            //                 duration: 0.75,
            //                 ease: "power4.inOut",
            //             },
            //             "-=0.5",
            //         )
            //         .from(
            //             formRef.current,
            //             {
            //                 y: 50,
            //                 opacity: 0,
            //                 duration: 0.75,
            //                 ease: "power4.inOut",
            //             },
            //             "-=0.5",
            //         );
            ScrollTrigger.create({
                trigger: gift.current,
                start: "top top",
                animation: giftTimeline,
                toggleActions: "play none none reverse",
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
                toggleActions: "play none none reverse",
                animation: giftTimeline,
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
                .from(
                    ctaChildren,
                    {
                        y: 50,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 1,
                        ease: "power4.inOut",
                    },
                    "-=0.5",
                );

            ScrollTrigger.create({
                trigger: gift.current,
                start: "center center+=10rem",
                animation: giftContent,
                toggleActions: "play none none reverse",
            });
        });

        return () => {
            mm.revert();
            questionLines.revert();
            mobileHeaderLines.revert();
        };
    });

    return (
        <section
            ref={gift}
            className="relative flex w-full flex-col gap-[2rem] py-[5rem] lg:gap-[5rem]"
        >
            <p
                ref={questionRef}
                className="font-body text-cream absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-2/3 text-center text-[2rem] lg:top-1/3"
            >
                Wanna build your own website?
            </p>
            <div
                ref={blueprintRef}
                className="mx-auto flex items-center justify-center"
            >
                <Image
                    data-blueprint-page
                    src={"/gift/page1.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1190}
                    height={1684}
                    className="z-[1] translate-x-[90%] translate-y-[3rem] scale-50 lg:translate-x-[50%] lg:scale-75"
                />
                <Image
                    data-blueprint-page
                    src={"/gift/page2.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1190}
                    height={1684}
                    className="z-0 scale-50 lg:scale-75"
                />
                <Image
                    data-blueprint-page
                    src={"/gift/page3.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1190}
                    height={1684}
                    className="-z-[1] -translate-x-[90%] -translate-y-[3rem] scale-50 lg:-translate-x-[50%] lg:scale-75"
                />
            </div>
            <h1
                ref={mobileHeaderRef}
                className="font-main text-cream mx-auto -mt-[5rem] w-[90%] text-center text-[3.5rem] leading-[1.3] font-thin lg:hidden lg:w-auto"
            >
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
                <p
                    ref={descriptionRef}
                    className="font-body text-cream w-[70%] text-center text-[0.935rem] leading-[1.2] font-thin lg:w-[30%] lg:text-left lg:text-[1rem]"
                >
                    Your easy-to-follow curated videos on building your own
                    amazing website. Drop in your email to lock in your
                    download!
                </p>
                <form
                    ref={formRef}
                    className="font-main flex gap-0 text-[0.935rem] font-thin lg:text-[1rem]"
                >
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
