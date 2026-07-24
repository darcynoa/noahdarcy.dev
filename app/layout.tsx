import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Bricolage_Grotesque, Yuji_Mai } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
});
const yujiMai = Yuji_Mai({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-yuji-mai",
});

export const metadata: Metadata = {
    title: "Noah D'Arcy",
    description: "Noah D'Arcy's website is coming soon.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased ${bricolageGrotesque.variable} ${yujiMai.variable}`}
        >
            <body className="bg-black">
                <Navigation />
                {children}
            </body>
        </html>
    );
}
