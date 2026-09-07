"use client";

import Link from "next/link";

export default function VCardContact() {
    const downloadVCard = () => {
        const vcardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:Noah D'Arcy`,
            `TITLE:Business Owner`,
            `EMAIL:noah@noahdarcy.dev`,
            `TEL:+16314856390`,
            "END:VCARD",
        ].join("\n");

        const blob = new Blob([vcardData], {
            type: "text/vcard;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Noah_D'Arcy.vcf";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Link
            href="#"
            onClick={downloadVCard}
            className="font-main text-cream font-thin uppercase"
        >
            Contact
        </Link>
    );
}
