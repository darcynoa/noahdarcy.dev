"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Script from "next/script";

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
                )
                .from(
                    mobileHeaderLines.lines,
                    {
                        yPercent: 100,
                        stagger: 0.1,
                        duration: 0.75,
                        ease: "power4.inOut",
                    },
                    "-=0.5",
                )
                .from(
                    descriptionLines.lines,
                    {
                        yPercent: 100,
                        stagger: 0.1,
                        duration: 0.75,
                        ease: "power4.inOut",
                    },
                    "-=0.5",
                )
                .from(
                    formRef.current,
                    {
                        y: 50,
                        opacity: 0,
                        duration: 0.75,
                        ease: "power4.inOut",
                    },
                    "-=0.5",
                );
            ScrollTrigger.create({
                trigger: gift.current,
                start: "top top+=200px",
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
                start: "center center+=8rem",
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
        <>
            <Script
                src="https://f.convertkit.com/ckjs/ck.5.js"
                strategy="afterInteractive"
            />
            <section
                ref={gift}
                className="relative flex w-full flex-col gap-[2rem] overflow-x-clip py-[5rem] lg:gap-[5rem]"
            >
                <p
                    ref={questionRef}
                    className="font-body text-cream absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-2/3 text-center text-[2rem] lg:top-1/3"
                >
                    Wanna build your own website?
                </p>
                <div
                    ref={blueprintRef}
                    className="mx-auto grid w-[75vw] max-w-[28rem] grid-cols-1 items-center justify-items-center lg:w-[55vw] lg:max-w-[32rem]"
                >
                    <Image
                        data-blueprint-page
                        src={"/gift/page1.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1190}
                        height={1684}
                        sizes="(max-width: 1023px) 75vw, 55vw"
                        className="z-[1] col-start-1 row-start-1 h-auto w-full -translate-x-[20%] translate-y-[3rem] lg:-translate-x-1/3"
                    />
                    <Image
                        data-blueprint-page
                        src={"/gift/page2.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1190}
                        height={1684}
                        sizes="(max-width: 1023px) 75vw, 55vw"
                        className="z-0 col-start-1 row-start-1 h-auto w-full"
                    />
                    <Image
                        data-blueprint-page
                        src={"/gift/page3.png"}
                        alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                        width={1190}
                        height={1684}
                        sizes="(max-width: 1023px) 75vw, 55vw"
                        className="-z-[1] col-start-1 row-start-1 h-auto w-full translate-x-[20%] -translate-y-[3rem] lg:translate-x-1/3"
                    />
                </div>
                <h1
                    ref={mobileHeaderRef}
                    className="font-main text-cream z-10 mx-auto -mt-[1.5rem] w-[90%] text-center text-[3.5rem] leading-[1.3] font-thin lg:hidden lg:w-auto"
                >
                    Build your dope site!
                </h1>
                <div className="text-cream font-main z-[2] -mt-[15rem] hidden flex-col px-[12rem] text-[8.75rem] font-thin lg:flex">
                    <h1 ref={desktopHeader1} className="leading-[1.2]">
                        Build your
                    </h1>
                    <h1
                        ref={desktopHeader2}
                        className="text-right leading-[1.2]"
                    >
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
                        action="https://app.kit.com/forms/9833217/subscriptions"
                        method="post"
                        data-sv-form="9833217"
                        data-uid="4517b82f67"
                        data-format="inline"
                        data-version="5"
                        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"powered_by":{"show":true},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""}},"version":"5"}'
                        className="seva-form formkit-form font-main [&_.formkit-alert-success]:text-cream flex flex-col items-center text-[0.935rem] font-thin lg:text-[1rem] [&_.formkit-alert]:mt-2 [&_.formkit-alert]:max-w-[25rem] [&_.formkit-alert]:text-center [&_.formkit-alert]:font-sans [&_.formkit-alert]:text-sm [&_.formkit-alert-error]:text-red-200"
                    >
                        <ul
                            className="formkit-alert formkit-alert-error"
                            data-element="errors"
                            data-group="alert"
                            aria-live="polite"
                        />
                        <div
                            data-element="fields"
                            data-stacked="false"
                            className="seva-fields formkit-fields flex gap-0"
                        >
                            <div className="formkit-field">
                                <input
                                    type="email"
                                    className="formkit-input bg-cream w-auto rounded-l-[4rem] py-[0.8rem] pl-[1rem] outline-none lg:w-[20rem]"
                                    placeholder="Your Email!"
                                    name="email_address"
                                    aria-label="Email address"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                data-element="submit"
                                className="formkit-submit bg-red text-cream w-[5rem] cursor-pointer rounded-r-[4rem] py-[0.8rem] disabled:cursor-wait disabled:opacity-70"
                            >
                                Submit
                            </button>
                        </div>
                        <a
                            href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
                            data-element="powered-by"
                            className="formkit-powered-by-convertkit text-cream mt-2 text-xs opacity-60"
                            target="_blank"
                            rel="nofollow noopener"
                        >
                            Built with Kit
                        </a>
                    </form>
                </div>
            </section>
        </>
    );
}
