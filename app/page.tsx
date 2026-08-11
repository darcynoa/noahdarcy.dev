"use client";

import { ReactLenis } from "lenis/react";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";

export default function Home() {
    return (
        <>
            <ReactLenis root />
            <Hero />
            <Proof />
        </>
    );
}
