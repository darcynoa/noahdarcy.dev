"use client";

import { ReactLenis } from "lenis/react";
import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import Gift from "@/components/home/Gift";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
    return (
        <>
            <ReactLenis root />
            <Hero />
            <Work />
            <Gift />
            <Contact />
            <Footer />
        </>
    );
}
