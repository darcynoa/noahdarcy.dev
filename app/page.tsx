import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="text-cream flex h-svh w-full flex-col items-center justify-between bg-black">
            <div className="font-main relative mb-auto flex w-full flex-col items-center justify-center pt-[5.5rem] text-[1rem] font-extralight uppercase">
                <div className="flex gap-[8.5rem]">
                    <span>I</span>
                    <span>Make</span>
                </div>
                <h1 className="text-[5rem] leading-tight">Dope</h1>
                <h1 className="z-2 text-[5rem] leading-tight">Web</h1>
                <h1 className="text-[5rem] leading-tight">Sites</h1>
                <Image
                    className="absolute top-[58%] left-[55%] w-[14.5rem] -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="/hero.png"
                    loading="eager"
                    alt="Myself as the hero to these local businesses!"
                    width={419}
                    height={944}
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-[1.5rem] py-[2rem]">
                <p className="font-body w-[70%] text-[1rem] leading-none font-thin">
                    Digital experiences for businesses that show up for their
                    community
                </p>
                <Link
                    href={"#"}
                    className="bg-red font-main flex w-[90%] items-center justify-center rounded-[4rem] py-[0.8rem] text-center text-[1.68rem] font-thin uppercase"
                >
                    work with me!
                </Link>
                <p className="font-body w-[70%] text-center text-[1rem] leading-none font-thin">
                    or keep scrolling ↓
                </p>
            </div>
        </div>
    );
}
