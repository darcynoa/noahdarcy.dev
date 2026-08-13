"use client";

import { useEffect, useState } from "react";

export default function ReducedMotionIndicator() {
    const [reduced, setReduced] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);

        update();
        // Use modern event API with fallback
        if (mq.addEventListener) mq.addEventListener("change", update);
        else mq.addListener(update);

        return () => {
            if (mq.removeEventListener)
                mq.removeEventListener("change", update);
            else mq.removeListener(update);
        };
    }, []);

    if (reduced === null) return null;

    return (
        <div
            style={{
                position: "fixed",
                bottom: 16,
                left: 16,
                padding: "8px 12px",
                background: reduced ? "#ffecec" : "#ecffec",
                color: "#111",
                borderRadius: 8,
                fontSize: 14,
                zIndex: 9999,
            }}
        >
            {reduced
                ? "prefers-reduced-motion: reduce — ON"
                : "prefers-reduced-motion: reduce — OFF"}
        </div>
    );
}
