import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { type Metadata } from "next";
import { Providers } from "./ctx/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const inst = Instrument_Sans({
  variable: "--font-inst",
  subsets: ["latin"],
});
const jet = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stash-Up",
  description: "Stash-Up is the next generation wallet.",
  icons: [{ rel: "icon", url: "/svg/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inst.variable} ${jet.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
