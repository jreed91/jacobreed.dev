import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import './global.css';

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div className="bg-gray-50 dark:bg-gray-900">
          <main
            id="skip"
            className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
          >
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
