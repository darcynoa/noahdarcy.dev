import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coming Soon - noahdarcy.dev",
  description: "Noah D'Arcy's website is coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
