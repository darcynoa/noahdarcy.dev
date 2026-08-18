"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Gift() {
    const gift = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
    });

    return (
        <section
            ref={gift}
            className="relative flex w-full flex-col gap-[2rem] py-[12.5rem] lg:gap-[5rem]"
        >
            <p className="font-body text-cream absolute top-1/2 left-1/2 -z-10 hidden -translate-x-1/2 -translate-y-2/3 text-center text-[2rem]">
                Wanna build your own website?
            </p>
            <div className="mx-auto flex items-center justify-center">
                <Image
                    src={"/gift/page1.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1000}
                    height={1136}
                    className="w-[50%] translate-x-[75%] translate-y-[2rem] lg:w-[60rem]"
                />
                <Image
                    src={"/gift/page2.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1000}
                    height={1136}
                    className="w-[50%] lg:w-[60rem]"
                />
                <Image
                    src={"/gift/page3.png"}
                    alt="Preview of the cover of the Wabi-Sabi Website Blueprint"
                    width={1000}
                    height={1136}
                    className="-z-[1] w-[50%] -translate-x-[75%] -translate-y-[2rem] lg:w-[60rem]"
                />
            </div>
            <h1 className="font-main text-cream mx-auto w-[90%] text-center text-[3.5rem] leading-[1.3] font-thin lg:hidden lg:w-auto">
                Build your dope site!
            </h1>
            <div className="text-cream font-main z-[2] -mt-[15rem] flex flex-col px-[12rem] text-[8.75rem] font-thin">
                <h1 className="leading-[1.2]">Build your</h1>
                <h1 className="text-right leading-[1.2]">dope website!</h1>
            </div>
            <div className="flex flex-col items-center justify-between gap-[2rem] px-0 lg:flex-row lg:px-[6vw]">
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
