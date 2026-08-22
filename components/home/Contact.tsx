"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Contact() {
    const [image, setImage] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((prevImage) => (prevImage === 3 ? 1 : prevImage + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeTimeline = useRef<gsap.core.Timeline>(null);
    const marqueeTimelineTimescale = useRef<GSAPTween>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const marqueeItems = [
        { label: "email me", href: "mailto:noah@noahdarcy.dev" },
        { label: "•" },
        { label: "call me", href: "tel:+16314856390" },
        { label: "•" },
        {
            label: "follow me",
            href: "https://instagram.com/noah_d_arcy",
        },
        { label: "•" },
        { label: "subscribe to me", href: "/subscribe" },
        { label: "•" },
    ];

    useGSAP(
        () => {
            const headerLines = SplitText.create(headerRef.current, {
                type: "lines",
                autoSplit: true,
            });

            gsap.from(headerLines.lines, {
                y: 50,
                opacity: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "+=100px",
                },
            });

            gsap.from(imageRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.75,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top+=200px",
                    end: "+=100px",
                },
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            marqueeTimeline.current = gsap.timeline({
                repeat: -1,
                defaults: { ease: "none" },
            });

            if (!marqueeTimeline.current) return;
            gsap.set(marqueeRef.current, {
                xPercent: 0,
            });

            marqueeTimeline.current
                .to(marqueeRef.current, {
                    xPercent: -59.1,
                    duration: 20,
                    ease: "none",
                })
                .set(marqueeRef.current, {
                    xPercent: 0,
                });

            mm.add("(max-width: 1023px)", () => {});

            mm.add("(min-width: 64rem)", () => {});
        },

        { scope: marqueeRef },
    );

    const onPointerEnter = () => {
        if (!marqueeTimeline.current) return;
        marqueeTimelineTimescale.current = gsap.to(marqueeTimeline.current, {
            timeScale: 0.25,
            duration: 0.75,
        });
    };

    const onPointerLeave = () => {
        if (!marqueeTimeline.current) return;
        marqueeTimelineTimescale.current = gsap.to(marqueeTimeline.current, {
            timeScale: 1,
            duration: 0.75,
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        >
            <h1
                ref={headerRef}
                className="font-main text-cream text-center text-[5rem] leading-[1.3] font-thin lg:text-left lg:text-[7.5rem]"
            >
                Reach Out!
            </h1>
            <Image
                ref={imageRef}
                className="z-[2] w-[14.5rem] object-cover lg:w-[20rem]"
                src={`/noah/portfolio-${image}.png`}
                loading="eager"
                alt="Myself as the hero to these local businesses!"
                width={419}
                height={944}
            />
            <div
                ref={marqueeRef}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                className="text-cream font-body pointer-events-auto absolute top-1/3 left-0 flex origin-[left_center] -translate-y-1/2 gap-[5rem] text-[1rem] font-thin lg:top-1/2 lg:rotate-0"
            >
                {[
                    ...marqueeItems,
                    ...marqueeItems,
                    ...marqueeItems,
                    ...marqueeItems,
                ].map((item, index) => (
                    <div className="min-w-fit" key={`${item.label}-${index}`}>
                        {item.href ? (
                            <Link className="w-fit" href={item.href}>
                                {item.label}
                            </Link>
                        ) : (
                            <p className="w-fit">{item.label}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
