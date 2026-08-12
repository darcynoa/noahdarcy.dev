"use client";

import { ReactLenis } from "lenis/react";
import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";

export default function Home() {
    return (
        <>
            <ReactLenis root />
            <Hero />
            <Work />
        </>
    );
}
