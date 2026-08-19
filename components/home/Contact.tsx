"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

    const marqueeItems = [
        { label: "email me", href: "mailto:noah@noahdarcy.dev" },
        { label: "•" },
        { label: "call me", href: "tel:+1234567890" },
        { label: "•" },
        {
            label: "follow me",
            href: "https://instagram.com/your-username",
        },
        { label: "•" },
        { label: "subscribe to me", href: "/subscribe" },
        { label: "•" },
    ];

    useGSAP(
        () => {
            marqueeTimeline.current = gsap.timeline({
                repeat: -1,
                defaults: { ease: "none" },
            });

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
        <section className="pointer-events-none relative flex h-screen w-full flex-col items-center justify-center">
            <h1 className="font-main text-cream text-[5rem] font-thin lg:text-[7.5rem]">
                Reach Out!
            </h1>
            <Image
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
                className="text-cream font-body pointer-events-auto absolute top-1/2 left-0 flex -translate-y-1/2 gap-[5rem] text-[1rem] font-thin"
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
