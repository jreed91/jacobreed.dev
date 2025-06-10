import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head></head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="min-h-screen flex flex-col">
          <main id="skip" className="flex-1 flex flex-col px-8">
            <Navigation />
            {children}
            <Footer />

            <Analytics />
            <SpeedInsights />
          </main>
        </div>
      </body>
    </html>
  );
}
