import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "../index.css";

import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/providers";
import ScrollDepthTracker from "@/components/home/ScrollDepthTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jiangui-resume.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "jiangui.eth — Senior Full-Stack Engineer",
    template: "%s | jiangui.eth",
  },
  description:
    "Senior Full-Stack & Web3 Engineer. Building high-throughput systems, DeFi protocols, and pixel-precise frontends.",
  keywords: ["full-stack engineer", "web3", "solidity", "next.js", "typescript", "defi"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "jiangui.eth",
    title: "jiangui.eth — Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack & Web3 Engineer. Building high-throughput systems, DeFi protocols, and pixel-precise frontends.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "jiangui.eth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "jiangui.eth — Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack & Web3 Engineer. Building high-throughput systems, DeFi protocols, and pixel-precise frontends.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="flex min-h-svh flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ScrollDepthTracker />
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
